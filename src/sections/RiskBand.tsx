import { Check } from "lucide-react";
import { Section, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { AmbientGradient } from "@/components/AmbientGradient";
import { riskBand } from "@/content/site.en";

/**
 * The deal, as a transformation: "You don't pay for promises." is read,
 * then crossed out, as "You pay when meetings are created." rises in its
 * place. That is the band's only headline; the model sits beside it.
 * Commitments render as a list only once there are three; until then
 * one sentence stands in.
 */
export function RiskBand() {
  const showList = riskBand.checks.length >= 3;
  return (
    <Section tone="band" density="band" divider={false} className="band-depth relative overflow-hidden md:mx-4 md:rounded-panel lg:mx-6">
      <AmbientGradient />
      <Container className="relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <Reveal threshold={0.4}>
            <p className="transform-from text-h2 text-white">
              <span className="transform-line">{riskBand.transform[0]}</span>
            </p>
            <p className="transform-to mt-2 text-h2 text-accent">{riskBand.transform[1]}</p>
          </Reveal>

          <Reveal delay={200} stagger>
            <p className="text-lead text-white/[0.88]">{riskBand.paragraph}</p>
            {showList ? (
              <ul className="mt-6 flex flex-col gap-4">
                {riskBand.checks.map((check) => (
                  <li key={check} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/[0.18]">
                      <Check size={14} className="text-accent" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-body font-medium text-white/[0.88]">{check}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-body font-medium text-white/[0.88]">{riskBand.checksSentence}</p>
            )}
            <hr className="mt-6 border-t border-white/20 md:mt-7" />
            <p className="mt-5 text-[17px] font-semibold leading-snug text-white md:mt-6 md:text-[19px]">{riskBand.payoff}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
