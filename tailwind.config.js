/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      primary: {
        darkgreen: "#038C4C",
        lightgreen: "#04BF68",
        darkblue: "#021B49",
        white: "#FFFFEC",
        darkgray: "#3D3D3D",
        gray: "#2D2D2D",
        lightgray: "#D9D9D9",
        yellow: "#F2CB05",
        black: "#1E1E1E",
      },
    },
    extend: {},
    fontFamily: {
      inter: "Inter",
    },
  },
  plugins: [],
};
