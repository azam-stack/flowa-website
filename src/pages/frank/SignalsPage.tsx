import { Container } from "@/components/Container";
import { Chip } from "@/components/frank/Chip";
import { ContactBand } from "@/components/frank/ContactBand";
import { SignalExampleCard } from "@/components/frank/Mocks";
import { PageHero } from "@/components/frank/PageHero";
import { SectionHeading, Section } from "@/components/frank/SectionHeading";
import { Sphere } from "@/components/frank/Sphere";
import { Reveal } from "@/components/Reveal";
import { signals as t } from "@/content/frank/pages";
import { breadcrumbJsonLd, useSeo } from "@/lib/seo";

/** /signals: "What Frank watches". The static-lists argument, the six engine steps, the four example signals as dark cards. */
export function SignalsPage() {
  useSeo({ title: t.seo.title, description: t.seo.description, path: "/signals", jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Signals", path: "/signals" }])] });
  return (
    <>
      <PageHero light={t.h1Light} bold={t.h1Bold} sub={t.sub} />

      <Section>
        <Container>
          <Reveal className="framed relative grid gap-8 overflow-hidden px-6 py-10 md:grid-cols-[1fr_1.4fr] md:px-12 md:py-14">
            <Sphere size={60} tint={5} className="absolute -right-4 -top-4 hidden md:block" />
            <h2 className="text-h2 text-ink">{t.problem.h2}</h2>
            <ul className="flex flex-col gap-4">
              {t.problem.lines.map((l, i) => (
                <li key={l} className="flex gap-4 text-body text-ink-2">
                  <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-panel text-[12px] font-semibold text-ink">{i + 1}</span>
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow={t.engine.eyebrow} title={t.engine.h2} sub={t.engine.sub} />
          <Reveal stagger as="ol" className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
            {t.engine.steps.map((s) => (
              <li key={s.n} className="framed flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold tracking-wide text-brand-deep">{s.n}</span>
                  <Chip>{s.chip}</Chip>
                </div>
                <h3 className="mt-4 text-h3 text-ink">{s.title}</h3>
                <p className="mt-2 text-body text-ink-2">{s.body}</p>
              </li>
            ))}
          </Reveal>
          <p className="mt-5 text-small text-muted">{t.engine.note}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow={t.examples.eyebrow} title={t.examples.h2} sub={t.examples.sub} />
          <Reveal stagger as="ul" className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
            {t.examples.items.map((ex, i) => (
              <li key={ex.signal}>
                <SignalExampleCard n={`0${i + 1}`} signal={ex.signal} meaning={ex.meaning} signalLabel={t.examples.signalLabel} meaningLabel={t.examples.meaningLabel} />
              </li>
            ))}
          </Reveal>
          <p className="mt-5 text-small text-muted">{t.examples.note}</p>
        </Container>
      </Section>

      <ContactBand idPrefix="signals" />
    </>
  );
}
