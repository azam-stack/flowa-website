/**
 * Pricing: the single source of truth for the Pilot → Core → Plus → Scale
 * model. Every component that shows a price, a package or a feature reads
 * from here; nothing is duplicated in components. Scale has no public
 * price: `monthly: null` and `displayPrice` is what the page shows.
 * No internal starting figures live in this file.
 */
export type PackageId = "pilot" | "core" | "plus" | "scale";

export type Package = {
  id: PackageId;
  name: string;
  /** The emotional line: what this step lets the client say. */
  tagline: string;
  /** One sentence of positioning under the name. */
  positioning: string;
  bestFor: string;
  /** Setup fee in GBP. */
  setup: number;
  /** Monthly fee in GBP, or null when the price is on request. */
  monthly: number | null;
  /** Per-meeting price in GBP for usage-based packages. */
  perMeeting?: number;
  /** Shown instead of a number when `monthly` is null. */
  displayPrice?: string;
  meetingsPerYear: string;
  /** "performance" (paid per meeting) or "monthly" (fixed package with a meeting commitment). */
  model: "performance" | "monthly";
  badge?: string;
  recommended?: boolean;
  cta: string;
  /** What this package adds over the one before it. */
  adds: string[];
};

export const packages: Package[] = [
  {
    id: "pilot",
    name: "Pilot",
    tagline: "Let's prove this works.",
    positioning: "Prove the model before committing.",
    bestFor: "Best for testing.",
    setup: 600,
    monthly: null,
    perMeeting: 400,
    meetingsPerYear: "By usage",
    model: "performance",
    badge: "Start here",
    cta: "Start with a Pilot",
    adds: ["Pay per booked meeting", "£600 setup, no long-term commitment", "Email outreach", "No meeting guarantee, no phone, no strategy sessions"],
  },
  {
    id: "core",
    name: "Core",
    tagline: "Let's make outbound consistent.",
    positioning: "Build a consistent outbound engine.",
    bestFor: "Best for consistent email-led outbound.",
    setup: 0,
    monthly: 1200,
    meetingsPerYear: "45+",
    model: "monthly",
    cta: "Talk about Core",
    adds: ["Fixed monthly model", "Meeting guarantee", "Email-led outbound"],
  },
  {
    id: "plus",
    name: "Plus",
    tagline: "Let's add phone and strategic support.",
    positioning: "Add phone booking and stronger strategic support.",
    bestFor: "Best for scaling across email and phone.",
    setup: 0,
    monthly: 2200,
    meetingsPerYear: "100+",
    model: "monthly",
    badge: "Most popular",
    recommended: true,
    cta: "Talk about Plus",
    adds: ["Phone booking", "Competitor exclusivity", "Monthly strategy session"],
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Let's build the system around your growth.",
    positioning: "Build a high-volume outbound growth engine around your market.",
    bestFor: "Best for complex or high-volume outbound.",
    setup: 0,
    monthly: null,
    displayPrice: "On request",
    meetingsPerYear: "170+",
    model: "monthly",
    cta: "Let's talk",
    adds: ["Multiple ICPs and markets", "Named target accounts (ABM)", "Weekly strategy session"],
  },
];

export type FeatureAvailability = Record<PackageId, boolean>;
export type PricingFeature = {
  id: string;
  name: string;
  /** Icon key, resolved by the table component. */
  icon: string;
  /** Precise wording shown in an accessible tooltip; used where a plain tick would over-promise. */
  note?: string;
} & FeatureAvailability;

export const pricingFeatures: PricingFeature[] = [
  { id: "signal-prospecting", name: "Signal-based prospecting", icon: "radar", pilot: true, core: true, plus: true, scale: true },
  { id: "cold-email", name: "Cold email outreach", icon: "mail", pilot: true, core: true, plus: true, scale: true },
  { id: "no-show", name: "No-show replacement", icon: "refresh", pilot: true, core: true, plus: true, scale: true },
  { id: "founder-access", name: "Direct access to founders", icon: "users", pilot: true, core: true, plus: true, scale: true },
  { id: "meeting-guarantee", name: "Meeting guarantee", icon: "shield", pilot: false, core: true, plus: true, scale: true, note: "Meeting guarantee terms depend on the agreed ICP, market and campaign scope. See your proposal for the exact commitment." },
  { id: "phone", name: "Phone booking", icon: "phone", pilot: false, core: false, plus: true, scale: true },
  { id: "exclusivity", name: "Competitor exclusivity", icon: "lock", pilot: false, core: false, plus: true, scale: true, note: "For clients investing at the Plus level and above, Flowa can reserve agreed target segments against direct competitors." },
  { id: "monthly-strategy", name: "Monthly strategy session", icon: "calendar", pilot: false, core: false, plus: true, scale: true },
  { id: "multiple-icps", name: "Multiple ICPs & markets", icon: "globe", pilot: false, core: false, plus: false, scale: true },
  { id: "abm", name: "Named target accounts (ABM)", icon: "target", pilot: false, core: false, plus: false, scale: true, note: "Give Flowa a defined list of strategic accounts and we'll build the outbound motion around them." },
  { id: "weekly-strategy", name: "Weekly strategy session", icon: "calendar-clock", pilot: false, core: false, plus: false, scale: true },
];

/** Formats GBP without decimals: 1200 → "£1,200". */
export function gbp(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

/** The ongoing price as shown in the table: "£400 / meeting", "£1,200 / month", "On request". */
export function ongoingLabel(p: Package): string {
  if (p.perMeeting) return `${gbp(p.perMeeting)} / meeting`;
  if (p.monthly !== null) return `${gbp(p.monthly)} / month`;
  return p.displayPrice ?? "On request";
}

export function setupLabel(p: Package): string {
  return gbp(p.setup);
}

export const pricingPage = {
  seo: {
    title: "Pricing | Flowa",
    description: "Start with a £600 Pilot and pay £400 per booked meeting. Then move to a fixed package: Core (£1,200/month, 45+ meetings a year), Plus (£2,200/month, 100+) or Scale (on request, 170+).",
  },
  hero: {
    eyebrow: "Pricing",
    headline: "Start with proof. Scale with confidence.",
    sub: "Choose the level of outbound support that fits where you are today. Start with a low-risk Pilot, then scale into a fixed package as your pipeline grows.",
    ctaSecondary: { label: "Compare packages", href: "#packages" },
  },
  story: {
    eyebrow: "The path",
    heading: "Start small. Prove it works. Scale when you're ready.",
    body: "Flowa does not push every client into a large retainer on day one. The Pilot is the proof period; the fixed packages are what you move to once you know your numbers.",
    steps: [
      { label: "Pilot", sub: "Low-risk proof period" },
      { label: "Core", sub: "Predictable outbound engine" },
      { label: "Plus", sub: "More volume, phone booking, strategic support" },
      { label: "Scale", sub: "High-volume, custom outbound infrastructure" },
    ],
  },
  table: {
    eyebrow: "Packages",
    heading: "Four packages. One path.",
    body: "Pilot is the entry point. Each package after it adds volume, channels and strategic depth.",
    cornerLabel: "Core features",
    groupCommercial: "Commercials",
    groupFeatures: "What's included",
    rows: { setup: "Setup", ongoing: "Ongoing", meetings: "Meetings / year" },
    included: "Included",
    notIncluded: "Not included",
    modelLabel: { performance: "Performance-led", monthly: "Predictable monthly model" },
    footnote: "Prices exclude VAT. Setup is invoiced once at the start of a Pilot. Fixed packages carry a meeting commitment and one month's notice.",
    mobileShow: "What's included",
    mobileHide: "Hide details",
    tipLabel: "More about",
  },
  includes: {
    eyebrow: "Every engagement",
    heading: "Every Flowa engagement includes",
    body: "The package determines scale and strategic depth, not whether you receive the fundamental Flowa infrastructure.",
    items: [
      { icon: "users", title: "ICP workshop & buyer profile", body: "We define who you actually want to reach." },
      { icon: "search", title: "Manual research & verification", body: "Every contact is researched and verified against the agreed ICP." },
      { icon: "server", title: "Domain & deliverability setup", body: "We prepare the technical foundation required for outbound." },
      { icon: "pen", title: "Copywriting & continuous testing", body: "Messaging is continuously refined based on response." },
      { icon: "plug", title: "CRM integration", body: "Connect Flowa activity to your existing sales infrastructure." },
      { icon: "calendar-check", title: "Meeting booking & calendar management", body: "Qualified meetings are booked directly into the agreed calendar workflow." },
      { icon: "refresh", title: "No-show recovery", body: "When possible, Flowa follows up and works to recover missed meetings." },
      { icon: "dashboard", title: "Live dashboard", body: "See campaign activity and performance." },
      { icon: "database", title: "Data ownership", body: "You own your lists and data." },
    ],
  },
  dataOwnership: {
    heading: "Your data stays yours.",
    body: "You own the prospect lists, contact data and campaign information generated through the engagement.",
  },
  pilot: {
    eyebrow: "The Pilot",
    heading: "Not ready to commit? Don't.",
    body: "Start with the Pilot. Pay per booked meeting, prove the model and decide what scaling looks like once you know the numbers.",
    commitment: "No long-term commitment.",
    guaranteeNote: "The Pilot is performance-based, but does not include a meeting guarantee.",
    terms: "Pay per meeting. £600 setup. No long-term commitment.",
  },
  scaling: {
    eyebrow: "How scaling works",
    heading: "Once the model is proven, your economics improve.",
    body: "The more predictable your volume becomes, the more structured and scalable the model becomes: from paying per meeting to a fixed package with a meeting commitment.",
    fixedTerms: "Fixed monthly package with a meeting commitment and one month's notice.",
    customLabel: "Custom",
  },
  proof: {
    eyebrow: "Why the model works",
    heading: "You're not paying us to experiment with outbound.",
    body: "You're plugging into experience that already exists.",
    /** Figures supplied by the founders from Flowa's own records. */
    source: "Flowa's own records",
    stats: [
      { value: "6+", label: "years of B2B outbound" },
      { value: "2,000+", label: "meetings booked" },
      { value: "£3.4M+", label: "revenue generated for clients" },
      { value: "£90K+", label: "record annual sale from one meeting" },
    ],
  },
  fit: {
    heading: "Not sure which package fits?",
    body: "Tell us your target market and expected volume.",
  },
  faq: {
    eyebrow: "Pricing questions",
    heading: "Pricing, answered",
    items: [
      { q: "Why start with a Pilot?", a: "Because it lets you see the model work on your market before you commit to a monthly package. The Pilot is a £600 setup and £400 per booked meeting, with no long-term commitment. You learn your real numbers first." },
      { q: "What happens after the Pilot?", a: "You decide. With the Pilot's numbers in hand, most clients move to a fixed package, Core, Plus or Scale, sized to the volume they want. Staying on a per-meeting basis for longer is also possible; we agree it with you." },
      { q: "How does the meeting guarantee work?", a: "Core, Plus and Scale include a meeting guarantee. Its terms depend on the agreed ICP, market and campaign scope, and are written into your proposal, so you know the exact commitment before you sign. The Pilot is performance-based and does not include a guarantee." },
      { q: "What's included in the monthly fee?", a: "The package's volume and channels, plus everything every engagement includes: ICP workshop, manual research and verification, domain and deliverability setup, copywriting and testing, CRM integration, meeting booking and calendar management, no-show recovery, a live dashboard and ownership of your data. Plus and Scale add phone booking, competitor exclusivity and strategy sessions; Scale adds multiple ICPs and markets and named target accounts." },
      { q: "What counts as a booked meeting?", a: "A meeting that passes the qualification criteria we write down with you before we start, with a decision-maker or relevant stakeholder who has explicitly agreed to a time. On the Pilot that is what you pay for; on the fixed packages it is what the meeting commitment counts." },
      { q: "Can we change packages?", a: "Yes. Moving between packages is agreed in writing. The fixed packages carry one month's notice, so a change takes effect from the next period." },
      { q: "What happens if we want to scale?", a: "Move up. Plus adds phone booking, competitor exclusivity and a monthly strategy session; Scale adds multiple ICPs and markets, named target accounts and a weekly strategy session, priced on request around your market." },
      { q: "Do we own the prospect data?", a: "Yes. You own the prospect lists, contact data and campaign information generated through the engagement, on every package." },
      { q: "Can Flowa work with our existing CRM?", a: "Yes. CRM integration is part of every engagement: Flowa activity and booked meetings are connected to the sales infrastructure you already use." },
      { q: "Is there a long-term contract?", a: "No. The Pilot has no long-term commitment. Core, Plus and Scale are fixed monthly packages with a meeting commitment and one month's notice." },
    ],
  },
  cta: {
    eyebrow: "Get started",
    heading: "Not sure which package fits?",
    body: "We'll look at your ICP, target market and expected meeting volume and recommend the right starting point.",
    secondary: { label: "See how Flowa works", href: "/#how-it-works" },
  },
} as const;

/** The compact overview on the home page. */
export const pricingOverview = {
  eyebrow: "Pricing",
  h2: "Start with proof. Scale with confidence.",
  body: "A £600 Pilot at £400 per booked meeting to prove the model, then a fixed package sized to your volume.",
  compare: "Compare packages",
  setup: "setup",
} as const;
