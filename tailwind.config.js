
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'school-red': '#E11D48',
        'school-green': '#16A34A',
        'school-yellow': '#FBBF24',
        'school-blue': '#1E3A8A',
        'school-gray': '#F3F4F6',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
