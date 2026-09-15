import type { StatSourceType } from "@/content/types";
import { statSources } from "@/content/site.en";

const DOT: Record<StatSourceType, string> = {
  verified: "bg-accent",
  benchmark: "bg-muted",
  target: "border border-fg/40 bg-transparent",
  process: "bg-fg/30",
};

/**
 * The provenance of a number, rendered beside it every time. Subtle but
 * always present: a target or benchmark is never read as a Flowa result.
 */
export function SourceBadge({ type, source, dark = false }: { type: StatSourceType; source?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${dark ? "text-white/60" : "text-muted"}`} title={source}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[type]}`} aria-hidden="true" />
      {statSources[type]}
      {type === "benchmark" && source && <span className="sr-only">, {source}</span>}
    </span>
  );
}
