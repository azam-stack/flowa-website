import { useRef } from "react";
import { Container } from "@/components/Container";
import { SmartLink } from "@/components/SmartLink";
import { home } from "@/content/frank/home";
import { track } from "@/lib/analytics";
import { HalftoneField, paintWordmark } from "./HalftoneField";
import { useOrangeTop } from "./useOrangeTop";

/**
 * Homepage hero: the tangerine wall, with depth (a warm light from the
 * top-left, a deeper fall-off at the edges, fine grain). Centred headline,
 * one paragraph, two pill actions and the proof line. Along the bottom,
 * "flowa" set enormous and cropped by the edge, printed as white halftone
 * dots that part around the pointer and turn acid lime as they are pushed.
 */
export function Hero() {
  const h = home.hero;
  const section = useRef<HTMLElement>(null);
  useOrangeTop();
  return (
    <section ref={section} className="wall -mt-[72px] overflow-hidden pt-[72px] text-white" aria-label="Introduction">
      <HalftoneField ink={[252, 255, 255]} warm={[200, 253, 3]} dotGap={6} radius={110} grain={0} listenOn={section} paint={(ctx, w, hh) => paintWordmark(ctx, w, hh, "flowa", 0.34, 0.94)} />
      <Container>
        <div className="relative z-[1] mx-auto flex min-h-[calc(100svh-72px)] max-w-[900px] flex-col items-center pb-[30vh] pt-16 text-center md:pt-24 lg:justify-center lg:pb-[34vh]">
          <p className="mono-label mb-6 text-lime">B2B appointment setting · UK</p>
          <h1 className="text-h1 text-white">
            <span className="block">{h.h1Light.trim()}</span>
            <span className="block text-[#2a0d00]/80">{h.h1Bold}</span>
          </h1>
          <p className="mt-7 max-w-[620px] text-[18px] leading-relaxed text-white/90 md:text-[20px]">{h.sub}</p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <SmartLink href={h.demoHref} className="btn btn-dark h-14 px-7 text-[16px]" onClick={() => track("cta_click", { label: "hero_book_call" })}>
              {h.demo}
            </SmartLink>
            <SmartLink href={h.secondaryHref} className="btn btn-ghost-light h-14 px-7 text-[16px]" onClick={() => track("cta_click", { label: "hero_see_how" })}>
              {h.secondary}
            </SmartLink>
          </div>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/25 pt-7" aria-label="Flowa's own numbers">
            {h.proof.map((p) => (
              <li key={p.label} className="flex items-baseline gap-2">
                <span className="text-[26px] font-medium leading-none tracking-[-0.02em] text-white md:text-[30px]">{p.value}</span>
                <span className="text-[14px] text-white/75">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
