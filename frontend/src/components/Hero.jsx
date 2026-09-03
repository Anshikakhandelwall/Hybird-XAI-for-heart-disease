import { Heart, ArrowRight, Activity } from 'lucide-react'

const floatingCards = [
  {
    label: 'Risk Score',
    value: '72%',
    sub: 'High Risk',
    color: 'border-coral/30 bg-white',
    dot: 'bg-coral',
    pos: 'top-8 right-0 md:top-12 md:-right-4',
    delay: '0s',
  },
  {
    label: 'Top Factor',
    value: 'Blood Pressure',
    sub: 'Clinical',
    color: 'border-sage/30 bg-white',
    dot: 'bg-sage',
    pos: 'bottom-24 -left-2 md:bottom-28 md:-left-6',
    delay: '1.5s',
  },
  {
    label: 'AI Explanation',
    value: 'SHAP',
    sub: 'Explainability',
    color: 'border-peach/50 bg-white',
    dot: 'bg-peach',
    pos: 'bottom-4 right-4 md:bottom-8 md:right-2',
    delay: '3s',
  },
]

function HeartIllustration() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-peach/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-sage/10 rounded-full blur-2xl" />
      </div>

      {/* Main card */}
      <div className="relative z-10 bg-white/70 backdrop-blur rounded-4xl border border-beige shadow-warm-lg p-6 md:p-8 animate-float">
        {/* Heart SVG */}
        <svg viewBox="0 0 200 180" className="w-full max-w-[260px] mx-auto" fill="none">
          {/* Heart shape */}
          <path
            d="M100 155 C100 155 20 105 20 60 C20 35 40 20 60 20 C75 20 88 30 100 45 C112 30 125 20 140 20 C160 20 180 35 180 60 C180 105 100 155 100 155Z"
            fill="url(#heartGrad)"
            stroke="#D9534F"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9534F" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#E9A17C" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Inner highlight */}
          <path
            d="M100 138 C100 138 35 95 35 62 C35 45 47 35 60 35 C72 35 83 43 100 60"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* ECG waveform */}
          <polyline
            points="10,90 35,90 45,70 52,105 60,60 70,115 80,90 120,90 130,75 138,100 148,90 190,90"
            stroke="#D9534F"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-path"
          />
        </svg>

        {/* Data points row */}
        <div className="flex justify-center gap-4 mt-4">
          {[
            { label: 'BP', val: '128/82', color: 'text-coral' },
            { label: 'Chol', val: '210', color: 'text-peach' },
            { label: 'BMI', val: '26.4', color: 'text-sage' },
          ].map((d) => (
            <div key={d.label} className="text-center">
              <div className={`text-sm font-bold ${d.color}`}>{d.val}</div>
              <div className="text-[10px] text-warm-gray font-medium">{d.label}</div>
            </div>
          ))}
        </div>

        {/* AI bar */}
        <div className="mt-4 bg-cream rounded-2xl px-4 py-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-warm-gray">AI Confidence</span>
            <span className="text-xs font-bold text-coral">72%</span>
          </div>
          <div className="h-1.5 bg-beige rounded-full overflow-hidden">
            <div className="h-full w-[72%] bg-gradient-to-r from-coral to-peach rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating cards */}
      {floatingCards.map((card) => (
        <div
          key={card.label}
          className={`absolute z-20 ${card.pos} bg-white/90 backdrop-blur-sm rounded-2xl border ${card.color} shadow-warm px-3 py-2.5 min-w-[120px]`}
          style={{ animation: `float 6s ease-in-out ${card.delay} infinite` }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <div className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
            <span className="text-[10px] font-semibold text-warm-gray uppercase tracking-wide">{card.label}</span>
          </div>
          <div className="text-sm font-bold text-charcoal leading-tight">{card.value}</div>
          <div className="text-[10px] text-warm-gray">{card.sub}</div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-20 md:pt-24 pb-16 md:pb-24 bg-gradient-warm overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-coral/8 border border-coral/20 rounded-full px-4 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-slow" />
              <span className="text-xs font-bold text-coral tracking-widest uppercase">
                AI-Powered • Explainable • Preventive
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal leading-[1.08] tracking-tight mb-6">
              Understand Your{' '}
              <span className="text-coral">Heart Risk.</span>
              <br />
              Not Just Your
              <br />
              Prediction.
            </h1>

            {/* Supporting text */}
            <p className="section-subtext mb-8 max-w-xl">
              CardioXAI combines clinical and lifestyle information with hybrid
              machine learning to estimate heart disease risk and explain the
              factors behind every prediction.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button className="btn-primary text-base py-3.5 px-7">
                Check Your Heart Risk
                <ArrowRight size={17} />
              </button>
              <button className="btn-secondary text-base py-3.5">
                Explore How It Works
              </button>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {['Clinical + Lifestyle Data', 'Hybrid AI', 'Explainable Results'].map((item, i) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-warm-gray font-medium">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-beige-dark" />}
                  <Activity size={12} className="text-coral" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right – illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end pr-0 lg:pr-6">
            <HeartIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}
