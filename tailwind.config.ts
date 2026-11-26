import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07182B",
        navy: "#0B2138",
        blue: "#4C9DFF",
        ice: "#EAF2F8",
        mist: "#F5F8FB",
        steel: "#6B7C8F"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-manrope)", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(7, 24, 43, .10)"
      }
    }
  },
  plugins: []
};
export default config;
