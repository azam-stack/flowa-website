import { X, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { differentiator } from "@/content/site.en";

export function Differentiator() {
  return (
    <section className="bg-ink py-24 text-ink-fg md:py-32">
      <Container>
        <Reveal>
          <SectionLabel dark>{differentiator.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{differentiator.h2}</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-muted">{differentiator.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">{differentiator.notPayFor.heading}</p>
              <ul className="mt-5 space-y-4">
                {differentiator.notPayFor.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-ink-fg/80">
                    <X size={18} className="mt-0.5 shrink-0 text-ink-muted" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-accent/30 bg-accent/[0.08] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{differentiator.payFor.heading}</p>
              <ul className="mt-5 space-y-4">
                {differentiator.payFor.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-ink-fg">
                    <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
