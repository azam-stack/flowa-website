/**
 * Global chrome copy for "Frank by Flowa": announcement bar, navigation,
 * chat widget, logo marquee and footer. Brief §3. Every string here is
 * taken from the brief; nothing is invented.
 *
 * Anything not yet approved is hidden behind a flag, never shown as a placeholder.
 */
import { SITE_CONFIG } from "@/config/site";

export const announcement = {
  lead: "Meet Frank,",
  rest: " our new AI outbound agent",
  href: "/frank",
  ariaLabel: "Meet Frank, our new AI outbound agent",
} as const;

export type MenuItem = { title: string; description: string; href: string; icon: "frank" | "steps" | "signals" | "mail" | "linkedin" | "cases" | "faq" | "about" | "contact" };
export type MenuGroup = { key: string; label: string; items: MenuItem[] };

export const nav = {
  groups: [
    {
      key: "how",
      label: "How it works",
      items: [
        { title: "Frank – AI Outbound Agent", description: "Meet the agent that fills your calendar.", href: "/frank", icon: "frank" },
        { title: "The process", description: "Target, spot, reach, book.", href: "/how-it-works", icon: "steps" },
        { title: "Signals Frank watches", description: "The buying signals behind every meeting.", href: "/signals", icon: "signals" },
        { title: "Channels: Email", description: "Verified data, deliverability, sequences.", href: "/channels/email", icon: "mail" },
        { title: "Channels: LinkedIn", description: "One-to-one notes, approved by a person.", href: "/channels/linkedin", icon: "linkedin" },
      ],
    },
    {
      key: "company",
      label: "Company",
      items: [
        { title: "About us", description: "The people behind Flowa.", href: "/about", icon: "about" },
        { title: "FAQ", description: "Straight answers to the usual questions.", href: "/faq", icon: "faq" },
        { title: "Contact", description: "Talk to Ahmed or Anton.", href: "/contact", icon: "contact" },
      ],
    },
  ] as MenuGroup[],
  /** Direct links (no dropdown), shown after the first group and at the end. */
  results: { label: "Results", href: "/cases" },
  pricing: { label: "Pricing", href: "/pricing" },
  /** Hidden until Flowa provides a URL: while `href` is null the link is not rendered at all. */
  clientDashboard: { label: "Client dashboard", href: null as string | null },
  demo: { label: "Book a call", href: SITE_CONFIG.bookCallHref },
  menuOpen: "Open menu",
  menuClose: "Close menu",
  skipToContent: "Skip to content",
} as const;

export const chat = {
  greeting: "Hi, I'm Frank, Flowa's AI agent. Ask me anything about how we book meetings.",
  meta: "Frank · now",
  placeholder: "Ask Frank anything",
  bookMeeting: "Book a call",
  bookMeetingHref: SITE_CONFIG.bookCallHref,
  send: "Send",
  open: "Open chat with Frank",
  close: "Close chat",
  quickRepliesHeading: "Or pick one:",
  smallTalk: "Hi! What would you like to know about Flowa? For example how we find leads, who writes the messages, or how a qualified meeting is defined.",
  error: "I couldn't answer just now. Email info@flowa.dk and Ahmed or Anton will reply within one working day.",
  limited: "That's a lot of questions. Book a call and ask Ahmed and Anton directly.",
  quickReplies: [
    { label: "How does Frank work?", href: "/how-it-works" },
    { label: "What does it cost?", href: "/pricing" },
    { label: "Book a call", href: SITE_CONFIG.bookCallHref },
  ],
} as const;

export const marquee = {
  heading: "Join the companies Flowa has booked meetings for",
} as const;

export const footer = {
  /** Flowa's motto, two-tone: the first line in ink, the second in orange. */
  tagline: "Creating meetings.",
  taglineAccent: "That create opportunities.",
  email: "info@flowa.dk",
  columns: [
    {
      heading: "Product",
      links: [
        { label: "Frank", href: "/frank" },
        { label: "How it works", href: "/how-it-works" },
        { label: "Signals", href: "/signals" },
        { label: "Email", href: "/channels/email" },
        { label: "LinkedIn", href: "/channels/linkedin" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Cases", href: "/cases" },
        { label: "Contact", href: "/contact" },
      ],
    },
    { heading: "Resources", links: [{ label: "FAQ", href: "/faq" }] },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Cookies", href: "/cookies" },
        { label: "Terms", href: "/terms" },
        { label: "Refunds", href: "/refunds" },
      ],
    },
  ],
  bottom: "© 2026 Flowa. Frank is Flowa's AI outbound agent. Every message is checked by a person.",
} as const;

/** Shared call-to-action labels. */
export const cta = {
  demo: "Book a call",
  demoHref: SITE_CONFIG.bookCallHref,
  quote: "Get my quote",
  contact: "Get in touch",
} as const;
