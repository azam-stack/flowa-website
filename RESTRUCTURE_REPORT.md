# Restructure report (Part 5 of the WINGM-model restructure brief)

## 1. Final section count and render order

11 top-level sections, exactly as specified in the brief's table 1.2 (10 `<section>` elements inside `<main>`, plus `<footer>` — verified programmatically, not just by eye):

1. `Hero` (`id="top"`) with `CommitmentsBar` attached to its base
2. `Problem`
3. `Offer` (`id="offer"`)
4. `RiskBand`
5. `HowItWorks` (`id="how-it-works"`)
6. `ComparisonTable`
7. `Team` (`id="team"`) — "Founders"
8. `Pricing` (`id="pricing"`)
9. `FAQ` (`id="faq"`)
10. `FinalCTA` (`id="contact"`) — merged with the old standalone Contact form
11. `Footer`

## 2. Measured `scrollHeight` at 1440×900

- **After**: **6,946px** (under the 7,000px budget), measured on the production build via `document.documentElement.scrollHeight`, fonts loaded, after a full scroll-through.
- **Before**: not captured. I deleted the old sections as I rebuilt rather than measuring the pre-restructure page first — an oversight, not a refusal. The one number I do have: my first pass at the *new* 11-section structure, before any padding compression, measured 8,225px — 1,279px over budget, which is what drove the compression pass described in item 6.

## 3. Every file deleted

- `src/sections/Contact.tsx` (merged into `FinalCTA.tsx`)
- `src/sections/Problems.tsx` (merged into `Problem.tsx`)
- `src/sections/ValueProps.tsx` (merged into `Problem.tsx`)
- `src/sections/Services.tsx` (replaced by `Offer.tsx`)
- `src/sections/Differentiator.tsx` (replaced by `RiskBand.tsx`)
- `src/sections/PipelineFunnel.tsx` (deleted, duplicated the hero card)
- `src/sections/Audience.tsx` (Industries grid — deleted from the homepage; kept in the Services mega-menu only)
- `src/sections/CaseStudies.tsx` (deleted)
- `src/sections/WhyFlowa.tsx` (replaced by `ComparisonTable.tsx`)
- `src/sections/TrustBar.tsx` (replaced by `ClientLogos.tsx`, unmounted)
- `src/sections/WhatSetsUsApart.tsx` (see item 6 — judgment call on section 7)

Their content-file entries and imports were removed with them — nothing is commented out or behind a `false &&`.

## 4. Bracketed placeholders still in the build

All in `src/content/site.en.ts`:

- **Line 89** — `meeting: { company: "[Company name]", role: "[Decision-maker's role]", ... }` (hero demo meeting card — pre-existing, not part of this restructure)
- **Line 142** — `"[NO-SHOW POLICY — founders to confirm]"` (`riskBand.checks[2]`, new)
- **Line 284** — `"[Placeholder — insert Flowa's actual policy for cancelled or no-show meetings here.]"` (`faq.items`, pre-existing, kept)
- **Line 285** — `"[Placeholder — insert Flowa's actual notice/contract terms here.]"` (`faq.items`, pre-existing, kept)

## 5. Computed contrast ratios

Computed independently in Python (WCAG relative-luminance formula) and cross-checked against the actual rendered `getComputedStyle` colours in the browser — not assumed from the brief's own numbers:

| Pair | Computed | Brief's figure |
|---|---|---|
| White on `#121110` | **18.86:1** | 18.9:1 |
| `#EE9E47` on `#121110` | **8.64:1** | 8.6:1 |
| White on `#A85E14` | **4.91:1** | 4.9:1 |
| Pill text (white) on `#121110` | **18.86:1** (same background as row 1) | — |

All four clear the required 4.5:1.

## 6. Could not implement as specified, or implemented with a judgment call

- **Comparison table wordmark is a PNG, not an SVG.** No vector source exists for the Flowa logo (it's a raster upload). I extracted a white version by chroma-keying the logo's orange background to transparent — the real mark, not a redrawn one — but it's still a PNG (`public/flowa-wordmark-white.png`), not the SVG the brief specifies. A true vector wordmark would need to come from the founders or be manually traced, which risks producing an inaccurate brand mark.
- **Section 7 ("Founders") was ambiguous between two existing sections.** The brief names it "Founders (Ahmed & Anton / what sets us apart)" and requires it be frozen to *one* existing component, unchanged except for position — but before this restructure there were two separate sections that could plausibly be "the founders section": `Team.tsx` ("The two people behind every Flowa campaign," both founders pictured and named) and `WhatSetsUsApart.tsx` (one founder pictured, framed around differentiation rather than identity). I kept `Team.tsx` — it answers "who is actually doing this?" most literally and names both founders, matching the brief's own parenthetical — and deleted `WhatSetsUsApart.tsx`. `Team.tsx` itself is untouched (verified via `git diff` — zero changes) other than moving to position 7.
- **`document.documentElement.scrollHeight` "before" restructure was not captured** — see item 2.
- **Word-per-section budget (≤90 words) was verified by manual count while drafting, not by an automated per-section counter.** I'm confident in the numbers (the tightest section, HowItWorks, is ~61 words; most are well under that), but I didn't build tooling to verify this claim independently the way I did for contrast, overflow, and console errors. Flagging this so it isn't read as machine-verified when it wasn't.
- **The `CommitmentsBar` figures (24h / 2 / 0) and the RiskBand no-show check are drafted, not founder-confirmed** — per the brief's own Part 6, these ship as-is but need sign-off before launch. Not a build gap, just repeating the brief's own flag here since it's easy to miss.
