import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/useInView";

/**
 * Counts a number up once when it scrolls into view. Keeps any prefix and
 * suffix around the first number in `value` ("£3.4M+", "1,240 companies"),
 * and the final text is always exactly `value`, so nothing is invented.
 */
export function CountUp({ value, duration = 1400, className = "" }: { value: string; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true, threshold: 0.4 });
  const reduced = useReducedMotion();
  const m = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/s);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!m || reduced || !inView) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const comma = num.includes(",");
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      const txt = comma ? Math.round(v).toLocaleString("en-GB") : v.toFixed(decimals);
      setShown(p < 1 ? `${pre}${txt}${post}` : value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setShown(`${pre}0${post}`);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  );
}
