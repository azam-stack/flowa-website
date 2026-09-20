import type { ServiceDefinition } from "../types";

/**
 * LinkedIn outreach — replaces cold calling in the service line-up.
 * Flowa no longer does phone outreach, so nothing in this file may
 * describe a call, a dial or a phone channel.
 *
 * Research belongs to /why-flowa: this page says what happens on
 * LinkedIn and links there for how the targeting is produced. Stats are
 * process facts only. Nothing here is a performance figure, because no
 * measured LinkedIn figure has been supplied.
 */
export const linkedinOutreach: ServiceDefinition = {
  slug: "linkedin-outreach",
  name: "LinkedIn Outreach",
  tagline: "Conversations with decision-makers, where they already are.",
  status: "live",
  seo: {
    title: "B2B LinkedIn Outreach | Flowa",
    description:
      "LinkedIn outreach that reads as a person, not a sequence: signal-based targeting, a connection, a message written one to one and approved before it is sent, and every reply handled by a founder.",
    ogTitle: "B2B LinkedIn Outreach — written by a person, every time",
    ogDescription: "Signal-based targeting, one-to-one messages approved before sending, and every reply handled by Ahmed or Anton.",
  },
  hero: {
    eyebrow: "LinkedIn outreach",
    headline: "LinkedIn outreach that reads like a person wrote it.",
    sub: "Because one did. We reach decision-makers where they already are, with a reason for the timing and a message nobody automated.",
    ctaSecondary: { label: "See how it works", href: "#process" },
    visual: "linkedin",
  },
  cardStages: ["Signal", "Connection", "Message", "Reply", "Meeting"],
  stats: {
    heading: "How the outreach is run",
    items: [
      { value: "100%", label: "of messages written and approved by a founder", description: "Ahmed or Anton writes each message and signs it off before it is sent. Nothing sends itself.", sourceType: "process" },
      { value: "1", label: "reason for contact, stated in the first message", description: "The research brief names why now, and the message opens on it.", sourceType: "process" },
      { value: "0", label: "automated connection blasts", description: "Requests go to named people who match the agreed ICP, never to a scraped segment.", sourceType: "process" },
      { value: "<24h", label: "to answer a reply", description: "The response time we plan the week around.", sourceType: "target" },
      { value: null, label: "acceptance rate", sourceType: "verified" },
      { value: null, label: "reply rate", sourceType: "verified" },
      { value: null, label: "meetings generated", sourceType: "verified" },
    ],
  },
  engine: {
    heading: "The Flowa engine, on LinkedIn",
    body: "The same pipeline as every Flowa engagement. LinkedIn is the reach step; the targeting behind it and the qualification in front of it are unchanged.",
    stages: [
      { label: "Target", sub: "ICP and criteria" },
      { label: "Signal", sub: "A reason for now" },
      { label: "Connect", sub: "To a named person" },
      { label: "Message", sub: "Written one to one" },
      { label: "Qualify", sub: "Against your criteria" },
      { label: "Book", sub: "Into your calendar" },
    ],
  },
  process: {
    eyebrow: "Process",
    heading: "From signal to booked meeting.",
    body: "A LinkedIn campaign is a reason to reach out, a message worth reading and a person handling what comes back.",
    steps: [
      { n: "01", title: "Define", body: "ICP, roles, the problem your offer solves and what counts as a qualified meeting, written down with you." },
      { n: "02", title: "Research", body: "Our engine finds companies showing a reason to talk now and traces the decision-maker behind the signal." },
      { n: "03", title: "Connect", body: "A connection request to a named person who fits the agreed ICP, never a bulk send to a scraped list." },
      { n: "04", title: "Write", body: "One message, to one person, opening on a real fact about their company. A founder approves it before it goes." },
      { n: "05", title: "Qualify and book", body: "Every reply answered by a person, qualified against your criteria and booked into your calendar." },
    ],
  },
  replyRouting: {
    eyebrow: "What happens after a reply?",
    heading: "Every reply has a next step.",
    body: "A campaign is judged on what happens after someone answers. Each reply is read by a founder and routed by what it actually says.",
    routes: [
      { intent: "Interested", steps: ["Qualification", "Meeting"], outcome: "Booked into your calendar" },
      { intent: "Not now", steps: ["Follow-up date", "Future opportunity"], outcome: "Re-contacted when they said to" },
      { intent: "More information", steps: ["Tailored response", "Qualification"], outcome: "Answered, then qualified" },
      { intent: "Wrong person", steps: ["Identify decision-maker"], outcome: "Right contact reached" },
      { intent: "Not interested", steps: ["Reason recorded", "Suppressed"], outcome: "Closed, and never contacted again" },
    ],
  },
  pricingNote: { text: "LinkedIn outreach runs alongside email on Flowa engagements.", cta: "See pricing" },
  faq: {
    eyebrow: "Questions",
    heading: "LinkedIn outreach, answered",
    items: [
      {
        q: "Is any of this automated?",
        a: "The research is. The outreach is not. Our engine finds the companies and the people and writes a brief; Ahmed or Anton writes the message and approves it before it is sent. No tool sends on our behalf.",
      },
      {
        q: "Why LinkedIn rather than the phone?",
        a: "Because that is where the decision-makers we target actually respond. Flowa does not do phone outreach. We reach people by email first, then by a connection and a message on LinkedIn, with InMail where it is the strongest way in.",
      },
      {
        q: "How do you decide who to contact?",
        a: "From the ICP we agree, plus a reason for the timing: a hire, a leadership change, a UK expansion or something the decision-maker has said publicly. If there is no reason for now, we do not reach out.",
      },
      {
        q: "How many people will you contact?",
        a: "Fewer than a tool would, and each one for a stated reason. We take on a small number of accounts at a time so every message can be written and checked by hand.",
      },
      {
        q: "What if someone asks not to be contacted?",
        a: "They are suppressed permanently, across every campaign we run, on every channel. That is absolute and it is not tied to a single campaign.",
      },
    ],
  },
  related: {
    heading: "Related",
    slugs: ["appointment-setting", "cold-email"],
    extra: [
      { label: "Why Flowa", href: "/why-flowa" },
      { label: "Cases", href: "/cases" },
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Want conversations, not connection requests?",
    body: "Tell us who you sell to. Ahmed or Anton will reply within one working day.",
  },
};
