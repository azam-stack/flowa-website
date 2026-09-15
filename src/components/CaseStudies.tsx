import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { SourceBadge } from "./SourceBadge";
import { track } from "@/lib/analytics";
import { casesPage } from "@/content/cases";

/**
 * Case-study list. Metrics and the testimonial render only for a
 * verified case; an unverified one shows its narrative and says its
 * figures are pending. Empty list: the structure a case follows.
 */
export function CaseStudies({ cases }: { cases: CaseStudy[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (cases.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card p-6 md:p-8">
        <p className="text-h3 text-fg">{casesPage.empty.heading}</p>
        <p className="mt-2 max-w-lead text-body text-muted">{casesPage.empty.body}</p>
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {casesPage.empty.fields.map((f, i) => (
            <li key={f} className="flex items-center gap-3 rounded-field border border-dashed border-border px-4 py-3 text-[14px] text-fg">
              <span className="text-[12px] font-semibold tabular-nums text-accent-display">0{i + 1}</span>
              {f}
            </li>
          ))}
        </ol>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {cases.map((c, i) => {
        const isOpen = open === i;
        return (
          <li key={c.client} className="rounded-card border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
                  {c.industry} · {c.service}
                </p>
                <h3 className="mt-1 text-h3 text-fg">{c.client}</h3>
              </div>
              {c.verified ? <SourceBadge type="verified" /> : <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{casesPage.unverifiedLabel}</span>}
            </div>
            <p className="mt-3 text-body text-muted">{c.challenge}</p>
            {c.verified && (c.meetings !== undefined || c.timeframe) && (
              <dl className="mt-4 flex gap-6">
                {c.meetings !== undefined && (
                  <div>
                    <dt className="text-[12px] text-muted">Meetings</dt>
                    <dd className="text-[28px] font-extrabold leading-none text-accent-display">{c.meetings}</dd>
                  </div>
                )}
                {c.timeframe && (
                  <div>
                    <dt className="text-[12px] text-muted">Timeframe</dt>
                    <dd className="text-[28px] font-extrabold leading-none text-fg">{c.timeframe}</dd>
                  </div>
                )}
              </dl>
            )}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => {
                setOpen(isOpen ? null : i);
                if (!isOpen) track("case_study_open", { client: c.client, service: c.service });
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-fg"
            >
              {isOpen ? "Less" : "Strategy and outcome"}
              <ChevronDown size={16} className={`transition-transform duration-[280ms] ease-flowa ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <div className="grid overflow-hidden transition-[grid-template-rows] duration-[280ms] ease-flowa motion-reduce:transition-none" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="mt-3 text-body text-muted">{c.strategy}</p>
                <ul className="mt-3 list-disc pl-5 text-body text-fg">
                  {c.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                {c.verified && c.testimonial && (
                  <blockquote className="mt-4 border-l-2 border-accent pl-4 text-body text-fg">
                    “{c.testimonial.quote}”
                    <footer className="mt-2 text-small text-muted">
                      {c.testimonial.name}, {c.testimonial.role}
                    </footer>
                  </blockquote>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
