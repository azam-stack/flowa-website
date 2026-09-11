import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { howItWorks } from "@/content/site.en";

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>{howItWorks.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{howItWorks.h2}</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-1">
              {howItWorks.steps.map((step, i) => (
                <button
                  key={step.n}
                  onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active === i ? "bg-fg/[0.04] text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span className={`text-sm font-bold ${active === i ? "text-accent" : "text-muted"}`}>{step.n}</span>
                  <span className="text-sm font-semibold">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {howItWorks.steps.map((step, i) => (
              <div
                key={step.n}
                ref={(el) => (refs.current[i] = el)}
                className={`rounded-3xl border p-8 transition-all duration-300 md:p-10 ${
                  active === i ? "border-fg/15 bg-card shadow-[0_20px_40px_-24px_rgba(12,12,11,0.18)]" : "border-border bg-card/50"
                }`}
              >
                <span className="text-sm font-bold text-accent lg:hidden">{step.n}</span>
                <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-fg lg:mt-0">{step.title}</h3>
                <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
