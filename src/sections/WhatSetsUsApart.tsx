import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { LinkButton } from "@/components/Button";
import { TeamPortrait } from "@/components/TeamPortrait";
import { whatSetsUsApart, team } from "@/content/site.en";

export function WhatSetsUsApart() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-14 xl:gap-20">
          <Reveal className="flex flex-col xl:sticky xl:top-32 xl:self-start">
            <div className="order-1 xl:order-3 xl:mt-8">
              <TeamPortrait name={team.ahmed.firstName} role={team.ahmed.role} srcBase={team.ahmed.photoBase} />
            </div>
            <div className="order-2 mt-8 xl:order-1 xl:mt-0">
              <SectionLabel>{whatSetsUsApart.eyebrow}</SectionLabel>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{whatSetsUsApart.h2}</h2>
            </div>
            <p className="order-3 mt-4 max-w-md text-[17px] leading-relaxed text-muted xl:order-2">{whatSetsUsApart.intro}</p>
            <div className="order-4 mt-8">
              <LinkButton href="#contact" variant="accent">
                {whatSetsUsApart.cta}
              </LinkButton>
              <p className="mt-3 text-sm text-muted">{whatSetsUsApart.ctaCaption}</p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {whatSetsUsApart.blocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 80}>
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-bold text-fg">{block.title}</h3>
                  <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted">{block.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
