import type { ServiceDefinition } from "../types";

/**
 * Cold calling — the core outreach mechanism inside appointment setting,
 * also sold as a service on its own. Reporting numbers are an example
 * campaign, labelled as such, until the reporting backend is connected.
 */
export const coldCalling: ServiceDefinition = {
  slug: "cold-calling",
  name: "Cold Calling",
  tagline: "Direct conversations with relevant prospects.",
  status: "live",
  seo: {
    title: "B2B Cold Calling | Flowa",
    description: "Structured B2B cold calling by the two founders: researched lists, a script built around your ICP, qualification on every call and follow-up until a conversation resolves. Paid per qualified meeting.",
    ogTitle: "B2B Cold Calling — direct conversations, real opportunities",
    ogDescription: "Researched lists, structured calling and qualification built around your ICP. You pay per qualified meeting, not per dial.",
  },
  hero: {
    eyebrow: "Cold calling",
    headline: "Direct conversations. Real opportunities.",
    sub: "We put your offer in front of the people who matter, with researched lists, structured calling and qualification built around your ICP.",
    ctaSecondary: { label: "See how it works", href: "#process" },
    visual: "dialer",
  },
  cardStages: ["Lead", "Dial", "Conversation", "Qualification", "Meeting"],
  stats: {
    heading: "How the calling is run",
    items: [
      { value: "100%", label: "of calls made by the founders", description: "Ahmed and Anton make every call. No outsourced dialling.", sourceType: "process" },
      { value: "4–6", label: "touches in a structured follow-up sequence", description: "Calls, voicemails and emails on a set cadence until a conversation resolves.", sourceType: "process" },
      { value: "1", label: "written script per engagement, built around your ICP", description: "Drafted with you, then refined from what real conversations say back.", sourceType: "process" },
      { value: "<24h", label: "from a positive conversation to a booked or scheduled follow-up", description: "The turnaround we plan the calling blocks around.", sourceType: "target" },
      { value: null, label: "lead-to-meeting rate", sourceType: "verified" },
      { value: null, label: "connection rate", sourceType: "verified" },
    ],
  },
  engine: {
    heading: "The Flowa engine, on the phone",
    body: "The same pipeline as every Flowa engagement. Cold calling is the reach step: the fastest way to find out whether a prospect is real.",
    stages: [
      { label: "Target", sub: "ICP and criteria" },
      { label: "Research", sub: "Hand-built list" },
      { label: "Call", sub: "Direct dial" },
      { label: "Conversation", sub: "Decision-maker" },
      { label: "Qualify", sub: "Against your criteria" },
      { label: "Book", sub: "Into your calendar" },
    ],
  },
  pillars: {
    eyebrow: "Why it works",
    heading: "People, process, performance.",
    items: [
      { title: "People", body: "Real conversations with real decision-makers, made by the two people who built your list and wrote your script.", visual: "people" },
      { title: "Process", body: "Research, a script built around your ICP, qualification on every call and follow-up until a conversation resolves.", visual: "process" },
      { title: "Performance", body: "Every interaction becomes data: what objections come up, which roles answer, which angle lands. The next call is better than the last.", visual: "performance" },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "From list to booked meeting.",
    body: "One structured sequence per prospect, run by the same two people from first dial to handover.",
    steps: [
      { n: "01", title: "Define", body: "ICP, roles, the questions that qualify a prospect and the script, written down with you." },
      { n: "02", title: "Research", body: "A hand-built list of companies and named contacts, checked before the first dial." },
      { n: "03", title: "Call", body: "Structured calling blocks, with each conversation logged: outcome, objection, next action." },
      { n: "04", title: "Qualify", body: "Genuine interest separated from a polite yes, against the criteria we agreed." },
      { n: "05", title: "Book", body: "A qualified prospect goes into your calendar with notes from the conversation." },
    ],
  },
  reporting: {
    eyebrow: "Transparency",
    heading: "What you see, every week.",
    body: "Every call is logged. You get the funnel from attempted calls to booked meetings, with notes on every conversation. The figures here are an example campaign, not a client's results; live reporting is connected per engagement.",
    metrics: { leads: 240, contacted: 240, connected: 96, conversations: 41, qualified: 14, meetings: 9, opportunities: 5 },
    demoLabel: "Example campaign",
    period: "4 weeks",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Cold calling, answered",
    items: [
      { q: "How are prospects selected?", a: "From the ICP we define together: industries, company sizes and the roles worth talking to. We build the list by hand and check each contact before it goes into a calling block, rather than buying a list and dialling through it." },
      { q: "How do you prepare the script?", a: "We draft it with you around your offer, the problems it solves and the objections you already hear. Then it changes: what real conversations say back goes into the next version. It is a structure for a conversation, not a text to read out." },
      { q: "How many calls are made?", a: "As many as the list and your target volume need. Each prospect gets a structured sequence of four to six touches across calls, voicemails and emails, on a set cadence. You are not charged per call, so volume is a means, not the product." },
      { q: "How is call quality measured?", a: "Every call is logged with its outcome, the objection if there was one and the next action. You see the funnel from attempts to connections to conversations to qualified meetings, with notes, every week." },
      { q: "What happens after a conversation?", a: "A prospect who passes the qualification criteria is booked into your calendar with the notes from the call. Someone who is interested but not now goes into follow-up with a date. Someone who is the wrong person points us to the right one." },
    ],
  },
  related: {
    heading: "Related",
    slugs: ["appointment-setting", "cold-email"],
    extra: [{ label: "Cases", href: "/cases" }],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Want direct conversations with your market?",
    body: "Tell us who you sell to. Ahmed or Anton will reply within one working day.",
  },
};
