import { X, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

const NOT_PAY_FOR = ["Leads der aldrig svarer", "Tilfældige kontakter", "Meningsløse lister", "Aktivitet for aktivitetens skyld"];
const PAY_FOR = ["Kvalificerede B2B-møder", "Relevante beslutningstagere", "Reel interesse", "Møder der lever op til de aftalte kriterier"];

export function Differentiator() {
  return (
    <section className="bg-ink py-24 text-ink-fg md:py-32">
      <Container>
        <Reveal>
          <SectionLabel dark>Forretningsmodel</SectionLabel>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            No cure. No pay.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-muted">
            Flowa får kun betaling for de kvalificerede møder, vi leverer. Ingen møder, ingen regning — det er så
            enkelt.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">I betaler ikke for</p>
              <ul className="mt-5 space-y-4">
                {NOT_PAY_FOR.map((item) => (
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">I betaler for</p>
              <ul className="mt-5 space-y-4">
                {PAY_FOR.map((item) => (
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
