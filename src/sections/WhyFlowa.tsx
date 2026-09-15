import { Section, SectionHeader, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { why } from "@/content/site.en";

/**
 * "Why Flowa" — four contrasts set large, in two columns with generous
 * room. Typography does the work: a claim, then one quiet line.
 */
export function WhyFlowa() {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={why.eyebrow} title={why.h2} />
        <Reveal delay={120} stagger className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-y-16">
          {why.items.map((item) => (
            <div key={item.title} className="max-w-md">
              <h3 className="text-[clamp(1.375rem,2vw,1.75rem)] font-bold leading-[1.2] tracking-[-0.02em] text-fg">{item.title}</h3>
              <p className="mt-3 text-body text-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
