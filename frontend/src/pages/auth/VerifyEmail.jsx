import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout.jsx'
import OTPInput from '../../components/auth/OTPInput.jsx'
import authService from '../../services/authService.js'

const RESEND_SECONDS = 30

export default function VerifyEmail() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const email = state?.email || ''

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [verified, setVerified] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(RESEND_SECONDS)
  const [resending, setResending] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

  const handleVerify = async (e) => {
    e.preventDefault()
    if (otp.length < 6) { setOtpError('Please enter the complete 6-digit code.'); return }

    setLoading(true)
    setApiError('')
    setOtpError('')
    try {
      await authService.verifyEmail(email, otp)
      setVerified(true)
    } catch (err) {
      setApiError(err.message || 'Invalid or expired code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setApiError('')
    try {
      await authService.resendVerification(email)
      setResendCooldown(RESEND_SECONDS)
      setOtp('')
    } catch (err) {
      setApiError(err.message || 'Could not resend code. Please try again.')
    } finally {
      setResending(false)
    }
  }

  if (verified) {
    return (
      <AuthLayout>
        <div className="text-center py-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center animate-pulse-slow">
              <CheckCircle2 size={34} className="text-sage" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal mb-2">Email Verified!</h2>
          <p className="text-sm text-warm-gray mb-8">
            Your CardioXAI account has been verified successfully.
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
      <form onSubmit={handleVerify} noValidate>
        {/* Header */}
        <div className="mb-7 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-coral/10 rounded-2xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-coral" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-charcoal mb-1.5">Verify Your Email</h1>
          <p className="text-sm text-warm-gray">
            We've sent a 6-digit verification code to
          </p>
          {email && (
            <p className="text-sm font-bold text-charcoal mt-0.5">{email}</p>
          )}
        </div>

        {/* API error */}
        {apiError && (
          <div className="flex items-start gap-2.5 bg-coral/8 border border-coral/25 rounded-xl px-4 py-3 mb-5">
            <AlertCircle size={15} className="text-coral mt-0.5 flex-shrink-0" />
            <p className="text-sm text-coral font-medium">{apiError}</p>
          </div>
        )}

        {/* OTP */}
        <div className="mb-2">
          <OTPInput value={otp} onChange={(v) => { setOtp(v); setOtpError('') }} disabled={loading} />
          {otpError && (
            <p className="text-center text-xs text-coral font-medium mt-2">{otpError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Verifying…</>
            : <>Verify Account <ArrowRight size={16} /></>}
        </button>

        {/* Resend */}
        <div className="text-center mt-5">
          {resendCooldown > 0 ? (
            <p className="text-xs text-warm-gray">
              Resend available in{' '}
              <span className="font-bold text-charcoal">{resendCooldown}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-coral hover:text-coral-dark transition-colors disabled:opacity-60"
            >
              <RefreshCw size={13} className={resending ? 'animate-spin' : ''} />
              Resend Code
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-gray hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={12} />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
