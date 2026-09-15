import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { FluidObject } from "@/components/FluidObject";
import { FlowSystem } from "@/components/FlowSystem";
import { hero } from "@/content/site.en";

/**
 * The signature moment. Three parts, recomposed by screen size:
 *   heading · visual · explanation + calls to action
 * Desktop: heading and explanation stacked on the left, the visual on
 * the right spanning both rows. Mobile: heading, then the visual, then
 * the explanation and the primary call to action.
 *
 * The visual is one system: the light-form (WebGL), the flow of states
 * an opportunity passes through (FlowSystem) and, where the flow ends,
 * one qualified meeting as a physical card.
 */
const T = (ms: number) => ({ "--t": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const m = hero.card.meeting;
  return (
    <section id="top" className="atmosphere relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40 lg:pt-44">
      <Container className="relative z-[2]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-[auto_auto] lg:items-center">
          {/* heading */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="flex items-center gap-3 text-eyebrow text-muted">
              <span className="hero-rule h-px w-6 shrink-0 bg-accent" style={T(0)} aria-hidden="true" />
              <span className="hero-rise" style={T(40)}>
                {hero.eyebrow}
              </span>
            </p>
            <h1 className="mt-6 text-display text-[color:var(--flowa-text)]" data-hero-h1>
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
          </div>

          {/* visual system */}
          <div className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[560px] lg:justify-self-end">
            {/* the light-form: background for the flow, not the subject */}
            <div className="hero-blur absolute -right-[4%] top-[2%] h-[78%] w-[78%] opacity-75" style={T(0)}>
              <FluidObject className="parallax parallax-slow h-full w-full" />
            </div>
            <FlowSystem />
            <div className="hero-surface flow-end absolute bottom-[6%] left-0 z-[3] w-[min(300px,80%)] rounded-card border border-border p-5 shadow-float backdrop-blur-md sm:p-6" style={{ ...T(700), background: "var(--surface-glass-strong)" }}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-medium text-muted">
                  <span className="text-fg">{hero.flow.end}</span>
                  <span aria-hidden="true"> · </span>
                  {hero.flow.note}
                </span>
                <Badge variant="accent">{m.tag}</Badge>
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-fg">{m.company}</p>
              <p className="mt-1 text-[13px] text-muted">{m.role}</p>
              <p className="mt-3 text-[13px] font-medium text-fg/70">{m.when}</p>
            </div>
          </div>

          {/* explanation + calls to action */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            <p className="hero-blur max-w-lead text-lead text-[#4A4744]" style={T(420)}>
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
            <p className="hero-rise mt-7 text-small text-muted md:mt-9" style={T(740)}>
              {hero.reassurance}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
