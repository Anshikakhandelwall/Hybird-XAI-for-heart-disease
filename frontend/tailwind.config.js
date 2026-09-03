/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F3',
        cream: '#F3EEE5',
        coral: '#D9534F',
        'coral-light': '#E8706D',
        'coral-dark': '#C04340',
        sage: '#5F8D68',
        'sage-light': '#7AAB83',
        peach: '#E9A17C',
        'peach-light': '#F2C4A5',
        charcoal: '#292522',
        'warm-gray': '#716B65',
        beige: '#E2DCD2',
        'beige-dark': '#D4CCC0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(41, 37, 34, 0.06)',
        'warm': '0 4px 20px rgba(41, 37, 34, 0.08)',
        'warm-lg': '0 8px 40px rgba(41, 37, 34, 0.10)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'ecg': 'ecg 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ecg: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
