/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      "primary": "#EDF4EC",
      "secondary": "#EB7462",
      "buttonBg": "#585E58",
      "white": "#FFFFFF",
    }
  },
  plugins: [],
}

