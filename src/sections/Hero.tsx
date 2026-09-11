import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { SectionLabel } from "@/components/SectionLabel";
import { DecorativeBlob } from "@/components/DecorativeBlob";
import { hero } from "@/content/site.en";
import { PipelineVisual } from "./PipelineVisual";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[88vh] items-center overflow-hidden pb-14 pt-28 md:pt-32">
      <DecorativeBlob className="pointer-events-none absolute -bottom-24 -right-24 h-[520px] w-[520px] text-accent/[0.05]" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="min-w-0">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1
              className="mt-4 text-balance font-extrabold text-[color:var(--flowa-text)] [letter-spacing:-0.035em] [line-height:0.94] text-[clamp(2.2rem,11vw,6.5rem)] lg:whitespace-nowrap lg:text-[clamp(2.2rem,3.5vw,2.85rem)]"
              data-hero-h1
            >
              {hero.h1[0]}
              <br />
              <span className="text-accent-display" data-hero-line="1">
                {hero.h1[1]}
              </span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-[#4A4744]">{hero.sub}</p>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <LinkButton href="#contact" variant="accent">
                {hero.ctaPrimary}
              </LinkButton>
              <a href="#how-it-works" className="group inline-flex items-center text-[15px] font-semibold text-fg">
                <span className="border-b-[1.5px] border-transparent pb-0.5 transition-colors group-hover:border-fg">{hero.ctaSecondary}</span>
              </a>
            </div>
            <p className="mt-8 text-sm text-muted">{hero.reassurance}</p>
            <p className="mt-2 text-sm text-muted">{hero.foundedBy}</p>
          </div>

          <PipelineVisual />
        </div>
      </Container>
    </section>
  );
}
