/**
 * The pricing page: the quote quiz, then three published starting
 * points (Pilot per meeting, monthly plans from, Scale on request).
 *
 * The only prices allowed anywhere on the site are £400 and £1,200
 * (see PUBLISHED_PRICES in scripts/check-content.mjs). The onboarding
 * fee is never published; Ahmed and Anton tell clients themselves.
 */
import { SITE_CONFIG } from "@/config/site";

export const pricing = {
  seo: { title: "Pricing | Flowa", description: "Pilot from £400 per booked meeting, monthly plans from £1,200 a month. Answer three quick questions and get your exact quote within one working day." },

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
    soonerHref: SITE_CONFIG.bookCallHref,
    /** Shown instead of "We're on it." when no draft endpoint is configured and the email client was opened. */
    mailtoTitle: "We've opened your email client with your answers filled in.",
    mailtoBody: "Press send there and Ahmed or Anton will reply with your quote within one working day. If nothing opened, write to us at",
    error: "We couldn't reach our server, so nothing was sent. Try again, or write to us at",
    retry: "Try again",
    sending: "Sending…",
  },

  plans: {
    h2Light: "Where most clients ",
    h2Bold: "start",
    sub: "Your exact quote depends on your market and the volume you want. These are the starting points.",
    items: [
      {
        name: "Pilot",
        price: "£400",
        unit: "per booked meeting",
        body: "Try Flowa on your own market. You only pay for meetings that are held with the right person.",
        points: ["No monthly commitment", "LinkedIn and email outreach", "Every message approved by Ahmed or Anton"],
        cta: "Get my quote",
        href: "#quote",
        featured: false,
      },
      {
        name: "Monthly",
        price: "from £1,200",
        unit: "per month",
        body: "A steady flow of qualified meetings, with a fixed monthly fee and a meeting guarantee.",
        points: ["Meeting guarantee", "No-show recovery", "Live dashboard and CRM sync"],
        cta: "Get my quote",
        href: "#quote",
        featured: true,
        badge: "Most chosen",
      },
      {
        name: "Scale",
        price: "On request",
        unit: "",
        body: "Several markets or ideal customers at once, with weekly strategy sessions and reserved target segments.",
        points: ["Multiple markets and ICPs", "Weekly strategy session", "Competitor exclusivity"],
        cta: "Book a call",
        href: SITE_CONFIG.bookCallHref,
        featured: false,
      },
    ],
    footnote: "Prices exclude VAT. Guarantee terms are set out in your proposal.",
  },

  /** Flowa next to the two alternatives a buyer weighs. Typical UK figures, no competitor named. */
  compare: {
    h2Light: "What the same meetings ",
    h2Bold: "cost elsewhere",
    sub: "Most teams weigh us against hiring a rep or buying software and running it themselves.",
    columns: ["Hire an SDR", "Outbound software", "Flowa"],
    rows: [
      { label: "What it costs", cells: ["£50K+ a year in salary, NI and tools", "A monthly licence, usage and your team's time", "Pilot from £400 per booked meeting"] },
      { label: "First meetings", cells: ["After hiring and a three-month ramp", "After you build the lists, copy and domains", "First messages go out in week 2"] },
      { label: "Who writes the messages", cells: ["A junior rep", "Software, on autopilot", "Frank drafts, Ahmed or Anton approves"] },
      { label: "Who runs it day to day", cells: ["Your sales manager", "You", "Ahmed and Anton"] },
      { label: "If the meetings don't come", cells: ["You still pay the salary", "You still pay the licence", "On the Pilot, you only pay for meetings held"] },
    ],
    footnote: "SDR figure: typical UK cost of one rep including salary, commission, employer's National Insurance and sales tools.",
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
      { q: "How is pricing set?", a: "The Pilot starts at £400 per booked meeting and monthly plans start at £1,200 a month. Your exact quote depends on your market, your ideal customer and the meeting volume you want. Answer three questions above and we'll send it within one working day." },
      { q: "Can we start small?", a: "Yes. Start with the Pilot on your own market and pay per booked meeting before committing to a monthly plan." },
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
