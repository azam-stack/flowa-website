/**
 * Single source of truth for every user-facing string on the site (en-GB).
 * No component should hard-code copy — import from here instead. A future
 * site.da.ts (or any other locale) can mirror this shape.
 *
 * `£TBC` marks prices that were DKK in the v1 brief and must NOT be
 * auto-converted — the founder sets the real GBP figures.
 *
 * RESTRUCTURE NOTE: the homepage was cut to 11 sections per the WINGM-model
 * restructure brief. Deleted exports (problems, valueProps, services,
 * industries, differentiator, pipelineSection, whatSetsUsApart, whyFlowa,
 * caseStudies, trust) are gone, not commented out — see git history if you
 * need the old copy. `team`, `signedStatement*`, `peopleSection` are
 * frozen (section 7, "Founders") and were not touched by this pass.
 */

export const PRICE_TBC = "£TBC" as const;

/**
 * Anchor navigation. Every link points at a section that exists on this
 * page — the mega-menu (src/components/nav/) is kept in the codebase but
 * unmounted until there are real sub-pages for it to point at.
 */
export const nav = {
  anchors: [
    { label: "Services", href: "#offer", sectionId: "offer" },
    { label: "How it works", href: "#how-it-works", sectionId: "how-it-works" },
    { label: "Pricing", href: "#pricing", sectionId: "pricing" },
    { label: "Team", href: "#team", sectionId: "team" },
    { label: "FAQ", href: "#faq", sectionId: "faq" },
  ],
  links: {
    services: "Services",
    industries: "Industries",
    about: "About",
    pricing: "Pricing",
  },
  bookCall: "Book a call",
  skipToContent: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  servicesPanel: {
    coreHeading: "Core services",
    core: [
      { title: "Appointment setting", description: "Qualified meetings with decision-makers, booked straight into your calendar.", href: "#offer" },
      { title: "Lead research", description: "Hand-verified lists of companies that match your ICP.", href: "#offer" },
      { title: "Outbound campaigns", description: "Cold email at scale, built on data that's actually checked.", href: "#offer" },
      { title: "Sales development", description: "An outbound function that runs without you hiring for it.", href: "#offer" },
    ],
    howWeWorkHeading: "How we work",
    howWeWork: [
      { title: "Our process", href: "#how-it-works" },
      { title: "Qualification criteria", href: "#faq" },
      { title: "Reporting & transparency", href: "#faq" },
    ],
    bySizeHeading: "By company size",
    bySize: [
      { title: "Startup", href: "#contact" },
      { title: "Scale-up", href: "#contact" },
      { title: "Established B2B", href: "#contact" },
    ],
    featured: {
      title: "No cure, no pay",
      body: "You pay per qualified meeting. Nothing else.",
      linkLabel: "See pricing",
      href: "#pricing",
    },
  },
  // Industries content stays in this mega-menu only — the standalone
  // "Industries" homepage section was cut in the restructure.
  industriesPanel: [
    { title: "B2B SaaS", href: "#contact" },
    { title: "IT & software", href: "#contact" },
    { title: "Marketing & creative agencies", href: "#contact" },
    { title: "Professional services", href: "#contact" },
    { title: "Consulting", href: "#contact" },
    { title: "Other B2B", href: "#contact" },
  ],
  aboutPanel: {
    companyHeading: "Company",
    company: [
      { title: "About Flowa", href: "#team" },
      { title: "Who we are", href: "#team" },
      { title: "Contact", href: "#contact" },
    ],
    learnHeading: "Learn",
    // No blog exists yet — do not link an empty blog. Add items here once content exists.
    learn: [] as { title: string; href: string }[],
  },
} as const;

export const hero = {
  eyebrow: "B2B appointment setting — pay per meeting",
  h1: ["Creating meetings.", "That create opportunities."],
  sub: "Flowa fills your calendar with qualified sales meetings with the decision-makers you actually want to sell to — so your team spends its time in conversations, not hunting for them.",
  ctaPrimary: "Book a call",
  ctaSecondary: "See how it works",
  reassurance: "No lock-in. You only pay for meetings that meet your criteria.",
  foundedBy: "Founded and run by Ahmed and Anton.",
  card: {
    label: "From first contact to booked meeting",
    steps: ["Prospects", "Conversations", "Qualified meetings", "Opportunities"],
    caption: "You only ever see meetings that meet your criteria. We filter out everything else before it reaches your calendar.",
    // An illustrative, anonymised example — not a real client or contact.
    meeting: { company: "Head of Sales, logistics company (120 people)", role: "Decision-maker · matches your ICP", when: "Tue 14 Oct, 10:00", tag: "Qualified" },
  },
} as const;

/**
 * Client logo marquee (supersedes C1 — Flowa now has real clients, so this
 * section ships). `ClientLogos` reads this array and renders nothing at
 * all while it's empty — do not add a "logos coming soon" caption or a
 * greyed-out box instead of a real logo.
 *
 * `slug` + `format` map to `public/logos/{slug}.{format}`. `scale` is an
 * optional 0.8–1.3 per-logo optical correction (default 1.0), set by eye
 * at 1440px — a thin all-caps wordmark and a bold rounded one at identical
 * pixel heights read as mismatched weight, not just mismatched size.
 *
 * Adversus and Generaxion supplied their own logo files directly (PNG/WebP,
 * not SVG — no vector source offered). Both were processed, not redrawn:
 * Adversus already had a real transparent background: extracted and
 * cropped to its content, no colour or shape altered. Generaxion's was
 * flat black-on-white with no alpha: the white was chroma-keyed to
 * transparent (alpha = darkness) and cropped to content — same glyphs,
 * same black, just transparent. Per the brief's own PNG-fallback rule
 * ("require a transparent background at 3× the display height"), both
 * clear it well past 3×.
 *
 * Lemon Marketing, Datapeeps and Partner Team also supplied their own
 * files directly. Partner Team's was flat near-white with no alpha —
 * chroma-keyed the same way as Generaxion's. Lemon Marketing's proper
 * wordmark (the "LEMON MARKETING" lockup, replacing an earlier file that
 * was just a lemon photo with no text) was already genuinely transparent,
 * used as supplied. Neither's colours or shapes were altered.
 *
 * Datapeeps later supplied a proper vector logo (replacing an earlier
 * raster file that was a full gradient brand tile, not a marquee-ready
 * wordmark). The SVG's wordmark path ships with `fill="white"` — built
 * for a dark surface — so on this light background it would render as
 * an invisible name next to a visible icon. Recoloured just that fill to
 * `#0c0c0b` (the site's near-black text colour) to make it legible here;
 * shapes, the icon's colours and everything else in the file are
 * untouched — a colour swap on real vector source, not a redraw.
 *
 * Confirm the exact legal spelling/capitalisation of every name with the
 * founders — it must match how each company writes it themselves.
 */
export type Client = { name: string; slug: string; url: string; scale?: number; format?: "svg" | "png" };
export const clients: Client[] = [
  { name: "Adversus", slug: "adversus", url: "https://adversus.io", format: "png", scale: 1 },
  { name: "Generaxion", slug: "generaxion", url: "https://generaxion.com", format: "png", scale: 1 },
  { name: "Lemon Marketing", slug: "lemon-marketing", url: "https://lemonmarketing.dk", format: "png", scale: 1 },
  { name: "Datapeeps", slug: "datapeeps", url: "https://datapeeps.dk", format: "svg", scale: 1 },
  { name: "Partner Team", slug: "partner-team", url: "https://partnerteam.dk", format: "png", scale: 1 },
];

export const clientLogos = {
  heading: "Companies that trust us",
} as const;

/**
 * Section 2, "Problem" — merges the old six-card Problems grid and the
 * four-card ValueProps grid into one section, capped at four items per
 * the restructure brief (1.3).
 */
/**
 * Section 2, "Problem" — three points, set as text columns rather than
 * icon cards. The fourth point from the earlier version ("a bad
 * experience with an agency before") now opens the comparison section,
 * where it belongs.
 */
export const problem = {
  eyebrow: "Why Flowa",
  h2: "Outbound that nobody owns doesn't happen.",
  items: [
    { title: "Unpredictable pipeline", body: "Deals dry up the moment prospecting stops being someone's job." },
    { title: "Reps prospecting instead of selling", body: "Your best closers spend the week finding people to talk to, not talking to them." },
    { title: "No one owns outbound", body: "It's everyone's job a little and no one's job properly. So it doesn't happen." },
  ],
} as const;

/**
 * Section 3, "Offer" — the pitch on the left, the four services as a
 * list on the right. Each service has an id so the nav and footer can
 * point at it.
 */
export const offer = {
  eyebrow: "What you get",
  h2: "Everything that fills your calendar, in one service.",
  body: "Appointment setting, lead research, outbound campaigns and sales development — one team, one point of contact, one invoice. You don't buy a list or a tool. You buy a calendar full of qualified meetings.",
  ctaSecondary: "See pricing",
  servicesHeading: "The four things we do",
  services: [
    { id: "appointment-setting", title: "Appointment setting", description: "Qualified meetings with decision-makers, booked straight into your calendar." },
    { id: "lead-research", title: "Lead research", description: "Hand-verified lists of companies that match your ICP." },
    { id: "outbound-campaigns", title: "Outbound campaigns", description: "Cold email and phone, built on data that's actually checked." },
    { id: "sales-development", title: "Sales development", description: "An outbound function that runs without you hiring for it." },
  ],
} as const;

/**
 * Section 4, "RiskBand" — copy is verbatim from the restructure brief
 * (2.1). Only confirmed commitments appear in `checks`: nothing here is a
 * placeholder. TODO(founders): once the no-show policy and any further
 * promises (reply time, who is on the account) are confirmed, add them
 * as plain strings — they render as additional checks.
 */
export const riskBand = {
  headline: ["If we don't book the meetings,", "you don't pay."],
  paragraph: "No retainers. No setup fees. No paying for activity, effort or a monthly report. You pay per qualified meeting and nothing else.",
  checks: ["You set the qualification criteria before we start", "You only pay for meetings that meet them"],
  payoff: "We only get paid when your calendar fills. That's the deal.",
} as const;

/**
 * Section 5, "HowItWorks" — rebuilt per the restructure brief (2.3). The
 * heading ships without a timeframe: no number has been confirmed that
 * holds on every engagement — see PART 6, item 2 of the restructure brief.
 */
export const howItWorks = {
  eyebrow: "How it works",
  h2: "From kickoff to your first qualified meeting",
  steps: [
    { n: "01", title: "Define who you want to meet", body: "We agree your ideal customer, the job titles worth talking to, and what counts as a qualified meeting." },
    { n: "02", title: "We build the list by hand", body: "Every company and contact is checked by a person. No purchased lists, no scraped data." },
    { n: "03", title: "We run the outreach", body: "Email and phone, written and made by us. You see everything that goes out." },
    { n: "04", title: "You take the meetings", body: "Booked into your calendar, with the context you need before you join." },
  ],
} as const;

/**
 * Section 6, "ComparisonTable" — replaces the old two-column WhyFlowa
 * table. Rows describe commercial terms only, per C3 of the restructure
 * brief — never an outcome or a performance claim.
 */
export const comparisonTable = {
  eyebrow: "Comparison",
  h2: "Why not hire an SDR, or use a traditional agency?",
  intro: "If you've tried an agency before, you probably remember vague reporting, unqualified leads and a contract that was hard to leave. Here's how the three options differ on the terms that matter.",
  mobileHint: "Pick a column to compare",
  columns: ["Hiring an SDR", "A traditional outbound agency", "Flowa"],
  rows: [
    { label: "Cost model", cells: ["Salary, tools, management overhead", "Monthly retainer regardless of output", "Per qualified meeting"] },
    { label: "Your risk if it doesn't work", cells: ["You've hired someone", "You've paid the retainer", "You've paid nothing"] },
    { label: "Minimum commitment", cells: ["Employment contract", "Typically 3–6 months", "None"] },
    { label: "Who does the work", cells: ["One junior, learning your market", "A rotating pod you rarely meet", "Ahmed and Anton. Every time"] },
    { label: "What you're buying", cells: ["Capacity", "Activity and reports", "Meetings"] },
    { label: "Getting started", cells: ["Recruit, onboard, train", "Onboarding, then a shared queue", "We start on your list in week one"] },
  ],
} as const;

/**
 * The two founders. `surname`, `linkedin` and `bio` are `null` until the
 * founders supply them — do not invent them. Components must branch on
 * `null` rather than render it, so nothing fabricated reaches the page.
 * TODO(founders): supply ahmed.surname, ahmed.linkedin, ahmed.bio,
 * anton.surname, anton.linkedin, anton.bio — see addendum brief Part A/C.
 *
 * FROZEN — section 7 ("Founders") in the restructure brief. Do not edit
 * this export, `signedStatement*`, `peopleSection`, `Team.tsx` or
 * `TeamPortrait.tsx`; only its position in the page may change.
 */
export type TeamMember = {
  firstName: string;
  surname: string | null;
  role: string;
  /** Base path with no extension — TeamPortrait derives .avif/.webp/.jpg. */
  photoBase: string;
  linkedin: string | null;
  bio: string | null;
  owns: string[];
};

export const team: { ahmed: TeamMember; anton: TeamMember } = {
  ahmed: {
    firstName: "Ahmed",
    surname: null,
    role: "Co-founder",
    photoBase: "/images/team/ahmed",
    linkedin: null,
    bio: null,
    owns: ["Market research and targeting", "Outreach copy and sequences", "Reporting"],
  },
  anton: {
    firstName: "Anton",
    surname: null,
    role: "Co-founder",
    photoBase: "/images/team/anton",
    linkedin: null,
    bio: null,
    owns: ["Campaign strategy", "Calls and conversations", "Booking and follow-up"],
  },
} as const;

// Which founder's name sits under the signed statement below the team
// cards. Swap to "anton" if the founders prefer — the quote text itself
// is verbatim from the addendum brief.
export const signedStatementAttribution: keyof typeof team = "ahmed";

export const signedStatement = {
  quote:
    "We'd rather run five campaigns properly than twenty badly. That's why we take on a limited number of clients at a time — and why we'll say no if we don't think we can fill your calendar.",
} as const;

export const peopleSection = {
  eyebrow: "The team",
  h2: "The two people behind every Flowa campaign",
  intro: "No pods, no offshore team, no rotating SDRs. These are the people who research your market, write your outreach, make the calls and book the meetings.",
  ownsHeading: "What they own",
  bioPending: "Bio coming soon.",
} as const;

/**
 * Section 8, "Pricing" — two modes.
 *
 * `mode: "model"` (current): explains how pricing works and asks for a
 * quote. Used while there are no confirmed per-meeting prices — a tier
 * grid without numbers tells the visitor nothing.
 *
 * `mode: "tiers"`: renders `tiers` with real prices. Switch to it only
 * when every `price` below is a real figure (the build fails on `£TBC`
 * in tiers mode — see scripts/check-content.mjs). `popular` is only
 * shown when `popularBasis` names the data it rests on.
 */
export const pricing = {
  mode: "model" as "model" | "tiers",
  eyebrow: "Pricing",
  h2: "Price per qualified meeting",
  body: "No flat fee per lead or per activity — you pay exclusively for meetings that meet the criteria we agree together. Price per meeting falls as volume grows.",
  model: {
    points: [
      { title: "One price per qualified meeting", body: "Agreed before we start, written into the criteria. No retainer, no setup fee, no charge for activity." },
      { title: "The price falls as volume grows", body: "The more meetings a month you want, the less each one costs. We quote for the volume you actually need." },
      { title: "A meeting that doesn't meet the criteria isn't invoiced", body: "Qualification is decided against the written criteria, not our opinion on the day." },
    ],
    quoteCta: "Get a quote for your volume",
    quoteHint: "Takes a 20-minute call. We'll come back with a per-meeting price the same day.",
  },
  tiers: [
    { name: "Starter", price: PRICE_TBC, note: "For getting started", popular: false },
    { name: "Growth", price: PRICE_TBC, note: "For a steady flow of meetings", popular: false },
    { name: "Scale", price: PRICE_TBC, note: "For high, sustained volume", popular: false },
  ],
  /** e.g. "based on clients in 2025" — required before any tier can show "Most chosen". */
  popularBasis: null as string | null,
  popularLabel: "Most chosen",
  perMeeting: "per qualified meeting",
  cta: "Book a call",
  includedHeading: "Every engagement includes",
  included: ["Strategy & ICP definition", "Targeted research", "Direct outreach", "Qualification against your criteria", "Meetings delivered to your calendar"],
} as const;

/**
 * Section 9, "Faq" — only questions with real answers ship. Two more are
 * ready to add the moment the founders confirm them: "What happens if a
 * meeting is cancelled or a prospect doesn't show?" (no-show policy) and
 * "Is there a minimum term?" (notice/contract terms). Keep index.html's
 * FAQPage JSON-LD in sync with this list.
 */
export const faq = {
  eyebrow: "Questions",
  h2: "Frequently asked questions",
  items: [
    { q: "How does no cure, no pay work?", a: "You only pay for meetings that meet the criteria we agree in advance — no meetings, no invoice. There's no charge for leads, calls or activity." },
    { q: "Who contacts our prospects?", a: "Ahmed and Anton. No one else speaks to your market on your behalf — no call centre, no rotating team of junior SDRs." },
    { q: "What counts as a qualified meeting?", a: "We agree this with you concretely before we start — typically based on role or decision-making authority, genuine interest, and a match with your ICP. The criteria are written down, so there's no ambiguity later." },
    { q: "How quickly can we start?", a: "After an initial call we agree strategy and ICP, after which onboarding can typically begin within a short timeframe. The exact timeline depends on your industry and complexity." },
  ],
} as const;

/**
 * Section 10, "FinalCta" — merged with the old standalone Contact form
 * section (the restructure brief's 11-section table has no separate
 * "Contact" row; the booking form now lives inside this section, which
 * answers "How do I start?"). The mailto/honeypot logic itself is
 * unchanged from before the restructure.
 */
export const finalCta = {
  eyebrow: "Get started",
  h2: "Ready to fill your calendar?",
  body: "Tell us about your ideal customer and we'll come back to you within one working day to find a time that works.",
  email: "flowameetings@gmail.com",
  linkedin: "Flowa on LinkedIn",
  fields: {
    name: "Name",
    company: "Company",
    email: "Work email",
    phone: "Phone (optional)",
    message: "What are you selling, and to whom?",
    messagePlaceholder: "A sentence on your product and the decision-makers you want to meet",
  },
  errors: {
    required: "Please fill this in.",
    email: "That doesn't look like an email address.",
    network: "Something went wrong and your request wasn't sent. Try again, or write to us directly at",
  },
  submit: "Send request",
  sending: "Sending…",
  privacy: "We use what you send us only to reply to you. Nothing is shared or added to a list.",
  // Shown when the request was delivered to Flowa's form endpoint.
  successTitle: "Sent — Ahmed or Anton will reply within one working day.",
  successBody: "You'll get a reply from",
  // Shown when no form endpoint is configured and the browser's email
  // client was opened instead — the honest version of "sent".
  mailtoTitle: "We've opened your email client with the details filled in.",
  mailtoBody: "Press send there and it reaches us. If nothing opened, write to us directly at",
  responsePromise: "You'll hear back from Ahmed or Anton within one working day.",
} as const;

export const footer = {
  navigationHeading: "Navigation",
  contactHeading: "Contact",
  rights: "All rights reserved.",
  /** TODO(founders): LinkedIn company page URL. The link is omitted while null. */
  linkedinUrl: null as string | null,
} as const;

export const meta = {
  title: "Flowa — Creating meetings. That create opportunities.",
  description: "Flowa helps B2B companies get qualified sales meetings with the decision-makers they actually want to sell to. No cure, no pay — you only pay for meetings that meet your criteria.",
  keywords: "B2B appointment setting, appointment setting agency UK, B2B lead generation London, qualified sales meetings, outbound agency UK, cold email agency, pay per qualified meeting",
} as const;
