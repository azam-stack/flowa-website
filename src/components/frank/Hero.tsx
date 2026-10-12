import { useState } from "react";
import { Container } from "@/components/Container";
import { SmartLink } from "@/components/SmartLink";
import { home } from "@/content/frank/home";
import { track } from "@/lib/analytics";
import { Btn } from "./Btn";
import { Play } from "./Icons";
import { SparkleGrid } from "./SparkleGrid";
import { SphereGroup, heroClusterLeft, heroClusterRight } from "./Sphere";
import { VideoModal } from "./VideoModal";

/**
 * Homepage hero: the buyer's problem first. One headline that names the
 * alternative (hiring an SDR) and the deal (pay per meeting that
 * happens), one paragraph on how, two actions and a proof line of our
 * own numbers. No mascot cards: the product is shown by the campaign
 * demo directly below, not by a character.
 */
export function Hero() {
  const [video, setVideo] = useState(false);
  const h = home.hero;
  return (
    <section className="pt-5 md:pt-8" aria-label="Introduction">
      <Container>
        <div className="framed relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%)" }}>
          <SparkleGrid fade />
          <div className="hidden md:block">
            <SphereGroup items={heroClusterLeft} />
            <SphereGroup items={heroClusterRight} />
          </div>
          <div className="relative z-[2] mx-auto max-w-[880px] px-5 pb-14 pt-14 text-center md:px-10 md:pb-20 md:pt-24">
            <h1 className="text-h1 text-ink">
              {h.h1Light}
              <span className="font-semibold">{h.h1Bold}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[680px] text-sub text-ink-2">{h.sub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Btn href={h.demoHref} size="lg" trackLabel="hero_snapshot">
                {h.demo}
              </Btn>
              <SmartLink href={h.secondaryHref} className="btn btn-text h-14 px-4 text-[17px]" onClick={() => track("cta_click", { label: "hero_see_campaign" })}>
                {h.secondary}
              </SmartLink>
            </div>
            <ul className="mx-auto mt-10 flex max-w-[720px] flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-ink/10 pt-7" aria-label="Flowa's own numbers">
              {h.proof.map((p) => (
                <li key={p.label} className="flex items-baseline gap-2">
                  <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-ink md:text-[32px]">{p.value}</span>
                  <span className="text-[14px] text-ink-2">{p.label}</span>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    track("video_open");
                    setVideo(true);
                  }}
                  className="flex items-center gap-2 text-[14px] font-medium text-ink underline-offset-4 hover:underline"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-ink bg-white">
                    <Play size={11} />
                  </span>
                  {h.video}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <VideoModal open={video} onClose={() => setVideo(false)} />
    </section>
  );
}
