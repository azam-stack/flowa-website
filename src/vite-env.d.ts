/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (Formspree/Basin-style URL accepting JSON). Without it the form falls back to opening the visitor's email client. */
  readonly VITE_FORM_ENDPOINT?: string;
  /** Public base path; set to "/flowa-website/" by the GitHub Pages workflow. */
  readonly VITE_BASE?: string;
}
