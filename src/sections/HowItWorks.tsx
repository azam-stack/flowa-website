import { useEffect, useRef, useState } from "react";
import { Check, Mail, Phone, MessageSquare } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { howItWorks } from "@/content/site.en";

type Step = (typeof howItWorks.steps)[number];

/**
 * The next state of the same system: four steps on one line that draws
 * itself, each with a small stylised interface — the kind of thing the
 * step produces (a chosen company, an activity log, three criteria met,
 * a calendar slot). Illustrative, and the section says so.
 */
function StepUI({ ui, i, drawn }: { ui: Step["ui"]; i: number; drawn: boolean }) {
  const base = "rounded-field border border-border bg-card p-3 text-[12px] leading-tight";
  const delay = { transitionDelay: drawn ? `${500 + i * 160}ms` : "0ms" };
  if (ui.kind === "chips") {
    return (
      <div className={`${base} flex flex-wrap gap-1.5`}>
        {ui.items.map((item, k) => (
          <span key={item} className={`rounded-full px-2.5 py-1 transition-colors duration-slow ${drawn && k === ui.active ? "bg-fg text-bg" : "bg-fg/[0.05] text-muted"}`} style={delay}>
            {item}
          </span>
        ))}
      </div>
    );
  }
  if (ui.kind === "activity") {
    const icons = [Mail, Phone, MessageSquare];
    return (
      <ul className={`${base} flex flex-col gap-2`}>
        {ui.items.map((item, k) => {
          const Icon = icons[k % icons.length];
          return (
            <li key={item} className={`flex items-center gap-2 text-fg transition-opacity duration-slow ${drawn ? "opacity-100" : "opacity-40"}`} style={{ transitionDelay: drawn ? `${500 + i * 160 + k * 120}ms` : "0ms" }}>
              <Icon size={13} className="shrink-0 text-muted" aria-hidden="true" />
              {item}
            </li>
          );
        })}
      </ul>
    );
  }
  if (ui.kind === "checks") {
    return (
      <ul className={`${base} flex flex-col gap-2`}>
        {ui.items.map((item, k) => (
          <li key={item} className="flex items-center gap-2 text-fg">
            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-slow ${drawn ? "bg-accent text-accent-fg" : "bg-fg/[0.08] text-transparent"}`} style={{ transitionDelay: drawn ? `${500 + i * 160 + k * 140}ms` : "0ms" }}>
              <Check size={10} strokeWidth={3} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={`${base} flex items-center justify-between gap-3`}>
      <span className="text-muted">
        {ui.items[0]}
        <span className="mx-1.5 text-border">·</span>
        {ui.items[1]}
      </span>
      <span className={`rounded-full px-2.5 py-1 font-semibold transition-colors duration-slow ${drawn ? "bg-accent text-accent-fg" : "bg-fg/[0.05] text-muted"}`} style={delay}>
        {ui.items[2]}
      </span>
    </div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader title={howItWorks.h2} align="center" />

        <div ref={ref} data-inview={drawn ? "true" : "false"} className="relative mt-12 lg:mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px lg:block" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ width: drawn ? "100%" : "0%" }} />
          </div>
          <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px lg:hidden" aria-hidden="true">
            <div className="h-full bg-border" />
            <div className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-[900ms] ease-flowa motion-reduce:transition-none" style={{ height: drawn ? "100%" : "0%" }} />
          </div>

          <ol className="stagger relative grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8" style={{ "--delay": "200ms" } as React.CSSProperties}>
            {howItWorks.steps.map((step, i) => (
              <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4 lg:block">
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[13px] font-bold transition-[background-color,border-color,color] duration-fast ease-out motion-reduce:transition-none ${
                    drawn ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-muted"
                  }`}
                  style={{ transitionDelay: drawn ? `${300 + i * 140}ms` : "0ms" }}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div className="lg:mt-7">
                  <div className="max-w-[300px]" aria-hidden="true">
                    <StepUI ui={step.ui} i={i} drawn={drawn} />
                  </div>
                  <h3 className="mt-5 text-h3 text-fg">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-body text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-[12px] text-muted">{howItWorks.illustrative}</p>
        </div>
      </Container>
    </Section>
  );
}
