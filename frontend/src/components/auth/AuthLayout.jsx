import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import AuthBrandPanel from './AuthBrandPanel.jsx'

/**
 * AuthLayout — split-screen wrapper used by all auth pages.
 * Left  (45%): brand/trust panel (hidden on mobile)
 * Right (55%): auth card slot
 */
export default function AuthLayout({ children }) {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-ivory flex flex-col lg:flex-row">
      {/* ── LEFT: brand panel ── */}
      <div className="lg:w-[45%] xl:w-[42%] border-r border-beige">
        <AuthBrandPanel />

        {/* Mobile-only compact brand header */}
        <div className="lg:hidden flex items-center gap-2.5 px-6 py-5 border-b border-beige bg-cream">
          <div className="w-8 h-8 bg-coral/10 rounded-xl flex items-center justify-center">
            <Heart size={15} className="text-coral fill-coral/25" />
          </div>
          <span className="text-lg font-extrabold text-charcoal tracking-tight">
            Cardio<span className="text-coral">XAI</span>
          </span>
          <span className="ml-auto text-xs text-warm-gray font-medium">AI for a Healthier Heart</span>
        </div>
      </div>

      {/* ── RIGHT: auth form ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        {/* Card */}
        <div
          className="w-full max-w-[440px] bg-white rounded-3xl border border-beige shadow-warm-lg p-8 sm:p-10 animate-fade-up"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
