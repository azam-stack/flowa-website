import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scroll behaviour for client-side navigation: a new path starts at the
 * top; a hash scrolls to its element once it exists (sections render
 * synchronously, but the check retries briefly for lazy content). Back and
 * forward keep the browser's own restoration.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let raf = 0;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
      if (tries++ < 30) raf = requestAnimationFrame(attempt);
    };
    attempt();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
}
