import { useState } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Reveal } from "@/components/Reveal";
import { comparisonTable } from "@/content/site.en";
import { asset } from "@/lib/asset";
import { SmartLink } from "@/components/SmartLink";
import { ArrowRight } from "lucide-react";

/**
 * Section 6 — the site's signature element. Commercial terms only, never
 * outcomes (restructure brief C3). The Flowa column is marked by an
 * orange top edge and a light fill rather than a solid orange header,
 * and the table bleeds slightly past the content width.
 *
 * Under md the table becomes a column switcher (SDR / Agency / Flowa)
 * instead of five stacked cards. Two honest lines sit under the table:
 * where the SDR and agency figures come from, and who Flowa is not for.
 */
export function ComparisonTable() {
  return (
    <Section id="comparison" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-content px-6 md:px-10">
        <SectionHeader title={comparisonTable.h2} lead={comparisonTable.intro} />
      </div>

      <div className="mx-auto mt-8 w-full max-w-bleed px-6 md:mt-12 md:px-10">
        <Reveal delay={100} variant="surface" threshold={0.15} className="hidden overflow-hidden rounded-card border border-border md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-riskband text-white">
                <th scope="col" className="w-1/4 px-6 py-5 text-small font-semibold">
                  <span className="sr-only">Category</span>
                </th>
                <th scope="col" className="px-6 py-5 text-small font-semibold">{comparisonTable.columns[0]}</th>
                <th scope="col" className="px-6 py-5 text-small font-semibold">{comparisonTable.columns[1]}</th>
                <th scope="col" className="relative bg-white/[0.06] px-6 py-5">
                  <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" aria-hidden="true" />
                  <img src={asset("flowa-wordmark-white.png")} alt="Flowa" className="h-7 w-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-bg"}>
                  <th scope="row" className="px-6 py-5 text-left align-middle text-[15px] font-semibold text-fg">{row.label}</th>
                  <td className="px-6 py-5 align-middle text-[15px] text-muted">{row.cells[0]}</td>
                  <td className="px-6 py-5 align-middle text-[15px] text-muted">{row.cells[1]}</td>
                  <td className="border-x border-accent/40 bg-accent/[0.06] px-6 py-5 align-middle">
                    <span className="table-pill inline-block" style={{ "--pill-delay": `${i * 40}ms` } as React.CSSProperties}>
                      <Badge variant="dark" check>
                        {row.cells[2]}
                      </Badge>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <MobileComparison />

        <Reveal delay={160} className="mt-5 max-w-lead md:mt-6">
          <p className="text-small text-muted">{comparisonTable.footnote}</p>
          <p className="mt-2 text-small font-medium text-fg">{comparisonTable.notFor}</p>
          <SmartLink href={comparisonTable.engineLink.href} className="group mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-fg">
            {comparisonTable.engineLink.label}
            <ArrowRight size={14} className="transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px]" aria-hidden="true" />
          </SmartLink>
        </Reveal>
      </div>
    </Section>
  );
}

function MobileComparison() {
  const [col, setCol] = useState(2);
  return (
    <Reveal delay={100} className="md:hidden">
      <p className="text-small text-muted">{comparisonTable.mobileHint}</p>
      <div className="mt-3 grid grid-cols-3 gap-1 rounded-full border border-border bg-card p-1" role="tablist" aria-label={comparisonTable.eyebrow}>
        {comparisonTable.columns.map((c, i) => (
          <button
            key={c}
            role="tab"
            aria-selected={col === i}
            onClick={() => setCol(i)}
            className={`h-11 rounded-full px-2 text-[13px] font-semibold transition-colors duration-fast ${col === i ? "bg-fg text-bg" : "text-muted"}`}
          >
            {i === 2 ? "Flowa" : i === 0 ? "SDR" : "Agency"}
          </button>
        ))}
      </div>
      <dl className="mt-4 divide-y divide-border border-y border-border">
        {comparisonTable.rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 py-3.5">
            <dt className="text-small font-medium text-muted">{row.label}</dt>
            <dd className="max-w-[60%] text-right text-[15px] font-medium text-fg">{col === 2 ? <Badge variant="dark" check>{row.cells[2]}</Badge> : row.cells[col]}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
