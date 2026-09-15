import { SITE_CONFIG } from "@/config/site";

/**
 * Event tracking with no vendor in the frontend. Every event goes to
 * `window.dataLayer` (so a tag manager can pick it up) and, when
 * VITE_ANALYTICS_ENDPOINT is set, is beaconed there as JSON. Personal
 * data from the lead form is never sent: form events carry the service
 * and the page, not the fields.
 */
export type AnalyticsEvent =
  | "page_view"
  | "service_view"
  | "cta_click"
  | "book_call_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"
  | "service_card_click"
  | "case_study_open"
  | "faq_open"
  | "video_play"
  | "scroll_depth";

export type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const UTM_STORAGE = "flowa:utm";

/** UTM parameters from the landing URL, remembered for the session so a later form submit still carries them. */
export function getUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const fresh: Utm = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) fresh[k] = v.slice(0, 200);
    }
    if (Object.keys(fresh).length) {
      sessionStorage.setItem(UTM_STORAGE, JSON.stringify(fresh));
      return fresh;
    }
    const stored = sessionStorage.getItem(UTM_STORAGE);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    return {};
  }
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
