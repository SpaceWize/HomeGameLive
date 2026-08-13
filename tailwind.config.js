/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral, product-agnostic scheme. Tokens are named by role rather
        // than by hue so the palette can be re-skinned without renaming
        // anything downstream.
        ink: '#0C0E13',
        surface: '#141821',
        accent: {
          DEFAULT: '#6C8CFF',
          bright: '#8AA3FF',
          light: '#A3B8FF',
        },
        paper: '#F3F4F7',
        alert: '#E5484D',
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
