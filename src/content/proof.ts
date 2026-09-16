import type { Stat } from "./types";

/**
 * Flowa's track record, as supplied by the founders from their own
 * records. Shown once per page, in one restrained strip, never inflated
 * by animation: only the meeting count counts up, the rest stand still.
 */
export const proof = {
  eyebrow: "Track record",
  heading: "Proof, not promises.",
  body: "Six years of B2B outbound, measured in meetings booked and revenue our clients closed from them.",
  source: "Flowa's own records, all engagements to date",
  stats: [
    { value: "6+", label: "years of B2B outbound", sourceType: "verified", source: "Flowa's own records" },
    { value: "2000", suffix: "+", label: "meetings booked", sourceType: "verified", source: "Flowa's own records" },
    { value: "£3.4M+", label: "revenue generated for clients", sourceType: "verified", source: "Flowa's own records" },
    { value: "£90K+", label: "record annual sale from one meeting", sourceType: "verified", source: "Flowa's own records" },
  ] satisfies (Stat & { suffix?: string })[],
} as const;
