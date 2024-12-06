/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FDBF50",
        secondary: "#FF724C",
        teritary: "#2A2C41",
        error: "#FF0000",
        success: "#008F39",
        gray: "#F0F2F5",
        gray_hard: "#A9A9A9",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
