import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const topFactors = [
  { rank: 1, label: 'Blood Pressure', pct: 88, color: 'bg-coral' },
  { rank: 2, label: 'Cholesterol', pct: 72, color: 'bg-peach' },
  { rank: 3, label: 'Smoking', pct: 55, color: 'bg-coral/70' },
  { rank: 4, label: 'Physical Activity', pct: 40, color: 'bg-sage' },
  { rank: 5, label: 'Age', pct: 30, color: 'bg-warm-gray/40' },
]

const gaugeData = [{ value: 72, fill: '#D9534F' }]

function RiskGauge() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="90%"
          startAngle={180}
          endAngle={0}
          data={gaugeData}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: '#F3EEE5' }}
            dataKey="value"
            angleAxisId={0}
            cornerRadius={8}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
        <span className="text-4xl font-extrabold text-coral leading-none">72%</span>
        <span className="text-xs font-bold text-warm-gray mt-1 uppercase tracking-widest">Risk Score</span>
      </div>
    </div>
  )
}

export default function ResultsPreview() {
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
    <section className="py-20 md:py-28 bg-cream" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="section-label">Results Preview</span>
          <h2 className="section-heading mb-4">
            From Prediction to{' '}
            <span className="text-coral">Understanding.</span>
          </h2>
          <p className="section-subtext max-w-xl mx-auto">
            A clear, human-readable breakdown of your risk score and the factors that matter most.
          </p>
        </div>

        {/* Result card mockup */}
        <div className="max-w-4xl mx-auto reveal">
          <div className="bg-white rounded-4xl border border-beige shadow-warm-lg overflow-hidden">
            {/* Top header bar */}
            <div className="bg-coral/8 border-b border-coral/15 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-bold text-coral tracking-widest uppercase">Heart Disease Risk Assessment</span>
              <span className="text-xs text-warm-gray">Sample — Illustrative Only</span>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Gauge */}
                <div className="md:col-span-1 flex flex-col items-center justify-center">
                  <RiskGauge />
                  <div className="mt-3 inline-flex items-center gap-2 bg-coral/10 border border-coral/25 px-4 py-2 rounded-full">
                    <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
                    <span className="text-sm font-extrabold text-coral uppercase tracking-wide">High Risk</span>
                  </div>
                  <button className="mt-5 text-xs font-semibold text-coral hover:text-coral-dark flex items-center gap-1 transition-colors group">
                    View Example Explanation
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Factors */}
                <div className="md:col-span-1">
                  <div className="text-sm font-bold text-charcoal mb-4">Top Contributing Factors</div>
                  <div className="space-y-3">
                    {topFactors.map((f) => (
                      <div key={f.rank}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-charcoal flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-cream text-[9px] font-extrabold text-warm-gray flex items-center justify-center flex-shrink-0">
                              {f.rank}
                            </span>
                            {f.label}
                          </span>
                          <span className="text-[10px] font-bold text-warm-gray">{f.pct}%</span>
                        </div>
                        <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                          <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contribution split */}
                <div className="md:col-span-1">
                  <div className="text-sm font-bold text-charcoal mb-4">Data Contribution</div>

                  <div className="space-y-4">
                    {/* Clinical */}
                    <div className="bg-coral/6 rounded-2xl p-4 border border-coral/15">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-charcoal">Clinical</span>
                        <span className="text-xl font-extrabold text-coral">65%</span>
                      </div>
                      <div className="h-2 bg-coral/15 rounded-full overflow-hidden">
                        <div className="h-full bg-coral rounded-full" style={{ width: '65%' }} />
                      </div>
                      <p className="text-[10px] text-warm-gray mt-1.5">BP, Cholesterol, Glucose, BMI</p>
                    </div>

                    {/* Lifestyle */}
                    <div className="bg-sage/6 rounded-2xl p-4 border border-sage/15">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-charcoal">Lifestyle</span>
                        <span className="text-xl font-extrabold text-sage">35%</span>
                      </div>
                      <div className="h-2 bg-sage/15 rounded-full overflow-hidden">
                        <div className="h-full bg-sage rounded-full" style={{ width: '35%' }} />
                      </div>
                      <p className="text-[10px] text-warm-gray mt-1.5">Smoking, Activity, Diet, Sleep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
