/**
 * Single source of truth for every user-facing string on the site (en-GB).
 * No component should hard-code copy — import from here instead. A future
 * site.da.ts (or any other locale) can mirror this shape.
 *
 * `£TBC` marks prices that were DKK in the v1 brief and must NOT be
 * auto-converted — the founder sets the real GBP figures.
 */

export const PRICE_TBC = "£TBC" as const;

export const nav = {
  links: {
    services: "Services",
    industries: "Industries",
    caseStudies: "Case studies",
    about: "About",
    pricing: "Pricing",
  },
  bookCall: "Book a call",
  servicesPanel: {
    coreHeading: "Core services",
    core: [
      { title: "Appointment setting", description: "Qualified meetings with decision-makers, booked straight into your calendar.", href: "#services" },
      { title: "Lead research", description: "Hand-verified lists of companies that match your ICP.", href: "#services" },
      { title: "Outbound campaigns", description: "Cold email at scale, built on data that's actually checked.", href: "#services" },
      { title: "Sales development", description: "An outbound function that runs without you hiring for it.", href: "#services" },
    ],
    howWeWorkHeading: "How we work",
    howWeWork: [
      { title: "Our process", href: "#how-it-works" },
      { title: "Qualification criteria", href: "#faq" },
      { title: "Reporting & transparency", href: "#faq" },
    ],
    bySizeHeading: "By company size",
    bySize: [
      { title: "Startup", href: "#industries" },
      { title: "Scale-up", href: "#industries" },
      { title: "Established B2B", href: "#industries" },
    ],
    featured: {
      title: "No cure, no pay",
      body: "You pay per qualified meeting. Nothing else.",
      linkLabel: "See pricing",
      href: "#pricing",
    },
  },
  industriesPanel: [
    { title: "B2B SaaS", href: "#industries" },
    { title: "IT & software", href: "#industries" },
    { title: "Marketing & creative agencies", href: "#industries" },
    { title: "Professional services", href: "#industries" },
    { title: "Consulting", href: "#industries" },
    { title: "Other B2B", href: "#industries" },
  ],
  aboutPanel: {
    companyHeading: "Company",
    company: [
      { title: "About Flowa", href: "#about" },
      { title: "Who we are", href: "#about" },
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

export const trust = {
  // No verified client logos exist yet. Per brief: never ship fake/placeholder
  // logo boxes — either a real, founder-verified credential line or nothing.
  credential: "[TODO: add one verifiable credential the founder can confirm — e.g. markets served, meetings booked to date, or niche focus]",
} as const;

export const problems = {
  eyebrow: "Why Flowa",
  h2: "Problems we take off your plate",
  items: [
    { title: "Unpredictable pipeline", body: "Deals dry up the moment prospecting stops being anyone's full-time job." },
    { title: "Referral dependency", body: "Growth that relies on word-of-mouth stalls the moment referrals slow down." },
    { title: "Reps prospecting instead of selling", body: "Your best closers spend their week finding people to talk to, not talking to them." },
    { title: "A bad experience with a previous agency", body: "Vague reporting, unqualified leads, and a contract that was hard to get out of." },
    { title: "Lists that go nowhere", body: "Bought data that bounces, annoys the wrong people, or is simply out of date." },
    { title: "No one owns outbound", body: "It's everyone's job a little and no one's job properly — so it doesn't happen." },
  ],
} as const;

export const valueProps = {
  eyebrow: "Why Flowa",
  h2: "Your sales team shouldn't spend its week looking for meetings.",
  body: "Flowa handles research and appointment setting, so your team can spend its time on what actually closes deals.",
  items: [
    { n: "01", title: "The right companies", body: "We define your ideal customer profile with you and target research accordingly — not broadly, but correctly." },
    { n: "02", title: "The right decision-makers", body: "We find the people who can actually say yes — not a generic contact from the website." },
    { n: "03", title: "Qualified conversations", body: "We talk to prospects directly and professionally, and filter out the ones without real interest or need." },
    { n: "04", title: "Meetings in the calendar", body: "Only meetings that meet your criteria make it into your calendar — ready for you to take over." },
  ],
} as const;

export const pipelineSection = {
  eyebrow: "The process",
  h2: "What your pipeline looks like with Flowa",
  footnote: "Results depend on your industry, target market and offer — we'll give you a realistic range once we understand yours, not before.",
  stages: ["Prospects", "Conversations", "Qualified meetings", "Opportunities"],
} as const;

export const differentiator = {
  eyebrow: "Commercial model",
  h2: "No cure, no pay.",
  body: "Flowa is only paid for the qualified meetings we deliver. No meetings, no invoice — it's that simple.",
  notPayFor: { heading: "You don't pay for", items: ["Scraped lists", "Irrelevant contacts", "Unanswered emails", "Activity reports"] },
  payFor: { heading: "You pay for", items: ["Qualified B2B meetings", "Relevant decision-makers", "Genuine interest", "Meetings that meet the criteria we agreed"] },
} as const;

export const howItWorks = {
  eyebrow: "The process",
  h2: "How we create meetings",
  steps: [
    { n: "01", title: "Strategy", body: "We define your ICP, target companies and relevant decision-makers together with you." },
    { n: "02", title: "Research", body: "We identify the companies and people who actually match the profile." },
    { n: "03", title: "Outreach", body: "We contact prospects directly and professionally — on your behalf, in your tone." },
    { n: "04", title: "Qualification", body: "We only count meetings that meet the criteria we agreed in advance." },
    { n: "05", title: "Booking", body: "Qualified meetings land straight in your calendar, ready for the next conversation." },
  ],
} as const;

/**
 * The two founders. `surname`, `linkedin` and `bio` are `null` until the
 * founders supply them — do not invent them. Components must branch on
 * `null` rather than render it, so nothing fabricated reaches the page.
 * TODO(founders): supply ahmed.surname, ahmed.linkedin, ahmed.bio,
 * anton.surname, anton.linkedin, anton.bio — see addendum brief Part A/C.
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

export const whatSetsUsApart = {
  eyebrow: "What sets us apart",
  h2: "You'll always know who's calling on your behalf.",
  intro:
    "Flowa is deliberately small. When you work with us, you work with the two people whose names are on this page — not an account manager who forwards your feedback to a team you never meet.",
  blocks: [
    {
      title: "Your outreach is written by the people who send it",
      body: "Every email and every call script is written for your market by us, not generated from a template library and not handed to a junior. If a message isn't working, we know within days, because we're the ones reading the replies.",
    },
    {
      title: "One conversation, not a chain of handovers",
      body: "No account manager, no ticket queue, no weekly status call that exists to justify a retainer. You get a direct line to the person running your campaign, and an answer the same working day.",
    },
    {
      title: "We only make money when a meeting lands",
      body: "Our incentive is identical to yours. We don't get paid for volume, for activity reports, or for lists. That's also why we'll tell you early if we don't think your market is a fit for outbound.",
    },
    {
      title: "We do the research by hand",
      body: "Every company and every contact is checked by a person before anyone is contacted. It's slower than buying a list, and it's the reason the meetings you take are with people who can actually sign.",
    },
  ],
  cta: "Book a call",
  ctaCaption: "You'll speak to Ahmed or Anton, not a salesperson.",
} as const;

export const peopleSection = {
  eyebrow: "The team",
  h2: "The two people behind every Flowa campaign",
  intro: "No pods, no offshore team, no rotating SDRs. These are the people who research your market, write your outreach, make the calls and book the meetings.",
  ownsHeading: "What they own",
  bioPending: "Bio coming soon.",
} as const;

export const services = {
  eyebrow: "Services",
  h2: "What you get with Flowa",
  items: [
    { title: "Appointment setting", body: "Qualified B2B meetings with relevant decision-makers, delivered straight into your calendar." },
    { title: "Lead research", body: "Research and identification of the companies and people who match your ideal customer profile." },
    { title: "Outbound campaigns", body: "Targeted outbound prospecting, tailored to your industry, tone and sales process." },
    { title: "Sales development", body: "Ongoing support to build a predictable pipeline of qualified opportunities." },
  ],
} as const;

export const industries = {
  eyebrow: "Who we work with",
  h2: "More relevant conversations, with the companies you actually want to sell to.",
  items: ["B2B SaaS", "IT & software", "Marketing & creative agencies", "Professional services", "Consulting", "Other B2B"],
} as const;

export const caseStudies = {
  eyebrow: "Case studies",
  h2: "Results from client partnerships",
  note: "Structure ready for real figures — the content below is placeholder until cases are cleared for publication.",
  readMore: "Read the case study",
  items: [
    {
      client: "[Client name]",
      industry: "[Industry]",
      quote: "From unpredictable pipeline to qualified sales meetings.",
      metrics: [
        { value: "[XX]", label: "meetings booked" },
        { value: "[XX%]", label: "qualification rate" },
      ],
    },
    {
      client: "[Client name]",
      industry: "[Industry]",
      quote: "[Client quote to be inserted]",
      metrics: [
        { value: "[XX]", label: "meetings booked" },
        { value: "[XX%]", label: "qualification rate" },
      ],
    },
  ],
} as const;

export const whyFlowa = {
  eyebrow: "Comparison",
  h2: "Not more leads. Better meetings.",
  columns: { traditional: "Traditional lead generation", flowa: "Flowa" },
  rows: [
    { label: "Focus", traditional: "Volume", flowa: "Quality and relevance" },
    { label: "Qualification", traditional: "Rarely, if at all", flowa: "Every meeting qualified against agreed criteria" },
    { label: "Decision-makers", traditional: "Generic contacts", flowa: "Relevant decision-makers" },
    { label: "Commercial model", traditional: "Pay for activity or leads", flowa: "No cure, no pay — pay for meetings" },
    { label: "Transparency", traditional: "Limited insight into the process", flowa: "Full visibility into strategy and progress" },
    { label: "Outcome", traditional: "A long list to work through", flowa: "A calendar you can actually sell from" },
  ],
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

export const faq = {
  eyebrow: "Questions",
  h2: "Frequently asked questions",
  items: [
    { q: "How does no cure, no pay work?", a: "You only pay for meetings that meet the criteria we agree in advance — no meetings, no invoice. There's no charge for leads, calls or activity." },
    { q: "Who contacts our prospects?", a: "Ahmed and Anton. No one else speaks to your market on your behalf — no call centre, no rotating team of junior SDRs." },
    { q: "What counts as a qualified meeting?", a: "We agree this with you concretely before we start — typically based on role or decision-making authority, genuine interest, and a match with your ICP. The criteria are written down, so there's no ambiguity later." },
    { q: "Who do you contact on our behalf?", a: "We contact decision-makers at companies that match the customer profile we define together with you — never a random or generic list." },
    { q: "How do you find the companies?", a: "Through structured research targeted at your ICP: industry, size, geography and any other criteria you define with us." },
    { q: "Which companies do you work with?", a: "Primarily B2B companies in SaaS, professional services, IT/software, marketing and consulting — but we always assess the specific fit." },
    { q: "How quickly can we start?", a: "After an initial call we agree strategy and ICP, after which onboarding can typically begin within a short timeframe. The exact timeline depends on your industry and complexity." },
    { q: "What happens if a meeting is cancelled or a prospect doesn't show?", a: "[Placeholder — insert Flowa's actual policy for cancelled or no-show meetings here.]" },
    { q: "Is there a minimum term?", a: "[Placeholder — insert Flowa's actual notice/contract terms here.]" },
  ],
} as const;

export const finalCta = {
  h2: "Ready for more relevant sales conversations?",
  body: "Let's talk about your target market, ideal customers and meeting goals — no obligation.",
  cta: "Book a call",
} as const;

export const contact = {
  eyebrow: "Contact",
  h2: "Book a call",
  body: "Fill in the form and we'll come back to you as soon as possible to find a time that works.",
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
  keywords: "B2B appointment setting, appointment setting agency UK, B2B lead generation London, sales meetings booked for you, outbound agency UK, cold email agency, pay per qualified meeting",
} as const;
