import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { ReplyRoute } from "@/content/types";
import { useInView, useReducedMotion } from "@/hooks/useInView";

/**
 * Response routing as a workflow: pick an intent on the left, see the
 * path it takes on the right. Cycles on its own while on screen; a click
 * or keyboard choice takes over.
 */
export function ReplyRouting({ routes }: { routes: ReplyRoute[] }) {
  const reduced = useReducedMotion();
  const { ref, active } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [sel, setSel] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (reduced || manual || !active) return;
    const t = window.setTimeout(() => setSel((s) => (s + 1) % routes.length), 2600);
    return () => window.clearTimeout(t);
  }, [active, reduced, manual, sel, routes.length]);
  useEffect(() => {
    if (!manual) return;
    const t = window.setTimeout(() => setManual(false), 9000);
    return () => window.clearTimeout(t);
  }, [manual, sel]);
  const r = routes[sel];
  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <ul className="flex flex-wrap gap-2 lg:flex-col" role="tablist" aria-label="Reply intent">
        {routes.map((route, i) => (
          <li key={route.intent}>
            <button
              type="button"
              role="tab"
              aria-selected={i === sel}
              onClick={() => {
                setSel(i);
                setManual(true);
              }}
              className={`w-full rounded-full border px-4 py-2.5 text-left text-[14px] font-semibold transition-colors duration-fast lg:rounded-card lg:px-5 lg:py-3.5 ${i === sel ? "border-fg bg-fg text-bg" : "border-border bg-card text-fg hover:border-fg"}`}
            >
              “{route.intent}”
            </button>
          </li>
        ))}
      </ul>
      <div className="rounded-card border border-border bg-card p-5 md:p-7" role="tabpanel" aria-live="polite">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Route</p>
        <ol key={sel} className="mt-3 flex flex-wrap items-center gap-2">
          <li className="rounded-full bg-accent/[0.14] px-3 py-1.5 text-[13px] font-semibold text-accent-text">Reply: {r.intent}</li>
          {r.steps.map((s, i) => (
            <li key={s} className="route-step flex items-center gap-2" style={{ "--i": i + 1 } as React.CSSProperties}>
              <ArrowRight size={14} className="text-muted" aria-hidden="true" />
              <span className="rounded-full border border-border bg-bg px-3 py-1.5 text-[13px] font-medium text-fg">{s}</span>
            </li>
          ))}
          <li className="route-step flex items-center gap-2" style={{ "--i": r.steps.length + 1 } as React.CSSProperties}>
            <ArrowRight size={14} className="text-muted" aria-hidden="true" />
            <span className="rounded-full bg-fg px-3 py-1.5 text-[13px] font-semibold text-bg">{r.outcome}</span>
          </li>
        </ol>
        <p className="mt-5 text-[13px] text-muted">Every route is logged with the prospect, the reason and the next date, so nothing interested is lost and nothing closed is chased.</p>
      </div>
    </div>
  );
}
