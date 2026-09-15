import type { CampaignMetrics } from "@/content/types";
import { useInView } from "@/hooks/useInView";
import { demo } from "@/content/demo";

/**
 * Campaign reporting as the client sees it: the funnel from leads to
 * opportunities with conversion at each step. Receives its numbers as
 * props and never invents them; the section that renders it says
 * whether they are an example or a connected campaign.
 */
const ROWS: { key: keyof CampaignMetrics; label: string }[] = [
  { key: "leads", label: "Leads researched" },
  { key: "contacted", label: "Attempted" },
  { key: "connected", label: "Connected" },
  { key: "conversations", label: "Conversations" },
  { key: "qualified", label: "Qualified" },
  { key: "meetings", label: "Meetings booked" },
  { key: "opportunities", label: "Opportunities" },
];

export function ReportingPanel({ metrics, label, period }: { metrics: CampaignMetrics; label: string; period: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3, once: true });
  const max = metrics.leads || 1;
  const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
  const followUp = Math.max(0, metrics.conversations - metrics.qualified);
  return (
    <div ref={ref} className="rounded-card border border-border bg-card p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold text-fg">{label}</p>
          <p className="text-[12px] text-muted">{period}</p>
        </div>
        <span className="rounded-full border border-dashed border-border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-muted">{demo.demoData}</span>
      </div>
      <ol className="mt-5 flex flex-col gap-2.5">
        {ROWS.map((r, i) => {
          const v = metrics[r.key];
          const prev = i > 0 ? metrics[ROWS[i - 1].key] : v;
          return (
            <li key={r.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-[13px] sm:grid-cols-[150px_1fr_56px_56px] sm:gap-4">
              <span className="text-fg sm:truncate">{r.label}</span>
              <span className="col-span-2 h-2.5 overflow-hidden rounded-full bg-fg/[0.06] sm:col-span-1" aria-hidden="true">
                <span className={`block h-full rounded-full ${r.key === "meetings" || r.key === "opportunities" ? "bg-accent" : "bg-fg/60"} transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none`} style={{ width: inView ? `${Math.max(3, (v / max) * 100)}%` : "0%", transitionDelay: `${i * 90}ms` }} />
              </span>
              <span className="text-right font-semibold tabular-nums text-fg">{v}</span>
              <span className="hidden text-right tabular-nums text-muted sm:block">{i > 0 ? `${pct(v, prev)}%` : ""}</span>
            </li>
          );
        })}
      </ol>
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5 text-[13px] sm:grid-cols-4">
        <div>
          <dt className="text-muted">Lead to meeting</dt>
          <dd className="font-semibold text-fg">{pct(metrics.meetings, metrics.leads)}%</dd>
        </div>
        <div>
          <dt className="text-muted">Conversation to meeting</dt>
          <dd className="font-semibold text-fg">{pct(metrics.meetings, metrics.conversations)}%</dd>
        </div>
        <div>
          <dt className="text-muted">In follow-up</dt>
          <dd className="font-semibold text-fg">{followUp}</dd>
        </div>
        <div>
          <dt className="text-muted">Notes logged</dt>
          <dd className="font-semibold text-fg">{metrics.conversations}</dd>
        </div>
      </dl>
    </div>
  );
}
