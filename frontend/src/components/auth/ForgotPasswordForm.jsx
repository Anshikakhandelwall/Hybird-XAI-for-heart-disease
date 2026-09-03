import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, ArrowRight, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { InputField } from './LoginForm.jsx'
import authService from '../../services/authService.js'

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const validate = () => {
    if (!email.trim()) return 'Email address is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setApiError('')
    try {
      await authService.forgotPassword(email)
      setSent(true)
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center py-4">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center">
            <CheckCircle2 size={32} className="text-sage" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-charcoal mb-2">Check Your Inbox</h2>
        <p className="text-sm text-warm-gray mb-1">
          We've sent a password reset link to:
        </p>
        <p className="text-sm font-bold text-charcoal mb-6">{email}</p>
        <p className="text-xs text-warm-gray mb-8">
          Didn't receive it? Check your spam folder or{' '}
          <button
            onClick={() => setSent(false)}
            className="text-coral font-semibold hover:underline"
          >
            try again
          </button>.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral-dark transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-charcoal mb-1.5">Reset Your Password</h1>
        <p className="text-sm text-warm-gray">
          Enter your email address and we'll send you a password reset link.
        </p>
      </div>

      {/* API error */}
      {apiError && (
        <div className="flex items-start gap-2.5 bg-coral/8 border border-coral/25 rounded-xl px-4 py-3 mb-5">
          <AlertCircle size={15} className="text-coral mt-0.5 flex-shrink-0" />
          <p className="text-sm text-coral font-medium">{apiError}</p>
        </div>
      )}

      <InputField
        id="fp-email"
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setError(''); setApiError('') }}
        error={error}
        icon={Mail}
        autoComplete="email"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading
          ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
          : <>Send Reset Link <ArrowRight size={16} /></>}
      </button>

      <div className="text-center mt-6">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-warm-gray hover:text-charcoal transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}
