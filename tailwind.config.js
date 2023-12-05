/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#003458",
      secondary: "#59b6de",
      "light-blue": "#DBFAFF",
      purple: "#DCD6FC",
      "light-purple": "#E2E9FC",
      pink: "#FFEEFF",
      orange: "#FEECE0",
      green: "#DFFDF9",
      "gray-dark": "#273444",
      gray: "#D9D9D9",
      "gray-light": "#d3dce6",
      white: "#FFFFFF",
      black: "#000000",
    },
    backgroundImage: {
      "gradient-45": "linear-gradient(135deg, var(--tw-gradient-stops))",
      "gradient-180": "linear-gradient(180deg, var(--tw-gradient-stops))",
      "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
    },
    extend: {
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
