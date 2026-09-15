import { Section, SectionHeader, Container } from "../Section";
import { LinkButton } from "../Button";
import { Reveal } from "../Reveal";
import { SmartLink } from "../SmartLink";
import { packages, pricingOverview, gbp, ongoingLabel } from "@/content/pricing";

/** The home page's pricing section: the four packages at a glance, one link to /pricing. Reads the same data as the pricing page. */
export function PricingOverview() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeader eyebrow={pricingOverview.eyebrow} title={pricingOverview.h2} lead={pricingOverview.body} />
        <Reveal delay={120} stagger className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {packages.map((p) => (
            <SmartLink key={p.id} href="/pricing" className={`group relative flex flex-col rounded-card border p-5 transition-[transform,border-color] duration-[240ms] ease-flowa hover:-translate-y-0.5 motion-reduce:transition-none ${p.recommended ? "border-accent/60 bg-accent/[0.06] hover:border-accent" : "border-border bg-card hover:border-fg"}`}>
              {p.badge && <span className={`absolute left-5 top-0 -translate-y-1/2 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${p.recommended ? "bg-accent text-fg" : "border border-border bg-bg text-fg"}`}>{p.badge}</span>}
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{p.name}</p>
              <p className="mt-2 text-[22px] font-extrabold tracking-[-0.02em] text-fg">{ongoingLabel(p)}</p>
              <p className="mt-1 text-[13px] text-muted">
                {p.setup > 0 ? `${gbp(p.setup)} ${pricingOverview.setup} · ` : ""}
                {p.meetingsPerYear} meetings / year
              </p>
              <p className="mt-3 text-[14px] font-medium text-fg">{p.tagline}</p>
            </SmartLink>
          ))}
        </Reveal>
        <Reveal delay={240} className="mt-7">
          <LinkButton href="/pricing" variant="ghost" arrow>
            {pricingOverview.compare}
          </LinkButton>
        </Reveal>
      </Container>
    </Section>
  );
}
