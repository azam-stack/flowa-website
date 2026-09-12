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

export const nav = {
  links: {
    services: "Services",
    industries: "Industries",
    about: "About",
    pricing: "Pricing",
  },
  bookCall: "Book a call",
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
  eyebrow: "B2B appointment setting — you pay per meeting, not per activity",
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
    meeting: { company: "[Company name]", role: "[Decision-maker's role]", when: "Tue 14 Oct, 10:00", tag: "Matches your criteria" },
  },
} as const;

/**
 * C1: no client logo strip, not even a placeholder. `ClientLogos` reads
 * this array and renders nothing at all while it's empty — do not add a
 * "logos coming soon" caption or a greyed-out box instead of a real logo.
 * TODO(founders): add real clients here once any exist, as
 * { name, logoSrc }. An empty array is correct, not a bug.
 */
export type Client = { name: string; logoSrc: string };
export const clients: Client[] = [];

/**
 * Section 2, "Problem" — merges the old six-card Problems grid and the
 * four-card ValueProps grid into one section, capped at four items per
 * the restructure brief (1.3).
 */
export const problem = {
  eyebrow: "Why Flowa",
  h2: "Outbound that nobody owns doesn't happen.",
  items: [
    { title: "Unpredictable pipeline", body: "Deals dry up the moment prospecting stops being someone's job." },
    { title: "Reps prospecting instead of selling", body: "Your best closers spend the week finding people to talk to, not talking to them." },
    { title: "No one owns outbound", body: "It's everyone's job a little and no one's job properly. So it doesn't happen." },
    { title: "A bad experience with an agency before", body: "Vague reporting, unqualified leads, and a contract that was hard to leave." },
  ],
} as const;

/**
 * Section 3, "Offer" — replaces the old four-card Services grid. The four
 * service names are folded into one sentence rather than four cards, per
 * the restructure brief (1.3).
 */
export const offer = {
  eyebrow: "What you get",
  h2: "Everything that fills your calendar, in one service.",
  body: "Appointment setting, lead research, outbound campaigns and sales development — one team, one point of contact, one invoice. You don't buy a list or a tool. You buy a calendar full of qualified meetings.",
} as const;

/**
 * Section 4, "RiskBand" — copy is verbatim from the restructure brief
 * (2.1). Check 3 is a required bracketed placeholder, not an oversight —
 * see PART 6, item 1 of the brief.
 */
export const riskBand = {
  headline: ["If we don't book the meetings,", "you don't pay."],
  paragraph: "No retainers. No setup fees. No paying for activity, effort or a monthly report. You pay per qualified meeting and nothing else.",
  checks: [
    "You set the qualification criteria before we start",
    "You only pay for meetings that meet them",
    // TODO(founders): confirm the no-show policy — see PART 6, item 1 of the restructure brief.
    "[NO-SHOW POLICY — founders to confirm]",
  ],
  payoff: "We only get paid when your calendar fills. That's the deal.",
} as const;

/**
 * Attached to the base of the Hero (section 1) — not its own section.
 * Every figure here is a promise the founders need to confirm before
 * launch — see PART 6, item 3 of the restructure brief.
 */
export const commitmentsBar = {
  items: [
    // TODO(founders): confirm this is a promise Flowa will keep.
    { figure: "24h", label: "Reply to any question, on any working day" },
    // TODO(founders): confirm this is a promise Flowa will keep.
    { figure: "2", label: "People on your account. The two who own the company" },
    // TODO(founders): confirm this is a promise Flowa will keep.
    { figure: "0", label: "Retainers, setup fees and lock-in" },
  ],
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

export const pricing = {
  eyebrow: "Pricing",
  h2: "Price per qualified meeting",
  body: "No flat fee per lead or per activity — you pay exclusively for meetings that meet the criteria we agree together. Price per meeting falls as volume grows.",
  tiers: [
    { name: "Bronze", price: PRICE_TBC, note: "For getting started", popular: false },
    { name: "Silver", price: PRICE_TBC, note: "For a steady flow of meetings", popular: false },
    { name: "Gold", price: PRICE_TBC, note: "Our most chosen plan", popular: true },
    { name: "Platinum", price: PRICE_TBC, note: "For high, sustained volume", popular: false },
  ],
  perMeeting: "per qualified meeting",
  cta: "Book a call",
  includedHeading: "Every plan includes",
  included: ["Strategy & ICP definition", "Targeted research", "Direct outreach", "Qualification against your criteria", "Meetings delivered to your calendar"],
} as const;

/** Section 9, "Faq" — trimmed to six questions per the restructure brief
 * acceptance test (Part 4). */
export const faq = {
  eyebrow: "Questions",
  h2: "Frequently asked questions",
  items: [
    { q: "How does no cure, no pay work?", a: "You only pay for meetings that meet the criteria we agree in advance — no meetings, no invoice. There's no charge for leads, calls or activity." },
    { q: "Who contacts our prospects?", a: "Ahmed and Anton. No one else speaks to your market on your behalf — no call centre, no rotating team of junior SDRs." },
    { q: "What counts as a qualified meeting?", a: "We agree this with you concretely before we start — typically based on role or decision-making authority, genuine interest, and a match with your ICP. The criteria are written down, so there's no ambiguity later." },
    { q: "What happens if a meeting is cancelled or a prospect doesn't show?", a: "[Placeholder — insert Flowa's actual policy for cancelled or no-show meetings here.]" },
    { q: "Is there a minimum term?", a: "[Placeholder — insert Flowa's actual notice/contract terms here.]" },
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
    email: "Email",
    phone: "Phone",
    message: "What can we help you with?",
    messagePlaceholder: "Briefly tell us about your goals and target audience",
  },
  submit: "Book a call",
  successTitle: "Thanks — we'll come back to you within one working day.",
  successBody: "If your email client didn't open automatically, write to us directly at",
  responsePromise: "You'll hear back from Ahmed or Anton within one working day.",
} as const;

export const footer = {
  navigationHeading: "Navigation",
  contactHeading: "Contact",
  rights: "All rights reserved.",
} as const;

export const meta = {
  title: "Flowa — Creating meetings. That create opportunities.",
  description: "Flowa helps B2B companies get qualified sales meetings with the decision-makers they actually want to sell to. No cure, no pay — you only pay for meetings that meet your criteria.",
  keywords: "B2B appointment setting, appointment setting agency UK, B2B lead generation London, qualified sales meetings, outbound agency UK, cold email agency, pay per qualified meeting",
} as const;
