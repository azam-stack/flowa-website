> **This is the lab copy.** It is a draft of the "Frank by FLOWA" redesign and it never touches flowa.dk, its DNS, its forms or its endpoints. Every page carries `noindex, nofollow`, `robots.txt` disallows everything and no sitemap is written. Preview: https://azam-stack.github.io/flowa-website-lab/ (Settings → Pages → Source: GitHub Actions).

# Frank by FLOWA — website draft

The marketing site for **Frank, the AI outbound agent by FLOWA**, built to the brief in `frank-website-prompt.md` (structure and mood of altahq.com, recoloured to FLOWA, all copy and art original). Vite + React 18 + TypeScript + Tailwind 3 + React Router. Static (GitHub Pages); the two forms post to a small Cloudflare Worker in `backend/`. Copy is British English.

## Routes

| Route | Page | Copy |
|---|---|---|
| `/` | Homepage, sections 4.1–4.14 of the brief in order | `src/content/frank/home.ts` |
| `/frank` | Product page | `src/content/frank/pages.ts` |
| `/how-it-works` | Four steps with mini mock-ups | `pages.ts` |
| `/signals` | What Frank watches: the six engine steps and four example signals | `pages.ts` |
| `/channels/email`, `/channels/linkedin` | Frank on one channel | `pages.ts` |
| `/cases` | The honest case structure; no case is published until a client approves it | `pages.ts` |
| `/about` | The people behind Frank | `pages.ts` |
| `/pricing` | The quote quiz. No prices anywhere | `src/content/frank/pricing.ts` |
| `/demo`, `/contact` | The contact form as a page | `src/content/frank/form.ts` |
| `/faq` | Every FAQ, including the pricing ones | `home.ts` + `pricing.ts` |
| `/privacy`, `/cookies`, `/terms`, `/refunds` | Legal pages, re-skinned | `src/content/legal.ts` |

Old URLs redirect inside the draft: `/why-flowa` → `/signals`, `/services/cold-email` → `/channels/email`, `/services/linkedin-outreach` → `/channels/linkedin`, `/services/appointment-setting` → `/frank`, `/services` → `/frank` (`scripts/routes.ts`; the prerender writes a static stand-in with a canonical and a meta refresh, the router redirects in-app).

Global chrome (`src/components/frank/`): announcement bar, nav with dropdowns and the mobile sheet, the "Ask Frank" chat widget (quick replies only, no live AI), the logo marquee, the footer. The "Client dashboard" link renders only when `VITE_CLIENT_DASHBOARD_URL` is set.

## The rules the build enforces

`npm run build` runs, in order: `scripts/check-content.mjs` (no price, price range or "from £" in any content module; no Pilot/Core/Plus/Scale package name; no em dash in copy; no bracketed placeholder other than a `[CONFIRM …]` marker, and none at all once `VITE_DRAFT=false`), `tsc`, `vite build`, `scripts/prerender-routes.mjs` (one HTML file per route, noindex on every one, redirect stand-ins, `404.html`, no sitemap in draft mode) and `scripts/check-dist.mjs` (the same price and package-name scan on the built HTML and JS, the noindex check on every page, no sitemap, robots disallow). The only pound figures allowed anywhere are the two verified stats, £3.4M+ and £90K+.

## Frank, the character

`src/components/frank/FrankAvatar.tsx` is an original vector stand-in in the four poses the brief asks for (portrait, waving, laptop, thumbs-up), on the apricot square with the stippled bottom third or transparent. The brief asks for a 3D animated-film-style render; when that is produced, swap the SVG for the exported images in that one component. Spheres (`Sphere.tsx`), the sparkle grid (`SparkleGrid.tsx`) and the stippled illustrations (`Stipple.tsx`) are CSS and SVG, no image files. The OG image (`public/og-image.png`) is Frank on apricot with the FLOWA logo and "Meet Frank".

## Forms and the draft endpoint

Two submissions, one shape (`src/lib/lead-schema.ts`, shared with the worker): `contact` (first name, work email, message, consent) and `quote` (company_type, team_size, goals[], email, consent), both with `submitted_at`, `page_url` and UTM parameters. With `VITE_CONTACT_ENDPOINT` set they POST there and show the real outcome; unset, they open the visitor's email client addressed to info@flowa.dk and say so. The quiz rejects free mailbox domains ("Please use your work email"), requires consent, auto-advances on tiles, and tracks `quiz_step_1`…`quiz_step_4` and `quiz_submit`. Events only ever reach `window.dataLayer`; nothing is beaconed to the production analytics property.

The lead endpoint is `VITE_CONTACT_ENDPOINT`, the same name the live site uses. Repository variables are per repo, so this draft only gets a value if one is set on this repo (or locally in `.env.local`). It never reads `VITE_BOOKING_URL` or `VITE_ANALYTICS_ENDPOINT`.

## Getting started

```bash
npm install
npm run dev            # http://localhost:5174
npm run build          # content check + typecheck + build + prerender + built-output check
npm run preview        # serve the production build locally
npm run typecheck      # site and worker
```

Environment variables (all optional) are listed in `.env.example`. The deploy workflow (`.github/workflows/deploy.yml`) builds with `VITE_BASE=/flowa-website-lab/` and passes only the draft's own variables.

## Open items before launch

See section 10 of the brief: the approved client quote, the video, the client dashboard URL, founder photos, any security badge, the production inbox or CRM for leads, and the honesty check on how Frank works. Every one is marked `[CONFIRM]` in the content modules; the build refuses to ship them once `VITE_DRAFT=false`.
