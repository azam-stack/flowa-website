/**
 * Copy for /why-flowa — the page where Flowa shows how the research
 * engine works and why that produces better meetings.
 *
 * Editing rules for this file:
 * - One idea, one place. Every capability of the engine lives in
 *   `engine` and nowhere else on the page. Human approval, opt-outs and
 *   the channel mix live in `humanLayer` and nowhere else.
 * - No performance figures. Nothing here is a measured result, so
 *   nothing here may read as one. If a number is ever added it needs a
 *   real source, the way `proof.ts` carries one.
 * - No internal tool names. "Multiple data sources" is the public
 *   wording, deliberately.
 * - Never claim the AI writes or sends anything. It researches and
 *   briefs; a person writes and approves.
 */

export const whyFlowa = {
  seo: {
    title: "Why Flowa — our AI reads the market, people start the conversations",
    description:
      "Inside the Flowa research engine: it reads the market daily, judges whether a signal is real, finds the decision-maker behind it, verifies the data and scores every lead against your ICP. A person writes and approves every message.",
    ogTitle: "Why Flowa — AI research, human conversations",
    ogDescription:
      "How Flowa finds companies worth contacting this week, not a list of companies that existed last year. AI reads the market. People start the conversations.",
  },

  /** 1. Hero. The claim, one subline, one call to action. No figures. */
  hero: {
    h1: ["Our AI reads the market.", "We start the conversations."],
    sub: "The engine watches your market every day and works out who is worth contacting this week. Then a person writes to them.",
    ctaSecondary: { label: "See what it looks for", href: "#engine" },
  },

  /** 2. The problem. Three lines, no competitor named, nothing repeated later. */
  problem: {
    h2: "Static lists are the wrong tool.",
    lines: [
      "A bought list describes what a company is. It says nothing about what changed there this week.",
      "Lists start ageing the day they are exported, so the person you reach has often already moved on.",
      "Without a reason for the timing, even a well-written message arrives as noise.",
    ],
  },

  /**
   * 3. The engine. The core of the page: every capability of the system
   * is described here, once. `ui` drives the small live detail beside
   * each step; it is illustrative and the section says so.
   */
  engine: {
    h2: "Inside the engine",
    lead: "Six steps, run every day against your market.",
    steps: [
      {
        n: "01",
        title: "Read the market",
        body: "Every day it reads job posts, leadership changes, UK expansion moves and public posts from decision-makers across the market you sell into.",
        ui: { kind: "signal", label: "Signal picked up", lines: ["Job post · 2 x SDR", "Posted 4 hours ago"] },
      },
      {
        n: "02",
        title: "Understand the signal",
        body: "It reads context rather than keywords, so it can tell a real buying signal from noise, and an agency from a brand with the word marketing in its name.",
        ui: { kind: "verdict", label: "Context check", pass: "Buying signal", fail: "Noise" },
      },
      {
        n: "03",
        title: "Find the buyer",
        body: "When the signal comes from an employee, it traces the person who actually owns the decision, rather than writing to whoever happened to post.",
        ui: { kind: "trace", label: "Decision-maker traced", from: "Recruiter", to: "Head of Sales" },
      },
      {
        n: "04",
        title: "Verify the data",
        body: "Every contact is cross-checked across multiple data sources. Mismatches are discarded, and every email address is verified before anyone uses it.",
        ui: { kind: "checks", label: "Verification", items: ["Role confirmed", "Company matched", "Email verified"] },
      },
      {
        n: "05",
        title: "Match your ICP",
        body: "Each lead is scored against your industry, size band, geography, role, signal type and how fresh the signal is, then deduped against everyone already contacted and every opt-out.",
        ui: { kind: "score", label: "ICP match", value: "Strong", chips: ["SaaS", "50-200", "UK"] },
      },
      {
        n: "06",
        title: "Brief the human",
        body: "It writes a short research brief for the lead: why this company is worth contacting now, and which real fact about them the first message should open with.",
        ui: { kind: "brief", label: "Research brief", lines: ["Why now: hiring two SDRs", "Open with: new UK office"] },
      },
    ],
    /** Continuous improvement. Stated once, here, as the closing line of the section. */
    learns: "Routes that stop producing qualified leads are dropped. The ones that work are run again.",
    illustrative: "Interface details are illustrative.",
  },

  /**
   * 4. Signals in the wild. Makes "why now" concrete. Anonymised
   * examples of signal types, never a real company or contact.
   */
  signals: {
    h2: "What a buying signal looks like",
    lead: "Four of the patterns the engine is built to notice.",
    signalLabel: "Signal",
    meaningLabel: "What it means for you",
    items: [
      {
        signal: "A SaaS company posts two SDR roles in one week.",
        meaning: "They are funding pipeline right now, and they have a gap until those hires are productive.",
      },
      {
        signal: "An IT services firm appoints a new Head of Sales.",
        meaning: "First ninety days. They are looking for early wins and are open to a channel they did not inherit.",
      },
      {
        signal: "A Nordic company registers a UK entity and starts hiring here.",
        meaning: "They need UK meetings and have no local network to get them from yet.",
      },
      {
        signal: "A founder posts publicly about a thin pipeline.",
        meaning: "They have already named the problem out loud, so the conversation does not have to start from scratch.",
      },
    ],
    note: "Examples are anonymised patterns, not real companies.",
  },

  /**
   * 5. Where the AI stops. The only place on this page that talks about
   * human approval, opt-outs, quality thresholds and channels.
   */
  humanLayer: {
    h2: "Where the AI stops",
    lead: "The engine researches. It does not talk to your market.",
    points: [
      { title: "A person writes every message", body: "One to one, to a named individual, using the brief. Nothing is generated and sent on its own." },
      { title: "A person approves it before it goes", body: "Ahmed or Anton reads the message and the reasoning behind it, and can throw either away." },
      { title: "Opt-outs are permanent", body: "Anyone who asks not to hear from us is suppressed across every campaign we run, for good." },
      { title: "Zero leads beats one wrong lead", body: "Where the engine cannot stand a lead up, it holds it back rather than filling a quota." },
    ],
    channelsHeading: "How we reach them",
    channels: "Email first, then a LinkedIn connection, then a follow-up and engagement on LinkedIn, with InMail where it is the strongest way in. No phone.",
  },

  /** 6. Transparency: one lead as it appears to the client. Clearly illustrative. */
  dashboard: {
    h2: "Every lead arrives on one row",
    lead: "You see the reasoning, not just the name.",
    columns: ["Lead", "Signal", "Segment", "Status", "Channel", "Next step"],
    row: {
      lead: "Head of Sales, SaaS (80 people)",
      signal: "Hiring 2 SDRs",
      segment: "SaaS · UK · 50-200",
      status: "Approved",
      channel: "Email",
      next: "LinkedIn connection, Thu",
    },
    note: "Illustrative. Not a real lead or client.",
    /**
     * The two things this page deliberately does not restate. They live
     * on the home page and the pricing page; this is a link, not a
     * summary, so neither argument is made twice on the site.
     */
     links: [
      { label: "How this compares with hiring an SDR", href: "/#comparison" },
      { label: "What a meeting costs", href: "/pricing" },
    ],
  },

  /** 7. Close. The site motto in the existing two-tone treatment. */
  cta: {
    motto: ["Creating meetings.", "That create opportunities."],
    body: "Tell us who you sell to, and we will show you the signals we can already see in your market.",
  },
} as const;
