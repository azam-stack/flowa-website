import { SITE_CONFIG } from "@/config/site";
import { useState } from "react";
import { Container } from "@/components/Container";
import { home } from "@/content/frank/home";
import { track } from "@/lib/analytics";
import { Btn } from "./Btn";
import { FrankCard } from "./FrankCard";
import { Play } from "./Icons";
import { HeroMeetingMini, HeroSignalMini } from "./Mocks";
import { SparkleGrid } from "./SparkleGrid";
import { SphereGroup, heroClusterLeft, heroClusterRight } from "./Sphere";
import { VideoModal } from "./VideoModal";

/**
 * Homepage hero (brief §4.1): a framed card with a white-to-page-bg
 * gradient, the sparkle grid, the sphere cluster cropped at both edges,
 * the H1 with its weight-600 key phrase, the sub, the black "Book a
 * demo" and the play-icon text button. Three cards overlap the bottom
 * edge (lifting in one by one): a cycling signal card, Frank playing his
 * idle loop in the centre, a meeting card. On
 * mobile the three become a horizontal swipe row with Frank first.
 */
function SideCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-card border border-ink bg-surface p-2 shadow-float">
      <div className="grid aspect-[4/3] min-w-0 place-items-center rounded-[10px] bg-soft p-3 lg:p-4">
        <div className="w-full min-w-0">{children}</div>
      </div>
      <div className="label-bar px-3 py-2 text-center text-[13px] font-medium">{label}</div>
    </div>
  );
}

export function Hero() {
  const [video, setVideo] = useState(false);
  const h = home.hero;
  return (
    <section className="pt-5 md:pt-8" aria-label="Introduction">
      <Container>
        <div className="relative">
          <div className="framed relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, var(--page-bg) 100%)" }}>
            <SparkleGrid fade />
            <div className="hidden md:block">
              <SphereGroup items={heroClusterLeft} />
              <SphereGroup items={heroClusterRight} />
            </div>
            <div className="relative z-[2] mx-auto max-w-[820px] px-5 pb-[220px] pt-14 text-center md:px-10 md:pb-[250px] md:pt-24">
              <h1 className="text-h1 text-ink">
                {h.h1Light}
                <span className="font-semibold">{h.h1Bold}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-[640px] text-sub text-ink-2">{h.sub}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Btn href={SITE_CONFIG.bookingUrl} size="lg" trackLabel="hero_book_demo">
                  {h.demo}
                </Btn>
                <button
                  type="button"
                  onClick={() => {
                    track("video_open");
                    setVideo(true);
                  }}
                  className="btn btn-text h-14 gap-3 px-4 text-[17px]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-ink bg-white">
                    <Play size={16} />
                  </span>
                  {h.video}
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-[3] -mt-[180px] md:-mt-[200px]">
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-4 pb-2 md:mx-auto md:grid md:max-w-[900px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] md:gap-5 md:overflow-visible md:px-6">
              <div className="lift-in w-[76vw] max-w-[320px] flex-none snap-center md:w-auto md:max-w-none" style={{ "--i": 0 } as React.CSSProperties}>
                <SideCard label={h.cards.left.label}>
                  <HeroSignalMini />
                </SideCard>
              </div>
              <div className="lift-in order-first w-[76vw] max-w-[340px] flex-none snap-center md:order-none md:w-auto md:max-w-none" style={{ "--i": 1 } as React.CSSProperties}>
                <FrankCard label={h.cards.centre.label} video eager className="shadow-lift" />
              </div>
              <div className="lift-in w-[76vw] max-w-[320px] flex-none snap-center md:w-auto md:max-w-none" style={{ "--i": 2 } as React.CSSProperties}>
                <SideCard label={h.cards.right.label}>
                  <HeroMeetingMini {...h.cards.right.mini} />
                </SideCard>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <VideoModal open={video} onClose={() => setVideo(false)} />
    </section>
  );
}
