import { useEffect, useRef } from 'react'
import {
  BrainCircuit,
  Lightbulb,
  Stethoscope,
  BarChart3,
  History,
  Sparkles,
} from 'lucide-react'

const features = [
  {
    icon: <BrainCircuit size={22} />,
    title: 'Hybrid AI Prediction',
    desc: 'Combines multiple machine learning models — logistic regression, random forest, XGBoost and SVM — for a more robust assessment.',
    color: 'bg-coral/10 text-coral',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Explainable Predictions',
    desc: 'Understand why the model produced its result through SHAP and LIME explanations, not just a black-box score.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: <Stethoscope size={22} />,
    title: 'Clinical + Lifestyle Analysis',
    desc: 'Considers both clinical measurements and behavioral factors for a holistic view of your cardiovascular health.',
    color: 'bg-peach/20 text-peach',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Risk Visualization',
    desc: 'Clear visual representation of risk probability and the relative contribution of each factor.',
    color: 'bg-coral/10 text-coral',
  },
  {
    icon: <History size={22} />,
    title: 'Prediction History',
    desc: 'Track previous assessments over time to understand how lifestyle changes may affect your risk profile.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Personalized Insights',
    desc: 'Receive general preventive health suggestions based on the major factors contributing to your result.',
    color: 'bg-peach/20 text-peach',
  },
]

export default function Features() {
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
    <section id="features" className="py-20 md:py-28 bg-ivory" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">Features</span>
          <h2 className="section-heading mb-4">
            Everything You Need to{' '}
            <span className="text-coral">Understand Your Risk.</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto">
            CardioXAI is built around one principle: making AI-powered heart risk
            assessment transparent, accessible and actionable.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="reveal card-warm p-6 group hover:-translate-y-1"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div
                className={`w-11 h-11 ${feat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
              >
                {feat.icon}
              </div>
              <h3 className="font-bold text-charcoal text-base mb-2">{feat.title}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
