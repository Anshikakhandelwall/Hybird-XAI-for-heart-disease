import { useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const shapFeatures = [
  { label: 'Blood Pressure', pct: 88, dir: 'up' },
  { label: 'Cholesterol', pct: 72, dir: 'up' },
  { label: 'Smoking', pct: 55, dir: 'up' },
  { label: 'Physical Activity', pct: 40, dir: 'down' },
  { label: 'BMI', pct: 30, dir: 'up' },
]

const limeItems = [
  { label: 'Blood Pressure > 130', impact: '+HIGH', color: 'text-coral', bg: 'bg-coral/8' },
  { label: 'Smoker: Yes', impact: '+MODERATE', color: 'text-peach', bg: 'bg-peach/15' },
  { label: 'Exercise: Low', impact: '+MODERATE', color: 'text-peach', bg: 'bg-peach/15' },
  { label: 'Age: 52', impact: '+MILD', color: 'text-warm-gray', bg: 'bg-cream' },
  { label: 'Sleep > 7h', impact: '−MILD', color: 'text-sage', bg: 'bg-sage/8' },
]

export default function ExplainableAI() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="xai" className="py-20 md:py-28 bg-[#F5F2EB]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">Explainable AI</span>
          <h2 className="section-heading mb-3">
            AI That <span className="text-coral">Explains Itself.</span>
          </h2>
          <p className="text-warm-gray text-lg mb-2 font-medium italic">
            "Because knowing the result is only half the story."
          </p>
          <p className="section-subtext max-w-2xl mx-auto">
            CardioXAI uses Explainable AI techniques to identify the factors that
            most influence an individual prediction.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* SHAP card */}
          <div className="reveal card-warm p-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center">
                <TrendingUp size={18} className="text-coral" />
              </div>
              <div>
                <div className="font-extrabold text-charcoal text-lg">SHAP</div>
                <div className="text-xs text-warm-gray">Global + Local Explanations</div>
              </div>
              <div className="ml-auto text-xs bg-coral/8 text-coral font-bold px-3 py-1.5 rounded-full border border-coral/20">
                Feature Impact
              </div>
            </div>

            {/* Feature bars */}
            <div className="space-y-3">
              {shapFeatures.map((feat) => (
                <div key={feat.label} className="flex items-center gap-3">
                  <div className="w-32 text-xs text-warm-gray flex-shrink-0 text-right">{feat.label}</div>
                  <div className="flex-1 bg-cream rounded-full h-3 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        feat.dir === 'up' ? 'bg-coral' : 'bg-sage'
                      }`}
                      style={{ width: `${feat.pct}%` }}
                    />
                  </div>
                  <div className={`text-xs font-bold w-6 ${feat.dir === 'up' ? 'text-coral' : 'text-sage'}`}>
                    {feat.dir === 'up' ? '▲' : '▼'}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-warm-gray mt-5 italic">
              Bars show relative contribution to this prediction. ▲ increases risk, ▼ decreases risk.
            </p>
          </div>

          {/* LIME card */}
          <div className="reveal card-warm p-7" style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                <TrendingDown size={18} className="text-sage" />
              </div>
              <div>
                <div className="font-extrabold text-charcoal text-lg">LIME</div>
                <div className="text-xs text-warm-gray">Individual Prediction Explanation</div>
              </div>
              <div className="ml-auto text-xs bg-sage/8 text-sage font-bold px-3 py-1.5 rounded-full border border-sage/20">
                This Prediction
              </div>
            </div>

            {/* Mock explanation items */}
            <div className="space-y-2.5">
              {limeItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between ${item.bg} rounded-xl px-4 py-3`}
                >
                  <span className="text-xs font-medium text-charcoal">{item.label}</span>
                  <span className={`text-[10px] font-extrabold ${item.color} tracking-wide`}>
                    {item.impact}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-warm-gray mt-5 italic">
              See which factors pushed your prediction higher or lower.
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center reveal">
          <p className="text-sm text-warm-gray font-medium">
            Visual previews only — actual explanations are generated per individual prediction.
          </p>
        </div>
      </div>
    </section>
  )
}
