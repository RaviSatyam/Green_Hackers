/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background-color': 'rgba(103, 187, 206, 0.79)', 
        'button': '#6881EF',
        'card1': '#F9FAFB',
        'icon': '#87CAD9',
        'line': '#E5E7EB',
      },
    },
  },
  plugins: [],
}

