/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/src/assets/homeImage/heroImage.svg')"
      },
      colors: {
        gray: {
          50: "#D9D9D9",
          100: "#BFBFBF",
          200: "#A6A6A6",
          300: "#BCBCBC",
          400: "#737373",
          500: "#595959",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#000000",
        },
        primary: {
          50: "#F5FFF5",
          100: "#C3FFC2",
          200: "#91FF8F",
          300: "#5FFF5C",
          400: "#2DFF29",
          500: "#05F500",
          600: "#04C200",
          700: "#038F00",
          800: "#025C00",
          900: "#012900",
          950: "#011A00",
        },
        error: { default: '#FF5C5C', hover: '#FF8F8F' },
        alert: { default: '#FFCB5C', hover: '#FFDB8F' }
      },
      fontFamily: {
        Pretendard: ["Pretendard", "sans-serif"],
        DungGeunMo: ["DungGeunMo", "sans-serif"],
      },
      fontSize: {
        "heading-40": [
          "40px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading-32": [
          "32px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading-28": [
          "28px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading-24": [
          "24px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "heading-20": [
          "20px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-22": [
          "22px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-18": [
          "18px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "title-14": [
          "14px",
          {
            lineHeight: "100%",
            fontWeight: "700",
          },
        ],
        "body-22": [
          "22px",
          {
            lineHeight: "130%",
            fontWeight: "400",
          },
        ],
        "body-18": [
          "18px",
          {
            lineHeight: "130%",
            fontWeight: "400",
          },
        ],
        "body-14": [
          "14px",
          {
            lineHeight: "130%",
            fontWeight: "400",
          },
        ],
      },
    },
    listStyleType: {
      disc: "disc",
      decimal: "decimal",
      alpha: "lower-alpha",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
