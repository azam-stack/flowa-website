import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { riskBand } from "@/content/site.en";

/**
 * Section 4. Full-bleed, near-black — not orange — per the restructure
 * brief (2.1): flat #EE9E47 as a background reaches ~1.9:1 for white text
 * and fails at every size. Colours here are exact values from the brief,
 * independently verified (white/#121110 18.9:1, #EE9E47/#121110 8.6:1).
 */
export function RiskBand() {
  return (
    <section className="bg-riskband py-20 text-white lg:py-[140px]">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {riskBand.headline[0]}
            <br />
            <span className="text-accent">{riskBand.headline[1]}</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="text-[17px] leading-relaxed text-white/[0.88]">{riskBand.paragraph}</p>

          <ul className="mt-6 flex flex-col gap-6">
            {riskBand.checks.map((check) => (
              <li key={check} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/[0.18]">
                  <Check size={14} className="text-accent" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] font-medium text-white/[0.88]">{check}</span>
              </li>
            ))}
          </ul>

          <hr className="mt-6 border-t border-white/20" />

          <p className="mt-6 text-[19px] font-semibold leading-snug text-white">{riskBand.payoff}</p>
        </Reveal>
      </div>
    </section>
  );
}
