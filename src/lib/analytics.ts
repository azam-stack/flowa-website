import { SITE_CONFIG } from "@/config/site";

/**
 * Event tracking with no vendor in the frontend. Every event goes to
 * `window.dataLayer` only: the draft is never connected to the production
 * analytics property (brief §0). Personal data from the forms is never
 * tracked: form events carry the page, not the fields.
 */
export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "announcement_click"
  | "nav_click"
  | "video_open"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "faq_open"
  | "chat_open"
  | "chat_close"
  | "chat_quick_reply"
  | "quiz_step_1"
  | "quiz_step_2"
  | "quiz_step_3"
  | "quiz_step_4"
  | "quiz_submit"
  | "scroll_depth"
  | "ask_submit";

export type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * UTM parameters from the landing URL, held in memory for as long as the
 * page is open so a form submitted after some browsing still carries
 * them. Deliberately not written to sessionStorage: storing marketing
 * attribution on a visitor's device would need consent under ePrivacy
 * and PECR, and the site has no consent banner because it needs none.
 */
let utmMemo: Utm | null = null;

export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  if (utmMemo) return utmMemo;
  const fresh: Utm = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) fresh[k] = v.slice(0, 200);
    }
  } catch {
    /* a malformed query string must never break the page */
  }
  utmMemo = fresh;
  return fresh;
}

export function track(event: AnalyticsEvent, props: EventProps = {}): void {
  if (typeof window === "undefined") return;
  const payload = {
    event,
    page: window.location.pathname,
    ...getUtm(),
    ...props,
    timestamp: new Date().toISOString(),
  };
  (window.dataLayer ||= []).push(payload);
  if (SITE_CONFIG.analyticsEndpoint) {
    try {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) navigator.sendBeacon(SITE_CONFIG.analyticsEndpoint, new Blob([body], { type: "application/json" }));
      else void fetch(SITE_CONFIG.analyticsEndpoint, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true });
    } catch {
      /* analytics must never break the page */
    }
  } else if (import.meta.env.DEV) {
    console.debug("[analytics]", payload);
  }
}

/** Fires scroll_depth once per page at 25/50/75/100 %. Returns a cleanup. */
export function watchScrollDepth(page: string): () => void {
  const marks = [25, 50, 75, 100];
  const seen = new Set<number>();
  let raf = 0;
  const check = () => {
    raf = 0;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const pct = max <= 0 ? 100 : Math.round(((window.scrollY || doc.scrollTop) / max) * 100);
    for (const m of marks) {
      if (pct >= m && !seen.has(m)) {
        seen.add(m);
        track("scroll_depth", { depth: m, page });
      }
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(check);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  check();
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(raf);
  };
}
