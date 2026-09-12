import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { comparisonTable } from "@/content/site.en";

function FlowaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-riskband px-4 py-2 text-[13px] font-semibold text-white">
      <Check size={13} className="shrink-0 text-accent" strokeWidth={2.5} />
      {children}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="border-t border-border py-12 md:py-14">
      <Container>
        <Reveal>
          <SectionLabel>{comparisonTable.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{comparisonTable.h2}</h2>
        </Reveal>

        {/* Desktop / tablet table — hidden below md, per spec no horizontal scroll or scaled-down table at 375px */}
        <Reveal delay={100} className="mt-6 hidden overflow-hidden rounded-3xl border border-black/[0.08] md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-riskband">
                <th className="w-1/4 px-6 py-4 text-sm font-semibold text-white">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-white">{comparisonTable.columns[0]}</th>
                <th className="px-6 py-4 text-sm font-semibold text-white">{comparisonTable.columns[1]}</th>
                <th className="bg-accent-band px-6 py-4">
                  <img src="/flowa-wordmark-white.png" alt="Flowa" className="h-5 w-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-bg"}>
                  <td className="min-h-[72px] px-6 py-4 align-middle text-[15px] font-semibold text-fg">{row.label}</td>
                  <td className="min-h-[72px] px-6 py-4 align-middle text-[15px] text-muted">{row.cells[0]}</td>
                  <td className="min-h-[72px] px-6 py-4 align-middle text-[15px] text-muted">{row.cells[1]}</td>
                  <td className="min-h-[72px] border-x-[1.5px] border-accent bg-accent/[0.06] px-6 py-4 align-middle">
                    <FlowaPill>{row.cells[2]}</FlowaPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile — one card per row label, per spec (verified at 375px, no horizontal scroll) */}
        <Reveal delay={100} className="mt-6 flex flex-col gap-4 md:hidden">
          {comparisonTable.rows.map((row) => (
            <div key={row.label} className="rounded-2xl border border-black/[0.08] bg-card p-5">
              <p className="text-sm font-bold text-fg">{row.label}</p>
              <dl className="mt-4 flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-xs text-muted">{comparisonTable.columns[0]}</dt>
                  <dd className="text-right text-[14px] text-muted">{row.cells[0]}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-xs text-muted">{comparisonTable.columns[1]}</dt>
                  <dd className="text-right text-[14px] text-muted">{row.cells[1]}</dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-accent/[0.06] p-3">
                  <dt className="text-xs font-semibold text-fg">{comparisonTable.columns[2]}</dt>
                  <dd>
                    <FlowaPill>{row.cells[2]}</FlowaPill>
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
