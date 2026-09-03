import { useState, useEffect } from 'react'
import { Heart, Menu, X, Activity } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Research', href: '#research' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-sm shadow-warm-sm border-b border-beige'
          : 'bg-ivory border-b border-beige/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 bg-coral/10 rounded-xl group-hover:bg-coral/15 transition-colors">
              <Heart size={18} className="text-coral fill-coral/30" />
              <Activity size={10} className="text-coral absolute bottom-1 right-0.5 opacity-70" />
            </div>
            <span className="text-xl font-extrabold text-charcoal tracking-tight">
              Cardio<span className="text-coral">XAI</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 text-sm font-medium text-warm-gray hover:text-charcoal hover:bg-cream rounded-lg transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm font-semibold text-warm-gray hover:text-charcoal transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn-primary text-sm py-2.5 px-5"
            >
              <Heart size={14} />
              Check Your Risk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-warm-gray hover:text-charcoal hover:bg-cream transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-ivory border-t border-beige`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-warm-gray hover:text-charcoal hover:bg-cream rounded-xl transition-all"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 pb-1 flex flex-col gap-2">
            <button
              onClick={() => { setMobileOpen(false); navigate('/login') }}
              className="w-full text-center py-3 text-sm font-semibold text-warm-gray border border-beige rounded-xl hover:bg-cream transition-all"
            >
              Login
            </button>
            <button
              onClick={() => { setMobileOpen(false); navigate('/register') }}
              className="w-full btn-primary justify-center"
            >
              <Heart size={14} />
              Check Your Risk
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
