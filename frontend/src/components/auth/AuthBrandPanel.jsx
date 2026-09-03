import { Heart, Activity, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const trustItems = [
  'Clinical + Lifestyle Analysis',
  'Explainable AI',
  'Secure Health Data',
]

function HeartIllustration() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto my-6 select-none">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-peach/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-sage/10 rounded-full blur-2xl" />
      </div>

      {/* Card */}
      <div className="relative bg-white/60 backdrop-blur-sm rounded-4xl border border-beige shadow-warm-lg p-6 animate-float">
        {/* Heart SVG */}
        <svg viewBox="0 0 200 170" className="w-full max-w-[200px] mx-auto" fill="none">
          <path
            d="M100 148 C100 148 22 100 22 58 C22 34 42 20 62 20 C77 20 90 29 100 44 C110 29 123 20 138 20 C158 20 178 34 178 58 C178 100 100 148 100 148Z"
            fill="url(#hg)"
            stroke="#D9534F"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9534F" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E9A17C" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Highlight */}
          <path
            d="M100 132 C100 132 36 92 36 60 C36 44 48 34 62 34"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeLinecap="round"
            fill="none"
          />
          {/* ECG */}
          <polyline
            points="8,88 32,88 42,68 50,104 58,54 68,112 78,88 122,88 132,74 140,100 150,88 192,88"
            stroke="#D9534F"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-path"
          />
        </svg>

        {/* Data points */}
        <div className="flex justify-center gap-5 mt-3">
          {[
            { label: 'BP', val: '128/82', c: 'text-coral' },
            { label: 'BMI', val: '26.4', c: 'text-peach' },
            { label: 'Risk', val: '72%', c: 'text-sage' },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <div className={`text-sm font-extrabold ${d.c}`}>{d.val}</div>
              <div className="text-[10px] text-warm-gray font-medium">{d.label}</div>
            </div>
          ))}
        </div>

        {/* AI bar */}
        <div className="mt-3 bg-cream rounded-xl px-3 py-2.5">
          <div className="flex justify-between mb-1">
            <span className="text-[10px] font-semibold text-warm-gray">SHAP Explanation</span>
            <span className="text-[10px] font-bold text-coral">Active</span>
          </div>
          <div className="h-1.5 bg-beige rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-coral to-peach rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating mini-card */}
      <div className="absolute -bottom-3 -right-2 bg-white rounded-2xl border border-beige shadow-warm px-3 py-2 min-w-[108px]"
        style={{ animation: 'float 8s ease-in-out 1s infinite' }}>
        <div className="text-[9px] font-bold text-warm-gray uppercase tracking-wide mb-0.5">Top Factor</div>
        <div className="text-xs font-extrabold text-charcoal">Blood Pressure</div>
      </div>
    </div>
  )
}

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full px-10 xl:px-14 py-10 bg-gradient-to-br from-[#FAF8F3] to-[#F0EAE0] relative overflow-hidden">
      {/* Background organic shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-coral/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-peach/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top — Logo */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-coral/12 rounded-xl flex items-center justify-center group-hover:bg-coral/18 transition-colors">
            <Heart size={17} className="text-coral fill-coral/30" />
          </div>
          <span className="text-xl font-extrabold text-charcoal tracking-tight">
            Cardio<span className="text-coral">XAI</span>
          </span>
        </Link>
        <p className="text-xs font-semibold text-warm-gray mt-1 ml-11.5 tracking-wide">
          AI for a Healthier Heart
        </p>
      </div>

      {/* Middle — Heading + illustration */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl xl:text-4xl font-extrabold text-charcoal leading-tight mb-3">
          Understand Your Heart.
          <br />
          <span className="text-coral">Not Just Your Prediction.</span>
        </h2>
        <p className="text-warm-gray text-sm leading-relaxed mb-2 max-w-sm">
          CardioXAI combines clinical and lifestyle information with hybrid machine
          learning to provide explainable heart disease risk insights.
        </p>

        <HeartIllustration />

        {/* Trust indicators */}
        <div className="space-y-2 mt-2">
          {trustItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle2 size={15} className="text-sage flex-shrink-0" />
              <span className="text-sm font-medium text-charcoal">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <p className="text-xs text-warm-gray/60 font-medium">
        Designed for research and educational risk assessment.
      </p>
    </div>
  )
}
