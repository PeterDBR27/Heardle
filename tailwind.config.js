const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenNew: "#1ED760",
        gray: "#A7A7A7",
        red: "#E91429",
        yellow: colors.amber,
        purple: colors.violet,
      }
    },
  },
  plugins: [],
}
