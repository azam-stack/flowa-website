/**
 * Global chrome copy for "Frank by Flowa": announcement bar, navigation,
 * chat widget, logo marquee and footer. Brief §3. Every string here is
 * taken from the brief; nothing is invented.
 *
 * Anything not yet approved is hidden behind a flag, never shown as a placeholder.
 */
import { SITE_CONFIG } from "@/config/site";

export type NavLink = { label: string; href: string };

export const nav = {
  /** Four flat links, no dropdowns. Everything else lives in the footer. */
  links: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Frank", href: "/frank" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ] as NavLink[],
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
    { label: "Free market snapshot", href: "/market-snapshot" },
    { label: "Book a call", href: SITE_CONFIG.bookCallHref },
  ],
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
        { label: "Free market snapshot", href: "/market-snapshot" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
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
