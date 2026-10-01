import type { Config } from "tailwindcss";

/**
 * Frank by Flowa design tokens (design upgrade: ~70% neutral, 20% ink, 10% orange) (brief §2). Colours are the exact hex
 * values from §2.2; type roles follow §2.3; radii and spacing follow
 * §2.4. Nothing outside this palette is used anywhere on the site.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  // Btn builds these as `btn-${variant}`, which the scanner cannot see.
  safelist: ["btn-primary", "btn-outline", "btn-text"],
  theme: {
    extend: {
      colors: {
        page: "#F6F6F3",
        surface: "#FFFFFF",
        soft: "#F1F0EC",
        panel: { DEFAULT: "#FFEBD6", strong: "#FFD7AE" },
        brand: { DEFAULT: "#EE9E47", strong: "#E2802A", deep: "#A25D18" },
        ink: { DEFAULT: "#0C0C0B", 2: "#1A1B1F" },
        muted: "#6B675F",
        line: "rgba(12,12,11,0.08)",
        coral: "#F08A6C",
        error: "#B82A2A",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Fraunces Variable", "Fraunces", "Georgia", "serif"],
      },
      fontSize: {
        /** H1 hero: 72 desktop / 44 mobile, weight 300, key phrase 600. */
        h1: ["clamp(2.75rem, 1.6rem + 3.4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "300" }],
        /** Statement headlines: 72–80px desktop, weight 300. */
        statement: ["clamp(2.5rem, 1.2rem + 4.3vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "300" }],
        /** H2 section titles: 44px, weight 400 (lighter than v1, more air). */
        h2: ["clamp(1.875rem, 1.4rem + 1.5vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "400" }],
        /** H3 card titles: 24px weight 600. */
        h3: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
        /** Eyebrow above an H2: 20px weight 400. Subline under it: 20px weight 300. */
        eyebrow: ["1.25rem", { lineHeight: "1.4", fontWeight: "400" }],
        sub: ["1.25rem", { lineHeight: "1.5", fontWeight: "300" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        /** Big light stat numbers in the proof section. */
        stat: ["clamp(2.75rem, 2rem + 2.3vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "300" }],
      },
      borderRadius: {
        frame: "20px",
        card: "16px",
        control: "8px",
        pill: "999px",
      },
      maxWidth: {
        container: "1400px",
        prose: "65ch",
        lead: "52ch",
      },
      spacing: {
        gutter: "88px",
        section: "140px",
        "section-m": "80px",
      },
      boxShadow: {
        float: "0 12px 40px rgba(12,12,11,0.12)",
        lift: "0 24px 60px rgba(12,12,11,0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
