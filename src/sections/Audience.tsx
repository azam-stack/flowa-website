import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { industries } from "@/content/site.en";

export function Audience() {
  return (
    <section id="industries" className="border-t border-border py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>{industries.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{industries.h2}</h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {industries.items.map((ind, i) => (
            <Reveal key={ind} delay={i * 50}>
              <span className="inline-block rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent">
                {ind}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
