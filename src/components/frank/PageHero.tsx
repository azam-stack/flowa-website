import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { SparkleGrid } from "./SparkleGrid";

/** A sub-page hero: the framed card with the sparkle grid, the H1 (light with a bold phrase) and the sub, with an optional right-hand slot. */
export function PageHero({ light, bold, sub, aside, children }: { light: string; bold: string; sub?: string; aside?: ReactNode; children?: ReactNode }) {
  return (
    <section className="pt-5 md:pt-8">
      <Container>
        <div className="framed relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%)" }}>
          <SparkleGrid fade />
          <div className={`relative z-[1] grid gap-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 ${aside ? "lg:grid-cols-[1.2fr_1fr] lg:items-center" : ""}`}>
            <div className={aside ? "" : "mx-auto max-w-[820px] text-center"}>
              <h1 className="text-h1 text-ink">
                {light}
                <span className="font-semibold">{bold}</span>
              </h1>
              {sub && <p className={`mt-5 max-w-[620px] text-sub text-ink-2 ${aside ? "" : "mx-auto"}`}>{sub}</p>}
              {children}
            </div>
            {aside && <div className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:justify-self-end">{aside}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
