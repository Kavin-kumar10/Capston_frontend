/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EB5017",
        secondary:"#1F1F29",
        tertiary:"#F0F2F5",
        mild:"#EDDECC",
        mode:"#FFFFFF",
        offmode:"#1F1F29"
      },
      screens: {
        'xs': '520px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}

