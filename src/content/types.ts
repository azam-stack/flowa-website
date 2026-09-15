/**
 * Data models for the services architecture. Every service page is
 * rendered from one `ServiceDefinition`; the same components read the
 * same shapes, so a new service is a new data file, not a new page.
 *
 * Honesty is enforced in the types: a `Stat` carries where its number
 * comes from, a `CaseStudy` carries `verified`, and components branch on
 * both. Nothing here may be presented as a Flowa result unless it is one.
 */

/**
 * verified  — an actual Flowa figure, measured.
 * benchmark — an external industry figure; `source` names where it is from.
 * target    — an internal Flowa target, not a result.
 * process   — a fact about how Flowa works (e.g. "2 people ever speak to
 *             your market"), not a performance figure.
 */
export type StatSourceType = "verified" | "benchmark" | "target" | "process";

export type Stat = {
  /** `null` until a real number exists — the component skips it rather than showing a placeholder. */
  value: string | null;
  label: string;
  description?: string;
  sourceType: StatSourceType;
  /** Required for benchmarks: the publication or dataset. */
  source?: string;
};

export type FAQItem = { q: string; a: string };

export type ProcessStep = { n: string; title: string; body: string };

export type Pillar = {
  title: string;
  body: string;
  /** Which animated micro-system the pillar shows. */
  visual: "people" | "process" | "performance";
};

/** One stage in the recurring Flowa engine strip. */
export type EngineStage = { label: string; sub?: string };

/**
 * A channel/capability node in the "one system" section.
 * current    — a service Flowa provides today.
 * supporting — part of the workflow on every engagement, not a service on its own.
 * future     — planned or available on request; never presented as current.
 */
export type ChannelStatus = "current" | "supporting" | "future";
export type ChannelNode = { label: string; status: ChannelStatus; body: string };

export type QualificationCriterion = { n: string; title: string; body: string; state: string };

export type CaseStudy = {
  client: string;
  industry: string;
  service: string;
  challenge: string;
  strategy: string;
  meetings?: number;
  timeframe?: string;
  outcomes: string[];
  testimonial?: { quote: string; name: string; role: string };
  /** Metrics and the testimonial render only when true. */
  verified: boolean;
};

export type CampaignMetrics = {
  leads: number;
  contacted: number;
  connected: number;
  conversations: number;
  qualified: number;
  meetings: number;
  opportunities: number;
};

export type ReplyRoute = { intent: string; steps: string[]; outcome: string };

export type ServiceSeo = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export type ServiceHeroVisual = "pipeline" | "dialer" | "email";

export type ServiceDefinition = {
  slug: string;
  /** Short name for navigation and cards. */
  name: string;
  /** One line under the name in menus and cards. */
  tagline: string;
  /** Whether the page is built. Future services can be registered without a page. */
  status: "live" | "planned";
  seo: ServiceSeo;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    ctaSecondary?: { label: string; href: string };
    visual: ServiceHeroVisual;
  };
  /** The stage labels for the hub card's mini-system. */
  cardStages: string[];
  stats: { heading: string; items: Stat[] };
  engine: { heading: string; body: string; stages: EngineStage[] };
  qualification?: { eyebrow: string; heading: string; body: string; criteria: QualificationCriterion[]; states: string[] };
  system?: { eyebrow: string; heading: string; body: string; nodes: ChannelNode[]; legend: Record<ChannelStatus, string> };
  pillars?: { eyebrow: string; heading: string; items: Pillar[] };
  process: { eyebrow: string; heading: string; body: string; steps: ProcessStep[] };
  reporting?: { eyebrow: string; heading: string; body: string; metrics: CampaignMetrics; demoLabel: string; period: string };
  replyRouting?: { eyebrow: string; heading: string; body: string; routes: ReplyRoute[] };
  operator?: boolean;
  faq: { eyebrow: string; heading: string; items: FAQItem[] };
  related: { heading: string; slugs: string[]; extra: { label: string; href: string }[] };
  cta: { eyebrow: string; heading: string; body: string };
};
