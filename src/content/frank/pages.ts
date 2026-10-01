/**
 * Copy for every page other than the homepage and pricing: brief §5.
 * Where the brief gives the words, they are used verbatim. Where it gives
 * a subject only ("Frank on email: verified data, deliverability and
 * domain setup, sequences, reply handling"), the copy is short and makes
 * no claim that is not already made elsewhere on the site.
 */
import { home } from "./home";

export const frankPage = {
  seo: { title: "Frank, our AI outbound agent | Flowa", description: "Meet Frank. He finds companies with a reason to buy now, drafts the first message for a person to approve, then follows up and books the meeting." },
  h1Light: "Meet ",
  h1Bold: "Frank.",
  sub: "Flowa's AI outbound agent. He reads your market every day, drafts the first message for a real reason, and books the meeting once a person has approved it.",
  video: "See Frank in action",
  hotLeads: {
    title: "Hot leads today",
    rows: [
      { name: "Hannah Lee", role: "VP Sales · Brightline Software", why: "Series A, hiring SDRs" },
      { name: "Arjun Mehta", role: "Head of Sales · Northgate IT", why: "New in role" },
      { name: "Sofie Madsen", role: "COO · Example SaaS", why: "Opening UK office" },
      { name: "David Brooks", role: "Founder · Kestrel Cloud", why: "Posted: pipeline is thin" },
    ],
    chip: "Hot",
  },
  stripEyebrow: "How Frank works",
  stripH2: "Four steps, every week",
  statsEyebrow: "Measured in meetings",
  statsH2: "Our own numbers, not promises",
  faqH2: "Questions about Frank",
} as const;

export const howItWorks = {
  seo: { title: "How it works | Flowa", description: "Target, spot, reach, book. The four steps we run every week to turn buying signals into qualified meetings." },
  h1Light: "How ",
  h1Bold: "Flowa works",
  sub: "Four steps, from your ideal customer to a meeting in your calendar.",
  steps: [
    { n: "01", title: "Target", headline: "Agree who is worth meeting", body: "We agree your ideal customer, the roles worth talking to and what counts as a qualified meeting.", mock: "target" as const },
    { n: "02", title: "Spot", headline: "Find a real reason to talk", body: "Frank scans daily for buying signals that match that profile and checks every lead against it.", mock: "qualify" as const },
    { n: "03", title: "Reach", headline: "Frank drafts. A person approves.", body: "Frank drafts a personal first message. We approve it and send it on LinkedIn or email.", mock: "reach" as const },
    { n: "04", title: "Book", headline: "Meetings land in your calendar", body: "Replies are qualified and meetings go straight into your calendar, with the context you need before you join.", mock: "book" as const },
  ],
} as const;

export const signals = {
  seo: { title: "Signals Frank watches | Flowa", description: "What Frank watches: job posts, leadership changes, expansion moves and founder posts. How a signal becomes a verified, scored, briefed lead." },
  h1Light: "What ",
  h1Bold: "Frank watches",
  sub: "Static lists tell you who a company is. Frank looks for the reason to talk now.",
  problem: {
    h2: "Static lists are the wrong tool.",
    lines: [
      "A bought list describes what a company is. It says nothing about what changed there this week.",
      "Lists start ageing the day they are exported, so the person you reach has often already moved on.",
      "Without a reason for the timing, even a well-written message arrives as noise.",
    ],
  },
  engine: {
    eyebrow: "Inside Frank",
    h2: "Six steps, run every day",
    sub: "Every capability, in the order Frank runs it.",
    steps: [
      { n: "01", title: "Read the market", body: "Every day Frank reads job posts, leadership changes, UK expansion moves and public posts from decision-makers across the market you sell into.", chip: "Job post · 2 x SDR" },
      { n: "02", title: "Understand the signal", body: "He reads context rather than keywords, so he can tell a real buying signal from noise, and an agency from a brand with the word marketing in its name.", chip: "Buying signal" },
      { n: "03", title: "Find the decision-maker", body: "When the signal comes from an employee, Frank traces the person who actually owns the decision, rather than writing to whoever happened to post.", chip: "Head of Sales" },
      { n: "04", title: "Verify", body: "Every contact is cross-checked across multiple data sources. Mismatches are discarded, and every email address is verified before anyone is contacted.", chip: "Email verified" },
      { n: "05", title: "Match your ICP", body: "Each lead is scored against your industry, size band, geography, role, signal type and how fresh the signal is, then deduped against everyone already contacted and every opt-out.", chip: "ICP match: strong" },
      { n: "06", title: "Brief", body: "Frank writes a short research brief for the lead: why this company is worth contacting now, and which real fact about them the first message should open with.", chip: "Open with: new UK office" },
    ],
    note: "Interface details are illustrative.",
  },
  examples: {
    eyebrow: "Signals in the wild",
    h2: "What a buying signal looks like",
    sub: "Four of the patterns Frank is built to notice.",
    signalLabel: "Signal",
    meaningLabel: "What it means for you",
    items: [
      { signal: "A SaaS company posts two SDR roles in one week.", meaning: "They are funding pipeline right now, and they have a gap until those hires are productive." },
      { signal: "An IT services firm appoints a new Head of Sales.", meaning: "First ninety days. They are looking for early wins and are open to a channel they did not inherit." },
      { signal: "A Nordic company registers a UK entity and starts hiring here.", meaning: "They need UK meetings and have no local network to get them from yet." },
      { signal: "A founder posts publicly about a thin pipeline.", meaning: "They have already named the problem out loud, so the conversation does not have to start from scratch." },
    ],
    note: "Examples are anonymised patterns, not real companies.",
  },
} as const;

export const channelEmail = {
  seo: { title: "Frank on email | Flowa", description: "Frank on email: verified data, domain setup and deliverability handled, short sequences with a reason to reply, and every reply handled." },
  h1Light: "Frank on ",
  h1Bold: "email",
  sub: "Verified data, deliverability handled, and a reason to reply in the first line.",
  blocks: [
    { title: "Verified data", body: "Every role is confirmed and every email address is checked before anyone is contacted. Mismatches are discarded, not sent." },
    { title: "Deliverability and domain setup", body: "Sending domains, authentication and warm-up are set up for you, so the first message lands where it should." },
    { title: "Sequences", body: "Short, specific sequences with a reason to reply, sent on a cadence that stops the moment someone answers." },
    { title: "Reply handling", body: "Interested replies are qualified and booked. Not-now replies get a follow-up date. Wrong-person replies lead to the right contact. Not-interested replies are closed, with the reason recorded." },
  ],
} as const;

export const channelLinkedIn = {
  seo: { title: "Frank on LinkedIn | Flowa", description: "Frank on LinkedIn: one-to-one connection notes and messages to decision-makers, and named target accounts worked by hand." },
  h1Light: "Frank on ",
  h1Bold: "LinkedIn",
  sub: "Where decision-makers already are, with a note written for one person.",
  blocks: [
    { title: "One-to-one connection notes", body: "A connection request to a named person who fits the agreed ideal customer profile, never a bulk send to a scraped list." },
    { title: "Messages written for one person", body: "Every message opens on a real fact about the company and is approved by a person before it is sent." },
    { title: "Named accounts", body: "Give us the companies you want. Frank finds the people, and we open the door." },
    { title: "Permanent opt-outs", body: "Anyone who asks not to hear from us is suppressed across every campaign, for good." },
  ],
} as const;

export const casesPage = {
  seo: { title: "Cases | Flowa", description: "Meetings Flowa has created for its clients: a first meeting with one of Denmark's largest insurers for DataPeeps, and an annual sale worth over 90,000 pounds for Generaxion." },
  h1Light: "Meetings Flowa has created. ",
  h1Bold: "Documented, not dramatised.",
  sub: "Real meetings for real clients. Each case is published with the client's approval.",
  /** Results only as the clients reported them. The insurer is deliberately not named. */
  cases: [
    {
      slug: "datapeeps",
      client: "DataPeeps",
      sells: "Sells data and leads to companies such as insurers",
      work: "We mapped the decision-makers at the insurers that fit DataPeeps' profile and opened the conversation with a message written for one person.",
      resultBig: "Top-tier insurer",
      resultLabel: "First meeting booked with one of Denmark's largest insurance companies",
    },
    {
      slug: "generaxion",
      client: "Generaxion",
      sells: "",
      work: "We booked qualified first meetings against the criteria agreed with Generaxion before we started.",
      resultBig: "£90K+",
      resultLabel: "Annual sale generated from a single meeting we booked",
    },
  ],
  caseLabels: { work: "What we did", result: "Result" },
  approvalNote: "Results as reported by the clients. Published with their permission.",
  contactH2: "Want to be the next case?",
  contactSub: "Tell us who you sell to. Ahmed or Anton will reply within one working day.",
} as const;

export const aboutPage = {
  seo: { title: "About us | Flowa", description: "The people behind Flowa: Ahmed Zamzam and Anton Busk, Flowa's co-founders, who set up and oversee every campaign." },
  h1Light: "The people ",
  h1Bold: "behind Flowa",
  sub: "Flowa builds and runs Frank, our AI outbound agent. Two co-founders set up and oversee every client's campaign.",
  people: [
    { name: "Ahmed Zamzam", slug: "ahmed", role: "Co-founder", owns: ["Market research and targeting", "Outreach copy", "Reporting"] },
    { name: "Anton Busk", slug: "anton", role: "Co-founder", owns: ["Campaign strategy", "LinkedIn and conversations", "Booking and follow-up"] },
  ],
  quote: home.proof.quote,
  quoteName: home.proof.quoteName,
  quoteRole: home.proof.quoteRole,
  limited: "We take on a limited number of clients at a time.",
} as const;

export const contactPage = {
  demo: {
    seo: { title: "Book a call | Flowa", description: "Pick a time for a 20-minute intro call with Ahmed and Anton, or send us a message." },
    h1Light: "Book a ",
    h1Bold: "call",
    calendarCta: "Pick a time in our calendar",
    calendarNote: "A 20-minute intro call on Microsoft Teams with Ahmed and Anton. No slides.",
    orForm: "Or send us a message and we will reply within one working day.",
  },
  contact: {
    seo: { title: "Contact | Flowa", description: "Talk to Ahmed or Anton. Tell us who you sell to and we will reply within one working day." },
    h1Light: "Get in ",
    h1Bold: "touch",
  },
  sub: home.contact.sub,
} as const;

export const faqPage = {
  seo: { title: "FAQ | Flowa", description: "Straight answers about Flowa, Frank, qualified meetings, pricing, data ownership and getting started." },
  h1Light: "Frequently asked ",
  h1Bold: "questions",
  generalHeading: "About Flowa and Frank",
  pricingHeading: "Pricing",
} as const;

export const notFound = {
  seo: { title: "Page not found | Flowa", description: "That page does not exist." },
  h1: "We could not find that page.",
  body: "The link may be out of date. Try the homepage, or ask Frank below.",
  cta: "Back to the homepage",
} as const;
