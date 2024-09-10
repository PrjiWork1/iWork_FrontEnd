/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkgreen: "#038C4C",
          lightgreen: "#04BF68",
          darkblue: "#021B49",
          white: "#FFFFEC",
          gray: "#2D2D2D",
          yellow: "#F2CB05",
          black: "#1E1E1E",
        },
      },
    },
    fontFamily: {
      inter: "Inter",
    },
  },
  plugins: [],
};
