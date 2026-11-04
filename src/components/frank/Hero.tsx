import { useRef } from "react";
import { Container } from "@/components/Container";
import { SmartLink } from "@/components/SmartLink";
import { home } from "@/content/frank/home";
import { track } from "@/lib/analytics";
import { HalftoneField, paintLogo } from "./HalftoneField";
import { useOrangeTop } from "./useOrangeTop";

/**
 * Homepage hero: a tangerine wall. The headline, one paragraph, two pill
 * actions and the proof line on the left; Flowa's "o" on the right,
 * printed as a field of white halftone dots that part around the pointer
 * and darken as they are pushed. Click and a ring runs through it. The
 * nav sits transparent on top of the orange, like the reference pages.
 */
export function Hero() {
  const h = home.hero;
  const section = useRef<HTMLElement>(null);
  useOrangeTop();
  return (
    <section ref={section} className="relative -mt-[72px] overflow-hidden bg-brand pt-[72px] text-white" aria-label="Introduction">
      <HalftoneField
        ink={[252, 255, 255]}
        warm={[20, 8, 0]}
        dotGap={7}
        radius={110}
        grain={0.35}
        listenOn={section}
        paint={(ctx, w, hh) => {
          const phone = w < 900;
          paintLogo(ctx, w, hh, phone ? 0.5 : 0.76, phone ? 0.87 : 0.52, phone ? 0.22 : 0.78, phone ? 0.8 : 0.42);
        }}
      />
      <Container>
        <div className="relative z-[1] grid min-h-[calc(100svh-72px)] items-center gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-[640px]">
            <p className="mono-label mb-6 text-white/80">B2B appointment setting · UK</p>
            <h1 className="text-h1 text-white">
              <span className="block">{h.h1Light.trim()}</span>
              <span className="block text-[#1a0a00]/80">{h.h1Bold}</span>
            </h1>
            <p className="mt-7 max-w-[560px] text-[18px] leading-relaxed text-white/90 md:text-[20px]">{h.sub}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <SmartLink href={h.demoHref} className="btn btn-dark h-14 px-7 text-[16px]" onClick={() => track("cta_click", { label: "hero_book_call" })}>
                {h.demo}
              </SmartLink>
              <SmartLink href={h.secondaryHref} className="btn btn-ghost-light h-14 px-7 text-[16px]" onClick={() => track("cta_click", { label: "hero_see_how" })}>
                {h.secondary}
              </SmartLink>
            </div>
            <ul className="mt-14 flex max-w-[640px] flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/25 pt-7" aria-label="Flowa's own numbers">
              {h.proof.map((p) => (
                <li key={p.label} className="flex items-baseline gap-2">
                  <span className="text-[26px] font-medium leading-none tracking-[-0.02em] text-white md:text-[30px]">{p.value}</span>
                  <span className="text-[14px] text-white/75">{p.label}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* the "o" lives in the canvas; this keeps the column's height on phones */}
          <div className="h-[64vw] max-h-[420px] lg:h-auto lg:max-h-none" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}
