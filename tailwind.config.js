/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Ported from the original Base44 build so the rebuild reads as the
        // same brand rather than a lookalike.
        ink: '#111111',
        'ink-card': '#11100f',
        gold: {
          DEFAULT: '#E8B04A',
          bright: '#f4b455',
          light: '#f7c478',
        },
        cream: '#F8F5F0',
        canucks: '#003F7D',
        flames: '#C8102E',
      },
      fontFamily: {
        display: ['"Manrope Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
