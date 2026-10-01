/**
 * The client logos in the marquee (brief §3.4): Adversus, Generaxion,
 * Lemon Marketing, DataPeeps and PartnerTeam. The files in public/logos
 * were supplied by the companies themselves and are used as supplied
 * (see the live site's history for how each was processed). The logos
 * are deliberately not links: no outbound clicks to client sites. `scale` is a per-logo optical correction set by eye at 1440px.
 */
export type Client = { name: string; slug: string; scale?: number; format?: "svg" | "png" };

export const clients: Client[] = [
  { name: "Adversus", slug: "adversus", format: "png", scale: 0.9 },
  { name: "Generaxion", slug: "generaxion", format: "png", scale: 0.66 },
  { name: "Lemon Marketing", slug: "lemon-marketing", format: "png", scale: 1.1 },
  { name: "DataPeeps", slug: "datapeeps", format: "svg", scale: 1.2 },
  { name: "PartnerTeam", slug: "partner-team", format: "png", scale: 1.25 },
];
