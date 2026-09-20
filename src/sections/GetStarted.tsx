import { Mail, Linkedin } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/Section";
import { Accordion } from "@/components/Accordion";
import { Card } from "@/components/Card";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { faq, finalCta, footer, team } from "@/content/site.en";
import { asset } from "@/lib/asset";
import { track } from "@/lib/analytics";

/**
 * Section 9 — "what am I unsure about, and how do I start?" FAQ on the
 * left, the one lead form on the right (components/LeadForm). Two ids
 * live here: `faq` (the section) and `contact` (the form), so both nav
 * links still land.
 */
export function GetStarted() {
  return (
    <Section id="faq">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeader title={faq.h2} />
            <Reveal delay={120} variant="near" className="mt-6 md:mt-8">
              <Accordion className="stagger" items={faq.items.map((f) => ({ title: f.q, body: f.a, link: "link" in f ? f.link : undefined }))} onOpen={(item) => track("faq_open", { question: item.title })} />
            </Reveal>
          </div>

          <Reveal delay={160} variant="surface" threshold={0.15} id="contact" className="scroll-mt-24">
            <Card className="p-5 sm:p-7 md:p-9">
              <h2 className="text-h3 text-fg sm:text-[26px]">{finalCta.h2}</h2>
              <p className="mt-2 text-body text-muted">{finalCta.body}</p>
              <div className="mt-6 md:mt-7">
                <LeadForm compact />
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 md:mt-8 md:gap-4 md:pt-6">
                <div className="flex items-center gap-3.5">
                  <picture>
                    <source srcSet={`${asset(team.ahmed.photoBase)}.avif`} type="image/avif" />
                    <source srcSet={`${asset(team.ahmed.photoBase)}.webp`} type="image/webp" />
                    <img src={`${asset(team.ahmed.photoBase)}.jpg`} alt={`${team.ahmed.firstName}, ${team.ahmed.role}`} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover grayscale" />
                  </picture>
                  <p className="text-small font-medium text-fg">{finalCta.responsePromise}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a href={`mailto:${finalCta.email}`} className="flex items-center gap-2 text-small font-medium text-fg hover:text-accent-hover">
                    <Mail size={16} className="text-muted" aria-hidden="true" />
                    {finalCta.email}
                  </a>
                  {footer.linkedinUrl && (
                    <a href={footer.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-small font-medium text-fg hover:text-accent-hover">
                      <Linkedin size={16} className="text-muted" aria-hidden="true" />
                      {finalCta.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
