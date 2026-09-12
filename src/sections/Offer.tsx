import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { offer } from "@/content/site.en";

export function Offer() {
  return (
    <section id="offer" className="border-t border-border py-12 md:py-14">
      <Container>
        <Reveal className="max-w-2xl">
          <SectionLabel>{offer.eyebrow}</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{offer.h2}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{offer.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
