import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Btn } from "@/components/frank/Btn";
import { Check } from "@/components/frank/Icons";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { ShortForm } from "@/components/frank/ShortForm";
import { SparkleGrid } from "@/components/frank/SparkleGrid";
import { snapshot as t } from "@/content/frank/snapshot";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/**
 * /market-snapshot: the free sample. One promise, three steps and the
 * form above the fold; an example of what arrives below it. Nothing else.
 */
export function SnapshotPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: t.path, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Market snapshot", path: t.path }])] });
  return (
    <>
      <section className="pt-5 md:pt-8">
        <Container>
          <div className="framed relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%)" }}>
            <SparkleGrid fade />
            <div className="relative z-[1] grid gap-10 px-6 py-12 md:px-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-14 lg:px-16 lg:py-20">
              <div>
                <h1 className="text-h1 text-ink">
                  {t.h1Light}
                  <span className="font-semibold">{t.h1Bold}</span>
                </h1>
                <p className="mt-5 max-w-[560px] text-sub text-ink-2">{t.sub}</p>
                <ol className="mt-8 flex flex-col gap-4">
                  {t.steps.map((s, i) => (
                    <li key={s.title} className="flex items-start gap-4">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-ink bg-white text-[14px] font-semibold text-ink">{i + 1}</span>
                      <span>
                        <span className="block text-[17px] font-semibold text-ink">{s.title}</span>
                        <span className="block text-[15px] text-ink-2">{s.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 text-[14px] text-muted">{t.limit}</p>
              </div>
              <div id="snapshot-form" className="rounded-frame border border-ink bg-white p-6 shadow-lift md:p-8">
                <h2 className="mb-5 text-[22px] font-semibold text-ink">{t.form.h2}</h2>
                <ShortForm idPrefix="snapshot" variant="snapshot" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading title={<>{t.example.h2Light}<span className="font-semibold">{t.example.h2Bold}</span></>} sub={t.example.sub} />
          <Reveal className="mx-auto mt-10 max-w-5xl md:mt-14">
            <div className="hidden overflow-hidden rounded-frame border border-ink bg-white md:block">
              <table className="w-full table-fixed border-collapse text-left">
                <thead>
                  <tr className="bg-soft">
                    {t.example.columns.map((c) => (
                      <th key={c} scope="col" className="p-4 text-[13px] font-semibold uppercase tracking-[0.06em] text-muted">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.example.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line">
                      {r.map((cell, i) => (
                        <td key={i} className={`p-4 align-top text-[15px] leading-snug ${i === 0 ? "font-semibold text-ink" : i === 1 ? "text-ink" : "text-ink-2"}`}>
                          {i === 1 ? <span className="rounded-pill bg-brand/20 px-2.5 py-1 text-[13px] font-medium text-ink">{cell}</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="flex flex-col gap-3 md:hidden">
              {t.example.rows.map((r) => (
                <li key={r[0]} className="rounded-frame border border-line bg-white p-5">
                  <p className="text-[16px] font-semibold text-ink">{r[0]}</p>
                  <p className="mt-2">
                    <span className="rounded-pill bg-brand/20 px-2.5 py-1 text-[13px] font-medium text-ink">{r[1]}</span>
                  </p>
                  <p className="mt-3 text-[14px] text-ink-2">
                    <span className="text-muted">{t.example.columns[2]}: </span>
                    {r[2]}
                  </p>
                  <p className="mt-1 text-[14px] text-ink-2">
                    <span className="text-muted">{t.example.columns[3]}: </span>
                    {r[3]}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-[15px] font-medium text-ink">
              <Check size={16} /> {t.example.plus}
            </p>
            <p className="mt-2 text-center text-small text-muted">{t.example.note}</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

/** A slim band that points to the snapshot. Used on the homepage under the demo. */
export function SnapshotBand() {
  const b = t.band;
  return (
    <Container>
      <Reveal className="framed flex flex-col items-start gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10 md:py-8">
        <div className="max-w-2xl">
          <h2 className="text-[24px] font-semibold leading-tight text-ink md:text-[28px]">{b.h2}</h2>
          <p className="mt-2 text-body text-ink-2">{b.body}</p>
        </div>
        <Btn href={t.path} size="lg" className="flex-none" trackLabel="snapshot_band">
          {b.cta}
        </Btn>
      </Reveal>
    </Container>
  );
}

