/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: "#F2F2F2",
        },
        "custom-red": "#FF7171",
      },
    },
  },
  plugins: [],
};
