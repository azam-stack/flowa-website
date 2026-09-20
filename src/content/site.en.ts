/**
 * Single source of truth for every user-facing string on the site (en-GB).
 * No component should hard-code copy — import from here instead. A future
 * site.da.ts (or any other locale) can mirror this shape. Pricing lives in
 * src/content/pricing.ts; service pages in src/content/services.
 *
 * RESTRUCTURE NOTE: the homepage was cut to 11 sections per the WINGM-model
 * restructure brief. Deleted exports (problems, valueProps, services,
 * industries, differentiator, pipelineSection, whatSetsUsApart, whyFlowa,
 * caseStudies, trust) are gone, not commented out — see git history if you
 * need the old copy. `team`, `signedStatement*`, `peopleSection` are
 * frozen (section 7, "Founders") and were not touched by this pass.
 */

/**
 * Primary navigation. Route links ("/services", "/cases") and section
 * links ("/#how-it-works") both go through the router; a section link on
 * another page navigates there first and then scrolls. The Services item
 * opens the mega-menu; its service rows come from the service registry
 * (src/content/services), never from a second list here.
 */
export const nav = {
  primary: [
    { key: "services", label: "Services", href: "/services", menu: true },
    { key: "how-it-works", label: "How it works", href: "/#how-it-works" },
    { key: "who-we-help", label: "Who we help", href: "/#who-we-help" },
    { key: "pricing", label: "Pricing", href: "/pricing" },
    { key: "cases", label: "Cases", href: "/cases" },
    { key: "about", label: "About", href: "/#team" },
  ],
  bookCall: "Book a call",
  skipToContent: "Skip to content",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  megaMenu: {
    servicesHeading: "Services",
    allServices: "All services",
    howItWorksHeading: "How it works",
    howItWorks: [
      { label: "Research", href: "/#how-it-works" },
      { label: "Reach", href: "/#how-it-works" },
      { label: "Qualify", href: "/services/appointment-setting#qualification" },
      { label: "Book", href: "/#how-it-works" },
    ],
    whyHeading: "Why Flowa",
    why: [
      { title: "Start with proof.", body: "Try us out with a Pilot, paid per booked meeting, then a fixed package.", href: "/pricing" },
      { title: "Qualified meetings.", body: "Five written checks before anything is booked.", href: "/services/appointment-setting#qualification" },
      { title: "Human conversations.", body: "Two founders. No call centre, no rotating pod.", href: "/#team" },
    ],
  },
} as const;

export const hero = {
  h1: ["Creating meetings.", "That create opportunities."],
  sub: "Flowa fills your calendar with qualified sales meetings with the decision-makers you actually want to sell to — so your team spends its time in conversations, not hunting for them.",
  ctaPrimary: "Book a call",
  ctaSecondary: "See how it works",
  reassurance: "Start with a Pilot: you only pay per booked meeting. No long-term commitment.",
  foundedBy: "Founded and run by Ahmed and Anton.",
  card: {
    label: "From first contact to booked meeting",
    steps: ["Prospects", "Conversations", "Qualified meetings", "Opportunities"],
    caption: "You only ever see meetings that meet your criteria. We filter out everything else before it reaches your calendar.",
    // An illustrative, anonymised example — not a real client or contact.
    meeting: { company: "Head of Sales, logistics company (120 people)", role: "Decision-maker · matches your ICP", when: "Tue 14 Oct, 10:00", tag: "Qualified" },
  },
  /**
   * The flow system in the hero: the states an opportunity passes through,
   * shown as connected nodes over the light-form and ending in the meeting
   * card above. Conceptual, anonymised — the note says so.
   */
  flow: {
    /** Shown inside the meeting card's label, after the word "Meeting". */
    note: "illustrative",
    nodes: [
      { label: "Company", sub: "Matches your ICP" },
      { label: "Decision-maker", sub: "Head of Sales" },
      { label: "Conversation", sub: "Email and phone" },
      { label: "Qualified", sub: "Meets your criteria" },
    ],
    end: "Meeting",
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
  { name: "Adversus", slug: "adversus", url: "https://adversus.io", format: "png", scale: 0.9 },
  { name: "Generaxion", slug: "generaxion", url: "https://generaxion.com", format: "png", scale: 0.66 },
  { name: "Lemon Marketing", slug: "lemon-marketing", url: "https://lemonmarketing.dk", format: "png", scale: 1.1 },
  { name: "Datapeeps", slug: "datapeeps", url: "https://datapeeps.dk", format: "svg", scale: 1.2 },
  { name: "Partner Team", slug: "partner-team", url: "https://partnerteam.dk", format: "png", scale: 1.25 },
];

export const clientLogos = {
  heading: "Companies we've booked meetings for",
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
  ctaSecondaryHref: "/pricing",
  explore: "Read more",
  servicesHeading: "What we do",
  services: [
    { id: "appointment-setting", title: "Appointment setting", description: "Qualified meetings with decision-makers, booked straight into your calendar." },
    { id: "lead-research", title: "Lead research", description: "Hand-verified lists of companies that match your ICP." },
    { id: "cold-calling", title: "Cold calling", description: "Direct conversations with decision-makers, made by the founders." },
    { id: "cold-email", title: "Cold email", description: "Targeted sequences built on data that's actually checked, every reply handled by a person." },
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
  /** The transformation: the first line gives way to the second. This is the band's only headline. */
  transform: ["You don't pay for promises.", "You start with proof."],
  paragraph: "Every engagement starts with a Pilot: try us out on your own market, pay per booked meeting and see the numbers for yourself, with no long-term commitment. Once the model is proven, you move to a fixed monthly package with a meeting commitment.",
  /** Confirmed commitments, rendered as a list once there are three. */
  checks: ["You set the qualification criteria before we start", "The Pilot is paid per booked meeting, not per activity", "Every package replaces no-shows"],
  checksSentence: "You set the qualification criteria before we start, the Pilot is paid per booked meeting, and every package replaces no-shows.",
  payoff: "Performance-led to start. Predictable once proven.",
} as const;

/**
 * Section 5, "HowItWorks" — rebuilt per the restructure brief (2.3). The
 * heading ships without a timeframe: no number has been confirmed that
 * holds on every engagement — see PART 6, item 2 of the restructure brief.
 */
export const howItWorks = {
  eyebrow: "How it works",
  h2: "From kickoff to your first qualified meeting",
  /** Small stylised interface states under each step — illustrative, never a real prospect. */
  illustrative: "Examples are illustrative.",
  steps: [
    { n: "01", title: "Target", body: "We agree your ideal customer, the job titles worth talking to, and what counts as a qualified meeting.", ui: { kind: "chips", items: ["Logistics · 120 people", "SaaS · 60 people", "Manufacturing · 250 people"], active: 0 } },
    { n: "02", title: "Reach", body: "We build the list by hand and start the conversations — email and phone, written and made by us.", ui: { kind: "activity", items: ["Email sent · Tue 09:10", "Call · Wed 10:14", "Reply · Wed 15:02"] } },
    { n: "03", title: "Qualify", body: "We separate genuine interest from a polite yes, against the criteria we wrote down together.", ui: { kind: "checks", items: ["Decision-maker", "Fits your ICP", "Genuine interest"] } },
    { n: "04", title: "Book", body: "Qualified meetings go straight into your calendar, with the context you need before you join.", ui: { kind: "calendar", items: ["Tue 14 Oct", "10:00", "Qualified meeting"] } },
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
  intro: "If you've tried an agency before, you probably remember vague reporting, unqualified leads and a contract that was hard to leave. Here's how the three options differ on the questions that matter.",
  mobileHint: "Pick a column to compare",
  columns: ["Hiring an SDR", "A traditional outbound agency", "Flowa"],
  /** Outcome and risk first, price last. Every cell: same voice, same shape. */
  rows: [
    { label: "What are you actually buying?", cells: ["Hours of outreach. Meetings not counted.", "Activity reports. Meetings not guaranteed.", "Meetings with decision-makers in your ICP. Nothing else counted."] },
    { label: "What do you lose if it doesn't work?", cells: ["Six months of salary and time.", "The full retainer, for the whole term.", "Nothing. No meetings, no invoice."] },
    { label: "What happens to a no-show or off-ICP meeting?", cells: ["Logged as activity. Nobody replaces it.", "Logged as a lead. Rarely replaced.", "Replaced. Not counted, not billed."] },
    { label: "Who actually does the work?", cells: ["One junior hire, learning your market.", "A rotating pod you rarely meet.", "Ahmed and Anton. Every time."] },
    { label: "What does it cost you before a single meeting?", cells: ["£40K+ salary, £5K tools, three months' ramp.", "A £3–6K retainer, 3–6 months signed.", "One onboarding fee. Then per meeting booked."] },
  ],
  /** The SDR and agency figures are market ranges, not quotes. */
  footnote: "SDR and agency figures are typical UK market ranges, not quotes.",
  /** Who Flowa is not for. Honest, one line, under the table. */
  notFor: "Flowa is not for everyone. We take on a small number of accounts at a time, so if you need high-volume outreach, we are the wrong fit.",
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
 * Section 9, "Faq" — only questions with real answers ship. Two more are
 * ready to add the moment the founders confirm them: "What happens if a
 * meeting is cancelled or a prospect doesn't show?" (no-show policy) and
 * "Is there a minimum term?" (notice/contract terms). The FAQPage JSON-LD is
 * generated from this list at build time.
 */
export const faq = {
  eyebrow: "Questions",
  h2: "Frequently asked questions",
  items: [
    { q: "How does pricing work?", a: "You start with a Pilot, paid per booked meeting with no long-term commitment. Once the model is proven, you move to a fixed monthly package: Core (£1,200 a month, 45+ meetings a year), Plus (£2,200 a month, 100+) or Scale (on request, 170+). The fixed packages include a meeting guarantee and carry one month's notice." },
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
  email: "info@flowa.dk",
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
  submit: "Fill my calendar",
  sending: "Sending…",
  privacy: "We use what you send us only to reply to you. Nothing is shared or added to a list.",
  // Shown when the request was delivered to Flowa's form endpoint.
  successTitle: "On it — Ahmed or Anton will reply within one working day.",
  successBody: "You'll get a reply from",
  // Shown when no form endpoint is configured and the browser's email
  // client was opened instead — the honest version of "sent".
  mailtoTitle: "We've opened your email client with the details filled in.",
  mailtoBody: "Press send there and it reaches us. If nothing opened, write to us directly at",
  responsePromise: "You'll hear back from Ahmed or Anton within one working day.",
} as const;

export const footer = {
  servicesHeading: "Services",
  companyHeading: "Company",
  contactHeading: "Contact",
  legalHeading: "Legal",
  company: [
    { label: "About", href: "/#team" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Who we help", href: "/#who-we-help" },
    { label: "Pricing", href: "/pricing" },
    { label: "Cases", href: "/cases" },
    { label: "Contact", href: "#contact" },
  ],
  /**
   * Privacy and terms pages. Empty until the founders supply the legal
   * text; the column is omitted while empty rather than linking to a
   * page that does not exist. TODO(founders).
   */
  legal: [] as { label: string; href: string }[],
  cta: { heading: "Ready to create more opportunities?", body: "Tell us who you sell to. Ahmed or Anton will reply within one working day." },
  rights: "All rights reserved.",
  /** TODO(founders): LinkedIn company page URL. The link is omitted while null. */
  linkedinUrl: null as string | null,
} as const;

/**
 * "Who we help": a fit description, not an industry list. Nothing here is
 * a customer claim; the verticals named are those of the clients whose
 * logos are on the page.
 */
export const whoWeHelp = {
  eyebrow: "Who we help",
  h2: "B2B companies whose sales start with a conversation.",
  intro: "Flowa works when a meeting with the right person is worth real money to you, and when that person can be described before we start. If that is you, we are a fit. If not, we will say so on the first call.",
  fitHeading: "A good fit",
  fit: [
    { title: "You sell B2B", body: "Your deals start with a conversation between people, not a checkout." },
    { title: "Your ICP can be written down", body: "Industries, company sizes and the roles worth talking to, agreed before outreach starts." },
    { title: "A meeting has a value", body: "One qualified meeting with a decision-maker is worth more to you than a month of activity reports." },
    { title: "You want meetings, not a report", body: "Your team should be in conversations, not building lists and chasing replies." },
  ],
  lessHeading: "Less of a fit",
  less: "Consumer products, self-serve tools with no sales conversation, and offers where the buyer cannot be named in advance.",
  soFarHeading: "Where we have booked meetings so far",
  soFar: ["Software and SaaS", "Marketing and creative agencies", "Data and consulting"],
} as const;

/**
 * The operator section on the appointment-setting page: the person
 * behind the system. Copy only says what the team export already says.
 */
export const operator = {
  eyebrow: "The person behind the system",
  h2: "Real expertise behind every meeting.",
  body: "Every list, every sequence and every qualification decision on your engagement is made by a founder, not handed to a pod. Ahmed builds the targeting and the outreach; Anton makes the calls and books the meetings. The system is theirs, and so is the accountability.",
  note: "That is also why Flowa takes on a limited number of clients at a time.",
} as const;

/** Labels for a statistic's source type. Rendered beside every number so a target or benchmark is never read as a result. */
export const statSources = {
  verified: "Flowa result",
  benchmark: "Industry benchmark",
  target: "Flowa target",
  process: "How we work",
} as const;

/** The shared lead form: one field set, one set of messages, every page. */
export const leadForm = {
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Business email",
    phone: "Phone",
    company: "Company",
    jobTitle: "Job title",
    companySize: "Company size",
    industry: "Industry",
    website: "Company website",
    goal: "What are you looking to achieve?",
    goalPlaceholder: "A sentence on your offer, the decision-makers you want to meet and the volume you have in mind",
    preferredTiming: "Preferred meeting timing",
    optional: "optional",
    select: "Select",
  },
  errors: {
    required: "Please fill this in.",
    email: "That doesn't look like a business email address.",
    phone: "That doesn't look like a phone number.",
    website: "That doesn't look like a website address.",
    invalid: "Please choose one of the options.",
    summary: "A few fields need attention.",
    network: "We couldn't reach our server, so nothing was sent. Check your connection and try again, or write to us at",
    timeout: "The server took too long to answer, so we can't confirm it arrived. Try again, or write to us at",
    server: "Something went wrong on our side and your request wasn't sent. Try again, or write to us at",
    rateLimited: "That's a few attempts in a row. Give it a minute, or write to us at",
    duplicate: "We already have this request. Ahmed or Anton will reply within one working day.",
  },
  submit: "Fill my calendar",
  sending: "Sending…",
  retry: "Try again",
  privacy: "We use what you send us only to reply to you. Nothing is shared or added to a list.",
  successTitle: "On it. Ahmed or Anton will reply within one working day.",
  successBody: "You'll get a reply from",
  mailtoTitle: "We've opened your email client with the details filled in.",
  mailtoBody: "Press send there and it reaches us. If nothing opened, write to us directly at",
  sendAnother: "Send another request",
} as const;

export const meta = {
  title: "Flowa — Creating meetings. That create opportunities.",
  description: "Flowa helps B2B companies get qualified sales meetings with the decision-makers they actually want to sell to. Start with a Pilot paid per booked meeting, then scale into a fixed package.",
  keywords: "B2B appointment setting, appointment setting agency UK, B2B lead generation London, qualified sales meetings, outbound agency UK, cold email agency, outbound pricing",
} as const;
