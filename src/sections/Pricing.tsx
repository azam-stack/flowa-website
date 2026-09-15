import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
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
    <section id="pricing" className="border-t border-border py-12 md:py-14">
      <Container>
        <Reveal className="max-w-xl">
          <SectionLabel>{pricing.eyebrow}</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{pricing.h2}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">{pricing.body}</p>
        </Reveal>

        {pricing.mode === "model" ? <ModelMode /> : <TiersMode />}

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
            <p className="text-sm font-semibold text-fg">{pricing.includedHeading}</p>
            {pricing.included.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-muted">
                <Check size={15} className="shrink-0 text-accent" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ModelMode() {
  const m = pricing.model;
  return (
    <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
      <Reveal delay={80}>
        <ol className="flex flex-col divide-y divide-border border-y border-border">
          {m.points.map((point, i) => (
            <li key={point.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
              <span className="text-[22px] font-extrabold leading-none text-accent-display" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[19px] font-bold tracking-tight text-fg">{point.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
      <Reveal delay={160}>
        <div className="flex h-full flex-col justify-center rounded-3xl border border-border bg-card p-7 md:p-8">
          <p className="text-[19px] font-bold tracking-tight text-fg">{m.quoteCta}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{m.quoteHint}</p>
          <LinkButton href="#contact" variant="primary" className="mt-6 w-full sm:w-auto">
            {m.quoteCta}
          </LinkButton>
        </div>
      </Reveal>
    </div>
  );
}

function TiersMode() {
  const showPopular = pricing.popularBasis !== null;
  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {pricing.tiers.map((tier, i) => {
          const popular = showPopular && tier.popular;
          return (
            <Reveal key={tier.name} delay={i * 60}>
              <div className={`relative flex h-full flex-col rounded-3xl border p-6 ${popular ? "border-fg bg-fg text-bg" : "border-border bg-card text-fg"}`}>
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-fg" title={pricing.popularBasis ?? undefined}>
                    {pricing.popularLabel}
                  </span>
                )}
                <p className={`text-sm font-semibold ${popular ? "text-bg/70" : "text-muted"}`}>{tier.name}</p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight">{tier.price}</p>
                <p className={`mt-1 text-sm ${popular ? "text-bg/60" : "text-muted"}`}>{pricing.perMeeting}</p>
                <p className={`mt-5 text-[15px] leading-relaxed ${popular ? "text-bg/70" : "text-muted"}`}>{tier.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
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
