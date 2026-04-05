import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#edf6ef",
          100: "#d0e4d7",
          200: "#a9cbb5",
          300: "#7eab90",
          400: "#5c896f",
          500: "#446c57",
          600: "#345444",
          700: "#284236",
          800: "#1d3329",
          900: "#14251e",
        },
        paper: {
          50: "#fffdf8",
          100: "#f7f0e2",
          200: "#e7dcc3",
          300: "#d4c4a1",
        },
        sage: {
          50: "#eef4ee",
          100: "#d8e5d7",
          200: "#bdd0bc",
          300: "#92af92",
          400: "#6d8d6d",
          500: "#4f6f5c",
          600: "#3c5647",
          700: "#2b4335",
        },
        gold: {
          50: "#f6f1e1",
          100: "#ebe0bd",
          200: "#d8c37a",
          300: "#b89947",
          400: "#8e742d",
        },
        cream: "#fbfaf7",
        peach: "#f8e7da",
        butter: "#f8f0cd",
        ink: "#273229",
        indigobase: "#31435f",
      },
      boxShadow: {
        panel: "0 24px 64px rgba(29, 51, 41, 0.15)",
        soft: "0 16px 38px rgba(29, 51, 41, 0.12)",
        float: "0 28px 74px rgba(40, 66, 54, 0.20)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(68, 108, 87, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(68, 108, 87, 0.2) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        serif: ["var(--font-heading)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
