import { Check } from "lucide-react";
import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { FluidObject } from "@/components/FluidObject";
import { riskBand } from "@/content/site.en";

/**
 * The deal, as a transformation: the page goes dark, the first line
 * ("You don't pay for promises.") is crossed out as the second line
 * ("You pay when meetings are created.") rises in its place, and the
 * light-form returns in ink, rising from below. Then the model, stated
 * plainly, with only the commitments that are confirmed.
 */
export function RiskBand() {
  return (
    <Section tone="band" density="band" divider={false} className="relative overflow-hidden md:mx-4 md:rounded-[28px] lg:mx-6">
      <div className="parallax parallax-slow pointer-events-none absolute -bottom-40 -right-24 hidden h-[420px] w-[420px] lg:-bottom-64 lg:-left-20 lg:block lg:h-[520px] lg:w-[520px]" aria-hidden="true">
        <FluidObject tone="dark" className="h-full w-full" />
      </div>
      <Container className="relative">
        <Reveal threshold={0.4} className="max-w-3xl">
          <p className="transform-from text-h2 text-white/[0.92]">
            <span className="transform-line">{riskBand.transform[0]}</span>
          </p>
          <p className="transform-to mt-2 text-h2 text-accent">{riskBand.transform[1]}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 md:mt-20 md:pt-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="far">
            <h2 className="text-[clamp(1.5rem,2.6vw,2.125rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {riskBand.headline[0]} {riskBand.headline[1]}
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
