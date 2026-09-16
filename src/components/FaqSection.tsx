import { Section, SectionHeader, Container } from "./Section";
import { Accordion } from "./Accordion";
import { Reveal } from "./Reveal";
import type { FAQItem } from "@/content/types";
import { track } from "@/lib/analytics";

/** One FAQ component for every page; each opened question is tracked by its text and the page's service. */
export function FaqSection({ heading, items, service, id = "faq" }: { heading: string; items: readonly FAQItem[]; service?: string; id?: string }) {
  return (
    <Section id={id}>
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader title={heading} />
          <Reveal delay={120} variant="near">
            <Accordion className="stagger" items={items.map((f) => ({ title: f.q, body: f.a }))} onOpen={(item) => track("faq_open", { question: item.title, service })} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
