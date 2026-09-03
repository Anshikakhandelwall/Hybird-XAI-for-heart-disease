import { useEffect, useRef } from 'react'
import { ArrowRight, Database, FlaskConical, Cpu, Lightbulb, BarChart3 } from 'lucide-react'

const datasets = [
  {
    name: 'UCI Heart Disease',
    desc: 'Clinical cardiovascular information — the benchmark dataset for heart disease research.',
    tag: 'Clinical',
    color: 'border-coral/25 bg-coral/5',
    tagColor: 'bg-coral/10 text-coral',
  },
  {
    name: 'Framingham',
    desc: 'Longitudinal cardiovascular risk study tracking participants over decades.',
    tag: 'Longitudinal',
    color: 'border-sage/25 bg-sage/5',
    tagColor: 'bg-sage/10 text-sage',
  },
  {
    name: 'BRFSS',
    desc: 'Population-level lifestyle and health behavioral information across the United States.',
    tag: 'Lifestyle',
    color: 'border-peach/40 bg-peach/8',
    tagColor: 'bg-peach/20 text-peach',
  },
]

const pipeline = [
  { label: 'Data', icon: <Database size={14} />, color: 'bg-coral/10 text-coral' },
  { label: 'Preprocessing', icon: <FlaskConical size={14} />, color: 'bg-peach/20 text-peach' },
  { label: 'Feature Engineering', icon: <Cpu size={14} />, color: 'bg-sage/10 text-sage' },
  { label: 'Hybrid ML', icon: <Cpu size={14} />, color: 'bg-coral/10 text-coral' },
  { label: 'XAI', icon: <Lightbulb size={14} />, color: 'bg-peach/20 text-peach' },
  { label: 'Risk Insights', icon: <BarChart3 size={14} />, color: 'bg-sage/10 text-sage' },
]

export default function Research() {
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
    <section id="research" className="py-20 md:py-28 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">The Research Behind CardioXAI</span>
          <h2 className="section-heading mb-4">
            Built on Data.{' '}
            <span className="text-coral">Designed for Transparency.</span>
          </h2>
          <p className="section-subtext max-w-2xl mx-auto">
            CardioXAI is trained on three well-established cardiovascular datasets, combined
            and harmonized to create a robust, multi-perspective model.
          </p>
        </div>

        {/* Dataset cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 reveal">
          {datasets.map((ds, i) => (
            <div
              key={ds.name}
              className={`rounded-3xl border ${ds.color} p-6 shadow-warm-sm`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <Database size={20} className="text-warm-gray/60" />
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${ds.tagColor}`}>
                  {ds.tag}
                </span>
              </div>
              <h3 className="font-extrabold text-charcoal text-base mb-2">{ds.name}</h3>
              <p className="text-warm-gray text-sm leading-relaxed">{ds.desc}</p>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="reveal">
          <div className="text-center text-xs font-bold text-warm-gray uppercase tracking-widest mb-5">
            Research Pipeline
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2">
            {pipeline.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 ${step.color} px-3 py-2 rounded-xl text-xs font-semibold`}
                >
                  {step.icon}
                  {step.label}
                </div>
                {i < pipeline.length - 1 && (
                  <ArrowRight size={12} className="text-beige-dark flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 reveal">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-coral hover:text-coral-dark transition-colors group">
            Explore Our Methodology
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
