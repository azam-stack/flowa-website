/** Copy for the /services hub. Cards are rendered from the service registry. */
export const servicesHub = {
  seo: {
    title: "B2B Sales Development Services | Flowa",
    description: "Appointment setting, cold calling and cold email for B2B companies: the right prospects, relevant conversations, qualified interest and meetings that can become opportunities. Start with a Pilot, then scale into a fixed package.",
  },
  hero: {
    eyebrow: "Services",
    headline: "Turn outreach into real sales conversations.",
    sub: "Flowa helps B2B companies identify the right prospects, start relevant conversations, qualify genuine interest and turn outreach into meetings that can become opportunities.",
    ctaSecondary: { label: "Explore services", href: "#services" },
  },
  cards: {
    eyebrow: "What we do",
    heading: "Three ways in. One system behind them.",
    body: "Each service runs the same engine: target, reach, qualify, book. They differ in the channel that opens the conversation.",
    explore: "Explore",
    /** Card copy per service slug: the one-line promise. */
    promise: {
      "appointment-setting": "Qualified conversations with the people who can actually buy.",
      "cold-calling": "Direct conversations. Faster feedback. More opportunities.",
      "cold-email": "Targeted outbound email designed to start relevant conversations.",
    } as Record<string, string>,
  },
  engine: {
    eyebrow: "The Flowa engine",
    heading: "Companies. People. Conversations. Qualification. Meetings. Opportunities.",
    body: "This is the whole story. Every service is a different way of starting it; the qualification standard and the packages are the same on all of them.",
    stages: [
      { label: "Target", sub: "Companies" },
      { label: "Research", sub: "People" },
      { label: "Reach", sub: "Conversations" },
      { label: "Qualify", sub: "Against your criteria" },
      { label: "Book", sub: "Meetings" },
      { label: "Opportunity", sub: "In your pipeline" },
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Not sure which service fits?",
    body: "Tell us who you sell to and how you sell today. We will suggest the channel that gets to a qualified conversation fastest.",
  },
} as const;
