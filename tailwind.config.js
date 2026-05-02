/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FACC15',
        'brand-orange': '#FB923C',
        brand: {
          DEFAULT: '#FACC15',
          hover: '#EAB308',
          dark: '#111111',
        },
        hero: {
          success: '#10B981',
          warning: '#FACC15',
          danger: '#EF4444',
          neutral: '#6B7280',
          dark: '#111111',
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
