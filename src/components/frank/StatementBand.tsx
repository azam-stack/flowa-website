import { SITE_CONFIG } from "@/config/site";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Btn } from "./Btn";
import { SectionHeading, Section } from "./SectionHeading";
import { SparkleGrid } from "./SparkleGrid";
import { Sphere, SphereGroup } from "./Sphere";

type Placed = Parameters<typeof SphereGroup>[0]["items"];

/**
 * Statement band (brief §4.4, §4.7): an 80px weight-300 headline on the
 * left with the black CTA on the right, one orange sphere half-cropped
 * above it, then a full-width grid band with a layered product vignette on
 * the left and floating Flowa "o" shapes on the right, and an optional caption.
 */
export function StatementBand({ headline, cta, ctaHref = SITE_CONFIG.bookingUrl, illustration, spheres, caption, trackLabel }: { headline: string; cta: string; ctaHref?: string; illustration: ReactNode; spheres: Placed; caption?: string; trackLabel: string }) {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden pt-10">
          <Sphere size={96} tint={1} mark className="absolute left-[46%] -top-12" duration={7.5} rotate={-10} />
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-statement max-w-[12ch] text-ink md:max-w-[20ch]">{headline}</h2>
            <Btn href={ctaHref} size="lg" trackLabel={trackLabel} className="self-start md:self-end">
              {cta}
            </Btn>
          </Reveal>
        </div>
        <Reveal delay={80} className="relative mt-10 min-h-[340px] overflow-hidden rounded-frame border border-ink bg-page md:mt-14 md:min-h-[420px]">
          <SparkleGrid />
          <div className="absolute left-5 top-1/2 w-[72%] max-w-[300px] -translate-y-1/2 md:left-14 md:max-w-[440px]">{illustration}</div>
          <div className="absolute inset-y-0 right-0 w-[48%]">
            <SphereGroup items={spheres} />
          </div>
        </Reveal>
        {caption && <p className="mt-5 text-small text-muted md:mt-6">{caption}</p>}
      </Container>
    </Section>
  );
}

/** Final CTA band (brief §4.12): centred H2, eyebrow and the black button. */
export function FinalCta({ eyebrow, h2, cta, ctaHref = SITE_CONFIG.bookingUrl, trackLabel }: { eyebrow?: string; h2: string; cta: string; ctaHref?: string; trackLabel: string }) {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={h2}>
          <div className="mt-8">
            <Btn href={ctaHref} size="lg" trackLabel={trackLabel}>
              {cta}
            </Btn>
          </div>
        </SectionHeading>
      </Container>
    </Section>
  );
}
