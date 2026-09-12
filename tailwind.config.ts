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
          /** Deepened for display-size type only — see index.css. */
          display: "var(--flowa-orange-display)",
          /** Deepened further still, for white text ON an orange fill
           * (comparison-table header cell). #EE9E47 and even
           * --flowa-orange-display are not safe as a solid background
           * under white text — see index.css. */
          band: "var(--flowa-band)",
        },
        /** Near-black used specifically for the RiskBand / comparison
         * table — a fraction darker than `fg`/`ink`, per spec. */
        riskband: "var(--flowa-ink)",
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
