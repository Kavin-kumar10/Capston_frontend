/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EB5017",
        secondary:"",
        tertiary:"#F0F2F5",
        mild:"#EDDECC"
      },
      screens: {
        'xs': '520px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}

