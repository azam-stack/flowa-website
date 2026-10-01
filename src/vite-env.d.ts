/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** POST endpoint for the draft's contact and quote forms (a separate deployment of backend/). Without it the forms open the visitor's email client. */
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_ASK_ENDPOINT?: string;
  readonly VITE_BOOKING_URL?: string;
  /** The "Client dashboard" link in the nav. Without it the link is not rendered. */
  readonly VITE_CLIENT_DASHBOARD_URL?: string;
  /** Canonical origin for this draft. */
  readonly VITE_SITE_URL?: string;
  /** "false" removes the noindex meta. Anything else keeps the draft unindexed. */
  readonly VITE_DRAFT?: string;
  /** Public base path; "/flowa-website-lab/" on the GitHub Pages preview. */
  readonly VITE_BASE?: string;
}
