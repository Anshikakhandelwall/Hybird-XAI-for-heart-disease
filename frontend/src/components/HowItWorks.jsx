import { useEffect, useRef } from 'react'
import {
  ClipboardList,
  Sliders,
  BrainCircuit,
  Lightbulb,
  BarChart3,
} from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: <ClipboardList size={22} />,
    title: 'Enter Your Information',
    desc: 'Clinical + lifestyle data',
    color: 'bg-coral/10 text-coral border-coral/20',
    line: 'bg-coral',
  },
  {
    num: '02',
    icon: <Sliders size={22} />,
    title: 'Prepare the Data',
    desc: 'Validation, encoding, scaling and feature processing',
    color: 'bg-peach/20 text-peach border-peach/30',
    line: 'bg-peach',
  },
  {
    num: '03',
    icon: <BrainCircuit size={22} />,
    title: 'Hybrid AI Prediction',
    desc: 'Multiple machine learning models combine their insights',
    color: 'bg-sage/10 text-sage border-sage/20',
    line: 'bg-sage',
  },
  {
    num: '04',
    icon: <Lightbulb size={22} />,
    title: 'Explain the Prediction',
    desc: 'SHAP / LIME identify the factors influencing the result',
    color: 'bg-peach/20 text-peach border-peach/30',
    line: 'bg-peach',
  },
  {
    num: '05',
    icon: <BarChart3 size={22} />,
    title: 'Understand Your Risk',
    desc: 'Risk level, contributing factors and general recommendations',
    color: 'bg-coral/10 text-coral border-coral/20',
    line: null,
  },
]

export default function HowItWorks() {
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
    <section id="how-it-works" className="py-20 md:py-28 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">Process</span>
          <h2 className="section-heading mb-4">How CardioXAI Works</h2>
          <p className="section-subtext max-w-xl mx-auto">
            From health information to an understandable risk assessment.
          </p>
        </div>

        {/* Steps – Desktop horizontal */}
        <div className="hidden md:flex items-start gap-0 relative">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex-1 reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="flex items-center">
                {/* Step node */}
                <div className="flex flex-col items-center relative z-10 flex-1">
                  {/* Icon circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl border-2 ${step.color} flex items-center justify-center shadow-warm-sm bg-white mb-4`}
                  >
                    {step.icon}
                  </div>
                  {/* Number */}
                  <div className="text-xs font-extrabold text-warm-gray/50 mb-1.5 tracking-widest">{step.num}</div>
                  {/* Title */}
                  <div className="font-bold text-charcoal text-sm text-center px-2 mb-1">{step.title}</div>
                  {/* Desc */}
                  <div className="text-xs text-warm-gray text-center px-3 leading-relaxed">{step.desc}</div>
                </div>

                {/* Connector */}
                {step.line && (
                  <div className="h-0.5 w-8 bg-gradient-to-r from-beige-dark to-beige flex-shrink-0 -mt-20 mx-0.5" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Steps – Mobile vertical */}
        <div className="md:hidden space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex gap-4 reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Left connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl border-2 ${step.color} flex items-center justify-center bg-white shadow-warm-sm flex-shrink-0`}
                >
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 bg-beige mt-2 mb-0 min-h-[32px]" />
                )}
              </div>

              {/* Content */}
              <div className="pb-8">
                <div className="text-[10px] font-extrabold text-warm-gray/50 tracking-widest mb-0.5">{step.num}</div>
                <div className="font-bold text-charcoal text-sm mb-1">{step.title}</div>
                <div className="text-xs text-warm-gray leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
