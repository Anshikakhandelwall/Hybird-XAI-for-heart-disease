/**
 * PasswordStrength — visual password strength indicator.
 * Props:
 *   password: string
 */

const rules = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'Number', test: (p) => /[0-9]/.test(p) },
  { label: 'Special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

function getStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  const passed = rules.filter((r) => r.test(password)).length
  if (passed <= 1) return { score: 1, label: 'Weak', color: 'bg-coral' }
  if (passed === 2) return { score: 2, label: 'Fair', color: 'bg-peach' }
  if (passed === 3) return { score: 3, label: 'Good', color: 'bg-sage/80' }
  return { score: 4, label: 'Strong', color: 'bg-sage' }
}

export default function PasswordStrength({ password }) {
  const { score, label, color } = getStrength(password)

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1 h-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-all duration-300 ${
                i <= score ? color : 'bg-beige'
              }`}
            />
          ))}
        </div>
        <span
          className={`text-[10px] font-bold w-12 text-right ${
            score === 4
              ? 'text-sage'
              : score === 3
              ? 'text-sage/80'
              : score === 2
              ? 'text-peach'
              : 'text-coral'
          }`}
        >
          {label}
        </span>
      </div>

      {/* Rule checklist */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {rules.map((rule) => {
          const passed = rule.test(password)
          return (
            <div key={rule.label} className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                  passed ? 'bg-sage' : 'bg-beige-dark'
                }`}
              />
              <span
                className={`text-[10px] transition-colors ${
                  passed ? 'text-sage font-medium' : 'text-warm-gray'
                }`}
              >
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
