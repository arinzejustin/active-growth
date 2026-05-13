import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './composables/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      colors: {
        canvas: 'oklch(var(--canvas) / <alpha-value>)',
        surface: 'oklch(var(--surface) / <alpha-value>)',
        surfaceStrong: 'oklch(var(--surface-strong) / <alpha-value>)',
        line: 'oklch(var(--line) / <alpha-value>)',
        ink: 'oklch(var(--ink) / <alpha-value>)',
        muted: 'oklch(var(--muted) / <alpha-value>)',
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          soft: 'oklch(var(--accent-soft) / <alpha-value>)',
          strong: 'oklch(var(--accent-strong) / <alpha-value>)',
        },
        aurora: {
          DEFAULT: 'oklch(var(--aurora) / <alpha-value>)',
          soft: 'oklch(var(--aurora-soft) / <alpha-value>)',
        },
        lime: {
          DEFAULT: 'oklch(var(--lime) / <alpha-value>)',
          soft: 'oklch(var(--lime-soft) / <alpha-value>)',
        },
      },
      boxShadow: {
        halo: '0 20px 80px rgba(3, 7, 18, 0.18)',
        panel: '0 16px 60px rgba(2, 8, 23, 0.24)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      maxWidth: {
        shell: '80rem',
      },
      backgroundImage: {
        grid:
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -18px, 0) scale(1.04)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
      animation: {
        float: 'float 14s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 7s ease-in-out infinite',
      },
    },
  },
}
