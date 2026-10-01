/**
 * Homepage copy, section by section, in the exact order of brief §4.
 * Every string is from the brief. Mock-up data uses fictional names and
 * fictional companies only. Copy v2: Frank finds, researches and drafts;
 * a person at Flowa approves every message; Frank follows up and books.
 */
export const home = {
  seo: {
    title: "Flowa | AI-powered outbound that books B2B meetings",
    description: "Flowa books qualified B2B meetings. Our AI agent Frank finds companies with a real reason to buy and drafts the first message; Ahmed and Anton approve every word and book the meeting.",
  },

  /** 4.1 */
  hero: {
    h1Light: "Outbound that books ",
    h1Bold: "B2B meetings",
    sub: "Our AI agent Frank finds buyers with a real reason to talk. Ahmed and Anton approve every message and book the meeting.",
    demo: "Book a call",
    video: "See Frank in action",
    /** The demo video in the modal: one warm SaaS lead, from signal to booked meeting. */
    videoSrc: "video/frank-in-action.mp4",
    videoPoster: "video/poster.jpg",
    videoNote: "Example is illustrative. People and companies are fictional.",
    videoClose: "Close video",
    cards: {
      left: {
        label: "Spots buying signals",
        mini: { tag: "New signal", body: "Hiring 2 SDRs", time: "4h ago" },
        /** The left card cycles through these every 4 s. */
        cycle: [
          { tag: "New signal", body: "Hiring 2 SDRs", meta: "Brightline Software", time: "4h ago", person: "Oliver Hart" },
          { tag: "LinkedIn post", body: "“Pipeline is thin this quarter”", meta: "Kestrel Creative", time: "1h ago", person: "Tom Whitfield" },
          { tag: "Leadership change", body: "New Head of Sales", meta: "Northgate IT Services", time: "today", person: "Priya Nair" },
        ],
      },
      centre: { label: "Frank | AI Outbound Agent" },
      right: { label: "Books qualified meetings", mini: { tag: "Booked", body: "Priya Nair", time: "Tue 10:00" } },
    },
  },

  /** 4.3 */
  tabbed: {
    eyebrow: "Why Flowa",
    h2: "Every meeting starts with a reason",
    sub: "We look for intent, not just names on a list.",
    mock: {
      countBold: "214",
      countRest: " companies with a signal this week",
      toggle: "Only 10–200 employees",
      promptLead: "Hi there, ",
      promptBold: "who should we reach this week?",
      promptPlaceholder: "Describe your ideal customer",
      search: "Search",
      sources: ["LinkedIn posts", "Job ads", "Company news", "Comments"],
      /** Fictional people at fictional companies. */
      prospects: [
        { name: "Oliver Hart", title: "Head of Sales", company: "Brightline Software", size: "120 people", signal: "Hiring SDRs" },
        { name: "Priya Nair", title: "CRO", company: "Northgate IT Services", size: "85 people", signal: "New in role" },
        { name: "Tom Whitfield", title: "Founder", company: "Kestrel Creative", size: "40 people", signal: "Asked for recs" },
        { name: "Sofie Madsen", title: "COO", company: "Example SaaS", size: "60 people", signal: "UK expansion" },
      ],
    },
    tabs: [
      { key: "moment", title: "The right moment", feature: "Live buying signals.", body: "Frank reads LinkedIn posts, comments, job ads and company news every day, and picks up teams with a real reason to talk now." },
      { key: "person", title: "The right person", feature: "Checked against your ICP.", body: "Every lead passes the same checklist and needs a dated signal we can point to. Zero leads beats wrong leads." },
      { key: "words", title: "The right words", feature: "One-to-one drafts.", body: "Frank writes a short first message that opens with the thing they actually said. No templates, no AI-sounding fluff." },
      { key: "hands", title: "The right hands", feature: "A human checks every message.", body: "Nothing goes out until Ahmed or Anton has read and approved it. That keeps reply rates high and your name safe." },
    ],
  },

  /** 4.5 */
  useCases: {
    eyebrow: "Use cases",
    h2: "One team, your whole outbound",
    sub: "Frank does the research and the drafts. Ahmed and Anton approve every message and keep the conversations going.",
    items: [
      { key: "signal", title: "Signal-based outbound", body: "Reach companies at the moment they show a need, not months after a list was exported.", who: ["frank"], whoLabel: "Frank spots it" },
      { key: "email", title: "Cold email, done carefully", body: "Short sequences on verified data. Frank drafts, Ahmed approves, and deliverability is handled for you.", who: ["frank", "ahmed"], whoLabel: "Frank drafts · Ahmed approves" },
      { key: "linkedin", title: "LinkedIn outreach", body: "Notes and messages drafted one to one by Frank. Anton approves each one and keeps the conversation going.", who: ["frank", "anton"], whoLabel: "Frank drafts · Anton replies" },
      { key: "accounts", title: "Named target accounts", body: "Give us the companies you want. Frank finds the right people, and we open the door.", who: ["frank", "ahmed", "anton"], whoLabel: "Frank finds · we reach out" },
      { key: "noshow", title: "No-show recovery", body: "Missed meetings are followed up and rebooked by us, and a no-show is never counted as delivered.", who: ["anton"], whoLabel: "Anton follows up" },
      { key: "crm", title: "CRM and live dashboard", body: "Every reply and booked meeting syncs to your CRM. Watch it happen on your live dashboard.", who: ["ahmed", "anton"], whoLabel: "You see everything" },
    ],
  },

  /** People band: Frank does the digging, Ahmed and Anton do the talking. */
  team: {
    eyebrow: "The people behind Flowa",
    h2: "Frank does the digging. Ahmed and Anton do the talking.",
    sub: "Every message is read and approved by one of Flowa's co-founders before it goes out, and they keep every conversation going until there is a meeting.",
    people: [
      { key: "ahmed", name: "Ahmed Zamzam", role: "Co-founder", does: "Approves every message and owns your targeting" },
      { key: "anton", name: "Anton Busk", role: "Co-founder", does: "Runs the conversations and books the meetings" },
    ],
    frankDoes: "Finds the signals, researches the buyer and drafts the first line",
    cta: "Meet the team",
    ctaHref: "/about",
  },

  /** 4.6 */
  meet: {
    eyebrow: "Meet Frank",
    h2: "Works while you sleep",
    sub: "Frank does the digging. Ahmed and Anton keep the quality.",
    nameBar: "Frank | AI Outbound Agent",
    rows: [
      {
        key: "finds",
        frankSide: "left" as const,
        pose: "portrait" as const,
        title: "Finds the buyers",
        sub: "Intent, not lists.",
        body: "Every morning Frank scans for people showing a need right now, scores them against your ideal customer profile and writes a short brief: why now, and what to open with.",
        mock: { stat: "1,240 companies scanned", chips: ["Why now: hiring two SDRs", "Open with: new UK office"] },
      },
      {
        key: "writes",
        frankSide: "right" as const,
        pose: "laptop" as const,
        title: "Writes the first line",
        sub: "Drafted by Frank. Approved by a person.",
        body: "Frank drafts a personal message for LinkedIn or email. Ahmed or Anton checks it, tweaks it if needed and sends it at a safe, human pace.",
        mock: { stat: "Draft ready for review" },
      },
      {
        key: "books",
        frankSide: "left" as const,
        pose: "thumbs" as const,
        title: "Books the meeting",
        sub: "Replies handled. Calendar filled.",
        body: "When someone replies, Anton keeps the conversation going, qualifies the interest against the criteria we agreed with you, and the meeting lands in your calendar with the context you need.",
        mock: { stat: "4 new meetings booked", insight: "Lead qualified for a first meeting" },
      },
    ],
    caption: "Signals and messages that don't turn into meetings are dropped. The ones that work are used again.",
  },

  /** 4.7 */
  calendars: {
    headline: "Built to fill calendars",
    cta: "Book a call",
  },

  /** 4.8 */
  who: {
    eyebrow: "Who it's for",
    h2: "Is Flowa right for you?",
    sub: "We take on a limited number of clients, so we are honest about fit before we start.",
    fitTitle: "A good fit if you",
    fit: [
      "Sell B2B, with the UK as a key market",
      "Win deals where one new customer is worth a lot, so a single meeting can pay for itself",
      "Can describe the companies and roles you want to meet",
      "Have someone ready to take the meeting and close",
    ],
    notFitTitle: "Not a fit if you",
    notFit: [
      "Want thousands of emails sent every week",
      "Sell low-value or consumer products",
      "Want messages sent without a person reading them first",
    ],
    cta: "Sounds like you? Book a call",
  },

  /** 4.9 */
  proof: {
    h2Light: "Measured in ",
    h2Bold: "meetings",
    h2Rest: ", not promises",
    /** The founder's own quote, until a client quote is approved. */
    quote: "We'd rather run five campaigns properly than twenty badly. That's why we take on a limited number of clients at a time.",
    quoteName: "Ahmed Zamzam",
    quoteRole: "Co-founder, Flowa",
    stats: [
      { value: "6+", label: "years of B2B outbound" },
      { value: "2,000+", label: "meetings booked" },
      { value: "£3.4M+", label: "revenue generated for clients" },
      { value: "£90K+", label: "record annual sale from one meeting" },
    ],
    footnote: "Flowa's own records, all engagements to date.",
    /** The stats strip under the client logos on the homepage. */
    stripTitle: "Our own numbers, not promises",
    stripTitleLight: "Our own numbers, ",
    stripTitleBold: "not promises",
  },

  /** How an engagement runs, week by week. */
  engagement: {
    eyebrow: "How we work together",
    h2: "From first call to meetings in your calendar",
    sub: "A clear plan from day one, run by the same two people from start to finish.",
    steps: [
      { when: "Week 1", title: "Kick-off", body: "A call with Ahmed and Anton. We agree your ideal customer, the roles worth meeting and, in writing, what counts as a qualified meeting." },
      { when: "Week 2", title: "First messages", body: "Frank starts finding buying signals. Every first message is drafted for one person and approved by us before it goes out." },
      { when: "Week 3 onwards", title: "Conversations", body: "Replies come in. Anton keeps every conversation going and qualifies the interest against the criteria we agreed." },
      { when: "Ongoing", title: "Meetings", body: "Qualified meetings land in your calendar with a short brief: who they are, why now and what to open with." },
    ],
  },

  /** The commercial promise (Flowa's standing terms). */
  promise: {
    eyebrow: "Our promise",
    h2Light: "You pay for meetings ",
    h2Bold: "that actually happen.",
    sub: "Outbound is a risk for you. We carry as much of it as we can.",
    points: [
      { title: "Held meetings only", body: "A meeting counts when it takes place with someone who meets the criteria we agreed with you. Activity is never billed." },
      { title: "No-shows rebooked", body: "If someone doesn't turn up, tell us within 24 hours and we rebook the meeting so the lead stays warm." },
      { title: "Criteria in writing", body: "We write down what a qualified meeting is before we start, so there is never any doubt about what you are paying for." },
    ],
  },

  /** Compliance and brand safety (UK). */
  compliance: {
    eyebrow: "Safe for your brand",
    h2: "Outreach your legal team can sign off",
    sub: "Built around UK GDPR and PECR, with a person checking every message that carries your name.",
    items: [
      { title: "Business contacts only", body: "We contact people in their professional role, about something relevant to their job, with a clear way to say no." },
      { title: "Opt-outs are permanent", body: "Anyone who asks not to hear from us is suppressed across every campaign, for good." },
      { title: "No bought lists", body: "Every lead comes from a public buying signal and verified contact data. Nothing is blasted at scale." },
      { title: "Your data stays yours", body: "Every list, contact and campaign asset built for you belongs to you, and we never sell data to anyone." },
    ],
    link: { label: "Read our privacy policy", href: "/privacy" },
  },

  /** Homepage results: published client cases. */
  results: {
    eyebrow: "Client results",
    h2: "What one meeting can be worth",
    sub: "Two results our clients have let us share.",
    cta: "See all cases",
  },

  /** 4.10 */
  contact: {
    h2: "Let Flowa prospect. You take the meetings.",
    sub: "See how Flowa can build your pipeline, qualify replies and book the meetings your team wants.",
    points: ["A reply from Ahmed or Anton within one working day", "Every message checked by a person", "Your data stays yours"],
  },

  /** 4.11, built but hidden behind a flag until approved quotes exist. */
  testimonials: {
    enabled: false,
    title: "What clients say about Flowa",
    prev: "Previous testimonial",
    next: "Next testimonial",
    items: [] as { quote: string; name: string; role: string; company: string }[],
  },

  /** 4.12 */
  finalCta: {
    eyebrow: "See it in action",
    h2: "We book. You close.",
    cta: "Book a call",
  },

  /** 4.13 */
  faq: {
    h2: "Questions, answered",
    /** The five shown on the homepage; /faq shows them all. */
    homeQuestions: ["What is Frank?", "Is it all automated?", "What counts as a qualified meeting?", "What does it cost?", "Who owns the data?"],
    allLink: { label: "See all questions", href: "/faq" },
    items: [
      { q: "What is Frank?", a: "Frank is Flowa's AI outbound agent. He finds companies with a real reason to buy and drafts the first message. Ahmed or Anton approves every message, and we follow up until there's a meeting in your calendar." },
      { q: "Is it all automated?", a: "The research and the drafts are. The sending isn't. A person reads and approves every message, because one bad message costs more than ten good ones earn." },
      { q: "Does Flowa replace my sales team?", a: "No. We fill the calendar. Your team does what it's best at: the conversation and the close." },
      { q: "Who is behind Flowa?", a: "Flowa's co-founders, Ahmed Zamzam and Anton Busk. They set up your campaign, agree your qualification criteria with you and check the outreach." },
      { q: "Where does Frank find leads?", a: "Public buying signals: LinkedIn posts and comments, job ads, leadership changes and company news. Then verified contact data. No bought lists blasted at scale." },
      { q: "What counts as a qualified meeting?", a: "We agree it with you before we start: role or decision-making authority, genuine interest and a match with your ideal customer profile. It's written down, so there's no ambiguity later." },
      { q: "What does it cost?", a: "It depends on your market and volume. Answer three quick questions on our pricing page and we'll send you a quote within one working day.", link: { label: "Go to pricing", href: "/pricing" } },
      { q: "Who owns the data?", a: "You do. Every list, contact and campaign asset built for you stays yours." },
      { q: "Does Flowa work with our CRM?", a: "Booked meetings and replies can be shared with the CRM you already use. We set it up with you during onboarding." },
      { q: "How quickly can we start?", a: "After a first call we agree strategy and your ideal customer profile. Onboarding usually starts shortly after." },
    ],
  },

  /** 4.14 */
  trust: {
    h3: "Your data, your pipeline",
    body: "Your data stays yours. Every list, contact and campaign asset belongs to you.",
  },
} as const;
