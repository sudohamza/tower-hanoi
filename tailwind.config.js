/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: { display: ["Source Code Pro"] },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
