/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "background" : "#130F54",
        "primary-purple" : "#8576FF",
        "primary-blue" : "#7BC9FF",
        "primary-mint" : "#A3FFD6",
        "primary-pink" : "#D46BD4"
      },
      boxShadow: { 
        "pink-normal" : "0 0 30px -5px #8576FF"
      }
    },
  },
  plugins: [],
}

