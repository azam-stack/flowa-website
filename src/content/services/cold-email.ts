import type { ServiceDefinition } from "../types";

/**
 * Cold email — targeted sequences that open conversations. Stats with a
 * `null` value are pending real figures and are not rendered.
 */
export const coldEmail: ServiceDefinition = {
  slug: "cold-email",
  name: "Cold Email",
  tagline: "Targeted outbound email campaigns.",
  status: "live",
  seo: {
    title: "B2B Cold Email | Flowa",
    description: "Cold email that starts conversations, not spam: hand-built prospect lists, relevant messaging, structured follow-up and every reply handled by a person. Included in every Flowa package.",
    ogTitle: "B2B Cold Email — conversations, not spam",
    ogDescription: "Reach the right B2B prospects with relevant messaging, structured follow-up and a clear path from reply to meeting.",
  },
  hero: {
    eyebrow: "Cold email",
    headline: "Cold email that starts conversations, not spam.",
    sub: "Reach the right B2B prospects with relevant messaging, structured follow-up and a clear path from reply to meeting.",
    ctaSecondary: { label: "See how it works", href: "#process" },
    visual: "email",
  },
  cardStages: ["ICP", "Message", "Reply", "Qualification", "Meeting"],
  stats: {
    heading: "How the campaigns are run",
    items: [
      { value: "100%", label: "of replies read and answered by a person", description: "No auto-responders. Every reply is handled by Ahmed or Anton.", sourceType: "process" },
      { value: "3–4", label: "emails in a sequence, each with a reason to reply", description: "Short, specific, sent on a set cadence; the sequence stops the moment someone replies.", sourceType: "process" },
      { value: "1", label: "hand-built list per campaign", description: "Companies and named contacts that fit your ICP, checked before the first send.", sourceType: "process" },
      { value: "<24h", label: "to answer an interested reply", description: "The response time we plan the inbox around.", sourceType: "target" },
      { value: null, label: "reply rate", sourceType: "verified" },
      { value: null, label: "qualified-response rate", sourceType: "verified" },
      { value: null, label: "meetings generated", sourceType: "verified" },
    ],
  },
  engine: {
    heading: "The Flowa engine, in the inbox",
    body: "The same pipeline as every Flowa engagement. Email is the reach step; qualification and booking are the same on every channel.",
    stages: [
      { label: "Target", sub: "ICP and criteria" },
      { label: "Research", sub: "Hand-built list" },
      { label: "Email", sub: "Relevant, short" },
      { label: "Reply", sub: "Handled by a person" },
      { label: "Qualify", sub: "Against your criteria" },
      { label: "Book", sub: "Into your calendar" },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "From ICP to booked meeting.",
    body: "A campaign is a list, a message and a way of handling what comes back. All three are built by hand.",
    steps: [
      { n: "01", title: "Define", body: "ICP, roles, the problem your offer solves and what counts as a qualified meeting, written down with you." },
      { n: "02", title: "Research", body: "A hand-built list of companies and named contacts, verified before the first send." },
      { n: "03", title: "Write and send", body: "Short, specific sequences with a reason to reply, sent on a cadence that stops the moment someone answers." },
      { n: "04", title: "Handle replies", body: "Every reply read and answered by a person, routed by what the prospect actually said." },
      { n: "05", title: "Qualify and book", body: "Interested prospects qualified against your criteria and booked into your calendar." },
    ],
  },
  replyRouting: {
    eyebrow: "What happens after a reply?",
    heading: "Every reply has a next step.",
    body: "A campaign is judged on what happens after someone answers. Each reply is read by a person and routed by what it actually says.",
    routes: [
      { intent: "Interested", steps: ["Qualification", "Meeting"], outcome: "Booked into your calendar" },
      { intent: "Not now", steps: ["Follow-up date", "Future opportunity"], outcome: "Re-contacted when they said to" },
      { intent: "More information", steps: ["Tailored response", "Qualification"], outcome: "Answered, then qualified" },
      { intent: "Wrong person", steps: ["Identify decision-maker"], outcome: "Right contact reached" },
      { intent: "Not interested", steps: ["Reason recorded", "Close"], outcome: "Closed, with a reason you can see" },
    ],
  },
  pricingNote: { text: "Email outreach is included across every Flowa package.", cta: "See pricing" },
  faq: {
    eyebrow: "Questions",
    heading: "Cold email, answered",
    items: [
      { q: "How do you identify prospects?", a: "From the ICP we define together. We build the list by hand: companies that fit, then the named people in the roles worth writing to, verified before the first email goes out." },
      { q: "How do you personalise outreach?", a: "By writing to a specific person about a specific problem. The sequence is short and gives a reason to reply; it is not a template with a first name dropped in. What replies say back shapes the next version." },
      { q: "How do you handle replies?", a: "A person reads and answers every one, usually within a working day. Interested replies are qualified and booked; not-now replies get a follow-up date; wrong-person replies point us to the right contact; not-interested replies are closed with the reason recorded." },
      { q: "How do you avoid spam?", a: "By sending less, to fewer, better-chosen people. Hand-built lists, short sequences that stop on reply, and no bulk blasting. Sending is set up so that it stays deliverable, and we do not send to anyone who has asked not to hear from us." },
      { q: "How do you measure performance?", a: "On what matters: replies, qualified replies and meetings, not opens. You see the funnel for each campaign and the reason behind every closed conversation." },
    ],
  },
  related: {
    heading: "Related",
    slugs: ["appointment-setting", "linkedin-outreach"],
    extra: [{ label: "Cases", href: "/cases" }],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Want email that starts conversations?",
    body: "Tell us who you sell to. Ahmed or Anton will reply within one working day.",
  },
};
