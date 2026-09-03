import { Heart, Activity } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'How It Works', 'Research'],
  Resources: ['FAQ', 'Methodology', 'Disclaimer'],
  Account: ['Login', 'Register'],
  Contact: ['Contact Us'],
}

const scrollTo = (id) => {
  const sectionMap = {
    Features: '#features',
    'How It Works': '#how-it-works',
    Research: '#research',
    FAQ: '#faq',
  }
  const target = sectionMap[id]
  if (target) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-coral/20 rounded-xl flex items-center justify-center">
                <Heart size={17} className="text-coral fill-coral/40" />
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                Cardio<span className="text-coral">XAI</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              AI for a more understandable heart-risk assessment.
            </p>
            {/* ECG decoration */}
            <svg viewBox="0 0 160 30" className="w-36 mt-5 opacity-20" fill="none">
              <polyline
                points="0,15 20,15 28,5 35,25 42,2 52,27 60,15 100,15 108,9 114,20 120,15 160,15"
                stroke="#D9534F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">
                {section}
              </div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link)}
                      className="text-sm text-white/60 hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/35">
          <span>© 2026 CardioXAI. B.Tech AI/ML Minor Project.</span>
          <div className="flex gap-5">
            <button className="hover:text-white/60 transition-colors">Privacy Policy</button>
            <button className="hover:text-white/60 transition-colors">Terms &amp; Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
