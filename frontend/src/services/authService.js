/**
 * authService.js
 *
 * All authentication API calls for CardioXAI.
 * Connects to the Django REST Framework backend.
 *
 * Base URL is read from VITE_API_BASE_URL (set in frontend/.env).
 * Never hardcodes credentials, tokens, or sensitive values.
 *
 * Each function throws an Error with a human-readable message on failure
 * so UI components can display it directly.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

/**
 * Generic fetch wrapper.
 * - Attaches JSON content-type header.
 * - Reads access token from localStorage (set on login).
 * - Throws a descriptive Error on non-2xx responses.
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('cardioxai_access_token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Parse JSON body (if available)
  let data = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    data = await response.json()
  }

  if (!response.ok) {
    // Extract the most useful error message from DRF responses
    const message =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.email?.[0] ||
      data?.password?.[0] ||
      data?.message ||
      `Request failed (${response.status})`
    throw new Error(message)
  }

  return data
}

// ─────────────────────────────────────────────
// Token helpers (localStorage — never cookies
// containing sensitive data in plain text)
// ─────────────────────────────────────────────

function saveTokens({ access, refresh }) {
  if (access) localStorage.setItem('cardioxai_access_token', access)
  if (refresh) localStorage.setItem('cardioxai_refresh_token', refresh)
}

function clearTokens() {
  localStorage.removeItem('cardioxai_access_token')
  localStorage.removeItem('cardioxai_refresh_token')
}

function getAccessToken() {
  return localStorage.getItem('cardioxai_access_token')
}

// ─────────────────────────────────────────────
// Auth operations
// ─────────────────────────────────────────────

/**
 * Login with email + password.
 * Expects DRF Simple JWT response: { access, refresh }
 */
async function login(email, password) {
  const data = await request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  saveTokens(data)
  return data
}

/**
 * Register a new user account.
 * On success the backend should send a verification email.
 */
async function register({ full_name, email, password, age, gender }) {
  return request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ full_name, email, password, age, gender }),
  })
}

/**
 * Logout — invalidates the refresh token on the server.
 */
async function logout() {
  const refresh = localStorage.getItem('cardioxai_refresh_token')
  clearTokens()
  if (!refresh) return
  try {
    await request('/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({ refresh }),
    })
  } catch {
    // Silent — tokens already cleared client-side
  }
}

/**
 * Request a password reset email.
 */
async function forgotPassword(email) {
  return request('/auth/password-reset/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

/**
 * Submit new password with the token from the reset email link.
 */
async function resetPassword(token, password) {
  return request('/auth/password-reset/confirm/', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  })
}

/**
 * Verify email address with OTP code.
 */
async function verifyEmail(email, otp) {
  return request('/auth/verify-email/', {
    method: 'POST',
    body: JSON.stringify({ email, otp }),
  })
}

/**
 * Resend the email verification code.
 */
async function resendVerification(email) {
  return request('/auth/resend-verification/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}

/**
 * Refresh the access token using the stored refresh token.
 * Call this when a 401 is received on a protected route.
 */
async function refreshAccessToken() {
  const refresh = localStorage.getItem('cardioxai_refresh_token')
  if (!refresh) throw new Error('No refresh token available. Please sign in again.')

  const data = await request('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  })
  if (data?.access) {
    localStorage.setItem('cardioxai_access_token', data.access)
  }
  return data
}

/**
 * Google OAuth initiation (redirect-based).
 * The actual OAuth flow is handled server-side or via a library.
 * Replace with your OAuth provider SDK call as needed.
 */
async function loginWithGoogle() {
  // Placeholder — integrate with Google Identity Services or
  // your Django allauth / dj-rest-auth Google endpoint.
  const googleAuthUrl = `${BASE_URL}/auth/google/`
  window.location.href = googleAuthUrl
}

/**
 * Get the currently authenticated user's profile.
 */
async function getCurrentUser() {
  return request('/users/me/')
}

/**
 * Returns true if an access token exists in storage.
 * Note: does NOT verify the token is still valid server-side.
 */
function isAuthenticated() {
  return Boolean(getAccessToken())
}

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

const authService = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  refreshAccessToken,
  loginWithGoogle,
  getCurrentUser,
  isAuthenticated,
  getAccessToken,
  clearTokens,
}

export default authService
