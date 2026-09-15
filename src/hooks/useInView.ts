import { useEffect, useRef, useState } from "react";

/**
 * Whether an element is on screen and the tab is visible. Used to gate
 * every continuous animation on the site: nothing runs while it cannot
 * be seen. `once` latches true after the first intersection.
 */
export function useInView<T extends HTMLElement>(options: { threshold?: number; rootMargin?: string; once?: boolean } = {}) {
  const { threshold = 0.2, rootMargin = "0px", once = false } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => (typeof document === "undefined" ? true : !document.hidden));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { ref, inView, active: inView && tabVisible };
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => (typeof window === "undefined" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches));
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
