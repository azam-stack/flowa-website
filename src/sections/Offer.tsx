import { Section, SectionHeader, Container } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { offer } from "@/content/site.en";
import { getService, servicePath } from "@/content/services";
import { SmartLink } from "@/components/SmartLink";
import { ArrowRight } from "lucide-react";

/**
 * "What you get" — the pitch on the left, the four services on the right
 * as a plain ruled list: number, name, one line. Each has an id the nav
 * and footer can point at.
 */
export function Offer() {
  return (
    <Section id="offer">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionHeader title={offer.h2} lead={offer.body} />
            <Reveal delay={240} variant="near" className="mt-7 md:mt-9">
              <LinkButton href={offer.ctaSecondaryHref} variant="ghost" arrow>
                {offer.ctaSecondary}
              </LinkButton>
            </Reveal>
          </div>

          <Reveal delay={120} variant="near" className="lg:pt-2">
            <ul className="stagger divide-y divide-border border-y border-border">
              {offer.services.map((service, i) => (
                <li key={service.id} id={service.id} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                  <span className="pt-1 text-small font-semibold tabular-nums text-accent-display" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h3 text-fg">{service.title}</h3>
                    <p className="mt-1.5 text-body text-muted">{service.description}</p>
                    {"link" in service && service.link && (
                      <SmartLink href={service.link.href} className="group mt-2 inline-flex items-center gap-1.5 text-small font-semibold text-fg">
                        {service.link.label}
                        <ArrowRight size={14} className="transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px]" aria-hidden="true" />
                      </SmartLink>
                    )}
                    {getService(service.id) && (
                      <SmartLink href={servicePath(service.id)} className="group mt-2 inline-flex items-center gap-1.5 text-small font-semibold text-fg">
                        {offer.explore}
                        <ArrowRight size={14} className="transition-transform duration-[240ms] ease-flowa group-hover:translate-x-[3px]" aria-hidden="true" />
                      </SmartLink>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
