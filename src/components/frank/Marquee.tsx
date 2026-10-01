import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { clients, type Client } from "@/content/frank/clients";
import { marquee } from "@/content/frank/chrome";
import { asset } from "@/lib/asset";

const PIXELS_PER_SECOND = 30;

/**
 * Logo marquee (brief §3.4): a small muted label, then the five client
 * logos in grayscale scrolling continuously (CSS transform only), paused
 * on hover or keyboard focus. Under prefers-reduced-motion the logos sit
 * in a static row. Track width is measured from the DOM so the loop is
 * seamless whatever the logos' rendered widths.
 */
export function Marquee({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [setsPerHalf, setSetsPerHalf] = useState(3);
  const [duration, setDuration] = useState(30);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(() => (typeof document === "undefined" ? false : document.hidden));
  const [paused, setPaused] = useState(false);

  const recalc = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const perSet = clients.length;
    const oneSet = Array.from(track.children).slice(0, perSet) as HTMLElement[];
    if (oneSet.length < perSet) return;
    const gapPx = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const setWidth = oneSet.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + gapPx * perSet;
    if (setWidth <= 0) return;
    const needed = Math.max(1, Math.ceil((window.innerWidth * 1.5) / setWidth));
    setSetsPerHalf(needed);
    setDuration((setWidth * needed) / PIXELS_PER_SECOND);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion) return;
    recalc();
    let timeout: number;
    const onResize = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(recalc, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timeout);
    };
  }, [reducedMotion, recalc, setsPerHalf]);

  if (reducedMotion) {
    return (
      <section aria-label={marquee.heading} className={`py-10 md:py-12 ${className}`}>
        <p className="mb-7 text-center text-small text-muted">{marquee.heading}</p>
        <div className="mx-auto flex max-w-container flex-wrap items-center justify-center gap-x-12 gap-y-6 px-4 md:gap-x-16">
          {clients.map((c) => (
            <LogoLink key={c.slug} client={c} />
          ))}
        </div>
      </section>
    );
  }

  const running = inView && !tabHidden && !paused;
  return (
    <section aria-label={marquee.heading} className={`py-10 md:py-12 ${className}`}>
      <p className="mb-6 text-center text-small text-muted">{marquee.heading}</p>
      <div
        ref={containerRef}
        className="overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-14 md:gap-20"
          style={{ animationName: "marquee-scroll", animationDuration: `${duration.toFixed(2)}s`, animationTimingFunction: "linear", animationIterationCount: "infinite", animationPlayState: running ? "running" : "paused", willChange: "transform" }}
        >
          {Array.from({ length: setsPerHalf * 2 }, (_, set) => clients.map((c) => <LogoLink key={`${set}-${c.slug}`} client={c} ariaHidden={set > 0} onImgLoad={recalc} />))}
        </div>
      </div>
    </section>
  );
}

function LogoLink({ client, ariaHidden, onImgLoad }: { client: Client; ariaHidden?: boolean; onImgLoad?: () => void }) {
  return (
    <span aria-hidden={ariaHidden || undefined} className="shrink-0">
      <img
        src={asset(`logos/${client.slug}.${client.format ?? "svg"}`)}
        alt={ariaHidden ? "" : client.name}
        loading="lazy"
        onLoad={onImgLoad}
        style={{ transform: `scale(${client.scale ?? 1})` }}
        className="pointer-events-none h-[22px] w-auto origin-center select-none grayscale opacity-75 md:h-7"
        draggable={false}
      />
    </span>
  );
}
