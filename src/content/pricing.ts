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
  /** The lean table: one word for "best for", the channels, the short tagline. */
  summary: { tagline: string; bestFor: string; outreach: string };
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
    summary: { tagline: "Test the model.", bestFor: "Test", outreach: "Email" },
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
    summary: { tagline: "Build consistency.", bestFor: "Consistency", outreach: "Email" },
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
    summary: { tagline: "Add reach.", bestFor: "Growth", outreach: "Email + Phone" },
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
    summary: { tagline: "Expand the system.", bestFor: "Scale", outreach: "Email + Phone + ABM" },
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
    headline: ["Start with proof.", "Scale with confidence."],
    sub: "Start small. Prove the model. Scale when you're ready.",
  },
  table: {
    intro: "Four ways to build your outbound engine.",
    rows: { price: "Price", meetings: "Meetings", bestFor: "Best for", outreach: "Outreach", guarantee: "Meeting guarantee" },
    setup: "setup",
    perYear: "/ year",
    included: "Included",
    notIncluded: "Not included",
    recommended: "Most popular",
    footnote: "Prices exclude VAT. Fixed packages carry a meeting commitment and one month's notice; guarantee terms are defined in your proposal.",
    logoAlt: "Flowa",
  },
  includes: {
    eyebrow: "What's included",
    heading: "Every Flowa engagement includes",
    body: "The package sets the volume, the channels and the strategic depth. The foundation is the same on all four.",
    items: [
      "ICP workshop and buyer profile",
      "Manual research and verification",
      "Domain setup and deliverability",
      "Copywriting and continuous testing",
      "CRM integration",
      "Meeting booking and calendar management",
      "No-show recovery",
      "Live dashboard",
      "Client ownership of lists and data",
    ],
  },
  dataOwnership: {
    heading: "Your data stays yours.",
    body: "Every list, contact and campaign asset we build for you remains yours.",
  },
  pilot: {
    eyebrow: "The Pilot",
    heading: "Not ready to commit? Don't.",
    body: "Start with the Pilot. Pay per booked meeting, prove the model and decide what scaling looks like once you know the numbers.",
    terms: "£600 setup, £400 per booked meeting, no long-term commitment. The Pilot is performance-based and does not include a meeting guarantee.",
  },
  guarantee: {
    line: "Meeting guarantee included on Core, Plus and Scale.",
    terms: "Guarantee terms depend on the agreed ICP, market and campaign scope and are defined in your proposal.",
  },
  faq: {
    eyebrow: "Questions",
    heading: "Pricing, answered",
    items: [
      { q: "Why start with the Pilot?", a: "Because it lets you see the model work on your market before you commit to a monthly package. The Pilot is a £600 setup and £400 per booked meeting, with no long-term commitment. You learn your real numbers first." },
      { q: "What happens after the Pilot?", a: "You decide. With the Pilot's numbers in hand, most clients move to a fixed package, Core, Plus or Scale, sized to the volume they want. Staying on a per-meeting basis for longer is also possible; we agree it with you." },
      { q: "How does the meeting guarantee work?", a: "Core, Plus and Scale include a meeting guarantee. Its terms depend on the agreed ICP, market and campaign scope and are defined in your proposal, so you know the exact commitment before you sign. The Pilot is performance-based and does not include a guarantee." },
      { q: "What's included?", a: "On every package: ICP workshop and buyer profile, manual research and verification, domain setup and deliverability, copywriting and continuous testing, CRM integration, meeting booking and calendar management, no-show recovery, a live dashboard and ownership of your data. Plus adds phone booking, competitor exclusivity and a monthly strategy session; Scale adds multiple ICPs and markets, named target accounts and a weekly strategy session." },
      { q: "Can we change packages later?", a: "Yes. Moving between packages is agreed in writing. The fixed packages carry one month's notice, so a change takes effect from the next period." },
      { q: "Who owns the data?", a: "You do. The prospect lists, contact data and campaign information generated through the engagement are yours, on every package." },
      { q: "Can you integrate with our CRM?", a: "Yes. CRM integration is part of every engagement: Flowa activity and booked meetings are connected to the sales infrastructure you already use." },
    ],
  },
  cta: {
    eyebrow: "Ready when you are",
    heading: "Start with proof.",
    body: "Let's find the right starting point for your outbound engine.",
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
