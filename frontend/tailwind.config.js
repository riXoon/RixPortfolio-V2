/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'infinite-scroll-slow': 'infinite-scroll 60s linear infinite',
        'infinite-scroll-slow-reverse': 'infinite-scroll-reverse 60s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'infinite-scroll-reverse': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        // CSS grid is now handled in index.css via .kali-grid utility class
        'grid-1': 'none',
        'grid-2': 'none',
        'compiled-proj': "url('/src/assets/compiled-projects.png')",
        // Border gradients updated to the deep dark + kali-purple palette
        'border-gradient':   'linear-gradient(-10deg,  rgba(12,10,18,1) 30%, rgba(88,56,152,1) 100%)',
        'border-gradient-1': 'linear-gradient(35deg,   rgba(88,56,152,1) 9%, rgba(12,10,18,1) 33%)',
        'border-gradient-2': 'linear-gradient(120deg,  rgba(88,56,152,1) 9%, rgba(12,10,18,1) 33%)',
        'border-gradient-3': 'linear-gradient(170deg,  rgba(88,56,152,1) 9%, rgba(12,10,18,1) 33%)',
        'border-gradient-4': 'linear-gradient(-150deg, rgba(88,56,152,1) 9%, rgba(12,10,18,1) 33%)',
        'border-gradient-5': 'linear-gradient(0deg,    rgba(88,56,152,1) 9%, rgba(12,10,18,1) 33%)',
      },
      colors: {
        base:          '#0C0A12',
        'kali-purple': '#7B4FD0',
        'kali-accent': '#9B72EF',
        'kali-dim':    '#1A1625',
        'kali-border': '#3B2B6A',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

