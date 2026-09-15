import { Section, SectionHeader, Container } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { offer } from "@/content/site.en";

/**
 * Section 3. The pitch on the left, the four services as a list on the
 * right — each with an id the nav and footer can point at.
 */
export function Offer() {
  return (
    <Section id="offer">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={offer.eyebrow} title={offer.h2} lead={offer.body} />
            <Reveal delay={240} variant="near" className="mt-6 md:mt-8">
              <LinkButton href="#pricing" variant="ghost" arrow>
                {offer.ctaSecondary}
              </LinkButton>
            </Reveal>
          </div>

          <Reveal delay={120} variant="near">
            <p className="text-eyebrow text-muted">{offer.servicesHeading}</p>
            <ul className="stagger mt-3 divide-y divide-border border-y border-border">
              {offer.services.map((service) => (
                <li key={service.id} id={service.id} className="py-4 md:py-5">
                  <h3 className="text-h3 text-fg">{service.title}</h3>
                  <p className="mt-1 text-small text-muted md:mt-1.5 md:text-body">{service.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
