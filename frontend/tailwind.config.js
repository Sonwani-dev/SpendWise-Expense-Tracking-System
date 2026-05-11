/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0444d4', // The vibrant blue
          hover: '#0336a6'
        },
        sidebar: {
          activeBg: '#e6efff',
          activeText: '#0444d4'
        },
        chart: {
          operations: '#0444d4',
          marketing: '#b1c7fb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
