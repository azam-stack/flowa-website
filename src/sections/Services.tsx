import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const SERVICES = [
  { title: "Mødebooking", body: "Kvalificerede B2B-møder med relevante beslutningstagere, leveret direkte i jeres kalender." },
  { title: "Lead Research", body: "Research og identifikation af de virksomheder og personer, der matcher jeres ideelle kundeprofil." },
  { title: "Outbound", body: "Målrettet outbound-prospektering, tilpasset jeres branche, tone og salgsproces." },
  { title: "Sales Development", body: "Løbende støtte til at bygge en forudsigelig pipeline af kvalificerede muligheder." },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
            Det I får med Flowa
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <a
                href="#kontakt"
                className="group block h-full rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-fg/20 hover:shadow-[0_24px_48px_-24px_rgba(12,12,11,0.18)]"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-fg">{s.title}</h3>
                  <ArrowUpRight size={20} className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
