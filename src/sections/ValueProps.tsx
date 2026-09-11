import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { valueProps } from "@/content/site.en";

export function ValueProps() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionLabel>{valueProps.eyebrow}</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{valueProps.h2}</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">{valueProps.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.items.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <div className="group h-full bg-card p-7 transition-colors duration-300 hover:bg-fg hover:text-bg">
                <span className="text-sm font-bold text-accent">{item.n}</span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-bg/70">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
