/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "white-glow": "0px 0px 8px white",
      },
    },
  },
  plugins: [],
};
