/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A90D9",
          dark: "#3A7BC8",
          light: "#7BB3E8",
        },
        secondary: {
          DEFAULT: "#F5A623",
          dark: "#D4891A",
          light: "#F8C060",
        },
        background: "#FAFAF8",
        surface: "#FFFFFF",
        text: {
          DEFAULT: "#1A1A2E",
          muted: "#6B7280",
        },
        border: "#E5E7EB",
        success: "#34D399",
        error: "#EF4444",
        warning: "#FBBF24",
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
