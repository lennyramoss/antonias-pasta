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
          base: "#000000",
          detail: "#691314",
          gold: "#F3A800",
          goldSoft: "#FFC533",
          body: "#BABABA",
          cream: "#FFFFFF",
          panel: "#691314",
          ink: "#000000",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-lt-soul)",
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
