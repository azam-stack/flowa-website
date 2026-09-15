/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint for lead submissions (the backend/ worker). Without it the form falls back to opening the visitor's email client. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Canonical booking link. Without it every "Book a call" goes to the lead form. */
  readonly VITE_BOOKING_URL?: string;
  /** Where analytics events are beaconed. Without it events only reach window.dataLayer. */
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  /** Public base path; set to "/flowa-website/" by the GitHub Pages workflow. */
  readonly VITE_BASE?: string;
}
