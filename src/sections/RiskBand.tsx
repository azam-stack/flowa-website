import { Check } from "lucide-react";
import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { riskBand, chapters } from "@/content/site.en";
import { FluidObject } from "@/components/FluidObject";

/**
 * Section 4 — "the deal". Full-bleed near-black (not orange: flat #EE9E47
 * under white text fails at every size). Headline and checks are
 * vertically centred so the band reads as one statement, not a heading
 * with a list beneath it.
 */
export function RiskBand() {
  return (
    <Section tone="band" density="band" divider={false} className="relative overflow-hidden pb-44 md:mx-4 md:rounded-[28px] lg:mx-6 lg:pb-[calc(var(--band-pad)+3rem)]">
      <div className="parallax parallax-slow pointer-events-none absolute -bottom-28 -right-16 h-[300px] w-[300px] lg:-bottom-72 lg:-left-16 lg:h-[460px] lg:w-[460px]" aria-hidden="true">
        <FluidObject tone="dark" className="h-full w-full" />
      </div>
      <span className="sys absolute right-6 top-6 text-ink-muted md:right-10 md:top-8">{chapters.riskBand}</span>
      <Container>
        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="far" className="parallax parallax-slow">
            <h2 className="text-h2 text-white">
              {riskBand.headline[0]}
              <br />
              <span className="text-accent">{riskBand.headline[1]}</span>
            </h2>
          </Reveal>

          <Reveal delay={160} stagger>
            <p className="text-lead text-white/[0.88]">{riskBand.paragraph}</p>

            <ul className="mt-5 flex flex-col gap-4 md:mt-7 md:gap-5">
              {riskBand.checks.map((check) => (
                <li key={check} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/[0.18]">
                    <Check size={14} className="text-accent" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-body font-medium text-white/[0.88]">{check}</span>
                </li>
              ))}
            </ul>

            <hr className="mt-5 border-t border-white/20 md:mt-7" />
            <p className="mt-5 text-[17px] font-semibold leading-snug text-white md:mt-6 md:text-[19px]">{riskBand.payoff}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
