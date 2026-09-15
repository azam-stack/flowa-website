import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { hero } from "@/content/site.en";

const TICK_MS = 3200;
const p = hero.pipeline;

/**
 * The hero's product interface: Flowa's pipeline as a small, live-looking
 * panel. Rows advance one stage at a time on a slow loop, the row that
 * reaches "Meeting booked" is confirmed, then the board resets. Every
 * name is illustrative and the header says so. Pauses on hover and under
 * prefers-reduced-motion (which shows the final state).
 */
export function PipelineVisual() {
  const reduced = useRef(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [stages, setStages] = useState<number[]>(() => (reduced.current ? p.rows.map(() => 3) : p.rows.map((r) => r.stage)));
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reduced.current || hovering) return;
    const id = setInterval(() => {
      setStages((prev) => {
        const i = prev.findIndex((s) => s < 3);
        if (i === -1) return p.rows.map((r) => r.stage);
        const next = [...prev];
        next[i] = prev[i] + 1;
        if (next[i] === 3) window.dispatchEvent(new CustomEvent("flowa:booked"));
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [hovering]);

  const booked = stages.filter((s) => s === 3).length;
  const qualified = stages.filter((s) => s >= 2).length;

  return (
    <div
      className="relative overflow-hidden rounded-card border border-border bg-card/[0.92] shadow-float backdrop-blur-md"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <span className="sys">{p.system}</span>
        <span className="flex items-center gap-3">
          <span className="sys text-muted">{p.note}</span>
          <span className="flex items-center gap-1.5">
            <span className="dot" aria-hidden="true" />
            <span className="sys">{p.status}</span>
          </span>
        </span>
      </div>

      {/* stage rail */}
      <div className="grid grid-cols-4 gap-1 px-5 pt-4" aria-hidden="true">
        {p.stages.map((s, i) => (
          <div key={s} className="min-w-0">
            <div className={`h-[3px] rounded-full transition-colors duration-slow ${i <= Math.max(...stages) ? "bg-accent" : "bg-border"}`} />
            <p className="sys mt-2 hidden truncate text-muted sm:block">{s}</p>
          </div>
        ))}
      </div>

      {/* rows */}
      <ul className="mt-3 divide-y divide-border">
        {p.rows.map((row, i) => {
          const stage = stages[i];
          const done = stage === 3;
          const initials = row.company
            .split(" ")
            .map((w) => w[0])
            .join("")
            .replace(/[^A-Z]/g, "")
            .slice(0, 2);
          return (
            <li key={row.company} className={`flex items-center gap-3 px-5 py-3 transition-colors duration-slow ${done ? "bg-accent/[0.06]" : ""}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${done ? "bg-accent text-accent-fg" : "bg-fg/[0.06] text-fg"}`} aria-hidden="true">
                {done ? <Check size={14} strokeWidth={3} /> : initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-fg">{row.company}</span>
                <span className="hidden truncate text-[12px] text-muted sm:block">{row.role}</span>
              </span>
              <span className="hidden shrink-0 items-center gap-1 sm:flex" aria-label={p.stages[stage]}>
                {p.stages.map((_, k) => (
                  <span key={k} className={`h-1.5 w-1.5 rounded-full transition-colors duration-slow ${k <= stage ? (done ? "bg-accent" : "bg-fg") : "bg-border"}`} />
                ))}
              </span>
              <span className={`sys shrink-0 text-right sm:w-[7.5rem] ${done ? "text-accent-band" : "text-muted"}`}>{p.stages[stage]}</span>
            </li>
          );
        })}
      </ul>

      {/* metrics */}
      <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
        {[p.metrics[0], { label: p.metrics[1].label, value: String(qualified) }, { label: p.metrics[2].label, value: String(booked) }].map((m) => (
          <div key={m.label} className="px-5 py-3">
            <p className="sys text-muted">{m.label}</p>
            <p className="mt-0.5 text-[15px] font-semibold tabular-nums text-fg">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
