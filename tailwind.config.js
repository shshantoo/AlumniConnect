/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#ffffff',
          100: '#fcfbf8',
          200: '#f8f6f0', // Reference image warm paper canvas
          300: '#f0ede6',
          400: '#e5e0d5',
          500: '#d4ccbd',
        },
        tasteOrange: {
          50: '#fff5f0',
          100: '#fce8d5', // Reference peach pill background
          200: '#f8cbb0', // Reference pill border
          300: '#ff945e',
          400: '#ff6b26',
          500: '#ff5500', // Reference vibrant orange text
          600: '#ea580c',
          700: '#c2410c',
        },
        pitchBlack: '#0a0a0a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
