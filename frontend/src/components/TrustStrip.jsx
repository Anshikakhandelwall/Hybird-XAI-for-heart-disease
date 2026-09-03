import { Stethoscope, BrainCircuit, Lightbulb, ShieldCheck } from 'lucide-react'

const items = [
  {
    icon: <Stethoscope size={22} className="text-coral" />,
    title: 'Clinical + Lifestyle',
    desc: 'Integrated health information',
    bg: 'bg-coral/8',
  },
  {
    icon: <BrainCircuit size={22} className="text-sage" />,
    title: 'Hybrid AI',
    desc: 'Multiple models working together',
    bg: 'bg-sage/8',
  },
  {
    icon: <Lightbulb size={22} className="text-peach" />,
    title: 'Explainable AI',
    desc: 'Understand why the prediction was made',
    bg: 'bg-peach/20',
  },
  {
    icon: <ShieldCheck size={22} className="text-sage" />,
    title: 'Privacy First',
    desc: 'Your health information is handled securely',
    bg: 'bg-sage/8',
  },
]

export default function TrustStrip() {
  return (
    <section className="bg-white border-y border-beige py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-beige rounded-2xl overflow-hidden">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 bg-white px-5 py-5 hover:bg-ivory transition-colors"
            >
              <div className={`flex-shrink-0 w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-charcoal leading-tight">{item.title}</div>
                <div className="text-xs text-warm-gray mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
