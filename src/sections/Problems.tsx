import { TrendingDown, Users, Target, AlertTriangle, ListX, UserX } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { problems } from "@/content/site.en";

const ICONS = [TrendingDown, Users, Target, AlertTriangle, ListX, UserX];

export function Problems() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>{problems.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{problems.h2}</h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_40px_-24px_rgba(12,12,11,0.16)]">
                  <Icon size={20} className="text-accent" strokeWidth={2} />
                  <h3 className="mt-4 text-[17px] font-bold text-fg">{item.title}</h3>
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
