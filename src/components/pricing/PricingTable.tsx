import { useEffect, useRef, useState } from "react";
import { Check, Minus } from "lucide-react";
import { packages, pricingPage, ongoingLabel, setupLabel, pricingFeatures, type Package } from "@/content/pricing";
import { BookCallLink } from "../BookCallLink";
import { asset } from "@/lib/asset";

/**
 * The package comparison as a decision interface: four columns, five rows
 * (price, meetings, best for, outreach, guarantee). The full feature data
 * stays in src/content/pricing.ts; the table shows only what decides the
 * choice. The recommended column is lifted on its own panel behind the
 * grid, and Flowa's O breaks out of the grid's top-left corner.
 *
 * From lg: a semantic table. Below lg: one summary per package.
 */
const t = pricingPage.table;
const FALLBACK = "/#contact";
const guarantee = pricingFeatures.find((f) => f.id === "meeting-guarantee");

function Price({ p, size = "lg" }: { p: Package; size?: "lg" | "md" }) {
  const label = ongoingLabel(p);
  const [amount, unit] = label.includes(" / ") ? label.split(" / ") : [label, null];
  const big = size === "lg" ? "text-[26px] xl:text-[34px]" : "text-[28px]";
  return (
    <span className="block">
      {p.perMeeting && <span className="mb-1 block text-[13px] font-medium text-muted">{t.perMeetingNote}</span>}
      <span className={`font-extrabold leading-none tracking-[-0.03em] text-fg ${big}`}>{amount}</span>
      {unit && <span className="ml-1.5 whitespace-nowrap text-[14px] font-medium text-muted">/ {unit}</span>}
      {p.setup > 0 && (
        <span className="mt-1.5 block text-[13px] text-muted">
          + {setupLabel(p)} {t.setup}
        </span>
      )}
    </span>
  );
}

function meetings(p: Package) {
  return p.meetingsPerYear.match(/^\d/) ? `${p.meetingsPerYear} ${t.perYear}` : p.meetingsPerYear;
}

function Outreach({ p }: { p: Package }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {p.summary.outreach.split(" + ").map((c) => (
        <span key={c} className="rounded-full border border-border bg-bg px-2.5 py-1 text-[12px] font-semibold text-fg">
          {c}
        </span>
      ))}
    </span>
  );
}

function GuaranteeMark({ on }: { on: boolean }) {
  return on ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/[0.16]">
      <Check size={15} strokeWidth={3} className="text-accent-display" aria-hidden="true" />
      <span className="sr-only">{t.included}</span>
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-fg/[0.04]">
      <Minus size={14} className="text-fg/30" aria-hidden="true" />
      <span className="sr-only">{t.notIncluded}</span>
    </span>
  );
}

/** Flowa's O, sticking out of the grid: a physical object resting on the corner, with its own shadow and a little light. */
function OMark() {
  return (
    <span className="o-mark absolute -left-5 -top-8 z-10 sm:-left-7 sm:-top-9 lg:-left-9 lg:-top-11" aria-hidden="true">
      <span className="o-mark-glow" />
      <img src={asset("o-mark.png")} alt="" width={382} height={370} className="relative h-[68px] w-auto sm:h-[80px] lg:h-[96px]" />
    </span>
  );
}

const rowHead = "py-6 pr-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted";
const cell = "px-6 py-6 border-l border-border/70";

function DesktopTable() {
  const tableRef = useRef<HTMLTableElement>(null);
  const recRef = useRef<HTMLTableCellElement>(null);
  const [spot, setSpot] = useState<{ left: number; width: number } | null>(null);
  useEffect(() => {
    const update = () => {
      const tb = tableRef.current;
      const th = recRef.current;
      if (!tb || !th) return;
      // Layout values, not client rects: the entrance animation scales the panel and would skew a rect.
      setSpot({ left: th.offsetLeft, width: th.offsetWidth });
    };
    update();
    const ro = new ResizeObserver(update);
    if (tableRef.current) ro.observe(tableRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="pricing-panel relative hidden rounded-panel border border-border bg-card/70 px-8 pb-8 pt-2 shadow-float backdrop-blur-md lg:block xl:px-10 xl:pb-10">
      <OMark />
      <div className="relative">
        {spot && <span className="pricing-spot pointer-events-none absolute -top-4 bottom-0 rounded-card" style={{ left: spot.left, width: spot.width }} aria-hidden="true" />}
      <table ref={tableRef} className="relative w-full border-collapse text-left">
        <caption className="sr-only">Package comparison: Pilot, Core, Plus and Scale</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="w-[16%] pb-7 pr-6 pt-14 align-bottom">
              <span className="sr-only">Package</span>
            </th>
            {packages.map((p) => (
              <th key={p.id} ref={p.recommended ? recRef : undefined} scope="col" className={`relative w-[21%] px-6 pb-7 pt-14 align-bottom ${cell}`}>
                {p.recommended && (
                  <span className="absolute left-6 top-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-display">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {t.recommended}
                  </span>
                )}
                <span className="block text-[24px] font-extrabold tracking-[-0.02em] text-fg">{p.name}</span>
                <span className="mt-1 block text-[15px] text-muted">{p.summary.tagline}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <th scope="row" className={rowHead}>
              {t.rows.price}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`${cell} py-8`}>
                <Price p={p} />
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className={rowHead}>
              {t.rows.meetings}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`${cell} text-[18px] font-semibold text-fg`}>
                {meetings(p)}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className={rowHead}>
              {t.rows.bestFor}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={`${cell} text-[16px] text-fg`}>
                {p.summary.bestFor}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border">
            <th scope="row" className={rowHead}>
              {t.rows.outreach}
            </th>
            {packages.map((p) => (
              <td key={p.id} className={cell}>
                <Outreach p={p} />
              </td>
            ))}
          </tr>
          {guarantee && (
            <tr className="border-b border-border">
              <th scope="row" className={rowHead}>
                {t.rows.guarantee}
              </th>
              {packages.map((p) => (
                <td key={p.id} className={cell}>
                  <GuaranteeMark on={guarantee[p.id]} />
                </td>
              ))}
            </tr>
          )}
          <tr>
            <td className="pt-7" />
            {packages.map((p) => (
              <td key={p.id} className={`${cell} border-l-transparent pb-2 pt-7`}>
                <BookCallLink location={`pricing-table-${p.id}`} service="pricing" fallback={FALLBACK} variant={p.recommended ? "accent" : "ghost"} size="sm" className="w-full">
                  {p.cta}
                </BookCallLink>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      </div>
      <p className="mt-6 max-w-3xl text-[12px] text-muted">{t.footnote}</p>
    </div>
  );
}

function MobileSummaries() {
  return (
    <div className="pricing-panel relative rounded-panel border border-border bg-card/70 px-4 pb-6 pt-12 shadow-float backdrop-blur-md sm:px-6 lg:hidden">
      <OMark />
      <ul className="flex flex-col gap-3">
        {packages.map((p) => (
          <li key={p.id} className={`relative rounded-card border p-5 ${p.recommended ? "pricing-spot border-accent/50" : "border-border bg-bg/60"}`}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em] text-fg">{p.name}</h3>
              {p.recommended && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-display">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t.recommended}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[15px] text-muted">{p.summary.tagline}</p>
            <div className="mt-4">
              <Price p={p} size="md" />
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
              <div>
                <dt className="text-muted">{t.rows.meetings}</dt>
                <dd className="mt-0.5 font-semibold text-fg">{meetings(p)}</dd>
              </div>
              <div>
                <dt className="text-muted">{t.rows.bestFor}</dt>
                <dd className="mt-0.5 font-semibold text-fg">{p.summary.bestFor}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted">{t.rows.outreach}</dt>
                <dd className="mt-1.5">
                  <Outreach p={p} />
                </dd>
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
