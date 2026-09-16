import { Section, Container } from "./Section";
import { Card } from "./Card";
import { Reveal } from "./Reveal";
import { LeadForm } from "./LeadForm";
import { LinkButton } from "./Button";
import { BookCallLink } from "./BookCallLink";
import { finalCta, team } from "@/content/site.en";
import { asset } from "@/lib/asset";

/**
 * The closing call to action on the services, cases and hub pages: the
 * pitch on the left, the one lead form on the right. `id="contact"` so
 * the in-page booking fallback lands here on every page.
 */
export function LeadCta({ heading, body, service, secondary }: { heading: string; body: string; service?: string; secondary?: { label: string; href: string } }) {
  return (
    <Section id="contact" className="scroll-mt-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal stagger>
              <h2 className="far text-h2 text-fg">{heading}</h2>
              <p className="mt-4 max-w-lead text-lead text-muted md:mt-5">{body}</p>
              {secondary && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookCallLink location="lead-cta" service={service} variant="primary" />
                  <LinkButton href={secondary.href} variant="ghost" arrow>
                    {secondary.label}
                  </LinkButton>
                </div>
              )}
              <div className="mt-8 flex items-center gap-3.5">
                <picture>
                  <source srcSet={`${asset(team.ahmed.photoBase)}.avif`} type="image/avif" />
                  <source srcSet={`${asset(team.ahmed.photoBase)}.webp`} type="image/webp" />
                  <img src={`${asset(team.ahmed.photoBase)}.jpg`} alt={`${team.ahmed.firstName}, ${team.ahmed.role}`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover grayscale" />
                </picture>
                <p className="text-small font-medium text-fg">{finalCta.responsePromise}</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={160} variant="surface" threshold={0.15}>
            <Card className="p-5 sm:p-7 md:p-9">
              <LeadForm service={service} />
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
