/**
 * SocialLogin — Google OAuth button (UI-only, ready for backend hook).
 * Props:
 *   onGoogle: () => void
 *   loading?: boolean
 */

export default function SocialLogin({ onGoogle, loading = false }) {
  return (
    <div>
      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-beige" />
        <span className="text-xs font-semibold text-warm-gray/70 uppercase tracking-widest px-1">or</span>
        <div className="flex-1 h-px bg-beige" />
      </div>

      {/* Google button */}
      <button
        type="button"
        onClick={onGoogle}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-beige rounded-xl text-sm font-semibold text-charcoal hover:bg-ivory hover:border-beige-dark transition-all duration-200 shadow-warm-sm hover:shadow-warm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {/* Google SVG icon */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
          <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  )
}
