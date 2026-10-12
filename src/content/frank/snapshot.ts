/**
 * The free market snapshot (/market-snapshot) and the meeting-value
 * calculator on /pricing. Kept deliberately short: one promise, three
 * steps, one example, one form. People and companies are fictional.
 */
export const snapshot = {
  path: "/market-snapshot",
  seo: {
    title: "Free market snapshot | Flowa",
    description: "Tell us who you sell to. Within one working day you get 10 companies in your market showing a buying signal right now, with who decides and a draft first message. Free.",
  },
  h1Light: "See who's ready to buy ",
  h1Bold: "in your market",
  sub: "Tell us who you sell to. Within one working day you get 10 companies showing a buying signal right now, with who decides and a first message you can send. Free, and yours to keep.",
  steps: [
    { title: "Tell us who you sell to", body: "Two lines are enough." },
    { title: "Frank scans your market", body: "Ahmed or Anton checks every company." },
    { title: "Your snapshot arrives by email", body: "Within one working day." },
  ],
  limit: "We make five a week, so we can do each one properly.",
  form: {
    h2: "Get your free snapshot",
    sell: "What do you sell?",
    sellPlaceholder: "E.g. payroll software for UK agencies",
    meet: "Who do you want to meet?",
    meetPlaceholder: "E.g. Heads of Finance at agencies with 20–200 people",
    submit: "Get my snapshot",
    successTitle: "Thanks! Your snapshot is on its way within one working day.",
  },
  example: {
    h2Light: "What your snapshot ",
    h2Bold: "looks like",
    sub: "Three of the ten rows from an example snapshot.",
    columns: ["Company", "Buying signal", "Who decides", "Open with"],
    rows: [
      ["Brightline Software", "Hiring 2 SDRs · 4 days ago", "Oliver Hart, Head of Sales", "Keeping the calendar full while the new reps ramp"],
      ["Northgate IT Services", "New Head of Sales · this month", "Priya Nair, CRO", "Early wins in her first 90 days"],
      ["Kestrel Creative", "Founder post: pipeline is thin", "Tom Whitfield, Founder", "What he said in his own post"],
    ],
    note: "Example is illustrative. People and companies are fictional.",
    plus: "Plus three draft first messages, written for the best-fit companies.",
  },
  band: {
    h2: "Want to see this on your own market?",
    body: "Get a free snapshot: 10 companies showing a buying signal right now, with who decides and what to open with.",
    cta: "Get my free snapshot",
  },
} as const;

/** "What is one meeting worth to you?" on /pricing. Nothing is sent or stored. */
export const meetingValue = {
  h2Light: "What is one meeting ",
  h2Bold: "worth to you?",
  sub: "Two numbers, and you'll see what a single meeting is worth to your business.",
  dealLabel: "Average first-year value of a new customer",
  rateLabel: "Out of 10 first meetings, how many become customers?",
  resultLabel: "One meeting is worth about",
  vsPilot: "the Pilot price per meeting",
  payback: "One new customer pays for",
  paybackUnit: "Pilot meetings",
  note: "An estimate from your own numbers. Nothing you type is sent or saved.",
} as const;
