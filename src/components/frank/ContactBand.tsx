import { SmartLink } from "@/components/SmartLink";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { FrankAvatar, type FrankPose } from "./FrankAvatar";
import { Calendar, Check } from "./Icons";
import { KineticField } from "./KineticField";
import { SITE_CONFIG } from "@/config/site";
import { track } from "@/lib/analytics";
import { ShortForm } from "./ShortForm";

/**
 * Contact band (brief §4.10, design upgrade §2): ink-dark on the silk
 * backdrop, the H2, sub and three promises on the left, the form on a
 * white card on the right with an orange focus ring. On /demo
 * and /contact the same band is the page, with Frank waving (pose b).
 */
export function ContactBand({ h2 = home.contact.h2, sub = home.contact.sub, pose, idPrefix = "contact", id = "contact", as: Heading = "h2", calendar }: { h2?: string; sub?: string; pose?: FrankPose; idPrefix?: string; id?: string; as?: "h1" | "h2"; calendar?: { cta: string; note: string; orForm: string } }) {
  return (
    <section id={id} className="contact-dark relative overflow-hidden bg-brand py-section-m text-white lg:py-section" aria-label={h2}>
      <KineticField className="opacity-90 mix-blend-soft-light" strands={200} pinch={0.5} color="255, 255, 255" intensity={3} glow={false} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/0 via-brand/0 to-[#c84200]/60" aria-hidden="true" />
            <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {pose && <FrankAvatar pose={pose} className="mb-8 h-44 w-44 rounded-frame border border-white/30" />}
            <Heading className="text-h2 text-white">{h2}</Heading>
            <p className="mt-4 max-w-lead text-sub text-white/85">{sub}</p>
            {calendar && (
              <div className="mt-8">
                <SmartLink href={SITE_CONFIG.bookCallHref} onClick={() => track("cta_click", { label: "book_call_calendar" })} className="btn btn-primary h-14 px-7 text-[17px]">
                  <Calendar size={18} /> {calendar.cta}
                </SmartLink>
                <p className="mt-3 text-small text-white/70">{calendar.note}</p>
                <p className="mt-6 text-[15px] text-white/85">{calendar.orForm}</p>
              </div>
            )}
            <ul className="mt-8 flex flex-col gap-3 text-[15px] text-white">
              {home.contact.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white text-brand">
                    <Check size={13} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="relative rounded-[20px] border border-black/30 bg-page p-5 text-ink shadow-lift md:p-8">
            <ShortForm idPrefix={idPrefix} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
