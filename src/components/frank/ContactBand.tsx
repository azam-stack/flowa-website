import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { home } from "@/content/frank/home";
import { asset } from "@/lib/asset";
import { FrankAvatar, type FrankPose } from "./FrankAvatar";
import { Calendar, Check } from "./Icons";
import { SITE_CONFIG } from "@/config/site";
import { track } from "@/lib/analytics";
import { Sphere } from "./Sphere";
import { ShortForm } from "./ShortForm";

/**
 * Contact band (brief §4.10, design upgrade §2): ink-dark on the silk
 * backdrop, the H2, sub and three promises on the left, the form on a
 * white card on the right with an orange focus ring. On /demo
 * and /contact the same band is the page, with Frank waving (pose b).
 */
export function ContactBand({ h2 = home.contact.h2, sub = home.contact.sub, pose, idPrefix = "contact", id = "contact", as: Heading = "h2", calendar }: { h2?: string; sub?: string; pose?: FrankPose; idPrefix?: string; id?: string; as?: "h1" | "h2"; calendar?: { cta: string; note: string; orForm: string } }) {
  return (
    <section id={id} className="contact-dark relative overflow-hidden bg-ink py-section-m text-white lg:py-section" aria-label={h2}>
      <img src={asset("images/backgrounds/silk-dark.webp")} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80" aria-hidden="true" />
      <span className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
      <Sphere size={130} tint={1} mark className="absolute -bottom-10 right-[3%] hidden opacity-90 lg:block" rotate={-14} duration={8} />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {pose && <FrankAvatar pose={pose} className="mb-8 h-44 w-44 rounded-frame border border-white/30" />}
            <Heading className="text-h2 text-white">{h2}</Heading>
            <p className="mt-4 max-w-lead text-sub text-white/75">{sub}</p>
            {calendar && (
              <div className="mt-8">
                <a href={SITE_CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_click", { label: "book_call_calendar" })} className="btn h-14 bg-brand px-7 text-[17px] text-ink hover:bg-brand-strong">
                  <Calendar size={18} /> {calendar.cta}
                </a>
                <p className="mt-3 text-small text-white/70">{calendar.note}</p>
                <p className="mt-6 text-[15px] text-white/85">{calendar.orForm}</p>
              </div>
            )}
            <ul className="mt-8 flex flex-col gap-3 text-[15px] text-white/85">
              {home.contact.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-brand text-ink">
                    <Check size={13} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="relative rounded-frame bg-white p-5 text-ink shadow-lift md:p-8">
            <ShortForm idPrefix={idPrefix} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
