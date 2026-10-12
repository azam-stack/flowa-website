import { useEffect, useId, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useInView";

/**
 * The Flowa "o": the organic loop from the Flowa logo, used as the
 * brand's own floating shape instead of generic spheres. Solid versions
 * are soft clay-like forms (highlight top-left, shade bottom-right, a
 * fine grain); `mark` is kept for API compatibility and draws nothing;
 * `outline` is the bare loop as a line. Every shape floats ±10px over
 * 6–9s and wobbles a few degrees, staggered. Decorative and aria-hidden.
 */
export type Tint = 1 | 2 | 3 | 4 | 5 | 6;

/** The logo loop, traced from the Flowa mark (viewBox 0 0 360 330). */
export const FLOWA_O =
  "M40 36 C58 12 84 2 132 26 C176 49 212 68 236 65 C256 62 274 61 304 63 C336 66 348 96 348 134 C344 200 298 298 240 292 C206 287 170 302 128 313 C92 322 64 320 50 304 C36 288 44 256 48 232 C52 210 52 196 48 186 C30 128 14 92 22 66 C25 54 31 46 40 36 Z";

const TONES: Record<Tint, { hi: string; base: string; low: string }> = {
  1: { hi: "#FFC27E", base: "#F49A3C", low: "#C9701F" },
  2: { hi: "#FFD9AE", base: "#F6B97A", low: "#D99350" },
  3: { hi: "#FFF1DF", base: "#FBD9B3", low: "#E2B27E" },
  4: { hi: "#FFFFFF", base: "#FFEBD6", low: "#EBC9A3" },
  5: { hi: "#FFB9A0", base: "#F08A6C", low: "#C8613F" },
  6: { hi: "#FFFFFF", base: "#F7F5F1", low: "#D9D3C9" },
};

export function FlowaO({ tint = 1, mark = false, outline = false, stroke = "#0C0C0B", className = "" }: { tint?: Tint; mark?: boolean; outline?: boolean; stroke?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const t = TONES[tint];
  if (outline) {
    return (
      <svg viewBox="-10 -10 380 350" className={className} aria-hidden="true" focusable="false">
        <path d={FLOWA_O} fill="none" stroke={stroke} strokeWidth="9" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="-10 -10 380 350" className={`overflow-visible ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-g`} cx="30%" cy="22%" r="85%">
          <stop offset="0" stopColor={t.hi} />
          <stop offset="0.45" stopColor={t.base} />
          <stop offset="1" stopColor={t.low} />
        </radialGradient>
        <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" result="g" />
          <feComponentTransfer in="g" result="a">
            <feFuncA type="table" tableValues="0 0.16" />
          </feComponentTransfer>
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <path d={FLOWA_O} transform="translate(10 26)" fill="#0C0C0B" opacity="0.12" filter={`url(#${id}-soft)`} />
      <path d={FLOWA_O} fill={`url(#${id}-g)`} />
      <path d={FLOWA_O} fill="#000" filter={`url(#${id}-grain)`} />
    </svg>
  );
}

export function Sphere({
  size = 80,
  tint = 2,
  mark = false,
  outline = false,
  bob = true,
  blur = false,
  duration = 7,
  delay = 0,
  rotate = 0,
  className = "",
  style,
}: {
  size?: number;
  tint?: Tint;
  mark?: boolean;
  outline?: boolean;
  bob?: boolean;
  blur?: boolean;
  duration?: number;
  delay?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${bob ? "sphere-bob" : "sphere-static"} ${className}`} style={{ width: size, height: size * 0.92, "--bob-dur": `${duration}s`, "--bob-delay": `${delay}s`, "--rot": `${rotate}deg`, ...style } as CSSProperties}>
      <FlowaO tint={tint} mark={mark} outline={outline} className={`h-full w-full ${blur ? "blur-[3px]" : ""}`} />
    </div>
  );
}

type Placed = { size: number; tint: Tint; mark?: boolean; outline?: boolean; rotate?: number; x: string; y: string; duration?: number; delay?: number; z?: number; blur?: boolean };

/** Light scroll parallax for a decorative layer (0.1–0.2 speed). Off under reduced motion. */
export function useParallax<T extends HTMLElement>(speed = 0.12) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centre = r.top + r.height / 2 - window.innerHeight / 2;
      const y = Math.max(-60, Math.min(60, -centre * speed));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed, reduced]);
  return ref;
}

/** A group of spheres placed inside a relative parent (percent/px offsets), with parallax. */
export function SphereGroup({ items, className = "", speed = 0.12 }: { items: Placed[]; className?: string; speed?: number }) {
  const ref = useParallax<HTMLDivElement>(speed);
  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 will-change-transform ${className}`}>
      {items.map((s, i) => (
        <Sphere key={i} size={s.size} tint={s.tint} mark={s.mark} outline={s.outline} rotate={s.rotate ?? [10, -14, 22, -6, 30, -20][i % 6]} blur={s.blur} duration={s.duration ?? 6 + (i % 4)} delay={s.delay ?? i * 0.7} className="absolute" style={{ left: s.x, top: s.y, zIndex: s.z }} />
      ))}
    </div>
  );
}

/** The hero: one large orange "o" with the logo line bottom-left, one peach "o" on the right, both cropped by the frame. */
export const heroClusterLeft: Placed[] = [{ size: 190, tint: 1, mark: true, x: "-70px", y: "56%", duration: 8, rotate: -12 }];
export const heroClusterRight: Placed[] = [{ size: 150, tint: 3, x: "calc(100% - 100px)", y: "46%", duration: 9, delay: 1.2, rotate: 16 }];
/** Loose spheres for statement bands. */
export const spherePile: Placed[] = [
  { size: 190, tint: 1, x: "40%", y: "30%", duration: 8 },
  { size: 120, tint: 3, mark: true, x: "12%", y: "52%", duration: 6.5, delay: 1 },
  { size: 96, tint: 5, x: "68%", y: "8%", duration: 7.5, delay: 0.5 },
  { size: 70, tint: 6, mark: true, x: "76%", y: "66%", duration: 9, delay: 1.8 },
  { size: 56, tint: 4, x: "30%", y: "4%", duration: 7, delay: 2.2, blur: true },
  { size: 44, tint: 2, x: "2%", y: "22%", duration: 6, delay: 0.2, blur: true },
];
