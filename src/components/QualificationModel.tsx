import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { QualificationCriterion } from "@/content/types";
import { ProspectCard } from "./ProspectCard";
import { useInView, useReducedMotion } from "@/hooks/useInView";
import { demo } from "@/content/demo";

/**
 * The qualification standard as an interface: five criteria on the left,
 * the prospect on the right moving through Unqualified → ICP match →
 * Decision-maker → Interest → Qualified → Booked as each criterion is
 * passed. It advances on its own while on screen; any criterion can be
 * clicked (or reached by keyboard) to set the state by hand.
 */
function stateFor(passed: number): number {
  if (passed <= 2) return passed;
  if (passed <= 4) return 3;
  if (passed === 5) return 4;
  return 5;
}

export function QualificationModel({ criteria, states }: { criteria: QualificationCriterion[]; states: string[] }) {
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const total = criteria.length + 1; // criteria passed 0..5, then booked
  const [passed, setPassed] = useState(reduced ? total : 0);
  const [manual, setManual] = useState(false);
  const p = demo.prospects[0];

  useEffect(() => {
    if (reduced || manual || !active) return;
    const t = window.setTimeout(() => setPassed((n) => (n >= total ? 0 : n + 1)), passed === total ? 3200 : 1700);
    return () => window.clearTimeout(t);
  }, [active, reduced, manual, passed, total]);

  useEffect(() => {
    if (!manual) return;
    const t = window.setTimeout(() => setManual(false), 9000);
    return () => window.clearTimeout(t);
  }, [manual, passed]);

  const stateIdx = stateFor(passed);
  const booked = passed >= total;

  return (
    <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <ol className="flex flex-col divide-y divide-border border-y border-border" aria-label="Qualification criteria">
        {criteria.map((c, i) => {
          const ok = i < passed;
          const current = i === passed - 1;
          return (
            <li key={c.n}>
              <button
                type="button"
                onClick={() => {
                  setPassed(i + 1);
                  setManual(true);
                }}
                aria-pressed={ok}
                className="grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-4 text-left transition-colors duration-fast hover:bg-fg/[0.02] md:py-5"
              >
                <span className={`text-small font-semibold tabular-nums ${ok ? "text-accent-text" : "text-muted"}`} aria-hidden="true">
                  {c.n}
                </span>
                <span>
                  <span className="block text-h3 text-fg">{c.title}</span>
                  <span className="mt-1 block text-body text-muted">{c.body}</span>
                </span>
                <span className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border transition-[background-color,border-color,box-shadow] duration-slow ease-flowa motion-reduce:transition-none ${ok ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-transparent"} ${current ? "shadow-glow" : ""}`} aria-hidden="true">
                  <Check size={14} strokeWidth={3} />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <ol className="flex flex-wrap items-center gap-1.5" aria-label="Prospect state">
          {states.map((s, i) => (
            <li key={s} className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-slow ${i === stateIdx ? "bg-fg text-bg" : i < stateIdx ? "bg-accent/[0.16] text-accent-text" : "bg-fg/[0.04] text-muted"}`}>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-5">
          <ProspectCard
            name={p.name}
            role={p.role}
            company={p.company}
            industry={p.industry}
            location={p.location}
            icp={passed >= 1 ? p.icp : undefined}
            decisionMaker={passed >= 2 ? true : undefined}
            intent={passed >= 4 ? "Interest detected" : passed === 3 ? "Relevant problem" : undefined}
            status={booked ? "Meeting booked" : passed >= 5 ? "Qualified" : undefined}
            meeting={booked ? `${demo.meeting.day}, ${demo.meeting.time}` : undefined}
            nextAction={booked ? "Handover to you" : passed >= 5 ? "Propose a time" : passed >= 1 ? criteria[Math.min(passed, criteria.length - 1)].title : "Check ICP"}
            active={booked}
          />
        </div>
        <p className="mt-3 text-[12px] text-muted">
          {demo.label} · {passed}/{criteria.length} criteria passed{booked ? " · booked" : ""}
        </p>
      </div>
    </div>
  );
}
