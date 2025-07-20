/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#000000',
          text: '#00FF00',
          accent: '#00CC00',
          muted: '#006600',
          error: '#FF0000',
          warning: '#FFFF00',
        }
      },
      fontFamily: {
        mono: ['JetBrainsMono', 'monospace'],
      }
    },
  },
  plugins: [],
}

