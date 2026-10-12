// After `vite build`: writes one static HTML file per route with that
// route's title, description, canonical, Open Graph/Twitter tags and
// JSON-LD, so every URL loads directly (GitHub Pages serves
// /pricing/index.html for /pricing) and link previews see the right head
// without JavaScript. Also writes a stand-in page for every redirect and
// 404.html (a copy of the home shell) as the SPA fallback.
//
// DRAFT MODE (the default): every page, redirect and the 404 carry
// <meta name="robots" content="noindex, nofollow"> and no sitemap is
// written (brief §0). VITE_DRAFT=false lifts the noindex at launch.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const dist = path.join(root, "dist");
const base = (process.env.VITE_BASE || "/").replace(/\/$/, "");
const DRAFT = process.env.VITE_DRAFT !== "false";
const SITE = (process.env.VITE_SITE_URL || "https://azam-stack.github.io/flowa-website-lab").replace(/\/$/, "");
const SITE_NAME = "Flowa";
const OG_IMAGE = `${SITE}/og-image.png`;

// Bundle the TypeScript content modules for Node with esbuild (Vite's own bundler).
const tmp = path.join(root, "node_modules", ".flowa-routes.mjs");
await build({
  entryPoints: [path.join(root, "scripts", "routes.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: tmp,
  alias: { "@": path.join(root, "src") },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: base + "/", DEV: false, PROD: true, MODE: "production", VITE_SITE_URL: SITE, VITE_DRAFT: DRAFT ? "true" : "false" }) },
  logLevel: "silent",
});
const { routes, redirects } = await import(pathToFileURL(tmp).href);

const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const canonical = (p) => `${SITE}${p === "/" ? "/" : p.replace(/\/$/, "")}`;
const ROBOTS = DRAFT ? [`<meta name="robots" content="noindex, nofollow" />`] : [];

function headFor(r) {
  const url = canonical(r.path);
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    ...ROBOTS,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(r.ogTitle ?? r.title)}" />`,
    `<meta property="og:description" content="${esc(r.ogDescription ?? r.description)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Meet Frank, Flowa's AI outbound agent" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(r.ogTitle ?? r.title)}" />`,
    `<meta name="twitter:description" content="${esc(r.ogDescription ?? r.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...(r.jsonLd ?? []).map((b) => `<script type="application/ld+json" data-seo="route">${JSON.stringify(b).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.map((t) => `    ${t}`).join("\n");
}

function render(r) {
  return shell.replace(/<!-- route-head -->[\s\S]*?<!-- \/route-head -->/, `<!-- route-head -->\n${headFor(r)}\n    <!-- /route-head -->`);
}

if (!/<!-- route-head -->/.test(shell)) {
  console.error("prerender: index.html has no <!-- route-head --> markers");
  process.exit(1);
}

let count = 0;
for (const r of routes) {
  const html = render(r);
  const target = r.path === "/" ? path.join(dist, "index.html") : path.join(dist, r.path.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  count++;
}
// Old URLs: a static stand-in for a 301. Canonical points at the new page,
// robots is noindex, and a meta refresh moves anyone who lands on it.
for (const r of redirects ?? []) {
  const to = canonical(r.to);
  const head = [`<title>Moved | ${SITE_NAME}</title>`, `<meta name="robots" content="noindex, nofollow" />`, `<link rel="canonical" href="${to}" />`, `<meta http-equiv="refresh" content="0; url=${base}${r.to}" />`].map((t) => `    ${t}`).join("\n");
  const html = shell.replace(/<!-- route-head -->[\s\S]*?<!-- \/route-head -->/, `<!-- route-head -->\n${head}\n    <!-- /route-head -->`);
  const target = path.join(dist, r.from.replace(/^\//, ""), "index.html");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

// SPA fallback for paths that are not prerendered (GitHub Pages serves 404.html with a 404 status; the router then renders the right page or its own 404).
fs.writeFileSync(path.join(dist, "404.html"), render({ path: "/", title: SITE_NAME, description: routes[0].description }));

// No sitemap while the site is a draft. At launch, flip VITE_DRAFT=false and this writes one.
const sitemapPath = path.join(dist, "sitemap.xml");
if (DRAFT) {
  fs.rmSync(sitemapPath, { force: true });
} else {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url>\n    <loc>${canonical(r.path)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.path === "/" ? "weekly" : "monthly"}</changefreq>\n    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`)
    .join("\n")}\n</urlset>\n`;
  fs.writeFileSync(sitemapPath, sitemap);
}
fs.rmSync(tmp, { force: true });
console.log(`prerender: ${count} routes written, ${(redirects ?? []).length} redirect(s), 404.html${DRAFT ? ", draft mode (noindex, no sitemap)" : ", sitemap.xml"}`);
