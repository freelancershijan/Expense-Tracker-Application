/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/preline/preline.js',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // my custom colors 
        'primary': '#0B1B34', 
        'secondary': '#004767', 
        'third': '#F7EBEC', 
        'background': '#E7F0FD',
        'paragraph': '#1D306D',
        'footerBG': '#26292E',
        'footerBottom': '#36393F',
        'footerText': '#cacaca'
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('preline/plugin'),
  ],
}
