import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/config/site";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Cal?: any;
  }
}

const NS = "flowa-intro";

/** Cal.com's official loader, as published in their embed snippet. */
function loadCal() {
  if (window.Cal) return;
  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = function (...a: any[]) {
            p(api, a);
          };
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], args);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, args);
          return;
        }
        p(cal, args);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
}

/**
 * Start loading Cal.com before the visitor reaches the booking page:
 * called when a "Book a call" button is hovered or focused. Loads the
 * embed script and warms the calendar page in the browser cache.
 */
let warmed = false;
export function warmCal() {
  if (warmed || typeof window === "undefined") return;
  warmed = true;
  try {
    loadCal();
    const l = document.createElement("link");
    l.rel = "prefetch";
    l.href = "https://app.cal.com/flowa/intro/embed?embed=" + NS;
    document.head.appendChild(l);
  } catch {
    /* ignore */
  }
}

/**
 * The booking calendar, inline on the page: visitors see Ahmed's free
 * times and book the 20-minute intro call without leaving flowa.dk.
 * Anton is added as a guest on every booking. If the embed cannot load,
 * a plain link to the same calendar is shown.
 */
export function CalEmbed({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    try {
      loadCal();
      const Cal = window.Cal;
      Cal("init", NS, { origin: "https://cal.com" });
      Cal.ns[NS]("inline", {
        elementOrSelector: el,
        calLink: "flowa/intro",
        config: { layout: "month_view", guests: ["anton@flowa.dk"], theme: "light" },
      });
      Cal.ns[NS]("on", { action: "linkReady", callback: () => setReady(true) });
      Cal.ns[NS]("ui", {
        theme: "light",
        hideEventTypeDetails: true,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#0C0C0B", "cal-bg": "#FFFFFF", "cal-border-booker": "rgba(12,12,11,0.08)" } },
      });
    } catch {
      setFailed(true);
    }
    const t = window.setTimeout(() => {
      if (!el.querySelector("iframe")) setFailed(true);
      else setReady(true);
    }, 15000);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className={className}>
      <div className="relative min-h-[520px]">
        {!ready && !failed && (
          <div className="absolute inset-0 grid place-items-center rounded-frame border border-line bg-white" aria-live="polite">
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="typing text-ink" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <p className="text-[14px] text-muted">Loading our available times…</p>
            </div>
          </div>
        )}
        <div ref={ref} className={`min-h-[520px] w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`} />
      </div>
      {failed && (
        <p className="mt-3 text-small text-muted">
          The calendar didn't load.{" "}
          <a href={SITE_CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-deep underline underline-offset-4">
            Open it on Cal.com
          </a>
          .
        </p>
      )}
    </div>
  );
}
