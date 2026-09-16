import { Check } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { whoWeHelp } from "@/content/site.en";

/** Who Flowa is for, as a fit description: four conditions, one honest "less of a fit", and where meetings have been booked so far. */
export function WhoWeHelp() {
  return (
    <Section id="who-we-help">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <SectionHeader title={whoWeHelp.h2} lead={whoWeHelp.intro} />
            <Reveal delay={200} variant="near" className="mt-7 rounded-card border border-border bg-card p-5 md:mt-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">{whoWeHelp.soFarHeading}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {whoWeHelp.soFar.map((s) => (
                  <li key={s} className="rounded-full bg-fg/[0.05] px-3 py-1.5 text-[13px] font-medium text-fg">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={120} variant="near" className="lg:pt-2">
            <ul className="stagger divide-y divide-border border-y border-border">
              {whoWeHelp.fit.map((f) => (
                <li key={f.title} className="grid grid-cols-[2rem_1fr] gap-3 py-5">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent/[0.18]">
                    <Check size={13} className="text-accent-display" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-h3 text-fg">{f.title}</h3>
                    <p className="mt-1 text-body text-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-small text-muted">
              <span className="font-semibold text-fg">{whoWeHelp.lessHeading}: </span>
              {whoWeHelp.less}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
