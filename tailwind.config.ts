import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        antonias: {
          burgundy: "#78100D",
          burgundyDark: "#6F0D0B",
          gold: "#E6B21A",
          goldSoft: "#F1C33A",
          cream: "#FAF9F6",
          panel: "#F3F3F3",
          ink: "#14100F",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Avenir Next",
          "Avenir",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
