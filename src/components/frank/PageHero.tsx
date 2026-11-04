import { useRef, type ReactNode } from "react";
import { Container } from "@/components/Container";
import { HalftoneField, paintLogo } from "./HalftoneField";
import { useOrangeTop } from "./useOrangeTop";

/** A sub-page hero: the tangerine wall with the two-tone H1 on the left, the sub, an optional right-hand slot, and the halftone "o" fading in from the right edge. */
export function PageHero({ light, bold, sub, aside, children }: { light: string; bold: string; sub?: string; aside?: ReactNode; children?: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  useOrangeTop();
  return (
    <section ref={section} className="relative -mt-[72px] overflow-hidden bg-brand pt-[72px] text-white">
      {!aside && <HalftoneField ink={[252, 255, 255]} warm={[20, 8, 0]} dotGap={7} radius={100} grain={0.3} listenOn={section} paint={(ctx, w, h) => paintLogo(ctx, w, h, w < 900 ? 0.5 : 0.88, w < 900 ? 1.05 : 0.62, w < 900 ? 0.5 : 0.95, 0.34)} />}
      <Container>
        <div className={`relative z-[1] grid gap-10 py-16 md:py-24 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}>
          <div className="max-w-[760px]">
            <h1 className="text-h1 text-white">
              <span className="block">{light.trim()}</span>
              <span className="block text-[#1a0a00]/80">{bold}</span>
            </h1>
            {sub && <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-white/90 md:text-[20px]">{sub}</p>}
            {children}
          </div>
          {aside && <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
