import { ShieldAlert } from 'lucide-react'

export default function Disclaimer() {
  return (
    <section className="py-14 md:py-20 bg-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FDF6EF] border border-peach/40 rounded-4xl p-8 md:p-10 text-center shadow-warm-sm">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-peach/20 border border-peach/30 rounded-2xl flex items-center justify-center">
              <ShieldAlert size={26} className="text-peach" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-charcoal mb-3">
            An AI-Assisted Risk Assessment — Not a Diagnosis.
          </h3>
          <p className="text-warm-gray leading-relaxed mb-4 text-sm max-w-xl mx-auto">
            CardioXAI is designed as an educational and research-oriented risk assessment system.
            Its predictions should not be considered a medical diagnosis or a substitute for
            professional medical advice.
          </p>
          <p className="text-sm font-semibold text-charcoal">
            Always consult a qualified healthcare professional for medical decisions.
          </p>
        </div>
      </div>
    </section>
  )
}
