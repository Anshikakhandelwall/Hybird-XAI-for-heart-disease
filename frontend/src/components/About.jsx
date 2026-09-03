import { useEffect, useRef } from 'react'
import { Activity, Heart, Cpu } from 'lucide-react'

const miniCards = [
  {
    num: '01',
    title: 'Clinical Insight',
    desc: 'Blood pressure, cholesterol, glucose, BMI and other clinical indicators.',
    color: 'border-coral/25',
    numColor: 'text-coral',
  },
  {
    num: '02',
    title: 'Lifestyle Insight',
    desc: 'Physical activity, smoking, alcohol, sleep, stress and other lifestyle factors.',
    color: 'border-sage/25',
    numColor: 'text-sage',
  },
  {
    num: '03',
    title: 'Transparent Prediction',
    desc: 'Understand the key factors contributing to your result.',
    color: 'border-peach/40',
    numColor: 'text-peach',
  },
]

function MedicalCard() {
  return (
    <div className="relative">
      {/* Background blobs */}
      <div className="absolute -top-8 -left-8 w-48 h-48 bg-coral/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-sage/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative bg-white rounded-4xl border border-beige shadow-warm-lg p-7 md:p-9">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center">
            <Heart size={22} className="text-coral fill-coral/25" />
          </div>
          <div>
            <div className="text-sm font-bold text-charcoal">CardioXAI</div>
            <div className="text-xs text-warm-gray">Risk Assessment</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 bg-sage/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-sage">Active</span>
          </div>
        </div>

        {/* ECG waveform */}
        <div className="bg-cream rounded-2xl p-4 mb-5 overflow-hidden">
          <div className="text-xs font-semibold text-warm-gray mb-2">ECG Signal</div>
          <svg viewBox="0 0 300 50" className="w-full" fill="none">
            <polyline
              points="0,25 30,25 40,10 50,40 60,5 75,45 90,25 130,25 145,15 155,32 165,25 300,25"
              stroke="#D9534F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ecg-path"
            />
          </svg>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Age', val: '52', color: 'text-coral' },
            { label: 'BMI', val: '26.4', color: 'text-peach' },
            { label: 'BP', val: '128/82', color: 'text-sage' },
          ].map((s) => (
            <div key={s.label} className="bg-cream rounded-xl p-3 text-center">
              <div className={`text-base font-extrabold ${s.color}`}>{s.val}</div>
              <div className="text-[10px] text-warm-gray font-medium mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* AI bar */}
        <div className="bg-cream rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={14} className="text-coral" />
            <span className="text-xs font-semibold text-charcoal">Hybrid AI Processing</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Clinical Model', pct: 65, color: 'bg-coral' },
              { label: 'Lifestyle Model', pct: 35, color: 'bg-sage' },
              { label: 'Ensemble', pct: 82, color: 'bg-peach' },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-2">
                <span className="text-[10px] text-warm-gray w-24 flex-shrink-0">{m.label}</span>
                <div className="flex-1 h-1.5 bg-beige rounded-full overflow-hidden">
                  <div
                    className={`h-full ${m.color} rounded-full`}
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold text-charcoal w-7 text-right">{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk badge */}
        <div className="mt-5 flex items-center justify-between bg-coral/8 rounded-2xl px-4 py-3">
          <span className="text-sm font-semibold text-charcoal">Predicted Risk</span>
          <span className="text-xl font-extrabold text-coral">72% <span className="text-sm font-semibold">High</span></span>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 md:py-28 bg-ivory" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left – medical card */}
          <div className="reveal">
            <MedicalCard />
          </div>

          {/* Right – text */}
          <div>
            <div className="reveal">
              <span className="section-label">Why CardioXAI?</span>
              <h2 className="section-heading mb-5">
                Heart disease risk is more than a{' '}
                <span className="text-coral">single number.</span>
              </h2>
              <p className="section-subtext mb-8">
                Traditional prediction systems can provide a result without clearly
                explaining the reasoning behind it. CardioXAI combines clinical
                measurements with lifestyle factors and uses Explainable AI to make
                the prediction easier to understand.
              </p>
            </div>

            {/* Mini cards */}
            <div className="space-y-4">
              {miniCards.map((card, i) => (
                <div
                  key={card.num}
                  className={`reveal card-warm p-5 flex gap-4 items-start`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className={`flex-shrink-0 text-2xl font-extrabold ${card.numColor} opacity-60`}>
                    {card.num}
                  </div>
                  <div>
                    <div className="font-bold text-charcoal text-sm mb-1">{card.title}</div>
                    <div className="text-warm-gray text-sm">{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
