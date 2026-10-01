/**
 * The pricing page: a quote quiz, no prices. Brief §6.
 *
 * Nothing in this file, and nothing rendered from it, may contain a
 * price, a price range, a "from" amount or a package name. The build
 * greps the output for all of them. The only numbers allowed are the
 * proof badge ("2,000+ meetings booked", a verified Flowa record) and
 * the team-size bands in the quiz.
 */
import { SITE_CONFIG } from "@/config/site";

export const pricing = {
  seo: { title: "Pricing | Flowa", description: "A quote built around your market. Answer three quick questions and we will send your quote within one working day." },

  left: {
    h1Light: "A quote built ",
    h1Bold: "around your market",
    sub: "One agent. A quote sized to your market. No hidden fees.",
    bullets: ["Pay for meetings, not activity", "Every message checked by a person", "Your data stays yours"],
    badge: "2,000+ meetings booked",
  },

  right: {
    heading: "Get your quote within one working day",
    stepLabel: "Step",
    continueLabel: "Continue",
    previous: "Previous",
    next: "Next",
    submit: "Get my quote",
  },

  steps: {
    company: {
      question: "What kind of company are you?",
      options: ["B2B SaaS & tech", "Marketing or creative agency", "Consulting & services", "Other B2B"],
    },
    team: {
      question: "How big is your team?",
      options: ["1–10", "11–50", "51–200", "200+"],
    },
    goals: {
      question: "What do you want us to do?",
      hint: "Select all that apply:",
      options: ["Book more qualified meetings", "Reach specific target accounts", "Test outbound before committing", "Support or replace an SDR", "Expand into the UK market"],
    },
    email: {
      question: "Where should we send your quote?",
      label: "Work email",
      placeholder: "you@company.com",
      invalid: "That doesn't look like an email address.",
      freeDomain: "Please use your work email",
      consentBefore: "I agree that Flowa will collect, store and process my personal data in accordance with the ",
      consentLink: "privacy policy",
      consentHref: "/privacy",
      consentAfter: ".",
    },
  },

  success: {
    h3: "We're on it.",
    bodyBefore: "Ahmed or Anton will send your quote to ",
    bodyAfter: " within one working day.",
    sooner: "Want to talk sooner? Book a call →",
    soonerHref: SITE_CONFIG.bookingUrl,
    /** Shown instead of "We're on it." when no draft endpoint is configured and the email client was opened. */
    mailtoTitle: "We've opened your email client with your answers filled in.",
    mailtoBody: "Press send there and Ahmed or Anton will reply with your quote within one working day. If nothing opened, write to us at",
    error: "We couldn't reach our server, so nothing was sent. Try again, or write to us at",
    retry: "Try again",
    sending: "Sending…",
  },

  includes: {
    h2: "Every engagement includes",
    items: [
      "Ideal customer workshop and buyer profile",
      "Email outreach",
      "Research and verification",
      "Domain setup and deliverability",
      "Copywriting and continuous testing",
      "CRM integration",
      "Meeting booking and calendar management",
      "No-show recovery",
      "Live dashboard",
      "Client ownership of lists and data",
    ],
  },

  faq: {
    h2: "Pricing questions",
    items: [
      { q: "How is pricing set?", a: "By your market, your ideal customer and the meeting volume you want. Answer three questions above and we'll send a quote within one working day." },
      { q: "Can we start small?", a: "Yes. You can start with a pay-per-meeting pilot on your own market before committing to a monthly plan." },
      { q: "Is there a meeting guarantee?", a: "Monthly plans include a meeting guarantee. The exact terms depend on your ideal customer, market and scope, and are set out in your proposal." },
      { q: "Can we change plans later?", a: "Yes. Changes are agreed in writing and take effect from the next period." },
      { q: "Who owns the data?", a: "You do, on every plan." },
    ],
  },

  finalCta: {
    h2: "Let's size your outbound",
    cta: "Get my quote",
  },
} as const;

/**
 * Free mailbox domains the quiz rejects with the "Please use your work
 * email" hint (brief §6.2 step 4). Subdomains are matched too.
 */
export const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "live.co.uk",
  "msn.com",
  "yahoo.com",
  "yahoo.co.uk",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "gmx.de",
  "mail.com",
  "yandex.com",
  "zoho.com",
] as const;
