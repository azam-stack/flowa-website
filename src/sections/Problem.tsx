import { TrendingDown, Users, ListX, AlertTriangle } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { problem } from "@/content/site.en";

const ICONS = [TrendingDown, Users, ListX, AlertTriangle];

export function Problem() {
  return (
    <section className="py-12 md:py-14">
      <Container>
        <Reveal>
          <SectionLabel>{problem.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{problem.h2}</h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problem.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <Icon size={20} className="text-accent" strokeWidth={2} />
                  <h3 className="mt-4 text-[16px] font-bold text-fg">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
