import { ChevronDown } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";
import { pipelineSection } from "@/content/site.en";

// Illustrative narrowing only — no figures are implied or fabricated.
const WIDTHS = [100, 78, 56, 36];

export function PipelineFunnel() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>{pipelineSection.eyebrow}</SectionLabel>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{pipelineSection.h2}</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 flex max-w-lg flex-col items-center gap-2">
            {pipelineSection.stages.map((stage, i) => (
              <div key={stage} className="flex w-full flex-col items-center">
                <div
                  className="flex h-14 items-center justify-center rounded-2xl text-sm font-semibold text-accent-fg transition-all"
                  style={{ width: `${WIDTHS[i]}%`, backgroundColor: `rgba(238,158,71,${0.45 + i * 0.18})` }}
                >
                  {stage}
                </div>
                {i < pipelineSection.stages.length - 1 && <ChevronDown size={16} className="my-1.5 text-border" />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-muted">{pipelineSection.footnote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
