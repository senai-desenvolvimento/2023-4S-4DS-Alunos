/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./src/**/*.js", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          blue: "#005CA7",
          purple: "#4C30C4",
          red: "#BF0000",
        },
        complementary: {
          white: "#f3f5f9",
          black: "#272727",
          gray: "#33303e",
        },
      },
      backgroundImage: {
        atvGradient: "linear-gradient(149deg, #2272B5 -10.8%, #005195 37.95%, #004582 100%)"
      }
    },
  },
  plugins: [],
};
