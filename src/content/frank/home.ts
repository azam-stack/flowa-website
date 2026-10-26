/**
 * Homepage copy, section by section, in the exact order of brief §4.
 * Every string is from the brief. Mock-up data uses fictional names and
 * fictional companies only. Copy v2: Frank finds, researches and drafts;
 * a person at Flowa approves every message; Frank follows up and books.
 */
import { SITE_CONFIG } from "@/config/site";

export const home = {
  seo: {
    title: "Flowa | B2B meetings in the UK, paid per meeting that happens",
    description: "Flowa books qualified B2B meetings with UK buyers who have a reason to talk now. No SDR salary, no retainer on the pilot: you pay when the meeting takes place.",
  },

  /** 4.1 — problem first. The buyer's alternative is an SDR hire; we are the lower-risk way to the same calendar. */
  hero: {
    h1Light: "Stop hiring SDRs. ",
    h1Bold: "Pay for meetings that happen.",
    sub: "We find UK buyers with a reason to talk this week, write to them one at a time, and book the meeting into your calendar. You are billed when it takes place, not for activity.",
    demo: "Book a 20-minute call",
    demoHref: SITE_CONFIG.bookCallHref,
    secondary: "See how Frank works",
    secondaryHref: "/how-it-works",
    video: "See Frank in action",
    /** The demo video in the modal: one warm SaaS lead, from signal to booked meeting. */
    videoSrc: "video/frank-in-action.mp4",
    videoPoster: "video/poster.jpg",
    videoNote: "Example is illustrative. People and companies are fictional.",
    videoClose: "Close video",
    /** The proof line under the buttons. Flowa's own records. */
    proof: [
      { value: "2,000+", label: "meetings booked" },
      { value: "70%", label: "show up" },
      { value: "£400", label: "per held meeting on the pilot" },
    ],
    cards: {
      left: {
        label: "Spots buying signals",
        mini: { tag: "New signal", body: "Hiring 2 SDRs", time: "4h ago" },
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

  /** "The meeting": what the buyer actually gets. The invite as it lands in their calendar, and the four checks it passed first. Fictional lead. */
  meeting: {
    eyebrow: "What you get",
    h2Light: "A meeting that happens. ",
    h2Bold: "With the right person, for a reason.",
    sub: "Not a lead, not a reply. A confirmed slot in your calendar with someone who has the authority, fits your ideal customer and has a reason to talk this month, briefed before you join.",
    checksTitle: "Before you are invoiced, every meeting has passed four checks",
    checks: [
      { title: "Right person", body: "Decision-maker or budget holder. We agree the roles with you in writing." },
      { title: "Right company", body: "Size, market and sector match the ideal customer we set together." },
      { title: "Right reason", body: "A dated signal we can point to: a hire, a funding round, a new director." },
      { title: "It took place", body: "No-shows are not billed. We rebook them instead." },
    ],
    invite: {
      kicker: "Thu 14:30 – 15:00",
      title: "Intro call · Brightline Software",
      who: { name: "Oliver Hart", role: "Head of Sales", company: "Brightline Software · 120 people · UK" },
      whyLabel: "Why now",
      why: "Hiring two SDRs, posted Tuesday. Wants pipeline while they ramp.",
      briefLabel: "Brief",
      brief: "Open with the SDR hires. He has used an agency before and left over quality; lead with the approval step.",
      bookedBy: "Booked by Anton · added to your CRM",
      held: "Held",
      proof: "70% of booked meetings take place. If one doesn't, you don't pay for it.",
    },
  },

  /** "One campaign, start to finish": headline, the channel card and the step strip. */
  demo: {
    eyebrow: "How it works",
    h2Light: "One campaign, ",
    h2Bold: "start to finish",
    sub: "From a public buying signal to a meeting in your calendar. We reach each buyer on the channel they actually answer, one message at a time, and a person at Flowa reads every one before it sends.",
    /** The channel card to the right of the headline: three channels, one team. */
    card: {
      label: "Three channels, two founders",
      status: "Live",
      channels: [
        { key: "email", name: "Email" },
        { key: "linkedin", name: "LinkedIn" },
        { key: "phone", name: "Phone" },
      ],
      centre: "Flowa",
      foot: "Every message read by a person before it sends.",
      out: "Meeting in your calendar",
    },
    steps: [
      { key: "find", name: "Find", when: "Every morning", line: "We read LinkedIn, job ads, funding news and trade-show lists for companies that match your ideal customer and have a reason to talk now." },
      { key: "qualify", name: "Qualify", when: "Every lead", line: "Each lead needs the right role, size and market, and a dated signal." },
      { key: "draft", name: "Draft", when: "Same day", line: "One short message to one person, opening with the thing they actually said. No sequence, no template." },
      { key: "approve", name: "Approve", when: "Before anything sends", line: "Ahmed or Anton reads every message. Nothing goes out without a yes." },
      { key: "send", name: "Send", when: "Human pace", line: "Sent from your domain or LinkedIn, inside safe daily limits." },
      { key: "book", name: "Book", when: "On reply", line: "Anton answers within the hour, qualifies against your criteria and books the meeting with a brief attached." },
    ],
  },

  /** "We catch the moment": timing, not lists. Signals are fictional companies, illustrative. */
  moment: {
    eyebrow: "Why it works",
    h2Light: "We don't call lists. ",
    h2Bold: "We catch the moment.",
    sub: "Every morning we read funding news, Companies House, job boards and trade-show lists for one thing: a reason your buyer would take a meeting this week.",
    card: { label: "Signals · this week", status: "Watching", foot: "Decision maker reached the same week, with a reason that is about them." },
    signals: [
      { key: "hire", company: "Brightline Software", signal: "Hiring their first SDR", source: "Job ad", when: "2h ago", stamp: "Meeting Thu 14:30", booked: true },
      { key: "leader", company: "Northgate IT Services", signal: "New Sales Director appointed", source: "LinkedIn", when: "Today", stamp: "Contacted Wed" },
      { key: "funding", company: "Kestrel Creative", signal: "Raised a Series A to grow the UK team", source: "Funding news", when: "Yesterday", stamp: "Contacted Thu" },
      { key: "show", company: "Harbour Logistics", signal: "Exhibiting at a logistics show in March", source: "Exhibitor list", when: "This week", stamp: "Contacted Thu" },
    ],
    groups: [
      { name: "Growing", tags: ["Hiring", "Funding", "New office", "Acquisition"] },
      { name: "Changing", tags: ["New leader", "Contract renewal", "New regulation"] },
      { name: "Visible", tags: ["Trade show", "Award shortlist", "Launch", "Growth list"] },
    ],
  },

  /** The buyer's real alternative, side by side. Figures are UK averages Flowa quotes in sales calls; keep them defensible. */
  math: {
    eyebrow: "The alternative",
    h2Light: "An SDR costs you ",
    h2Bold: "£35K before the first meeting.",
    sub: "Most teams we talk to are deciding between hiring an SDR and working with us. Here is the honest comparison.",
    left: { title: "Hiring an SDR", rows: ["£30–40K salary, plus tools and data", "3–4 months to ramp before meetings arrive", "Average tenure around 16 months, then you recruit again", "You pay for activity: dials, emails, time", "Quality depends on one person's week"] },
    right: { title: "Working with Flowa", rows: ["No salary. The pilot has no retainer", "First meetings in week two", "The same two founders run your campaign from day one", "You pay per meeting that takes place", "Every message read by a person before it sends"] },
    foot: "One invoice instead of a hire. If the meetings stop, so does the invoice.",
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
    eyebrow: "What we run for you",
    h2: "Six ways we fill a calendar",
    sub: "Pick the ones that fit. Every one ends the same way: a qualified meeting, booked by a person, with a brief attached.",
    items: [
      { key: "signal", title: "Signal-based outbound", body: "A funding round, a new sales director, a hiring post, a trade-show list. We write the week it happens, not months after a list was exported.", who: ["frank"], whoLabel: "Found by our research agent" },
      { key: "email", title: "Cold email, done carefully", body: "One message to one person on verified data, sent from your domain at a human pace. Deliverability and suppression handled for you.", who: ["frank", "ahmed"], whoLabel: "Drafted, then approved by Ahmed" },
      { key: "linkedin", title: "LinkedIn outreach", body: "Connection notes and messages written one to one. Anton approves each and keeps the conversation going until there is a slot in the calendar.", who: ["frank", "anton"], whoLabel: "Anton runs the conversation" },
      { key: "accounts", title: "Named target accounts", body: "Give us the twenty companies you want. We find the right person at each, the reason to write now, and open the door.", who: ["frank", "ahmed", "anton"], whoLabel: "We map the account" },
      { key: "noshow", title: "No-show recovery", body: "Missed meetings are followed up and rebooked by us, and a no-show is never counted as delivered.", who: ["anton"], whoLabel: "Anton follows up" },
      { key: "crm", title: "CRM and live dashboard", body: "Every reply and booked meeting syncs to your CRM. Watch it happen on your live dashboard.", who: ["ahmed", "anton"], whoLabel: "You see everything" },
    ],
  },

  /** People band: Frank does the digging, Ahmed and Anton do the talking. */
  team: {
    eyebrow: "Who you work with",
    h2: "Two founders, not a platform.",
    sub: "Ahmed and Anton came up through cold calling agencies in Denmark and moved the business to the UK market. They set your criteria with you, read every message before it sends, and run every conversation to a booked meeting. Our research agent, Frank, does the reading so they can do the talking.",
    people: [
      { key: "ahmed", name: "Ahmed Zamzam", role: "Co-founder", does: "Approves every message and owns your targeting" },
      { key: "anton", name: "Anton Busk", role: "Co-founder", does: "Runs the conversations and books the meetings" },
    ],
    frankDoes: "Reads your market every morning and drafts the first line",
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
    h2: "The rules we don't break",
    sub: "Built around UK GDPR and PECR. They hold on every campaign, for every client, whatever the volume.",
    items: [
      { title: "A person approves every message", body: "Nothing goes out until Ahmed or Anton has read it and said yes." },
      { title: "No signal, no message", body: "Every lead needs a dated, public reason to reach out that we can point to. Otherwise we don't write." },
      { title: "Business contacts only", body: "We contact people in their professional role, about something relevant to their job, with a clear way to say no." },
      { title: "Opt-outs are permanent", body: "Anyone who asks not to hear from us is suppressed across every campaign, for good." },
      { title: "No bought lists", body: "Every lead comes from a public buying signal and verified contact data. Nothing is blasted at scale." },
      { title: "Your data stays yours", body: "Every list, contact and campaign asset built for you belongs to you, and we never sell data to anyone." },
    ],
    link: { label: "Read our privacy policy", href: "/privacy" },
  },

  /** 4.10 */
  contact: {
    h2: "Tell us who you want to meet.",
    sub: "A 20-minute call with Ahmed or Anton: your market, what a qualified meeting looks like for you, and whether we are the right fit. No deck.",
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
    homeQuestions: ["Do I need my own list of leads?", "What counts as a qualified meeting?", "What happens if nobody shows up?", "Is it all automated?", "What does it cost?"],
    allLink: { label: "See all questions", href: "/faq" },
    items: [
      { q: "Do I need my own list of leads?", a: "No. We build the list from public buying signals in your market every week, checked against the criteria we agree with you. If you already have target accounts, give us the names and we find the right people." },
      { q: "What happens if nobody shows up?", a: "A no-show is not a meeting, so it is not billed. Tell us within 24 hours and we rebook it, so the lead stays warm. Across our engagements about seven in ten booked meetings take place." },
      { q: "What is Frank?", a: "Our research agent. It reads LinkedIn, job ads, funding news and trade-show lists every morning and drafts a first line. Everything else, the approval, the conversation and the booking, is done by Ahmed and Anton." },
      { q: "Is it all automated?", a: "The research and the drafts are. The sending isn't. A person reads and approves every message, because one bad message costs more than ten good ones earn." },
      { q: "Does Flowa replace my sales team?", a: "No. We fill the calendar. Your team does what it's best at: the conversation and the close." },
      { q: "Who is behind Flowa?", a: "Flowa's co-founders, Ahmed Zamzam and Anton Busk. They set up your campaign, agree your qualification criteria with you and check the outreach." },
      { q: "Where does Frank find leads?", a: "Public buying signals: LinkedIn posts and comments, job ads, leadership changes and company news. Then verified contact data. No bought lists blasted at scale." },
      { q: "What counts as a qualified meeting?", a: "We agree it with you before we start: role or decision-making authority, genuine interest and a match with your ideal customer profile. It's written down, so there's no ambiguity later." },
      { q: "What does it cost?", a: "The pilot is £400 per meeting that takes place, with no retainer, so your risk is one meeting. Monthly plans start at £1,200 a month with a meeting commitment. Your exact quote depends on your market and volume, and we send it within one working day.", link: { label: "Go to pricing", href: "/pricing" } },
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
