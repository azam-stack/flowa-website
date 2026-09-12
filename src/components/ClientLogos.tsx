import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { clientLogos, clients, type Client } from "@/content/site.en";

const PIXELS_PER_SECOND = 60;
const INITIAL_SETS_PER_HALF = 3;

/**
 * Supersedes C1 of the restructure brief — Flowa now has real clients, so
 * this ships. Still gated on `content.clients`: renders nothing while that
 * array is empty (currently the case — see the TODO on `clients` in
 * site.en.ts for why the real logos aren't wired in yet).
 *
 * Track width is measured from the DOM (one rendered set of logos), not
 * assumed, so `setsPerHalf` — and therefore the loop duration — stays
 * correct regardless of how many clients are in the array or how wide
 * their logos render at.
 */
export function ClientLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [setsPerHalf, setSetsPerHalf] = useState(INITIAL_SETS_PER_HALF);
  const [duration, setDuration] = useState(30);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(() => document.hidden);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const recalc = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const perSet = clients.length;
    const oneSet = Array.from(track.children).slice(0, perSet) as HTMLElement[];
    if (oneSet.length < perSet) return;
    const gapPx = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const setWidth = oneSet.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) + gapPx * (perSet - 1);
    if (setWidth <= 0) return;
    const needed = Math.max(1, Math.ceil((window.innerWidth * 2) / setWidth));
    setSetsPerHalf(needed);
    setDuration((setWidth * needed) / PIXELS_PER_SECOND);
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mq.matches);
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  useLayoutEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
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
    // Re-runs when `setsPerHalf` changes too: harmless (recalc converges
    // and stops changing state once the measured width is stable).
  }, [reducedMotion, recalc, setsPerHalf]);

  if (clients.length === 0) return null;

  if (reducedMotion) {
    return (
      <section aria-label="Our clients" className="border-y border-border py-10 md:py-12">
        <p className="mb-6 text-center text-sm text-muted">{clientLogos.heading}</p>
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 md:px-10">
          {clients.map((client) => (
            <LogoLink key={client.slug} client={client} />
          ))}
        </div>
      </section>
    );
  }

  const running = inView && !tabHidden && !hovered && !focused;
  const totalSets = setsPerHalf * 2;

  return (
    <section aria-label="Our clients" className="border-y border-border py-10 md:py-12">
      <p className="mb-6 text-center text-sm text-muted">{clientLogos.heading}</p>
      <div
        ref={containerRef}
        className="overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-12 md:gap-[72px]"
          style={{
            animationName: "marquee-scroll",
            animationDuration: `${duration.toFixed(2)}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: running ? "running" : "paused",
            willChange: "transform",
          }}
        >
          {Array.from({ length: totalSets }, (_, setIndex) =>
            clients.map((client) => (
              <LogoLink key={`${setIndex}-${client.slug}`} client={client} ariaHidden={setIndex > 0} onImgLoad={recalc} />
            )),
          )}
        </div>
      </div>
    </section>
  );
}

function LogoLink({ client, ariaHidden, onImgLoad }: { client: Client; ariaHidden?: boolean; onImgLoad?: () => void }) {
  const scale = client.scale ?? 1;
  return (
    <a
      href={client.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      className="group shrink-0"
    >
      <img
        src={`/logos/${client.slug}.svg`}
        alt={ariaHidden ? "" : client.name}
        onLoad={onImgLoad}
        style={{ transform: `scale(${scale})` }}
        className="h-[22px] w-auto origin-center grayscale opacity-[0.55] transition-all duration-200 group-hover:grayscale-0 group-hover:opacity-100 md:h-7"
      />
    </a>
  );
}
