import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/content/frank/pages";
import { StepMock } from "./Mocks";
import { SectionHeading, Section } from "./SectionHeading";

/** The four How Frank works steps as framed cards with mini mock-ups (brief §5). Used on /frank and /how-it-works. */
export function HowSteps({ className = "" }: { className?: string }) {
  return (
    <Reveal stagger as="ol" className={`grid gap-5 md:grid-cols-2 xl:grid-cols-4 ${className}`}>
      {howItWorks.steps.map((s) => (
        <li key={s.n} className="framed flex min-w-0 flex-col p-5 md:p-6">
          <StepMock kind={s.mock} className="h-[300px] overflow-hidden" />
          <p className="mt-5 text-[13px] font-semibold tracking-wide text-brand-deep">{s.n}</p>
          <h3 className="mt-1 text-h3 text-ink">{s.title}</h3>
          <p className="mt-2 text-body text-ink-2">{s.body}</p>
        </li>
      ))}
    </Reveal>
  );
}

export function HowStrip({ eyebrow, h2 }: { eyebrow: string; h2: string }) {
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={h2} />
        <HowSteps className="mt-12 md:mt-16" />
      </Container>
    </Section>
  );
}
