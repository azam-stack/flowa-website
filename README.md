# Flowa — marketing website

Premium B2B marketing site for Flowa (appointment setting / B2B mødebooking, no cure no pay). Vite + React + TypeScript + Tailwind. Static site, no backend.

## Kom i gang

```bash
npm install
npm run dev       # http://localhost:5174
npm run build     # typecheck + production build to dist/
npm run preview   # serve the production build locally
```

## Struktur

- `src/sections/` — én komponent pr. sektion på forsiden (Hero, ValueProps, Differentiator, HowItWorks, Services, Audience, CaseStudies, WhyFlowa, Pricing, FAQ, FinalCTA, Contact), samlet i `src/App.tsx`.
- `src/components/` — genbrugelige UI-dele (Nav, Footer, Button, Logo, Reveal, Container, SectionLabel).
- Kontaktformularen (`Contact.tsx`) bruger `mailto:` til `flowameetings@gmail.com` — der er ingen backend. Skal den sende rigtige emails uden at åbne brugerens mailklient, kobl den til en formular-service (fx Formspree eller Resend) i stedet for `mailto:`.

## Hvad er placeholder og skal opdateres

- **Cases** (`CaseStudies.tsx`): kundenavne, branche, citater og tal er alle `[placeholder]` — ingen tal er opdigtet. Udfyld når rigtige cases er godkendt til offentliggørelse.
- **Trust-bar logoer** (`TrustBar.tsx`): tomme "Kundelogo"-bokse. Erstat med rigtige kundelogoer, når I har lov til at vise dem.
- **FAQ** (`FAQ.tsx`): to svar ("Hvad hvis et møde bliver aflyst?", "Er der binding?") er markeret som placeholder — indsæt jeres faktiske politik.
- **LinkedIn-linket** i Nav/Footer/Contact peger på linkedin.com generelt — opdatér til Flowas egen virksomhedsside.
- **Priser** (`Pricing.tsx`): Bronze/Sølv/Guld/Platin-priserne er reelle tal fra briefet, ikke placeholder.

## Design

- Farver, skrifttype og spacing er samlet i `tailwind.config.ts` (`bg`, `fg`, `muted`, `border`, `accent`, `ink*` for de mørke sektioner).
- Ét accentfarve (Flowas orange) bruges bevidst sparsomt — resten af paletten er sort/hvid/varm grå.
- Scroll-reveal (`Reveal.tsx`) bruger IntersectionObserver + en almindelig opacity/transform-transition — bevidst valgt frem for CSS keyframe-animationer, som viste sig upålidelige på tværs af scroll-mønstre under test.

## Se det lokalt hver dag

**Første gang:**
```bash
git clone https://github.com/azam-stack/flowa-website.git
cd flowa-website
```

**Hver gang derefter** — dobbeltklik `start.command` (macOS) / `start.bat` (Windows), eller kør `./start.sh`. Den installerer kun dependencies første gang og åbner derefter automatisk `http://localhost:5174` i din browser.

**Skrivebordsikon (macOS):** Hold ⌘ + Option nede og træk `FlowaWebsite.app` til skrivebordet for at lave en genvej (appen skal blive liggende i repoet).
