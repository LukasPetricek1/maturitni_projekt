/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      },
      typography: {
        DEFAULT : {
          css : {
            h1 : {
              color : "red"
            }
          }
        }
      },
      colors: { 
        "background" : "#130F54",
        "primary-purple" : "#8576FF",
        "primary-blue" : "#7BC9FF",
        "primary-mint" : "#A3FFD6",
        "primary-pink" : "#D46BD4"
      },
      boxShadow: { 
        "pink-normal" : "0 0 30px -5px #8576FF"
      },
      gridTemplateColumns : { 
        '24' : "repeat(24, minmax(0,1fr))"
      }
    },
  },
  plugins: [ require("@tailwindcss/typography")],
}

