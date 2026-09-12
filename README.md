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

The homepage is cut to 11 top-level sections (a WINGM-model restructure — see below), assembled in `src/App.tsx` in this exact order:

1. `Hero` (`src/sections/Hero.tsx`) with `CommitmentsBar` (`src/components/CommitmentsBar.tsx`) attached to its base — one section, not two
2. `Problem` — merges what used to be two separate "Problems" and "Value props" sections, capped at 4 items
3. `Offer` — the four services folded into one sentence, not a card grid
4. `RiskBand` — full-bleed near-black "no cure, no pay" band
5. `HowItWorks` — 4 numbered cards with an animated dashed-arc connector (desktop) / vertical dashed segments (mobile)
6. `ComparisonTable` — Hiring an SDR / traditional agency / Flowa, commercial terms only
7. `Team` (`src/sections/Team.tsx`) — **frozen**: do not edit its markup, styling or copy; only its position in the page may change
8. `Pricing`
9. `FAQ` — max 6 questions
10. `FinalCTA` (`src/sections/FinalCTA.tsx`) — merged with what used to be a separate `Contact.tsx` form section; there's no standalone "Contact" section anymore
11. `Footer`

- `src/content/site.en.ts` — every user-facing string lives here, typed. No component hard-codes copy. A future `site.<locale>.ts` can mirror this shape for translations.
- `src/components/nav/` — the mega-menu system (`useMegaMenu` state machine, `MegaPanel` shell, per-menu panels, mobile drawer). See inline comments for the interaction spec (open/close delays, keyboard nav, the "bridge" technique that stops a diagonal mouse path from closing the menu). Services/Industries content lives only in these menus now — there's no matching homepage section to scroll to.
- `src/components/` — shared UI (Nav, Footer, Button, Logo, Reveal, Container, SectionLabel, DecorativeBlob, TeamPortrait, ClientLogos, CommitmentsBar).
- `src/components/ClientLogos.tsx` exists but is **not mounted** anywhere — `content.clients` is an empty array and the component returns `null` while it is. Wire it into `App.tsx` once real clients exist; do not add a placeholder logo strip in the meantime.
- No router — this is a single static page with anchor-link navigation.
- The contact form (inside `FinalCTA.tsx`) uses `mailto:` to `flowameetings@gmail.com` plus a honeypot field — there is no backend. For real server-side validation and delivery without relying on the visitor's mail client, wire it to a form service (e.g. Formspree or Resend) instead of `mailto:`.

## Restructure (WINGM model) — decisions and deviations

The homepage was cut from 17 sections to 11 per a restructure brief modelled on go.wingm.io. Full detail lives in `RESTRUCTURE_REPORT.md`; the short version:

- **Deleted, not shrunk**: the old Problems (6 cards), Value props (4 cards), Services (4 cards), Industries grid, Pipeline funnel, Case studies, Trust bar and the old two-column WhyFlowa table are all gone — files, content-file entries and imports removed, not commented out.
- **"Founders" (section 7) was ambiguous between two existing sections** — `Team.tsx` ("The two people behind every Flowa campaign") and the earlier `WhatSetsUsApart.tsx`. The brief names it "Founders (Ahmed & Anton / what sets us apart)" but requires the section be frozen to *one* existing component. `Team.tsx` was kept (it names both founders directly, matching "who is actually doing this?") and `WhatSetsUsApart.tsx` was deleted — its differentiator content is now substantially covered by `RiskBand` and the `ComparisonTable`'s "who does the work" row.
- **No separate "Contact" section** — the brief's 11-row table has no Contact entry, so the old standalone Contact form section was merged into `FinalCTA.tsx` ("How do I start?").
- **Comparison table's Flowa wordmark is a processed PNG, not an SVG** — no vector source exists for the logo. `public/flowa-wordmark-white.png` is the real logo with its orange background chroma-keyed to transparent (not a redrawn/invented mark), used with an accessible `alt="Flowa"`.
- **The ≤7,000px height budget forced tighter vertical rhythm** than the rest of the site (most restructured sections use `py-12 md:py-14` instead of the site's usual `py-24 md:py-32`) — this was the only way to fit 11 sections including a frozen ~1,530px Team section under the budget. FAQ also now opens closed by default (previously the first item was expanded).

## What's placeholder and needs updating

- **Pricing** (`site.en.ts` → `pricing.tiers`): prices are `£TBC` on purpose. The v1 figures were in DKK (1,500 / 1,400 / 1,200 / 1,000 kr per meeting) and were **not** auto-converted — the founder sets the real GBP figures per tier.
- **Client logos** (`site.en.ts` → `clients`): empty on purpose — see `ClientLogos.tsx` above.
- **RiskBand no-show policy** (`site.en.ts` → `riskBand.checks[2]`): ships as `[NO-SHOW POLICY — founders to confirm]`, visible on the page. Also needed for the FAQ answer to "What happens if a meeting is cancelled or a prospect doesn't show?".
- **CommitmentsBar figures** (`site.en.ts` → `commitmentsBar.items`): "24h reply", "2 people", "0 retainers" are drafted promises, not confirmed ones — each has a `TODO(founders)` comment asking for sign-off before launch.
- **HowItWorks timeframe**: the heading ships without a number ("From kickoff to your first qualified meeting") because no figure has been confirmed that holds on every engagement. Add one to `howItWorks.h2` only if the founders supply a number they'll stand behind on every engagement.
- **FAQ** (`site.en.ts` → `faq.items`): two answers (cancelled/no-show meetings, minimum term) are marked placeholder — insert Flowa's actual policy.
- **LinkedIn links** (Nav/Footer/FinalCTA) point at linkedin.com generally — update to Flowa's own company page.
- **Reviews/badges**: intentionally not included — add a section only once real Clutch/G2/Trustpilot/LinkedIn recommendations exist. A fake badge does more damage than a missing one.
- **Team** (`site.en.ts` → `team.ahmed` / `team.anton`) — **frozen, see above**: `surname`, `linkedin` and `bio` are `null` — marked with a `TODO(founders)` comment right above the object. Nothing fabricated renders in their place: the page shows first name only (no bracket text) and "Bio coming soon." instead of an invented bio, and the LinkedIn icon simply doesn't render while the URL is `null`. Fill these in and the two team sections, the FinalCTA avatar caption, and the FAQ answer all pick them up automatically — no other code changes needed. Once real LinkedIn URLs exist, also add `sameAs` to the `founder` array in the Organization JSON-LD in `index.html` (left out for now rather than shipped incomplete).
- **Team portraits** (`public/images/team/ahmed.{jpg,webp,avif}`, `anton.*`): cropped from the founders' supplied photos to a matching 4:5 ratio and eye-line (~38% from top) for both. If either photo is replaced, re-crop to the same ratio/eye-line by hand — there's no automated pipeline for this.
- **Signed statement attribution** (`site.en.ts` → `signedStatementAttribution`): defaults to `"ahmed"`. The quote text itself is verbatim from the brief; only which founder's name sits underneath is a placeholder choice — change the constant to `"anton"` if preferred.

## Design

- Tokens live in `tailwind.config.ts`: `bg`, `fg`, `muted`, `border`, `accent` (+ `accent-hover`), and `ink*` for the dark sections. One accent colour (Flowa orange) used deliberately sparingly against a black/off-white base.
- `accent.display` (`--flowa-orange-display`, `#C9741E`) and `accent.band` (`--flowa-band`, `#A85E14`) are deepened variants of the brand orange for use as *text on a light background* and *a solid fill under white text* respectively — the raw brand orange (`#EE9E47`) fails WCAG at both (see `src/index.css` for the measured ratios). `riskband` (`--flowa-ink`, `#121110`) is the near-black used by `RiskBand` and the comparison table header, a shade darker than `fg`/`ink`. None of these three replace the original tokens anywhere else — buttons, icons and the pipeline timeline keep `accent.DEFAULT`.
- No section carries an ALL-CAPS eyebrow above its heading — `SectionLabel` is sentence-case, normal body size, by design (see v2 brief §3.1: that pattern reads as generic AI-landing-page chrome).
- `Reveal.tsx` uses IntersectionObserver + a plain opacity/transform transition rather than a CSS keyframe animation with `animation-fill-mode: forwards` — the latter turned out not to reliably reach its end state depending on scroll pattern during testing.
- The one background device across the site is `DecorativeBlob` — the real logo's O-silhouette, reused at low opacity rather than a generic gradient or grid texture.

## Known gaps against the v2 QA gate

- **Lighthouse scores** were not run in the build environment (no Lighthouse CLI available there) — verify Performance/Accessibility/Best Practices/SEO before shipping.
- **`next/font` / `next/image`**: this is a Vite project, not Next.js, so those specific APIs don't apply. The same *outcomes* are covered instead — fonts are self-hosted via `@fontsource-variable/inter` with `font-display: swap`, and the one raster image (the logo) is served at a fixed, explicit size.
- **Server-side form validation**: not implemented — see the contact-form note above.
