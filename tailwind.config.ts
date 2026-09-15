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
      /** Colours read the CSS tokens in src/index.css (rgb triplets), so opacity modifiers keep working. */
      colors: {
        bg: "rgb(var(--rgb-bg) / <alpha-value>)",
        fg: "rgb(var(--rgb-fg) / <alpha-value>)",
        muted: "rgb(var(--rgb-muted) / <alpha-value>)",
        border: "rgb(var(--rgb-border) / <alpha-value>)",
        card: "rgb(var(--rgb-card) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--rgb-accent) / <alpha-value>)",
          hover: "rgb(var(--rgb-accent-hover) / <alpha-value>)",
          fg: "rgb(var(--rgb-fg) / <alpha-value>)",
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
        error: "rgb(var(--rgb-error) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        /** Type scale (plan §6). clamp() so each role has one token, not per-breakpoint overrides. */
        display: ["clamp(2.5rem, 5.2vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "800" }],
        h2: ["clamp(1.75rem, 3.4vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        h3: ["clamp(1.125rem, 1.6vw, 1.375rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        lead: ["clamp(1rem, 1.3vw, 1.1875rem)", { lineHeight: "1.55" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        eyebrow: ["0.9375rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        /** Section rhythm (mobile→desktop): standard 56→112, band 64→112, compact 40→64. The page breathes. */
        section: "clamp(3.5rem, 7.5vw, 7rem)",
        band: "clamp(4rem, 8vw, 7rem)",
        compact: "clamp(2.5rem, 5vw, 4rem)",
      },
      maxWidth: {
        content: "1320px",
        bleed: "1400px",
        prose: "65ch",
        lead: "52ch",
      },
      borderRadius: {
        /** field (12) for inputs and small elements, card (20) for every card and large surface, panel (28) for the band, full for pills. */
        field: "var(--radius-md)",
        card: "var(--radius-lg)",
        panel: "var(--radius-xl)",
      },
      boxShadow: {
        subtle: "var(--shadow-subtle)",
        /** Only for things that float: the hero artefact, the mobile drawer. */
        float: "var(--shadow-medium)",
        deep: "var(--shadow-deep)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        /** Ambient blobs for the dark band: translate within ±8% of the band, scale 1–1.15, opacity 0.85–1. */
        "drift-1": { "0%": { transform: "translate3d(0, 0, 0) scale(1)", opacity: "1" }, "100%": { transform: "translate3d(8%, 5%, 0) scale(1.15)", opacity: "0.85" } },
        "drift-2": { "0%": { transform: "translate3d(0, 0, 0) scale(1.1)", opacity: "0.9" }, "100%": { transform: "translate3d(-8%, 6%, 0) scale(1)", opacity: "1" } },
        "drift-3": { "0%": { transform: "translate3d(0, 0, 0) scale(1)", opacity: "0.85" }, "100%": { transform: "translate3d(6%, -8%, 0) scale(1.12)", opacity: "1" } },
      },
      animation: {
        "drift-1": "drift-1 24s ease-in-out infinite alternate",
        "drift-2": "drift-2 31s ease-in-out infinite alternate",
        "drift-3": "drift-3 18s ease-in-out infinite alternate",
      },
      transitionTimingFunction: {
        flowa: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "240ms",
        slow: "600ms",
        reveal: "800ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
