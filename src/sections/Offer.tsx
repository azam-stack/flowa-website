import { Section, SectionHeader, Container } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { offer } from "@/content/site.en";

/**
 * Section 3. The pitch on the left; on the right the four services as
 * modules of one system — a 2×2 grid drawn with 1px rules, not cards.
 * Each module carries its system name, its plain-language title and one
 * line of description, plus an id the nav and footer can point at.
 */
export function Offer() {
  return (
    <Section id="offer">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeader eyebrow={offer.eyebrow} title={offer.h2} lead={offer.body} />
            <Reveal delay={240} variant="near" className="mt-6 md:mt-8">
              <LinkButton href="#pricing" variant="ghost" arrow>
                {offer.ctaSecondary}
              </LinkButton>
            </Reveal>
          </div>

          <Reveal delay={120} variant="surface" threshold={0.15}>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="sys">{offer.system}</span>
              <span className="sys text-muted">{offer.servicesHeading}</span>
            </div>
            <ul className="stagger grid grid-cols-1 sm:grid-cols-2">
              {offer.services.map((service, i) => (
                <li
                  key={service.id}
                  id={service.id}
                  className={`group relative border-b border-border py-6 pr-6 transition-colors duration-slow hover:bg-fg/[0.02] sm:py-7 ${i % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="sys text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-4 bg-border" aria-hidden="true" />
                    <span className="sys text-accent-band">{service.module}</span>
                  </div>
                  <h3 className="mt-4 text-h3 text-fg">{service.title}</h3>
                  <p className="mt-1.5 text-body text-muted">{service.description}</p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-[width] duration-slow ease-flowa group-hover:w-full motion-reduce:transition-none" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
