/**
 * The short contact form used in the contact band (brief §4.10) and on
 * /demo and /contact (§5). Three fields, one consent line.
 */
export const shortForm = {
  firstName: "First name",
  email: "Work email",
  message: "What would you like to discuss?",
  messagePlaceholder: "A line on what you sell and who you want to meet",
  consentBefore: "I have read the ",
  consentLink: "privacy policy",
  consentHref: "/privacy",
  consentAfter: " and I am happy for Flowa to use these details to reply to my enquiry.",
  submit: "Get in touch",
  sending: "Sending…",
  errors: {
    required: "Please fill this in.",
    email: "That doesn't look like an email address.",
    consent: "Please confirm this before sending.",
    summary: "A few fields need attention.",
    network: "We couldn't reach our server, so nothing was sent. Try again, or write to us at",
  },
  retry: "Try again",
  successTitle: "Thanks! Ahmed or Anton will reply within one working day.",
  /** When no draft endpoint is configured, the browser's email client opens instead and the page says so. */
  mailtoTitle: "We've opened your email client with the details filled in.",
  mailtoBody: "Press send there and it reaches us. If nothing opened, write to us directly at",
  address: "info@flowa.dk",
} as const;
