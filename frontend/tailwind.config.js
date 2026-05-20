/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bhutan-inspired color palette
        primary: {
          50: '#fdf8f3',
          100: '#fcf1e7',
          500: '#d47d2e',
          700: '#a85e1f',
          900: '#6d3c0f',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        accent: {
          50: '#faf5ff',
          500: '#a855f7',
          700: '#9333ea',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
