/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#4787E4',
      gray: '#4A4A4A',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

