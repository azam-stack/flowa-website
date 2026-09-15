import { useEffect, useState } from "react";
import { useReducedMotion } from "./useInView";

/**
 * Counts a number up from 0 once `start` is true. Used only for verified
 * figures: benchmarks and targets are shown static so the motion never
 * lends false weight to a number that is not a Flowa result.
 */
export function useCountUp(target: number, start: boolean, durationMs = 1100): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, durationMs, reduced]);
  return value;
}
