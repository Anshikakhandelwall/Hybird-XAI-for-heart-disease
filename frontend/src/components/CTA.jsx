import { ArrowRight, Heart, Activity } from 'lucide-react'

export default function CTA() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="cta"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #D9534F 0%, #E9A17C 100%)' }}
    >
      {/* ECG decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg
          viewBox="0 0 1200 200"
          className="absolute bottom-0 left-0 w-full"
          fill="none"
          preserveAspectRatio="none"
        >
          <polyline
            points="0,100 120,100 160,40 200,155 240,20 290,165 340,100 500,100 560,60 610,130 660,100 820,100 880,45 930,135 980,100 1200,100"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ecg-path"
          />
        </svg>
      </div>

      {/* Blob decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center border border-white/25">
            <Heart size={28} className="text-white fill-white/30" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight">
          Understand Your Heart.
          <br />
          Make More Informed Choices.
        </h2>

        {/* Supporting text */}
        <p className="text-white/80 text-lg mb-9 max-w-xl mx-auto leading-relaxed">
          Explore how clinical and lifestyle factors can influence your predicted
          heart disease risk.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-coral font-extrabold rounded-xl hover:bg-ivory transition-all duration-200 shadow-warm text-base hover:-translate-y-0.5">
            Check Your Risk
            <ArrowRight size={17} />
          </button>
          <button
            onClick={() => scrollTo('#how-it-works')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-200 text-base"
          >
            <Activity size={16} />
            Learn How CardioXAI Works
          </button>
        </div>
      </div>
    </section>
  )
}
