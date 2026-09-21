import { Check } from "lucide-react";
import type { Pillar } from "@/content/types";
import { useCycle } from "@/hooks/useCycle";

/**
 * Three pillars, each with an animated micro-system that shows the idea
 * rather than an icon: two people in conversation, a sequence of steps
 * lighting up, a set of bars that improve. All gated on visibility.
 */
function PeopleSystem() {
  const { ref, step, active } = useCycle<HTMLDivElement>(3, 1300);
  return (
    <div ref={ref} className="relative flex h-24 items-center justify-center gap-10" aria-hidden="true">
      {["AH", "LN"].map((who, i) => (
        <span key={who} className={`relative flex h-11 w-11 items-center justify-center rounded-full text-[12px] font-bold ${i === 0 ? "bg-fg text-bg" : "border border-border bg-card text-fg"}`}>
          {who}
          {active && step === i && <span className="absolute -inset-1.5 rounded-full border border-accent/60" />}
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-border" />
      <span className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent transition-transform duration-[900ms] ease-flowa motion-reduce:transition-none ${step === 0 ? "-translate-x-[24px]" : step === 1 ? "translate-x-[18px]" : "-translate-x-[3px]"}`} />
      <span className={`absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-accent/[0.14] px-2 py-0.5 text-[10px] font-semibold text-accent-text transition-opacity duration-slow ${step === 2 ? "opacity-100" : "opacity-0"}`}>Conversation</span>
    </div>
  );
}

function ProcessSystem() {
  const items = ["Research", "Script", "Qualify", "Follow-up"];
  const { ref, step } = useCycle<HTMLUListElement>(items.length, 1000, { holdLastMs: 2000 });
  return (
    <ul ref={ref} className="flex h-24 flex-col justify-center gap-1.5" aria-hidden="true">
      {items.map((it, i) => (
        <li key={it} className={`flex items-center gap-2 text-[12px] transition-colors duration-slow ${i <= step ? "text-fg" : "text-muted"}`}>
          <span className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-slow ${i <= step ? "bg-accent text-accent-fg" : "bg-fg/[0.06] text-transparent"}`}>
            <Check size={10} strokeWidth={3} />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

function PerformanceSystem() {
  const { ref, step } = useCycle<HTMLDivElement>(4, 1100, { holdLastMs: 2200 });
  const heights = [[40, 55, 45, 60], [45, 60, 55, 70], [50, 65, 70, 80], [55, 72, 78, 92]][step];
  return (
    <div ref={ref} className="flex h-24 items-end gap-2" aria-hidden="true">
      {heights.map((h, i) => (
        <span key={i} className={`w-6 rounded-t-md transition-[height] duration-[900ms] ease-flowa motion-reduce:transition-none ${i === 3 ? "bg-accent" : "bg-fg/[0.14]"}`} style={{ height: `${h}%` }} />
      ))}
      <span className="ml-2 self-center text-[11px] text-muted">Week {step + 1}</span>
    </div>
  );
}

export function Pillars({ items }: { items: Pillar[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {items.map((p) => (
        <li key={p.title} className="rounded-card border border-border bg-card p-6 md:p-7">
          <div className="rounded-field bg-bg/80 px-4">{p.visual === "people" ? <PeopleSystem /> : p.visual === "process" ? <ProcessSystem /> : <PerformanceSystem />}</div>
          <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em] text-accent-text">{p.title}</p>
          <p className="mt-2 text-body text-fg">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
