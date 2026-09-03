import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is CardioXAI?',
    a: 'CardioXAI is an AI-powered heart disease risk assessment system that combines clinical and lifestyle data with explainable machine learning to provide a transparent, understandable risk score.',
  },
  {
    q: 'Is CardioXAI a medical diagnosis tool?',
    a: 'No. CardioXAI is an educational and research-oriented risk assessment tool. It should not replace professional medical advice or diagnosis. Always consult a qualified healthcare professional.',
  },
  {
    q: 'What data do I need to provide?',
    a: 'You will be asked to provide clinical information (such as age, blood pressure, cholesterol, glucose and BMI) and lifestyle information (such as physical activity, smoking habits, sleep and stress levels).',
  },
  {
    q: 'What does "Explainable AI" mean in this context?',
    a: 'Explainable AI means the system not only provides a risk score but also shows which factors contributed most to that score. CardioXAI uses SHAP and LIME techniques to produce per-prediction explanations.',
  },
  {
    q: 'What is a hybrid AI model?',
    a: 'A hybrid model combines predictions from multiple machine learning algorithms — including logistic regression, random forest, XGBoost and SVM — using ensemble techniques to produce a more reliable final result.',
  },
  {
    q: 'Is my health information stored or shared?',
    a: 'CardioXAI is designed with privacy in mind. For this research project, data handling follows best practices. Please review the Privacy Policy for full details.',
  },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border border-beige rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-ivory transition-colors"
      >
        <span className="font-semibold text-charcoal text-sm pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-warm-gray flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48' : 'max-h-0'}`}
      >
        <div className="px-6 pb-5 pt-1 text-warm-gray text-sm leading-relaxed bg-white">
          {a}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
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
    <section id="faq" className="py-20 md:py-28 bg-ivory" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <span className="section-label">FAQ</span>
          <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
          <p className="section-subtext">
            Everything you need to know about CardioXAI.
          </p>
        </div>
        <div className="space-y-3 reveal">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
