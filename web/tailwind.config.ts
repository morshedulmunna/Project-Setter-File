import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        JobCardGradient:
          "linear-gradient(160deg, rgba(0, 56, 240, 0.94) 5.04%, rgba(41, 157, 242, 0.75) 98.97%)",
        JobCardHove: " linear-gradient(180deg, #554CA7 0%, #211E41 100%)",
      },
      colors: {
        background: "#111b21",
        foreground: "#FFFFFF",
        "color-text": "#C5C9D6",
      },
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3200px",
        "6xl": "4096px",
        "7xl": "5120px",
        "8xl": "6144px",
        "9xl": "7296px",
        "10xl": "8192px",
      },
      fontSize: {
        "4xs": "0.375rem", // 6px
        "3xs": "0.5rem", // 8px
        "2xs": "0.625rem", // 10px
      },
    },
  },
  plugins: [],
} satisfies Config;
