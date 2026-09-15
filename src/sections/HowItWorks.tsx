import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { howItWorks } from "@/content/site.en";

/**
 * Section 5. Four steps in one row, no cards. One line runs behind the
 * step numbers and is drawn left-to-right when the section scrolls into
 * view; the numbers fill in turn. On mobile the line runs vertically.
 */
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader eyebrow={howItWorks.eyebrow} title={howItWorks.h2} />

        <div ref={ref} className="relative mt-10 lg:mt-14">
          {/* Desktop connector: one line behind the numbers, drawn on reveal */}
          <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px lg:block" aria-hidden="true">
            <div className="h-full bg-border" />
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[600ms] ease-flowa motion-reduce:transition-none"
              style={{ width: drawn ? "100%" : "0%" }}
            />
          </div>
          {/* Mobile connector: vertical line down the left */}
          <div className="pointer-events-none absolute bottom-5 left-5 top-5 w-px lg:hidden" aria-hidden="true">
            <div className="h-full bg-border" />
            <div
              className="absolute inset-x-0 top-0 bg-accent transition-[height] duration-[600ms] ease-flowa motion-reduce:transition-none"
              style={{ height: drawn ? "100%" : "0%" }}
            />
          </div>

          <ol className="relative grid grid-cols-1 gap-7 lg:grid-cols-4 lg:gap-8">
            {howItWorks.steps.map((step, i) => (
              <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4 lg:block">
                <span
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border text-[15px] font-bold transition-[background-color,border-color,color] duration-fast ease-out motion-reduce:transition-none ${
                    drawn ? "border-accent bg-accent text-accent-fg" : "border-border bg-bg text-muted"
                  }`}
                  style={{ transitionDelay: drawn ? `${200 + i * 80}ms` : "0ms" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="lg:mt-6">
                  <h3 className="text-h3 text-fg">{step.title}</h3>
                  <p className="mt-2 text-body text-muted lg:mt-2.5">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
