import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { FluidObject } from "@/components/FluidObject";
import { hero } from "@/content/site.en";
import { PipelineVisual } from "./PipelineVisual";

/**
 * Section 1 — the signature experience. Left: the brand statement, set
 * large, with a system label above and the two calls to action below.
 * Right: the living glass object (WebGL) with the pipeline interface
 * layered over it; the interface moves slightly independently on scroll.
 *
 * Entrance (index.css → Hero): the object forms first (blur → sharp),
 * then label, headline lines out of their masks, lead, calls to action;
 * the interface settles in last. Everything lands by ~1.5 s, after which
 * only the object keeps moving.
 */
const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="min-w-0">
            <p className="flex items-center gap-3">
              <span className="hero-rule h-px w-6 shrink-0 bg-accent" style={T(0)} aria-hidden="true" />
              <span className="sys hero-rise" style={T(40)}>
                {hero.system}
              </span>
            </p>
            <h1 className="mt-5 text-display text-[color:var(--flowa-text)]" data-hero-h1>
              <span className="hero-mask">
                <span className="hero-line" style={T(120)}>
                  {hero.h1[0]}
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line text-accent-display" style={T(210)}>
                  {hero.h1[1]}
                </span>
              </span>
            </h1>
            <p className="hero-blur mt-6 max-w-lead text-lead text-[#4A4744] md:mt-7" style={T(420)}>
              {hero.sub}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
              <div className="hero-rise" style={T(560)}>
                <LinkButton id="hero-cta" href="#contact" variant="primary" size="lg" arrow magnetic className="w-full sm:w-auto">
                  {hero.ctaPrimary}
                </LinkButton>
              </div>
              <div className="hero-rise" style={T(620)}>
                <LinkButton href="#how-it-works" variant="ghost" size="lg" className="w-full sm:w-auto">
                  {hero.ctaSecondary}
                </LinkButton>
              </div>
            </div>
            <div className="hero-rise mt-7 flex flex-col gap-1.5 text-small text-muted md:mt-8" style={T(740)}>
              <p>{hero.reassurance}</p>
              <p>{hero.foundedBy}</p>
            </div>
          </div>

          <div className="relative pt-40 sm:pt-40 lg:pt-44">
            <div className="hero-blur absolute -right-20 -top-20 h-[400px] w-[400px] sm:-right-24 sm:-top-20 sm:h-[520px] sm:w-[520px] lg:-right-40 lg:-top-24 lg:h-[760px] lg:w-[760px]" style={T(0)}>
              <FluidObject className="parallax parallax-slow h-full w-full" />
            </div>
            <div className="hero-surface parallax relative" style={T(360)}>
              <PipelineVisual />
            </div>
            <p className="hero-rise mt-4 max-w-md text-[13px] leading-relaxed text-muted" style={T(900)}>
              {hero.pipeline.caption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
