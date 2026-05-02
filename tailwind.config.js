/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFD60A',
        'brand-orange': '#FB923C',
        brand: {
          DEFAULT: '#FFD60A',
          hover: '#EAB308',
          dark: 'var(--hero-dark)',
        },
        hero: {
          success: '#10B981',
          warning: 'var(--brand-yellow)',
          danger: '#EF4444',
          neutral: '#6B7280',
          dark: 'var(--hero-dark)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'hero-sm': '0.5rem',
        'hero-md': '0.75rem',
        'hero-lg': '1rem',
      }
    },
  },
  plugins: [],
}
