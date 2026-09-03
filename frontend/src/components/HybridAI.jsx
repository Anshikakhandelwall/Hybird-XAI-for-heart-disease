import { useEffect, useRef } from 'react'
import { ArrowRight, Cpu, Layers } from 'lucide-react'

const clinicalFeatures = ['Age', 'Blood Pressure', 'Cholesterol', 'Glucose', 'BMI', 'Heart Rate']
const lifestyleFeatures = ['Physical Activity', 'Smoking', 'Alcohol', 'Sleep', 'Stress', 'Diet']
const models = ['Logistic Regression', 'Random Forest', 'XGBoost', 'SVM', 'Ensemble / Stacking']

export default function HybridAI() {
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
    <section className="py-20 md:py-28 bg-ivory" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">Architecture</span>
          <h2 className="section-heading mb-4">
            Two Perspectives.{' '}
            <span className="text-coral">One Smarter Prediction.</span>
          </h2>
        </div>

        {/* Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 reveal">
          {/* Clinical input */}
          <div className="w-full md:w-56 bg-white rounded-3xl border border-beige shadow-warm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-coral/10 rounded-lg flex items-center justify-center">
                <Layers size={15} className="text-coral" />
              </div>
              <span className="text-xs font-bold text-charcoal tracking-wide uppercase">Clinical Data</span>
            </div>
            <div className="space-y-1.5">
              {clinicalFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral/50 flex-shrink-0" />
                  <span className="text-xs text-warm-gray">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight size={20} className="text-beige-dark rotate-90 md:rotate-0 flex-shrink-0" />

          {/* Engine */}
          <div className="w-full md:w-72 bg-white rounded-3xl border-2 border-coral/25 shadow-warm-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-coral text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
              Hybrid AI Engine
            </div>
            <div className="flex items-center justify-center gap-2 mb-5 mt-2">
              <Cpu size={20} className="text-coral" />
              <span className="text-sm font-bold text-charcoal">Machine Learning Models</span>
            </div>
            <div className="space-y-2">
              {models.map((m, i) => (
                <div
                  key={m}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl text-center ${
                    i === 4
                      ? 'bg-coral/10 text-coral border border-coral/25'
                      : 'bg-cream text-warm-gray'
                  }`}
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Output */}
            <div className="mt-5 pt-4 border-t border-beige text-center">
              <div className="text-[10px] font-bold text-warm-gray uppercase tracking-widest mb-2">Output</div>
              <div className="text-base font-extrabold text-charcoal mb-2">Heart Disease Risk</div>
              <div className="flex justify-center gap-2">
                {[
                  { label: 'Low', color: 'bg-sage/15 text-sage border-sage/25' },
                  { label: 'Moderate', color: 'bg-peach/25 text-peach border-peach/40' },
                  { label: 'High', color: 'bg-coral/10 text-coral border-coral/25' },
                ].map((r) => (
                  <span
                    key={r.label}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${r.color}`}
                  >
                    {r.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight size={20} className="text-beige-dark rotate-90 md:rotate-0 flex-shrink-0" />

          {/* Lifestyle input */}
          <div className="w-full md:w-56 bg-white rounded-3xl border border-beige shadow-warm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-sage/10 rounded-lg flex items-center justify-center">
                <Layers size={15} className="text-sage" />
              </div>
              <span className="text-xs font-bold text-charcoal tracking-wide uppercase">Lifestyle Data</span>
            </div>
            <div className="space-y-1.5">
              {lifestyleFeatures.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage/50 flex-shrink-0" />
                  <span className="text-xs text-warm-gray">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
