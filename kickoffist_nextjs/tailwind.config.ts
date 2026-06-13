import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#16A34A",
          "green-light": "#DCFCE7",
          "green-dark": "#14532D",
        },
      },
      animation: {
        "ping-slow": "ping 1.5s cubic-bezier(0,0,.2,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
