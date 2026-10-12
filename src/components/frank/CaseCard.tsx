import { casesPage } from "@/content/frank/pages";
import { asset } from "@/lib/asset";
import { clients } from "@/content/frank/clients";

type Case = (typeof casesPage.cases)[number];

/**
 * One client case: the client's own logo, what we did and the result as
 * the client reported it, with the result set large. `compact` is the
 * homepage version (logo, big result, one line).
 */
export function CaseCard({ c, compact = false, className = "" }: { c: Case; compact?: boolean; className?: string }) {
  const logo = clients.find((x) => x.slug === c.slug);
  const L = casesPage.caseLabels;
  return (
    <article className={`framed flex h-full flex-col p-6 shadow-float md:p-8 ${className}`}>
      <div className="flex h-8 items-center">
        {logo ? (
          <img src={asset(`logos/${logo.slug}.${logo.format ?? "svg"}`)} alt={c.client} loading="lazy" className="h-7 w-auto max-w-[160px] object-contain" style={{ transform: `scale(${logo.scale ?? 1})`, transformOrigin: "left center" }} />
        ) : (
          <p className="text-[18px] font-semibold text-ink">{c.client}</p>
        )}
      </div>
      {c.sells && !compact && <p className="mt-3 text-small text-muted">{c.sells}</p>}
      <p className={`mt-6 font-light leading-none tracking-[-0.03em] text-ink ${compact ? "text-[clamp(2rem,1.5rem+1.4vw,2.75rem)]" : "text-[clamp(2.5rem,1.8rem+2vw,3.75rem)]"}`}>{c.resultBig}</p>
      <p className="mt-3 text-body text-ink-2">{c.resultLabel}</p>
      {!compact && (
        <div className="mt-auto pt-8">
          <div className="border-t border-ink pt-5">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-brand-deep">{L.work}</p>
            <p className="mt-2 text-body text-ink-2">{c.work}</p>
          </div>
        </div>
      )}
    </article>
  );
}
