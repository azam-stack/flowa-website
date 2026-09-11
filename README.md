# Flowa — marketing website

Premium B2B marketing site for Flowa (appointment setting / B2B lead generation, no cure no pay). Vite + React + TypeScript + Tailwind. Static site, no backend. English (en-GB).

## Getting started

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build locally
```

## Structure

- `src/content/site.en.ts` — every user-facing string lives here, typed. No component hard-codes copy. A future `site.<locale>.ts` can mirror this shape for translations.
- `src/sections/` — one component per homepage section, assembled in `src/App.tsx`. Order matches the v2 brief: Hero → Trust → Problems → Value props → Pipeline → No cure/no pay → How it works → Services → Industries → Case studies → Why Flowa → Pricing → FAQ → Final CTA → Contact.
- `src/components/nav/` — the mega-menu system (`useMegaMenu` state machine, `MegaPanel` shell, per-menu panels, mobile drawer). See inline comments for the interaction spec (open/close delays, keyboard nav, the "bridge" technique that stops a diagonal mouse path from closing the menu).
- `src/components/` — shared UI (Nav, Footer, Button, Logo, Reveal, Container, SectionLabel, DecorativeBlob).
- The contact form (`Contact.tsx`) uses `mailto:` to `flowameetings@gmail.com` plus a honeypot field — there is no backend. For real server-side validation and delivery without relying on the visitor's mail client, wire it to a form service (e.g. Formspree or Resend) instead of `mailto:`.

## What's placeholder and needs updating

- **Pricing** (`site.en.ts` → `pricing.tiers`): prices are `£TBC` on purpose. The v1 figures were in DKK (1,500 / 1,400 / 1,200 / 1,000 kr per meeting) and were **not** auto-converted — the founder sets the real GBP figures per tier.
- **Trust strip** (`TrustBar.tsx`): no verified client logos exist yet, so this renders a single placeholder credential line instead of fake/placeholder logo boxes. Replace with a real, founder-verifiable line (or real logos) once available.
- **Case studies** (`site.en.ts` → `caseStudies.items`): client names, industries, quotes and metrics are all `[placeholder]` — no numbers are invented. Fill in once cases are cleared for publication.
- **FAQ** (`site.en.ts` → `faq.items`): two answers (cancelled/no-show meetings, minimum term) are marked placeholder — insert Flowa's actual policy.
- **LinkedIn links** (Nav/Footer/Contact) point at linkedin.com generally — update to Flowa's own company page.
- **Reviews/badges**: intentionally not included — add a section only once real Clutch/G2/Trustpilot/LinkedIn recommendations exist. A fake badge does more damage than a missing one.

## Design

- Tokens live in `tailwind.config.ts`: `bg`, `fg`, `muted`, `border`, `accent` (+ `accent-hover`), and `ink*` for the dark sections. One accent colour (Flowa orange) used deliberately sparingly against a black/off-white base.
- No section carries an ALL-CAPS eyebrow above its heading — `SectionLabel` is sentence-case, normal body size, by design (see v2 brief §3.1: that pattern reads as generic AI-landing-page chrome).
- `Reveal.tsx` uses IntersectionObserver + a plain opacity/transform transition rather than a CSS keyframe animation with `animation-fill-mode: forwards` — the latter turned out not to reliably reach its end state depending on scroll pattern during testing.
- The one background device across the site is `DecorativeBlob` — the real logo's O-silhouette, reused at low opacity rather than a generic gradient or grid texture.

## Known gaps against the v2 QA gate

- **Lighthouse scores** were not run in the build environment (no Lighthouse CLI available there) — verify Performance/Accessibility/Best Practices/SEO before shipping.
- **`next/font` / `next/image`**: this is a Vite project, not Next.js, so those specific APIs don't apply. The same *outcomes* are covered instead — fonts are self-hosted via `@fontsource-variable/inter` with `font-display: swap`, and the one raster image (the logo) is served at a fixed, explicit size.
- **Server-side form validation**: not implemented — see the contact-form note above.
