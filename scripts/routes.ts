/**
 * Every prerendered route with its head data, derived from the same
 * content the pages read. Consumed by scripts/prerender-routes.mjs (via
 * esbuild) and by App.tsx (the redirects), so the static HTML, the
 * router and the live document never disagree.
 */
import { home } from "@/content/frank/home";
import { pricing } from "@/content/frank/pricing";
import { aboutPage, casesPage, channelEmail, channelLinkedIn, contactPage, faqPage, frankPage, howItWorks, signals } from "@/content/frank/pages";
import { legalDocs } from "@/content/legal";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export type RouteMeta = { path: string; title: string; description: string; ogTitle?: string; ogDescription?: string; jsonLd?: object[] };

const crumb = (name: string, path: string) => breadcrumbJsonLd([{ name: "Home", path: "/" }, { name, path }]);

export const routes: RouteMeta[] = [
  { path: "/", title: home.seo.title, description: home.seo.description, jsonLd: [faqJsonLd(home.faq.items)] },
  { path: "/frank", title: frankPage.seo.title, description: frankPage.seo.description, jsonLd: [crumb("Frank", "/frank")] },
  { path: "/how-it-works", title: howItWorks.seo.title, description: howItWorks.seo.description, jsonLd: [crumb("How Frank works", "/how-it-works")] },
  { path: "/signals", title: signals.seo.title, description: signals.seo.description, jsonLd: [crumb("Signals", "/signals")] },
  { path: "/channels/email", title: channelEmail.seo.title, description: channelEmail.seo.description, jsonLd: [crumb("Email", "/channels/email")] },
  { path: "/channels/linkedin", title: channelLinkedIn.seo.title, description: channelLinkedIn.seo.description, jsonLd: [crumb("LinkedIn", "/channels/linkedin")] },
  { path: "/cases", title: casesPage.seo.title, description: casesPage.seo.description, jsonLd: [crumb("Cases", "/cases")] },
  { path: "/about", title: aboutPage.seo.title, description: aboutPage.seo.description, jsonLd: [crumb("About", "/about")] },
  { path: "/pricing", title: pricing.seo.title, description: pricing.seo.description, jsonLd: [faqJsonLd(pricing.faq.items), crumb("Pricing", "/pricing")] },
  { path: "/demo", title: contactPage.demo.seo.title, description: contactPage.demo.seo.description, jsonLd: [crumb("Book a demo", "/demo")] },
  { path: "/contact", title: contactPage.contact.seo.title, description: contactPage.contact.seo.description, jsonLd: [crumb("Contact", "/contact")] },
  { path: "/faq", title: faqPage.seo.title, description: faqPage.seo.description, jsonLd: [faqJsonLd([...home.faq.items, ...pricing.faq.items]), crumb("FAQ", "/faq")] },
  ...legalDocs.map((d) => ({ path: `/${d.slug}`, title: d.seo.title, description: d.seo.description, jsonLd: [crumb(d.title, `/${d.slug}`)] })),
];

/**
 * Old URLs that redirect inside the draft (brief §5). GitHub Pages serves
 * static files and cannot return a 301, so the prerender writes a page
 * at `from` carrying a canonical to `to`, a robots noindex and a meta
 * refresh; the router redirects in-app. They go live with the new site.
 */
export type RouteRedirect = { from: string; to: string };

export const redirects: RouteRedirect[] = [
  { from: "/why-flowa", to: "/signals" },
  { from: "/services/cold-email", to: "/channels/email" },
  { from: "/services/linkedin-outreach", to: "/channels/linkedin" },
  { from: "/services/appointment-setting", to: "/frank" },
  { from: "/services/cold-calling", to: "/frank" },
  { from: "/services", to: "/frank" },
];
