/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: 'rgb(64, 123, 255)'
      }
    },
  },
  plugins: [require("daisyui")],
}

