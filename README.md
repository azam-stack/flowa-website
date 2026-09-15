# Flowa — website

Marketing website for Flowa (B2B appointment setting, cold calling and cold email, paid per qualified meeting). Vite + React 18 + TypeScript + Tailwind 3 + React Router. The site is static (GitHub Pages); the lead form posts to a small Cloudflare Worker in `backend/`. Copy is English (en-GB); the market/language/currency decision is still open (see "Decisions that are still the founders'").

## Routes

| Route | Page | Data |
|---|---|---|
| `/` | Home | `src/content/site.en.ts` |
| `/services` | Services hub | `src/content/services-hub.ts` + the service registry |
| `/services/appointment-setting` | Service page | `src/content/services/appointment-setting.ts` |
| `/services/cold-calling` | Service page | `src/content/services/cold-calling.ts` |
| `/services/cold-email` | Service page | `src/content/services/cold-email.ts` |
| `/cases` | Cases | `src/content/cases.ts` |

Every service page is the same template (`src/pages/ServicePage.tsx`) rendering one `ServiceDefinition` (`src/content/types.ts`). To add a service (LinkedIn outreach, lead research, multichannel), add a data file and register it in `src/content/services/index.ts`; the route, the mega-menu, the hub card, the footer, the related-services links, the sitemap and the prerendered HTML follow. The content modules import nothing from React, so they can move to a CMS without touching components.

**Honesty is in the types.** A `Stat` carries `sourceType: "verified" | "benchmark" | "target" | "process"` and the page prints the provenance beside every number (`SourceBadge`); a `value: null` stat is pending a real figure and is not rendered; only verified numeric stats count up. A `CaseStudy` renders metrics and its testimonial only when `verified: true`; `caseStudies` is empty until a client approves a write-up. Every product-style visualisation uses the generic demo data in `src/content/demo.ts` and is labelled illustrative. `scripts/check-content.mjs` fails the build on placeholders, benchmarks without a source, placeholder stat values and unverified "verified" cases.

**Direct loads.** `scripts/prerender-routes.mjs` runs after the Vite build and writes one HTML file per route with its title, description, canonical, Open Graph/Twitter tags and JSON-LD (Service, FAQPage, BreadcrumbList; Organization and WebSite are in `index.html`), plus `404.html` as the SPA fallback and `sitemap.xml`. `src/lib/seo.ts` keeps the live document in step during client-side navigation.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5174
npm run build          # content check + typecheck + production build to dist/
npm run preview        # serve the production build locally
npm run check:content  # the content check on its own
```

`FlowaWebsite.app`, `start.command`, `start.sh` and `start.bat` are one-click launchers for non-developers: they open a terminal, install if needed, and start the dev server.

### Live site (no terminal needed)

Every push to `main` builds the site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`. One-time setup in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**. The site is then at https://azam-stack.github.io/flowa-website/ and updates itself a minute or two after each push.

The workflow builds with `VITE_BASE=/flowa-website/` so assets resolve under the sub-path (every `public/` file referenced from code goes through `src/lib/asset.ts`). When the site moves to its own domain, set a custom domain under the same Pages settings and change `VITE_BASE` in the workflow to `/`. The workflow passes the repository variables `VITE_CONTACT_ENDPOINT`, `VITE_BOOKING_URL` and `VITE_ANALYTICS_ENDPOINT` to the build (Settings → Secrets and variables → Actions → Variables); each is optional.

### Form delivery, booking and analytics

One form (`src/components/LeadForm.tsx`) on every page: first/last name, business email, phone, company, job title, company size, industry, website, goal, preferred timing. Validation and sanitisation live in `src/lib/lead-schema.ts` and are shared with the backend, so the server enforces exactly what the form promises. Honeypot, minimum time-on-form, disabled button while sending, and the last successful submission remembered for the session so an identical resubmit is acknowledged instead of re-sent.

- `VITE_CONTACT_ENDPOINT` set: the form POSTs JSON to it (the worker in `backend/`) and shows the real outcome: sent, validation errors from the server, rate-limited, server error, network failure or timeout, each with a retry where retrying makes sense.
- Unset: the form opens the visitor's email client with the details filled in and says exactly that, never "sent".
- `VITE_BOOKING_URL`: the one booking flow. Every "Book a call" (`BookCallLink`) goes to it; unset, they go to the lead form on the current page.
- `VITE_ANALYTICS_ENDPOINT`: events (`page_view`, `service_view`, `cta_click`, `book_call_click`, `form_start/submit/success/error`, `service_card_click`, `case_study_open`, `faq_open`, `scroll_depth`) are pushed to `window.dataLayer` always and beaconed there when set. No lead fields are ever sent to analytics. UTM parameters are captured on landing and attached to the lead.

See `backend/README.md` for deploying the worker (KV storage, Resend notification, CRM provider interface, rate limit).

## Home page structure

Sections, each answering one question, assembled in `src/pages/HomePage.tsx` in this order:

| # | File | Answers | Anchor |
|---|---|---|---|
| 1 | `sections/Hero.tsx` + `components/ClientLogos.tsx` | What is it, for whom, on what terms? | `#top` |
| 2 | `sections/Offer.tsx` | What do I get? (four services as a list) | `#offer` + one id per service |
| 3 | `sections/HowItWorks.tsx` | How does it work? (four steps) | `#how-it-works` |
| 4 | `sections/WhoWeHelp.tsx` | Who is it for? (a fit description) | `#who-we-help` |
| 5 | `sections/RiskBand.tsx` | What do I risk? (the deal) | — |
| 6 | `sections/ComparisonTable.tsx` | Why you and not an SDR or an agency? | — |
| 7 | `sections/Team.tsx` | Who does the work? | `#team` |
| 8 | `sections/Pricing.tsx` | What does it cost? | `#pricing` |
| 9 | `sections/GetStarted.tsx` | What am I unsure about, and how do I start? (FAQ + form) | `#faq`, `#contact` |
| — | `components/Footer.tsx` | | |

- **`src/content/site.en.ts`** is the only place copy lives. No component hard-codes a user-facing string. A `site.da.ts` with the same shape is the path to a Danish version.
- **`scripts/check-content.mjs`** runs before every build and fails it if any string in the content file contains a bracketed placeholder, if pricing is in `tiers` mode while a price is still `£TBC` or a tier is marked popular without a `popularBasis`, or if the FAQPage JSON-LD in `index.html` differs from `faq.items`. Missing content is omitted from the page by the components, never shown as a note to the founders.
- **Navigation**: Services (mega-menu: the three services, the four steps, three reasons; hover intent, arrow keys, Escape) · How it works · Who we help · Cases · About + Book a call. One underline glides to the current route or, on the home page, the section in view. The mobile drawer (`components/nav/MobileDrawer.tsx`) traps focus, closes on Escape and returns focus.
- **Service-page components** (`src/components/`): `StatsBand` + `SourceBadge`, `FlowaEngine` (the recurring pipeline strip), `ProcessFlow` (five steps on a line that keeps moving), `QualificationModel` (interactive five-criteria pipeline), `ChannelSystem` (current / supporting / planned nodes), `Pillars` (people, process, performance micro-systems), `ReplyRouting`, `ReportingPanel` (funnel from `CampaignMetrics`, labelled demo data), `OperatorSection` (Ahmed's cutout inside a glass composition; the team portraits themselves are untouched), `ProspectCard`, `MeetingCard`, `ServiceCard`, `CaseStudies`, `FaqSection`, `RelatedServices`, `LeadCta`. Hero visualisations: `PipelineVisual`, `DialerVisual`, `EmailVisual`, all lazy-loaded, all gated by IntersectionObserver and tab visibility, all static in their final state under `prefers-reduced-motion`.
- **Shared components** (`src/components/`): `Section` + `SectionHeader` (one rhythm, one eyebrow style), `Card`, `Badge`, `Accordion`, `Field`/`TextareaField`, `Button`/`LinkButton`, `Reveal`, `TeamPortrait`, `ClientLogos`, `Logo`, `DecorativeBlob`, `Container`.
- **Client logos** (`public/logos/`) are the clients' real marks, processed only to key out flat backgrounds; none is redrawn. The marquee measures its own width and pauses on hover, focus, when off-screen and when the tab is hidden.

## Design tokens

`src/index.css` holds the token system and is the single source of truth; `tailwind.config.ts` reads it (colours as rgb triplets, so `bg-accent/10` and `var(--color-accent)` are the same value). Families: colour (background, surface, text, border, accent, status), glass (opacity, blur, border), gradients (atmosphere, surface, accent, highlight, depth), light, shadow (subtle, medium, deep, glow), depth (stacking levels), blur, opacity, radius, border, focus, motion (five durations, five curves, four hierarchy presets: primary, secondary, micro, ambient) and interaction. Few colours, many materials. A value that appears twice becomes a token.

## Design system

Tokens live in `tailwind.config.ts` (with the motion and orange variants as CSS variables in `src/index.css`):

- **Type**: `text-display` (40→64 px), `text-h2` (28→44), `text-h3` (18→22), `text-lead` (16→19), `text-body` 16, `text-small` 14, `text-eyebrow` 15 — all `clamp()`, so each role is one token.
- **Section rhythm**: `py-section` 48→96, `py-band` 64→112, `py-compact` 40→64. `density` on `Section` is the only spacing knob a section gets.
- **Radii**: `rounded-field` 12 (inputs, small elements), `rounded-card` 20 (every card and large surface), `rounded-full` (pills). **One** border token. **One** shadow (`shadow-float`), only for the hero artefact and the drawer.
- **Colour**: `bg`, `fg`, `muted`, `border`, `card`, `accent` (+ `hover`, `fg`), `riskband`, `error`. `accent.display` (#C9741E) is the deepened orange for display-size text on the light background (3.3:1 — display only, never under 20 px bold); `accent.band` (#A85E14) is for white text on an orange fill. Every text/background pair on the rendered page was measured with the WCAG formula and passes AA at its size.
- **Buttons**: `primary` (near-black, orange on hover) is the default; `accent` (orange) only in the nav and on the form; `ghost` for secondary actions. One orange button in view at a time — the nav button turns orange only once the hero's own button has scrolled away.
- **Motion** (`--dur-fast` 150 ms, `--dur` 240 ms, `--dur-reveal` 480 ms, `--ease` cubic-bezier(.16,1,.3,1)): hero entrance on load (the only load animation), section-level reveal, the how-it-works line drawing itself, comparison pills arriving row by row, a nav underline that glides between links, form feedback (field shake, fading error text, spinner, fading confirmation). `prefers-reduced-motion` collapses all of it to instant.

## The hero system

One system, three layers, recomposed by screen size (heading · visual · explanation on desktop; heading, visual, explanation on mobile):

- **The light-form** (`components/FluidObject.tsx`): a soft, grainy, luminous body rendered in WebGL — a sphere deformed by slow noise, lit by a synthetic environment in Flowa's palette, light refracted through it, a feathered edge and film grain. It moves slowly, leans with the pointer, renders only while on screen, caps its pixel ratio, shows one still frame under `prefers-reduced-motion` and falls back to a CSS form without WebGL. Its physical quality comes from the reference clip (`cosmos_959700922.mp4`); its softness and grain from the two reference images (`inspoflowa1.webp`, `inspoflowa2.webp`). It returns once, in ink, rising from below the headline of the dark band.
- **The flow** (`components/FlowSystem.tsx`): the states an opportunity passes through — Company, Decision-maker, Conversation, Qualified — as small glass chips along one line that draws itself, with a single point of light travelling it on a slow loop. Conceptual and anonymised; the note says so. On small screens the first state is dropped and the line is hidden.
- **The meeting**: where the flow ends, one qualified meeting as a physical card (from `hero.card.meeting`).

The same system continues down the page: the process shows, under each step, the kind of thing the step produces (a chosen company, an activity log, three criteria met, a calendar slot — illustrative, and the section says so); the dark band is the transformation moment, where "You don't pay for promises." is crossed out as "You pay when meetings are created." rises in its place. Everywhere else, hierarchy comes from typography and whitespace; product-style UI appears only where it explains something.

## Motion language

Derived from a frame-by-frame study of the reference clip in `cosmos_959700922.mp4` (20 s, 30 fps): one translucent object drifting over a warm-to-cool gradient. Measured, not eyeballed: mean per-frame change 0.3–0.7 (on a 0–255 scale), position drift within ±6 % of the frame, size within ±10 %, motion arriving in waves every 3–4 s, and the last frame within 1.5 of the first. The principles behind it, as applied here:

1. **One living object.** The reference has one; the site has one — the light-form in the hero (and once more, in ink, in the band), never still, never dramatic. The only other continuous motion is the point of light travelling the flow.
2. **Small amplitudes, long settles.** Three distances (8 / 16 / 28 px), one expo-out curve, 600–1000 ms. Nothing snaps.
3. **Depth by layering, not shadow.** Surfaces (table, cards) arrive from further back with a 3 % scale; labels arrive from nearer. Parallax on the hero O and the band headline (CSS scroll-driven, desktop only).
4. **Rhythm in waves.** Each section arrives in beats: rule → eyebrow → heading → lead → rows, 70 ms apart, not all at once.
5. **Reveal, don't fade.** The form comes into focus first; the hero headline rises out of a line mask; the lead sharpens; a rule draws in beside every eyebrow.
6. **Whitespace is the material.** Two thirds of the reference frame is empty. Section rhythm and line lengths are kept generous; no decoration was added.
7. **Interaction confirms.** Button labels slide up and are replaced by themselves; the primary calls to action lean a few pixels toward the pointer; arrows lead by 3 px.
8. **Continuous take.** The dark band is an inset panel, the comparison header carries its ink forward, the how-it-works line draws through its steps. Sections hand over to each other; none of them shouts.

Taken from the reference: the object — a translucent body with light passing through it, deforming slowly. Not taken: its gradient background and its palette; the object is rendered in Flowa's orange, cream and slate over the site's own off-white.

## Measurements (production build)

| | 1440 px | 390 px |
|---|---|---|
| Page height | 7 322 px | 8 887 px |
| Horizontal overflow | none (also none at 480, 768, 1024) | none |

The plan's mobile target was 7 500 px. The remaining ~1 400 px cannot be found without hiding content on mobile, which the plan rules out; the page was 12 982 px before the redesign.

## Decisions that are still the founders'

Nothing below is shown as a placeholder — each is omitted until it exists.

1. **Market, language and currency.** Domain `.dk`, Danish clients and founders, en-GB copy, `£` in the pricing types, UK keywords in `index.html`. Pick DK-first, UK-first or bilingual; then set `lang`, `hreflang`, meta keywords, `areaServed` in the Service JSON-LD and the currency together.
2. **Form endpoint and booking link** — deploy `backend/` and set `VITE_CONTACT_ENDPOINT`; set `VITE_BOOKING_URL` once a booking tool exists.
3. **Prices.** `pricing.mode` is `"model"` (how pricing works + a quote call to action). Switch to `"tiers"` only when `pricing.tiers[*].price` holds real figures; the build refuses `£TBC` in that mode. `popularBasis` must name the data behind a "most chosen" badge, or the badge doesn't render.
4. **No-show / cancellation policy** (`riskBand.checks` shows two confirmed checks; add the third when the policy exists, and a matching FAQ entry).
5. **Founder bios and LinkedIn URLs** (`team.ahmed`, `team.anton`: `surname`, `bio`, `linkedin` are `null`; `footer.linkedinUrl` too). When the URLs exist, also add `sameAs` to the founders in the Organization JSON-LD.
6. **A time-to-first-meeting figure** for the how-it-works heading, only if it holds on every engagement.
7. **Verified figures.** Every statistic on the service pages is a process fact or a Flowa target and says so. Stats with `value: null` (meetings booked to date, lead-to-meeting rate, connection rate, reply rate, qualified-response rate, meetings generated) render as soon as a measured figure replaces the null with `sourceType: "verified"`.
8. **Cases.** `caseStudies` is empty; the pages show the client logos and the case structure until a client approves a write-up.
9. **Legal pages.** `footer.legal` is empty and the column is omitted until privacy and terms text exists.

## SEO and sharing

- `index.html`: title, description, canonical, hreflang, Open Graph + Twitter card with `public/og-image.png` (1200×630, rendered from the site's own type and tokens), JSON-LD for Organization, Service and FAQPage (kept in sync by the content check). `public/sitemap.xml` and `public/robots.txt`.
- Portraits are served as avif/webp/jpg with explicit dimensions and lazy loading; fonts are self-hosted (`@fontsource-variable/inter`, `font-display: swap`).

## Known gaps

- **Lighthouse** has not been run (no Lighthouse in the build environment). Verify Performance / Accessibility / Best Practices / SEO before launch; the likely LCP element is the hero headline, and a `<link rel="preload">` for the latin Inter file would need the hashed filename from `dist/assets`.
- **Design references**: 21st.dev and Dribbble were blocked by the network policy during the redesign, so the visual direction rests on documented sources (shadcn/ui, motion) and own judgement, not on a reference pass. See the plan for the exact record.
- `RESTRUCTURE_REPORT.md` describes the earlier restructure and is kept as a record; the note at its top lists what no longer applies.
