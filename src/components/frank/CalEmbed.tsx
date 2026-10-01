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
 * The booking calendar, inline on the page: visitors see Ahmed's free
 * times and book the 20-minute intro call without leaving flowa.dk.
 * Anton is added as a guest on every booking. If the embed cannot load,
 * a plain link to the same calendar is shown.
 */
export function CalEmbed({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
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
      Cal.ns[NS]("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#0C0C0B" } },
      });
    } catch {
      setFailed(true);
    }
    const t = window.setTimeout(() => {
      if (!el.querySelector("iframe")) setFailed(true);
    }, 12000);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div className={className}>
      <div ref={ref} className="min-h-[640px] w-full overflow-hidden rounded-frame border border-ink bg-white" />
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
