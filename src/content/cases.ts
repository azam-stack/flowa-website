import type { CaseStudy } from "./types";

/**
 * Case studies. Nothing here is invented: the list is empty until a client
 * has approved a write-up, and a case renders its metrics and testimonial
 * only when `verified` is true. The page shows the real client logos and
 * the structure a case follows in the meantime.
 */
export const caseStudies: CaseStudy[] = [];

export const casesPage = {
  seo: {
    title: "Cases | Flowa",
    description: "Companies Flowa has booked qualified meetings for, and how a Flowa engagement is documented: ICP, challenge, strategy, meetings and outcome.",
  },
  hero: {
    eyebrow: "Cases",
    headline: "Meetings we've created. Documented, not dramatised.",
    sub: "A case is published only when the client has approved it and the figures are verified. Until then, you see who we've booked meetings for and how an engagement is written up.",
  },
  logosHeading: "Companies we've booked meetings for",
  /** Shown while `caseStudies` is empty. */
  empty: {
    heading: "The first written cases are being approved.",
    body: "Every engagement is documented the same way, so a case can be published as soon as the client signs it off. Here is the structure.",
    fields: ["Client and industry", "ICP and decision-makers", "The challenge", "The strategy and channel", "Meetings and timeframe", "Outcome, in the client's words"],
  },
  verifiedLabel: "Verified figures",
  unverifiedLabel: "Figures pending verification",
  cta: {
    eyebrow: "Get started",
    heading: "Want to be the next case?",
    body: "Tell us about your ideal customer. Ahmed or Anton will reply within one working day.",
  },
} as const;
