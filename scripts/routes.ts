/**
 * Every prerendered route with its head data, derived from the same
 * content the pages read. Consumed by scripts/prerender-routes.mjs (via
 * esbuild) so the static HTML and the live document never disagree.
 */
import { meta, faq } from "@/content/site.en";
import { whyFlowa } from "@/content/why-flowa";
import { legalDocs } from "@/content/legal";
import { servicesHub } from "@/content/services-hub";
import { casesPage } from "@/content/cases";
import { pricingPage } from "@/content/pricing";
import { liveServices, servicePath } from "@/content/services";
import { faqJsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export type RouteMeta = { path: string; title: string; description: string; ogTitle?: string; ogDescription?: string; jsonLd?: object[] };

export const routes: RouteMeta[] = [
  { path: "/", title: meta.title, description: meta.description, jsonLd: [faqJsonLd(faq.items)] },
  { path: "/why-flowa", title: whyFlowa.seo.title, description: whyFlowa.seo.description, ogTitle: whyFlowa.seo.ogTitle, ogDescription: whyFlowa.seo.ogDescription, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Why Flowa", path: "/why-flowa" }])] },
  { path: "/services", title: servicesHub.seo.title, description: servicesHub.seo.description, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])] },
  ...liveServices.map((s) => ({
    path: servicePath(s.slug),
    title: s.seo.title,
    description: s.seo.description,
    ogTitle: s.seo.ogTitle,
    ogDescription: s.seo.ogDescription,
    jsonLd: [serviceJsonLd({ name: s.name, description: s.seo.description, path: servicePath(s.slug) }), faqJsonLd(s.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: servicePath(s.slug) }])],
  })),
  { path: "/pricing", title: pricingPage.seo.title, description: pricingPage.seo.description, jsonLd: [faqJsonLd(pricingPage.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])] },
  { path: "/cases", title: casesPage.seo.title, description: casesPage.seo.description, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cases", path: "/cases" }])] },
  ...legalDocs.map((d) => ({
    path: `/${d.slug}`,
    title: d.seo.title,
    description: d.seo.description,
    jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: d.title, path: `/${d.slug}` }])],
  })),
];

/**
 * Retired URLs that must keep working. GitHub Pages serves static files
 * and cannot return a 301, so the prerender writes a page at `from`
 * carrying a canonical to `to`, a robots noindex and a meta refresh;
 * the router redirects in-app. Redirects are kept out of the sitemap.
 */
export type RouteRedirect = { from: string; to: string };

export const redirects: RouteRedirect[] = [{ from: "/services/cold-calling", to: "/why-flowa" }];
