import { Check } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { pricing } from "@/content/site.en";

/**
 * Two modes, chosen in content (`pricing.mode`):
 * - "model": how pricing works + a quote CTA. No tier grid — a grid
 *   without numbers tells the visitor nothing.
 * - "tiers": three tiers with real prices. The build refuses this mode
 *   while any price is still £TBC (scripts/check-content.mjs).
 */
export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeader eyebrow={pricing.eyebrow} title={pricing.h2} lead={pricing.body} />

        {pricing.mode === "model" ? <ModelMode /> : <TiersMode />}

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 md:mt-10 md:gap-x-8 md:gap-y-3 md:pt-6">
            <p className="text-small font-semibold text-fg">{pricing.includedHeading}</p>
            {pricing.included.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[13px] text-muted md:gap-2 md:text-small">
                <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ModelMode() {
  const m = pricing.model;
  return (
    <div className="mt-8 grid grid-cols-1 gap-7 md:mt-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
      <Reveal delay={80}>
        <ol className="flex flex-col divide-y divide-border border-y border-border">
          {m.points.map((point, i) => (
            <li key={point.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-4 md:py-5">
              <span className="text-[22px] font-extrabold leading-none text-accent-display" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-h3 text-fg">{point.title}</h3>
                <p className="mt-1 text-body text-muted md:mt-1.5">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={160}>
        <Card className="flex h-full flex-col justify-center p-6 md:p-8">
          <p className="text-h3 text-fg">{m.quoteCta}</p>
          <p className="mt-2 text-body text-muted">{m.quoteHint}</p>
          <LinkButton href="#contact" variant="primary" className="mt-5 w-full sm:w-auto md:mt-6">
            {m.quoteCta}
          </LinkButton>
        </Card>
      </Reveal>
    </div>
  );
}

function TiersMode() {
  const showPopular = pricing.popularBasis !== null;
  return (
    <>
      <Reveal delay={80} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {pricing.tiers.map((tier) => {
          const popular = showPopular && tier.popular;
          return (
            <Card key={tier.name} dark={popular} className="relative flex h-full flex-col p-6">
              {popular && (
                <Badge variant="accent" className="absolute -top-3 left-6" >
                  {pricing.popularLabel}
                </Badge>
              )}
              <p className={`text-small font-semibold ${popular ? "text-bg/70" : "text-muted"}`}>{tier.name}</p>
              <p className="mt-3 text-4xl font-extrabold tracking-tight">{tier.price}</p>
              <p className={`mt-1 text-small ${popular ? "text-bg/60" : "text-muted"}`}>{pricing.perMeeting}</p>
              <p className={`mt-5 text-body ${popular ? "text-bg/70" : "text-muted"}`}>{tier.note}</p>
            </Card>
          );
        })}
      </Reveal>
      <Reveal delay={200}>
        <div className="mt-6 flex justify-center">
          <LinkButton href="#contact" variant="primary">
            {pricing.cta}
          </LinkButton>
        </div>
      </Reveal>
    </>
  );
}
