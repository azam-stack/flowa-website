import { Check, Building2, MapPin } from "lucide-react";

/**
 * The prospect as a physical object: one glass card used across the
 * hero visualisations, the qualification model and the operator scene.
 * Every field is optional so the same card can show a raw lead, a
 * qualified decision-maker or a booked meeting. Data is always demo
 * data, labelled by the section that renders it.
 */
export type ProspectCardProps = {
  name: string;
  role: string;
  company: string;
  industry?: string;
  location?: string;
  icp?: number;
  decisionMaker?: boolean;
  intent?: string;
  status?: string;
  channel?: string;
  nextAction?: string;
  meeting?: string;
  /** Visual emphasis when the card is the active object in a sequence. */
  active?: boolean;
  dark?: boolean;
  className?: string;
};

export function ProspectCard(p: ProspectCardProps) {
  const initials = p.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const glass = p.dark ? "border-white/15 bg-white/[0.08] text-white" : "border-border bg-card/90 text-fg";
  const muted = p.dark ? "text-white/60" : "text-muted";
  return (
    <div className={`rounded-card border p-4 backdrop-blur-md transition-[box-shadow,transform] duration-slow ease-flowa motion-reduce:transition-none ${glass} ${p.active ? "shadow-glow" : "shadow-subtle"} ${p.className ?? ""}`}>
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${p.dark ? "bg-white/15 text-white" : "bg-fg text-bg"}`} aria-hidden="true">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold leading-tight">{p.name}</p>
          <p className={`mt-0.5 truncate text-[12px] ${muted}`}>
            {p.role} · {p.company}
          </p>
        </div>
        {typeof p.icp === "number" && (
          <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold tabular-nums ${p.icp >= 80 ? "bg-accent/[0.18] text-accent-text" : "bg-fg/[0.06]"}`}>ICP {p.icp}%</span>
        )}
      </div>
      {(p.industry || p.location) && (
        <p className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] ${muted}`}>
          {p.industry && (
            <span className="inline-flex items-center gap-1">
              <Building2 size={12} aria-hidden="true" />
              {p.industry}
            </span>
          )}
          {p.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} aria-hidden="true" />
              {p.location}
            </span>
          )}
        </p>
      )}
      {(p.decisionMaker !== undefined || p.intent || p.status || p.channel) && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {p.decisionMaker !== undefined && (
            <li className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${p.decisionMaker ? "bg-fg/[0.06]" : `${muted} border border-current/20`}`}>
              {p.decisionMaker && <Check size={11} strokeWidth={3} className="text-accent" aria-hidden="true" />}
              Decision-maker
            </li>
          )}
          {p.channel && <li className={`rounded-full border px-2 py-1 text-[11px] font-medium ${p.dark ? "border-white/20" : "border-border"}`}>{p.channel}</li>}
          {p.intent && <li className="rounded-full bg-accent/[0.14] px-2 py-1 text-[11px] font-semibold text-accent-text">{p.intent}</li>}
          {p.status && <li className={`rounded-full px-2 py-1 text-[11px] font-semibold ${p.dark ? "bg-white text-fg" : "bg-fg text-bg"}`}>{p.status}</li>}
        </ul>
      )}
      {(p.nextAction || p.meeting) && (
        <div className={`mt-3 flex items-center justify-between gap-3 border-t pt-3 text-[12px] ${p.dark ? "border-white/15" : "border-border"}`}>
          {p.nextAction && (
            <span className={muted}>
              Next: <span className={p.dark ? "text-white" : "text-fg"}>{p.nextAction}</span>
            </span>
          )}
          {p.meeting && <span className="font-semibold">{p.meeting}</span>}
        </div>
      )}
    </div>
  );
}
