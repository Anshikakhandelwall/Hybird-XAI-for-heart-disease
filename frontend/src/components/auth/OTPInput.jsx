/**
 * OTPInput — 6-digit OTP code input.
 * Props:
 *   value: string (6 chars)
 *   onChange: (val: string) => void
 *   disabled?: boolean
 */
import { useRef } from 'react'

const OTP_LENGTH = 6

export default function OTPInput({ value = '', onChange, disabled = false }) {
  const inputs = useRef([])

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const next = value.split('')
    next[idx] = char
    const newVal = next.join('').slice(0, OTP_LENGTH)
    onChange(newVal)
    // Move focus forward
    if (char && idx < OTP_LENGTH - 1) {
      inputs.current[idx + 1]?.focus()
    }
  }

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && idx > 0) inputs.current[idx - 1]?.focus()
    if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    onChange(pasted.padEnd(OTP_LENGTH, '').slice(0, OTP_LENGTH))
    // Focus last filled or next empty
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    inputs.current[focusIdx]?.focus()
  }

  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className={`w-11 h-12 text-center text-xl font-extrabold rounded-xl border-2 transition-all duration-200 outline-none
            ${value[idx]
              ? 'border-coral bg-coral/5 text-coral'
              : 'border-beige bg-ivory text-charcoal'
            }
            focus:border-coral focus:bg-coral/5 focus:shadow-[0_0_0_3px_rgba(217,83,79,0.12)]
            disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      ))}
    </div>
  )
}
