import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { LinkButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { pricing } from "@/content/site.en";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border py-12 md:py-14">
      <Container>
        <Reveal>
          <SectionLabel>{pricing.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{pricing.h2}</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{pricing.body}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 60}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-5 ${
                  tier.popular ? "border-fg bg-fg text-bg" : "border-border bg-card text-fg"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-fg">
                    Most chosen
                  </span>
                )}
                <p className={`text-sm font-semibold ${tier.popular ? "text-bg/70" : "text-muted"}`}>{tier.name}</p>
                <p className="mt-3 text-4xl font-extrabold tracking-tight">{tier.price}</p>
                <p className={`mt-1 text-sm ${tier.popular ? "text-bg/60" : "text-muted"}`}>{pricing.perMeeting}</p>
                <p className={`mt-5 text-[14px] leading-relaxed ${tier.popular ? "text-bg/70" : "text-muted"}`}>{tier.note}</p>
                <LinkButton href="#contact" variant={tier.popular ? "accent" : "ghost"} className="mt-7 w-full">
                  {pricing.cta}
                </LinkButton>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-sm font-semibold text-fg">{pricing.includedHeading}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2.5">
              {pricing.included.map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-muted">
                  <Check size={15} className="text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
