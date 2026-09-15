import { Section, SectionHeader, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { problem } from "@/content/site.en";

/** Section 2. Three points as text columns — no cards, no icons. */
export function Problem() {
  return (
    <Section density="compact" divider={false}>
      <Container>
        <SectionHeader eyebrow={problem.eyebrow} title={problem.h2} />
        <Reveal delay={80} className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {problem.items.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-h3 text-fg">{item.title}</h3>
              <p className="mt-3 text-body text-muted">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
