/**
 * Every prerendered route with its head data, derived from the same
 * content the pages read. Consumed by scripts/prerender-routes.mjs (via
 * esbuild) so the static HTML and the live document never disagree.
 */
import { meta, faq } from "@/content/site.en";
import { servicesHub } from "@/content/services-hub";
import { casesPage } from "@/content/cases";
import { liveServices, servicePath } from "@/content/services";
import { faqJsonLd, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export type RouteMeta = { path: string; title: string; description: string; ogTitle?: string; ogDescription?: string; jsonLd?: object[] };

export const routes: RouteMeta[] = [
  { path: "/", title: meta.title, description: meta.description, jsonLd: [faqJsonLd(faq.items)] },
  { path: "/services", title: servicesHub.seo.title, description: servicesHub.seo.description, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])] },
  ...liveServices.map((s) => ({
    path: servicePath(s.slug),
    title: s.seo.title,
    description: s.seo.description,
    ogTitle: s.seo.ogTitle,
    ogDescription: s.seo.ogDescription,
    jsonLd: [serviceJsonLd({ name: s.name, description: s.seo.description, path: servicePath(s.slug) }), faqJsonLd(s.faq.items), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path: servicePath(s.slug) }])],
  })),
  { path: "/cases", title: casesPage.seo.title, description: casesPage.seo.description, jsonLd: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cases", path: "/cases" }])] },
];
