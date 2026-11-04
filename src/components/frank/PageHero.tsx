import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { KineticField } from "./KineticField";

/** A sub-page hero: black, a quieter tangerine field behind a centred two-tone H1 and the sub, with an optional right-hand slot. */
export function PageHero({ light, bold, sub, aside, children }: { light: string; bold: string; sub?: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <KineticField className="opacity-60" strands={110} pinch={0.4} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-page" aria-hidden="true" />
      <Container>
        <div className={`relative z-[1] grid gap-10 px-2 pb-16 pt-20 md:pb-20 md:pt-28 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}>
          <div className={aside ? "" : "mx-auto max-w-[880px] text-center"}>
            <h1 className="tt text-h1">
              <span className="block">{light.trim()}</span>
              <span className="dim block">{bold}</span>
            </h1>
            {sub && <p className={`mt-6 max-w-[640px] text-[18px] leading-relaxed text-ink-2 md:text-[20px] ${aside ? "" : "mx-auto"}`}>{sub}</p>}
            {children}
          </div>
          {aside && <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
