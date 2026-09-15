import { Check, Minus } from "lucide-react";
import { packages, pricingPage, gbp, ongoingLabel, pricingFeatures, type Package } from "@/content/pricing";
import { BookCallLink } from "../BookCallLink";
import { asset } from "@/lib/asset";

/**
 * The package comparison as a decision interface: four columns, four
 * rows (price, meetings, best for, outreach) and the guarantee. The
 * full feature data stays in src/content/pricing.ts; the table shows
 * only what decides the choice. The Flowa logo breaks through the
 * grid's top-left corner, the way the founders' reference
 * (belkinstabel.png) carries its brand mark.
 *
 * From lg: a semantic table. Below lg: one summary per package with the
 * same four facts, in the same order.
 */
const t = pricingPage.table;
const FALLBACK = "/#contact";
const guarantee = pricingFeatures.find((f) => f.id === "meeting-guarantee");

function price(p: Package) {
  return p.perMeeting ? (
    <>
      <span className="block text-[13px] font-medium text-muted">
        {gbp(p.setup)} {t.setup}
      </span>
      <span className="block">{ongoingLabel(p)}</span>
    </>
  ) : (
    ongoingLabel(p)
  );
}

function meetings(p: Package) {
  return p.meetingsPerYear.match(/^\d/) ? `${p.meetingsPerYear} ${t.perYear}` : p.meetingsPerYear;
}

function GuaranteeMark({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex items-center justify-center">
      <Check size={18} strokeWidth={2.5} className="text-accent-display" aria-hidden="true" />
      <span className="sr-only">{t.included}</span>
    </span>
  ) : (
    <span className="inline-flex items-center justify-center">
      <Minus size={16} className="text-fg/30" aria-hidden="true" />
      <span className="sr-only">{t.notIncluded}</span>
    </span>
  );
}

function Logo() {
  return (
    <span className="pricing-logo absolute -left-4 -top-6 z-10 sm:-left-6 sm:-top-7" aria-hidden="true">
      <img src={asset("flowa-logo.png")} alt="" width={760} height={320} className="h-14 w-auto rounded-xl sm:h-16 lg:h-[72px]" />
    </span>
  );
}

function DesktopTable() {
  return (
    <div className="relative hidden lg:block">
      <Logo />
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Package comparison: Pilot, Core, Plus and Scale</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[16%] pb-6 pt-12 pr-6 align-bottom">
              <span className="sr-only">Package</span>
            </th>
            {packages.map((p) => (
              <th key={p.id} scope="col" className={`relative w-[21%] px-6 pb-6 pt-12 align-bottom ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                {p.recommended && <span className="absolute left-6 top-4 text-[11px] font-bold uppercase tracking-[0.12em] text-accent-display">{t.recommended}</span>}
                <span className="block text-[22px] font-extrabold tracking-[-0.02em] text-fg">{p.name}</span>
                <span className="mt-1 block text-[15px] text-muted">{p.summary.tagline}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <th scope="row" className="py-7 pr-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              {t.rows.price}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`px-6 py-7 text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-fg ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                {price(p)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className="py-6 pr-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              {t.rows.meetings}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`px-6 py-6 text-[18px] font-semibold text-fg ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                {meetings(p)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className="py-6 pr-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              {t.rows.bestFor}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`px-6 py-6 text-[16px] text-fg ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                {p.summary.bestFor}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className="py-6 pr-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
              {t.rows.outreach}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`px-6 py-6 text-[16px] text-fg ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                {p.summary.outreach}
              </td>
            ))}
          </tr>
          {guarantee && (
            <tr className="border-b border-border">
              <th scope="row" className="py-6 pr-6 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted">
                {t.rows.guarantee}
              </th>
              {packages.map((p) => (
                <td key={p.id} className={`px-6 py-6 ${p.recommended ? "bg-accent/[0.06]" : ""}`}>
                  <GuaranteeMark on={guarantee[p.id]} />
                </td>
              ))}
            </tr>
          )}
          <tr>
            <td className="pt-6" />
            {packages.map((p) => (
              <td key={p.id} className={`px-6 pb-6 pt-6 ${p.recommended ? "rounded-b-card bg-accent/[0.06]" : ""}`}>
                <BookCallLink location={`pricing-table-${p.id}`} service="pricing" fallback={FALLBACK} variant={p.recommended ? "accent" : "ghost"} size="sm" className="w-full">
                  {p.cta}
                </BookCallLink>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="mt-5 max-w-3xl text-[12px] text-muted">{t.footnote}</p>
    </div>
  );
}

function MobileSummaries() {
  return (
    <div className="relative lg:hidden">
      <Logo />
      <ul className="divide-y divide-border border-t border-border pt-10">
        {packages.map((p) => (
          <li key={p.id} className={`py-7 ${p.recommended ? "-mx-4 rounded-card bg-accent/[0.06] px-4" : ""}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em] text-fg">{p.name}</h3>
              {p.recommended && <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent-display">{t.recommended}</span>}
            </div>
            <p className="mt-0.5 text-[15px] text-muted">{p.summary.tagline}</p>
            <p className="mt-4 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-fg">{price(p)}</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-[13px]">
              <div>
                <dt className="text-muted">{t.rows.meetings}</dt>
                <dd className="mt-0.5 font-semibold text-fg">{meetings(p)}</dd>
              </div>
              <div>
                <dt className="text-muted">{t.rows.bestFor}</dt>
                <dd className="mt-0.5 font-semibold text-fg">{p.summary.bestFor}</dd>
              </div>
              <div>
                <dt className="text-muted">{t.rows.outreach}</dt>
                <dd className="mt-0.5 font-semibold text-fg">{p.summary.outreach}</dd>
              </div>
            </dl>
            {guarantee && (
              <p className="mt-3 flex items-center gap-2 text-[13px] text-muted">
                <GuaranteeMark on={guarantee[p.id]} />
                {t.rows.guarantee}
              </p>
            )}
            <div className="mt-5">
              <BookCallLink location={`pricing-card-${p.id}`} service="pricing" fallback={FALLBACK} variant={p.recommended ? "accent" : "ghost"} className="w-full">
                {p.cta}
              </BookCallLink>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[12px] text-muted">{t.footnote}</p>
    </div>
  );
}

export function PricingTable() {
  return (
    <>
      <DesktopTable />
      <MobileSummaries />
    </>
  );
}
