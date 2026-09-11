import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const CASES = [
  {
    client: "[Kundenavn]",
    industry: "[Branche]",
    quote: "Fra uforudsigelig pipeline til kvalificerede salgsmøder.",
    challenge: "[Beskriv kundens udfordring før Flowa]",
    solution: "[Beskriv den løsning Flowa leverede]",
    metrics: [
      { value: "[XX]", label: "møder booket" },
      { value: "[XX%]", label: "kvalificeringsrate" },
      { value: "[XX]", label: "nye muligheder" },
    ],
  },
  {
    client: "[Kundenavn]",
    industry: "[Branche]",
    quote: "[Kundecitat indsættes her]",
    challenge: "[Beskriv kundens udfordring før Flowa]",
    solution: "[Beskriv den løsning Flowa leverede]",
    metrics: [
      { value: "[XX]", label: "møder booket" },
      { value: "[XX%]", label: "kvalificeringsrate" },
      { value: "[XX]", label: "nye muligheder" },
    ],
  },
];

export function CaseStudies() {
  return (
    <section id="cases" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionLabel>Cases</SectionLabel>
              <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
                Resultater fra samarbejder
              </h2>
            </div>
            <p className="max-w-xs text-sm text-muted">
              Struktur klar til rigtige tal — indholdet herunder er placeholder, indtil cases er godkendt til offentliggørelse.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wide text-fg">{c.client}</span>
                  <span className="rounded-full bg-fg/5 px-3 py-1 text-xs font-medium text-muted">{c.industry}</span>
                </div>
                <p className="mt-5 text-xl font-semibold leading-snug tracking-tight text-fg">"{c.quote}"</p>
                <dl className="mt-6 space-y-3 text-sm text-muted">
                  <div>
                    <dt className="font-semibold text-fg/70">Udfordring</dt>
                    <dd className="mt-0.5">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-fg/70">Løsning</dt>
                    <dd className="mt-0.5">{c.solution}</dd>
                  </div>
                </dl>
                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-2xl font-extrabold tracking-tight text-accent">{m.value}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
