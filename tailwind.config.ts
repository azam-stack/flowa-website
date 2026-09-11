import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF9F6",
        fg: "#0C0C0B",
        muted: "#6B675F",
        border: "#E6E2D9",
        card: "#FFFFFF",
        accent: {
          DEFAULT: "#EE9E47",
          hover: "#D9822C",
          fg: "#0C0C0B",
        },
        ink: {
          DEFAULT: "#0C0C0B",
          soft: "#171613",
          border: "#2A2822",
          muted: "#A39E92",
          fg: "#FAF9F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
    },
  },
  plugins: [],
} satisfies Config;
