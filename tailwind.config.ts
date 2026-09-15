import type { Config } from "tailwindcss";

/**
 * Design tokens for flowa.dk. Colour, type, spacing, radius and motion
 * scales live here (and as CSS variables in src/index.css) so every
 * section draws from one system.
 *
 * Rules that aren't encoded in tokens:
 * - `accent` is for the nav/final CTA buttons, the second headline line
 *   (`accent.display`), checkmarks and the active nav underline. Not for
 *   labels under 18px (contrast), not for icons in informational cards.
 * - Cards only where something is one bounded object (form, hero
 *   artefact, quote box). Lists of points are text, not cards.
 * - One accent-coloured button in view at a time.
 */
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
          /** Deepened further still, for white text ON an orange fill. */
          band: "var(--flowa-band)",
        },
        /** Near-black for the RiskBand and the comparison table header. */
        riskband: "var(--flowa-ink)",
        ink: {
          DEFAULT: "#0C0C0B",
          soft: "#171613",
          border: "#2A2822",
          muted: "#A39E92",
          fg: "#FAF9F6",
        },
        /** Form error colour — the only "status" colour on the site. */
        error: "#B3362E",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        /** Type scale (plan §6). clamp() so each role has one token, not per-breakpoint overrides. */
        display: ["clamp(2.5rem, 5.2vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "800" }],
        h2: ["clamp(1.75rem, 3.4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "800" }],
        h3: ["clamp(1.125rem, 1.6vw, 1.375rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        lead: ["clamp(1rem, 1.3vw, 1.1875rem)", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        eyebrow: ["0.9375rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        /** Section rhythm (mobile→desktop): standard 48→96, band 64→112, compact 40→64. */
        section: "clamp(3rem, 7vw, 6rem)",
        band: "clamp(4rem, 8vw, 7rem)",
        compact: "clamp(2.5rem, 5vw, 4rem)",
      },
      maxWidth: {
        content: "1240px",
        bleed: "1320px",
        prose: "65ch",
        lead: "52ch",
      },
      borderRadius: {
        /** Three radii: field (12) for inputs and small elements, card (20) for every card and large surface, full for pills. */
        field: "12px",
        card: "20px",
      },
      boxShadow: {
        /** Only for things that float: the hero artefact, the mobile drawer. */
        float: "0 1px 2px rgba(12,12,11,0.04), 0 24px 48px -20px rgba(12,12,11,0.16)",
      },
      transitionTimingFunction: {
        flowa: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "240ms",
        reveal: "480ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
