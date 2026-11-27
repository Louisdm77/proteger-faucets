import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#081629",
        navy: "#0C223D",
        brand: {
          50: "#EEF6FF",
          100: "#D9EBFF",
          200: "#B6D7FF",
          400: "#4F9BF5",
          500: "#2183EE",
          600: "#0E6BD8",
          700: "#0B56AE",
          800: "#0D4789",
        },
        gold: { 400: "#E2B85A", 500: "#C9982F", 600: "#A87B1E" },
        mist: "#F4F7FA",
        steel: "#5B6B7E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-manrope)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 70px rgba(8, 22, 41, .10)",
        card: "0 1px 2px rgba(8,22,41,.06), 0 8px 24px rgba(8,22,41,.06)",
      },
    },
  },
  plugins: [],
};
export default config;
