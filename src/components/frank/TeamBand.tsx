import type { CSSProperties } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { asset } from "@/lib/asset";
import { Btn } from "./Btn";
import { Check } from "./Icons";
import { Section } from "./SectionHeading";
import { Sphere } from "./Sphere";

/**
 * The people band: the two founders who run every campaign. The research agent is a sentence, not a card.
 * Makes the human side of the service visible next to the agent: the
 * founders approve every message and run every conversation.
 */
export function TeamBand() {
  const t = home.team;
  return (
    <Section id="team">
      <Container>
        <div className="framed relative overflow-hidden px-6 py-10 shadow-float md:px-12 md:py-14 lg:px-16">
          <Sphere size={150} tint={1} mark className="absolute -bottom-12 -right-10 hidden opacity-90 lg:block" rotate={-16} duration={9} />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <Reveal>
              <p className="text-eyebrow text-brand-deep">{t.eyebrow}</p>
              <h2 className="mt-3 text-h2 text-ink">{t.h2}</h2>
              <p className="mt-4 max-w-lead text-sub text-ink-2">{t.sub}</p>
              <div className="mt-8">
                <Btn href={t.ctaHref} variant="outline" trackLabel="team_meet">
                  {t.cta}
                </Btn>
              </div>
            </Reveal>
            <Reveal stagger className="grid grid-cols-2 gap-3 md:gap-4">
              {t.people.map((p, i) => (
                <figure key={p.key} className="flex min-w-0 flex-col gap-2 rounded-card border border-ink bg-surface p-2" style={{ "--i": i + 1 } as CSSProperties}>
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px] bg-panel">
                    <img src={asset(`images/team/${p.key}.webp`)} alt={`${p.name}, ${p.role} of Flowa`} width={480} height={600} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-pill bg-white px-2 py-0.5 text-[11px] font-medium text-ink shadow-float">
                      <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-brand">
                        <Check size={8} />
                      </span>
                      Co-founder
                    </span>
                  </div>
                  <figcaption className="px-1 pb-1">
                    <p className="text-[15px] font-semibold text-ink">{p.name}</p>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-brand-deep">{p.role}</p>
                    <p className="mt-1 text-[12px] leading-snug text-muted">{p.does}</p>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
