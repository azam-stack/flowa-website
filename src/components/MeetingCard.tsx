import { Calendar } from "lucide-react";
import { Badge } from "./Badge";

/**
 * A meeting as a calendar object: time, title, company, person, tags.
 * Glass, and it settles into place (the parent sets `settled`).
 */
export function MeetingCard({ time, title, company, person, tags = [], day, settled = true, dark = false, className = "" }: { time: string; title: string; company: string; person: string; tags?: readonly string[]; day?: string; settled?: boolean; dark?: boolean; className?: string }) {
  return (
    <div
      className={`rounded-card border p-4 backdrop-blur-md transition-[opacity,transform] duration-slow ease-flowa motion-reduce:transition-none ${dark ? "border-white/15 bg-white/[0.08] text-white" : "border-border text-fg"} ${settled ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"} ${className}`}
      style={dark ? undefined : { background: "var(--surface-glass-strong)" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-medium ${dark ? "text-white/70" : "text-muted"}`}>
          <Calendar size={13} aria-hidden="true" />
          {day ? `${day} · ` : ""}
          <span className={dark ? "text-white" : "text-fg"}>{time}</span>
        </span>
        <span className="flex flex-wrap gap-1">
          {tags.map((t, i) => (
            <Badge key={t} variant={i === 0 ? "accent" : "neutral"} className={dark && i > 0 ? "bg-white/15 text-white" : ""}>
              {t}
            </Badge>
          ))}
        </span>
      </div>
      <p className="mt-3 text-[15px] font-semibold leading-snug">{title}</p>
      <p className={`mt-1 text-[13px] ${dark ? "text-white/70" : "text-muted"}`}>
        {company} · {person}
      </p>
    </div>
  );
}
