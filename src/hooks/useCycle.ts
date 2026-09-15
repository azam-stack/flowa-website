import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "./useInView";

/**
 * A step counter for the product-style visualisations: advances through
 * `steps` states on the given interval while the element is on screen and
 * the tab is visible, pauses otherwise, and holds the final state under
 * prefers-reduced-motion so the composition still reads. `holdLast` keeps
 * the final state a little longer before restarting.
 */
export function useCycle<T extends HTMLElement>(steps: number, intervalMs: number, options: { holdLastMs?: number; threshold?: number } = {}) {
  const { holdLastMs = intervalMs * 1.6, threshold = 0.3 } = options;
  const reduced = useReducedMotion();
  const { ref, active } = useInView<T>({ threshold });
  const [step, setStep] = useState(reduced ? steps - 1 : 0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(steps - 1);
      return;
    }
    if (!active) return;
    const last = step === steps - 1;
    const t = window.setTimeout(
      () => {
        if (last) {
          setStep(0);
          setRound((r) => r + 1);
        } else setStep((s) => s + 1);
      },
      last ? holdLastMs : intervalMs,
    );
    return () => window.clearTimeout(t);
  }, [active, reduced, step, steps, intervalMs, holdLastMs]);

  return { ref, step, round, active, reduced };
}
