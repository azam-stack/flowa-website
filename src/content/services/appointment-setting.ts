import type { ServiceDefinition } from "../types";

/**
 * Appointment setting — the core Flowa service. Every figure in `stats`
 * carries its source type; none is a historical Flowa result, because
 * none has been measured and published yet. Replace `target`/`process`
 * items with `verified` ones as real numbers exist.
 */
export const appointmentSetting: ServiceDefinition = {
  slug: "appointment-setting",
  name: "Appointment Setting",
  tagline: "Qualified B2B meetings with decision-makers.",
  status: "live",
  seo: {
    title: "B2B Appointment Setting | Flowa",
    description: "Qualified sales meetings with decision-makers who fit your ICP, qualified by hand before they reach your calendar. Start with a Pilot paid per booked meeting, then scale into a fixed package.",
    ogTitle: "B2B Appointment Setting — qualified meetings, paid per meeting",
    ogDescription: "Flowa finds the right companies, reaches the decision-makers, qualifies genuine interest and books the meeting. Start with a Pilot and pay per booked meeting.",
  },
  hero: {
    eyebrow: "Appointment setting",
    headline: "Qualified meetings. With people who can actually buy.",
    sub: "Flowa finds the right companies, reaches the right decision-makers, starts the conversation and qualifies genuine interest before a meeting ever reaches your calendar.",
    ctaSecondary: { label: "See how it works", href: "#process" },
    visual: "pipeline",
  },
  cardStages: ["Company", "Decision-maker", "Conversation", "Qualification", "Meeting"],
  stats: {
    heading: "What an engagement is built on",
    items: [
      { value: "100%", label: "of booked meetings qualified by hand", description: "A person checks every meeting against your written criteria before it is booked.", sourceType: "process" },
      { value: "2", label: "people who ever speak to your market", description: "Ahmed and Anton. No outsourced team, no rotating pod.", sourceType: "process" },
      { value: "3–5", label: "written qualification criteria per engagement", description: "Agreed with you before outreach starts; a meeting that misses them does not count.", sourceType: "process" },
      { value: "<24h", label: "to handle a reply or a qualification question", description: "The response time we plan the working day around.", sourceType: "target" },
      { value: "30+", label: "qualified meetings a month at full volume", description: "The monthly volume we scale an engagement toward, agreed per client.", sourceType: "target" },
      { value: null, label: "meetings booked to date", sourceType: "verified" },
    ],
  },
  engine: {
    heading: "The Flowa engine",
    body: "One pipeline, every engagement. Appointment setting runs the whole of it: from the target list to the opportunity in your pipeline.",
    stages: [
      { label: "Target", sub: "ICP and criteria" },
      { label: "Reach", sub: "Email and LinkedIn" },
      { label: "Conversation", sub: "With the decision-maker" },
      { label: "Qualify", sub: "Against your criteria" },
      { label: "Book", sub: "Into your calendar" },
      { label: "Opportunity", sub: "In your pipeline" },
    ],
  },
  qualification: {
    eyebrow: "What makes a meeting qualified?",
    heading: "A booked meeting isn't automatically a qualified meeting.",
    body: "Five checks, written down with you before we start. A prospect has to pass all of them before the meeting is booked, and only a meeting that passes counts.",
    criteria: [
      { n: "01", title: "Right company", body: "Does the company fit the agreed ICP: industry, size, situation?", state: "ICP match" },
      { n: "02", title: "Right person", body: "Is the contact a relevant decision-maker or stakeholder for what you sell?", state: "Decision-maker" },
      { n: "03", title: "Relevant problem", body: "Does the prospect have a reason to care right now?", state: "Relevant problem" },
      { n: "04", title: "Genuine interest", body: "Is there actual interest in discussing the solution, not a polite yes?", state: "Interest" },
      { n: "05", title: "Meeting agreed", body: "Has the prospect explicitly agreed to a meeting at a set time?", state: "Qualified" },
    ],
    states: ["Unqualified", "ICP match", "Decision-maker", "Interest", "Qualified", "Booked"],
  },
  system: {
    eyebrow: "One system",
    heading: "One system. Every step between prospect and opportunity.",
    body: "Appointment setting is not one channel. It is research, outreach, qualification and follow-up run as one system, with email and LinkedIn as the channels we work today.",
    nodes: [
      { label: "Research", status: "current", body: "Hand-built lists of companies and people who fit your ICP." },
      { label: "LinkedIn outreach", status: "current", body: "A connection and a message written one to one, where decision-makers already are." },
      { label: "Cold email", status: "current", body: "Targeted sequences that open conversations and carry the first reason to reply." },
      { label: "LinkedIn", status: "future", body: "Not part of the current service. Planned as an optional channel." },
      { label: "Qualification", status: "current", body: "Every conversation checked against your written criteria." },
      { label: "Follow-up", status: "current", body: "Structured follow-up on every open conversation until it resolves." },
      { label: "Calendar", status: "supporting", body: "Qualified meetings go straight into your calendar with context." },
      { label: "CRM", status: "supporting", body: "Meeting details handed over cleanly, so your pipeline stays accurate." },
      { label: "Meeting", status: "current", body: "The outcome every package is measured on." },
    ],
    legend: { current: "Current service", supporting: "Supporting workflow", future: "Planned" },
  },
  process: {
    eyebrow: "Process",
    heading: "Five steps, one continuous system.",
    body: "The same sequence on every engagement, run by the same two people.",
    steps: [
      { n: "01", title: "Define", body: "We define the ICP, target market, decision-makers and qualification criteria with you, in writing." },
      { n: "02", title: "Research", body: "We identify the companies and the people who fit the target, by hand." },
      { n: "03", title: "Reach", body: "We start relevant conversations through the agreed outreach channel: email, LinkedIn or both." },
      { n: "04", title: "Qualify", body: "We separate genuine opportunities from noise against the criteria we wrote down together." },
      { n: "05", title: "Book", body: "Qualified prospects enter your calendar with the context you need before you join." },
    ],
  },
  operator: true,
  pricingNote: { text: "Find the right package for your outbound goals.", cta: "View pricing" },
  faq: {
    eyebrow: "Questions",
    heading: "Appointment setting, answered",
    items: [
      { q: "What counts as a qualified meeting?", a: "A meeting that passes the criteria we write down with you before we start: the company fits your ICP, the contact is a relevant decision-maker or stakeholder, there is a relevant problem and genuine interest, and the prospect has explicitly agreed to a meeting. A meeting that misses a criterion does not count." },
      { q: "Who do you contact?", a: "The decision-makers and stakeholders you define with us: specific roles at companies that match your ICP. We build the list by hand, and Ahmed and Anton are the only people who speak to your market on your behalf." },
      { q: "How do you define our ICP?", a: "In the first working session. We go through the industries, company sizes, roles and situations where your offer lands best, and we write the result down together with the qualification criteria. That document is the reference for everything that follows." },
      { q: "What happens if a prospect cancels?", a: "We contact them and work to rebook. A meeting that does not take place is not treated as delivered. The exact rebooking and no-show terms are agreed in writing before we start." },
      { q: "Do you guarantee meetings?", a: "On the fixed packages, yes: Core, Plus and Scale include a meeting guarantee whose terms depend on the agreed ICP, market and campaign scope and are written into your proposal. The Pilot is performance-based, paid per booked meeting, and does not include a guarantee. If we do not think we can fill your calendar, we say so before we start." },
      { q: "How does pricing work?", a: "You start with a Pilot, paid per booked meeting with no long-term commitment. Once the model is proven, you move to a fixed monthly package sized to your volume: Core, Plus or Scale. See the pricing page for the full comparison." },
    ],
  },
  related: {
    heading: "Related",
    slugs: ["linkedin-outreach", "cold-email"],
    extra: [
      { label: "How Flowa works", href: "/#how-it-works" },
      { label: "Cases", href: "/cases" },
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Ready for meetings with people who can actually buy?",
    body: "Tell us about your ideal customer. Ahmed or Anton will reply within one working day with a recommended starting package.",
  },
};
