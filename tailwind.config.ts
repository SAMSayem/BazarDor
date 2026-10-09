import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bazar: {
          ink: "#1d271f",
          green: "#168347",
          dark: "#12683a",
          pale: "#edf7ed",
          cream: "#fbfcf8",
          line: "#e6ebe2",
          muted: "#6f786f",
          red: "#cf4040",
        },
      },
      fontFamily: {
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 28px rgba(29, 39, 31, .06)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
