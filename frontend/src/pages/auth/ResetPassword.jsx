import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import { InputField } from '../../components/auth/LoginForm.jsx'
import PasswordStrength from '../../components/auth/PasswordStrength.jsx'
import authService from '../../services/authService.js'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') || ''

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!form.password) e.password = 'New password is required.'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (!form.confirm) e.confirm = 'Please confirm your new password.'
    else if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      await authService.resetPassword(token, form.password)
      setSuccess(true)
    } catch (err) {
      setApiError(err.message || 'Reset failed. Your link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout>
        <div className="text-center py-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={34} className="text-sage" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal mb-2">Password Updated</h2>
          <p className="text-sm text-warm-gray mb-8">
            Your password has been updated successfully. You can now sign in.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5"
          >
            Continue to Sign In <ArrowRight size={16} />
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate>
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-charcoal mb-1.5">Create a New Password</h1>
          <p className="text-sm text-warm-gray">
            Choose a strong password for your CardioXAI account.
          </p>
        </div>

        {/* Token missing warning */}
        {!token && (
          <div className="flex items-start gap-2.5 bg-peach/20 border border-peach/40 rounded-xl px-4 py-3 mb-5">
            <AlertCircle size={15} className="text-peach mt-0.5 flex-shrink-0" />
            <p className="text-sm text-charcoal font-medium">
              No reset token found. Please use the link from your email.
            </p>
          </div>
        )}

        {/* API error */}
        {apiError && (
          <div className="flex items-start gap-2.5 bg-coral/8 border border-coral/25 rounded-xl px-4 py-3 mb-5">
            <AlertCircle size={15} className="text-coral mt-0.5 flex-shrink-0" />
            <p className="text-sm text-coral font-medium">{apiError}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* New password */}
          <div>
            <InputField
              id="new-password"
              label="New Password"
              type={showPw ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              icon={Lock}
              autoComplete="new-password"
              rightSlot={
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="text-warm-gray/60 hover:text-warm-gray transition-colors p-0.5"
                  aria-label={showPw ? 'Hide' : 'Show'}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <PasswordStrength password={form.password} />
          </div>

          {/* Confirm */}
          <InputField
            id="confirm-password"
            label="Confirm New Password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your new password"
            value={form.confirm}
            onChange={set('confirm')}
            error={errors.confirm}
            icon={Lock}
            autoComplete="new-password"
            rightSlot={
              <button type="button" onClick={() => setShowConfirm((v) => !v)}
                className="text-warm-gray/60 hover:text-warm-gray transition-colors p-0.5"
                aria-label={showConfirm ? 'Hide' : 'Show'}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Updating…</>
            : <>Update Password <ArrowRight size={16} /></>}
        </button>

        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-sm font-semibold text-warm-gray hover:text-charcoal transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
