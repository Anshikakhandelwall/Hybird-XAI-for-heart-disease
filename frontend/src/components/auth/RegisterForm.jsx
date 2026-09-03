import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'
import { InputField } from './LoginForm.jsx'
import PasswordStrength from './PasswordStrength.jsx'
import SocialLogin from './SocialLogin.jsx'
import authService from '../../services/authService.js'

const GENDERS = ['Prefer not to say', 'Male', 'Female', 'Non-binary', 'Other']

export default function RegisterForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    agreed: false,
  })
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: val }))
    setErrors((er) => ({ ...er, [field]: '' }))
    setApiError('')
  }

  const validate = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.email.trim()) e.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.'
    if (form.age && (isNaN(form.age) || form.age < 1 || form.age > 120))
      e.age = 'Enter a valid age between 1 and 120.'
    if (!form.agreed) e.agreed = 'You must agree to the Terms & Conditions.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      await authService.register({
        full_name: form.fullName,
        email: form.email,
        password: form.password,
        age: form.age || undefined,
        gender: form.gender || undefined,
      })
      navigate('/verify-email', { state: { email: form.email } })
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please try again.')
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
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-charcoal mb-1.5">
          Create Your CardioXAI Account
        </h1>
        <p className="text-sm text-warm-gray">
          Start understanding your heart risk with explainable AI.
        </p>
      </div>

      {/* API error */}
      {apiError && (
        <div className="flex items-start gap-2.5 bg-coral/8 border border-coral/25 rounded-xl px-4 py-3 mb-5">
          <AlertCircle size={15} className="text-coral mt-0.5 flex-shrink-0" />
          <p className="text-sm text-coral font-medium">{apiError}</p>
        </div>
      )}

      <div className="space-y-4">
        <InputField
          id="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={form.fullName}
          onChange={set('fullName')}
          error={errors.fullName}
          icon={User}
          autoComplete="name"
        />

        <InputField
          id="reg-email"
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          icon={Mail}
          autoComplete="email"
        />

        {/* Password */}
        <div>
          <InputField
            id="reg-password"
            label="Password"
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

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChange={set('confirmPassword')}
          error={errors.confirmPassword}
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

        {/* Optional row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Age */}
          <div className="space-y-1.5">
            <label htmlFor="age" className="block text-sm font-semibold text-charcoal">
              Age <span className="text-warm-gray font-normal">(optional)</span>
            </label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              placeholder="e.g. 35"
              value={form.age}
              onChange={set('age')}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-charcoal placeholder:text-warm-gray/50 transition-all duration-200 outline-none bg-white
                ${errors.age ? 'border-coral' : 'border-beige focus:border-coral focus:shadow-[0_0_0_3px_rgba(217,83,79,0.10)]'}`}
            />
            {errors.age && <p className="text-xs text-coral font-medium">{errors.age}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label htmlFor="gender" className="block text-sm font-semibold text-charcoal">
              Gender <span className="text-warm-gray font-normal">(optional)</span>
            </label>
            <select
              id="gender"
              value={form.gender}
              onChange={set('gender')}
              className="w-full px-4 py-3 rounded-xl border border-beige text-sm text-charcoal bg-white transition-all duration-200 outline-none focus:border-coral focus:shadow-[0_0_0_3px_rgba(217,83,79,0.10)] appearance-none"
            >
              <option value="">Select</option>
              {GENDERS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* Terms */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={set('agreed')}
              className="mt-0.5 w-4 h-4 rounded border-beige accent-coral cursor-pointer flex-shrink-0"
            />
            <span className="text-xs text-warm-gray leading-relaxed">
              I agree to the{' '}
              <Link to="/terms" className="font-semibold text-coral hover:underline">Terms &amp; Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy" className="font-semibold text-coral hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.agreed && (
            <p className="flex items-center gap-1.5 text-xs text-coral font-medium mt-1.5 ml-7">
              <AlertCircle size={11} /> {errors.agreed}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 bg-coral text-white font-bold rounded-xl hover:bg-coral-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {loading
          ? <><Loader2 size={16} className="animate-spin" /> Creating account…</>
          : <>Create Account <ArrowRight size={16} /></>}
      </button>

      {/* Social */}
      <SocialLogin onGoogle={handleGoogle} loading={loading} />

      {/* Switch */}
      <p className="text-center text-sm text-warm-gray mt-5">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-coral hover:text-coral-dark transition-colors">
          Sign In
        </Link>
      </p>
    </form>
  )
}
