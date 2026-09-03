import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import SocialLogin from './SocialLogin.jsx'
import authService from '../../services/authService.js'

function InputField({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon, rightSlot, autoComplete }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-charcoal">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-gray/60 pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightSlot ? 'pr-11' : 'pr-4'} py-3 rounded-xl border text-sm text-charcoal placeholder:text-warm-gray/50 transition-all duration-200 outline-none bg-white
            ${error
              ? 'border-coral bg-coral/3 focus:shadow-[0_0_0_3px_rgba(217,83,79,0.12)]'
              : 'border-beige focus:border-coral focus:shadow-[0_0_0_3px_rgba(217,83,79,0.10)]'
            }`}
        />
        {rightSlot && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-coral font-medium">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

export { InputField }

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!form.email.trim()) e.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.password) e.password = 'Password is required.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      await authService.login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await authService.loginWithGoogle()
    } catch (err) {
      setApiError(err.message || 'Google sign-in failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-0">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-charcoal mb-1.5">Welcome Back</h1>
        <p className="text-sm text-warm-gray">
          Sign in to continue to your CardioXAI dashboard.
        </p>
      </div>

      {/* API error banner */}
      {apiError && (
        <div className="flex items-start gap-2.5 bg-coral/8 border border-coral/25 rounded-xl px-4 py-3 mb-5">
          <AlertCircle size={15} className="text-coral mt-0.5 flex-shrink-0" />
          <p className="text-sm text-coral font-medium">{apiError}</p>
        </div>
      )}

      <div className="space-y-4">
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          icon={Mail}
          autoComplete="email"
        />

        <InputField
          id="password"
          label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Enter your password"
          value={form.password}
          onChange={set('password')}
          error={errors.password}
          icon={Lock}
          autoComplete="current-password"
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="text-warm-gray/60 hover:text-warm-gray transition-colors p-0.5"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        {/* Forgot */}
        <div className="flex justify-end -mt-1">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-coral hover:text-coral-dark transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading ? (
          <><Loader2 size={16} className="animate-spin" /> Signing in…</>
        ) : (
          <>Sign In <ArrowRight size={16} /></>
        )}
      </button>

      {/* Social */}
      <SocialLogin onGoogle={handleGoogle} loading={loading} />

      {/* Switch to register */}
      <p className="text-center text-sm text-warm-gray mt-5">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-coral hover:text-coral-dark transition-colors">
          Create an account
        </Link>
      </p>
    </form>
  )
}
