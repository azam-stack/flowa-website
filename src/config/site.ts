/**
 * Site-wide configuration for Frank by Flowa. Anything that differs
 * between environments is read from Vite env variables here, in one
 * place, and nowhere else.
 *
 * - VITE_CONTACT_ENDPOINT: the POST endpoint for contact and quote
 *   submissions (the backend/ Cloudflare Worker, once deployed). Unset:
 *   submissions go to FormSubmit, which emails them to ahmed@flowa.dk.
 * - VITE_BOOKING_URL: the calendar every "Book a call" button opens.
 *   Defaults to the Cal.com intro call, with Anton added as a guest.
 * - VITE_CLIENT_DASHBOARD_URL: the "Client dashboard" nav link. Unset:
 *   the link is not rendered at all.
 * - VITE_SITE_URL: the canonical origin. Defaults to https://flowa.dk.
 * - VITE_DRAFT: "false" removes the noindex meta. Default: draft on.
 */
const env = import.meta.env;

export const SITE_CONFIG = {
  name: "Flowa",
  company: "Flowa",
  siteUrl: ((env.VITE_SITE_URL as string | undefined) || "https://flowa.dk").replace(/\/$/, ""),
  locale: "en_GB",
  lang: "en-GB",
  draft: (env.VITE_DRAFT as string | undefined) !== "false",
  leadEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined) || "https://formsubmit.co/ajax/ahmed@flowa.dk",
  /** The "Ask a question" box (backend/ worker /api/ask). Unset: the box is not shown. */
  askEndpoint: (env.VITE_ASK_ENDPOINT as string | undefined) || null,
  /** Every "Book a call" button goes here: the /demo page with the calendar inline. */
  bookCallHref: "/demo",
  /** The Cal.com calendar itself (embedded on /demo; fallback link): the Cal.com intro call. `guests=` puts Anton on every booking. */
  bookingUrl: (env.VITE_BOOKING_URL as string | undefined) || "https://cal.com/flowa/intro?user=flowa&overlayCalendar=true&guests=anton@flowa.dk",
  clientDashboardUrl: (env.VITE_CLIENT_DASHBOARD_URL as string | undefined) || null,
  /** Draft analytics only: events stay in window.dataLayer. Nothing is beaconed anywhere. */
  analyticsEndpoint: null as string | null,
  email: "info@flowa.dk",
  ogImage: "/og-image.png",
} as const;
