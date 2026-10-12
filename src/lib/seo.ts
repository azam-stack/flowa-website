import { useEffect } from "react";
import { SITE_CONFIG } from "@/config/site";
import { track, watchScrollDepth } from "./analytics";

/**
 * Per-route document head. The production build also writes these tags
 * into each route's static HTML (scripts/prerender-routes.mjs) so link
 * previews see them without JavaScript; this hook keeps the live
 * document in step during client-side navigation.
 *
 * While the site is a draft every page carries
 * `<meta name="robots" content="noindex, nofollow">` (brief §0).
 */
export type PageSeo = {
  title: string;
  description: string;
  /** Path, e.g. "/channels/email". Canonical is siteUrl + path. */
  path: string;
  ogTitle?: string;
  ogDescription?: string;
  /** JSON-LD blocks for this page, in addition to the site-wide Organization/WebSite blocks. */
  jsonLd?: object[];
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function canonicalUrl(path: string): string {
  return `${SITE_CONFIG.siteUrl}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
}

export function applySeo(seo: PageSeo): void {
  const url = canonicalUrl(seo.path);
  document.title = seo.title;
  setMeta("name", "description", seo.description);
  if (SITE_CONFIG.draft) setMeta("name", "robots", "noindex, nofollow");
  setLink("canonical", url);
  setMeta("property", "og:type", "website");
  setMeta("property", "og:site_name", SITE_CONFIG.name);
  setMeta("property", "og:url", url);
  setMeta("property", "og:title", seo.ogTitle ?? seo.title);
  setMeta("property", "og:description", seo.ogDescription ?? seo.description);
  setMeta("property", "og:locale", SITE_CONFIG.locale);
  setMeta("property", "og:image", `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seo.ogTitle ?? seo.title);
  setMeta("name", "twitter:description", seo.ogDescription ?? seo.description);
  setMeta("name", "twitter:image", `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`);

  document.head.querySelectorAll('script[data-seo="route"]').forEach((s) => s.remove());
  for (const block of seo.jsonLd ?? []) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.dataset.seo = "route";
    s.textContent = JSON.stringify(block);
    document.head.appendChild(s);
  }
}

export function useSeo(seo: PageSeo): void {
  useEffect(() => {
    applySeo(seo);
    track("page_view", { title: seo.title });
    return watchScrollDepth(seo.path);
    // The page's identity is its path; the rest is derived from it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seo.path]);
}

/** JSON-LD builders shared by the runtime hook and the prerender script. */
export function faqJsonLd(items: readonly { q: string; a: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: canonicalUrl(it.path) })),
  };
}
