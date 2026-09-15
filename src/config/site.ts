/**
 * Site-wide configuration. Anything that differs between environments
 * (booking tool, contact endpoint, analytics) is read from Vite env
 * variables here, in one place, and nowhere else.
 *
 * - VITE_BOOKING_URL: the canonical booking flow (a Calendly/HubSpot/
 *   Cal.com link). Every "Book a call" resolves to it. Unset: the lead
 *   form on the current page.
 * - VITE_CONTACT_ENDPOINT: the POST /api/contact endpoint (see backend/).
 *   Unset: the form opens the visitor's email client and says so.
 * - VITE_ANALYTICS_ENDPOINT: where events are beaconed. Unset: events go
 *   to window.dataLayer only (and the console in development).
 */
const env = import.meta.env;

export const SITE_CONFIG = {
  name: "Flowa",
  /** Canonical origin for SEO. The GitHub Pages preview still canonicalises to the real domain. */
  siteUrl: "https://flowa.dk",
  locale: "en_GB",
  lang: "en-GB",
  bookingUrl: (env.VITE_BOOKING_URL as string | undefined) || null,
  contactEndpoint: (env.VITE_CONTACT_ENDPOINT as string | undefined) || null,
  analyticsEndpoint: (env.VITE_ANALYTICS_ENDPOINT as string | undefined) || null,
  /** The in-page fallback for the booking flow: the lead form's id. */
  contactAnchor: "#contact",
  ogImage: "/og-image.png",
} as const;
