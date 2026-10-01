// Fails the build if the content modules break one of the brief's rules:
//  - a bracketed placeholder other than a [CONFIRM …] marker (brief §0:
//    [CONFIRM] placeholders stay exactly as written; anything else is a
//    mistake), and any placeholder at all once VITE_DRAFT=false;
//  - a price, a price range or a "from £…" (brief §0.5, §6.3): the only
//    pound figures allowed are the two verified track-record stats;
//  - a package name (brief §5: Pilot / Core / Plus / Scale are removed);
//  - an em dash in body copy (brief §1).
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import fs from "node:fs";

const root = process.cwd();
const DRAFT = process.env.VITE_DRAFT !== "false";
const tmp = path.join(root, "node_modules", ".flowa-content-check.mjs");
fs.writeFileSync(
  path.join(root, "node_modules", ".flowa-content-entry.ts"),
  `export * as chrome from "@/content/frank/chrome";
export * as home from "@/content/frank/home";
export * as pages from "@/content/frank/pages";
export * as pricing from "@/content/frank/pricing";
export * as form from "@/content/frank/form";
export * as clients from "@/content/frank/clients";
export * as legal from "@/content/legal";`,
);
await build({
  entryPoints: [path.join(root, "node_modules", ".flowa-content-entry.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: tmp,
  alias: { "@": path.join(root, "src") },
  define: { "import.meta.env": JSON.stringify({ BASE_URL: "/", DEV: false, PROD: true, MODE: "production" }) },
  logLevel: "silent",
});
const content = await import(pathToFileURL(tmp).href);
fs.rmSync(tmp, { force: true });
fs.rmSync(path.join(root, "node_modules", ".flowa-content-entry.ts"), { force: true });

const PLACEHOLDER = /\[[^\]]+\]/g;
const CONFIRM = /^\[CONFIRM\b[^\]]*\]$/;
const PRICE = /£\s?\d|\bfrom £|\d\s?(?:GBP|DKK|EUR)\b|\bper month\b|\/month\b/i;
const ALLOWED_STATS = ["£3.4M+", "£90K+"];
const PACKAGE = /\b(Pilot|Core|Plus|Scale)\b/;
const EM_DASH = /—/;

const problems = [];
const confirms = [];

function walk(value, trail, { packages = true } = {}) {
  if (typeof value === "string") {
    for (const m of value.match(PLACEHOLDER) ?? []) {
      if (CONFIRM.test(m)) confirms.push(`${trail}: ${m}`);
      else problems.push(`${trail}: placeholder "${m}"`);
    }
    if (!ALLOWED_STATS.includes(value) && PRICE.test(value)) problems.push(`${trail}: contains a price: "${value.slice(0, 80)}"`);
    if (packages && PACKAGE.test(value)) problems.push(`${trail}: contains a package name: "${value.slice(0, 80)}"`);
    if (EM_DASH.test(value)) problems.push(`${trail}: em dash in copy: "${value.slice(0, 80)}"`);
  } else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${trail}[${i}]`, { packages }));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) walk(v, trail ? `${trail}.${k}` : k, { packages });
}

for (const name of ["chrome", "home", "pages", "pricing", "form", "clients"]) walk(content[name], name);
walk(content.legal, "legal");

if (!DRAFT && confirms.length) for (const c of confirms) problems.push(`${c} must be resolved before launch (VITE_DRAFT=false)`);

if (problems.length) {
  console.error("\nContent check failed:\n");
  for (const p of problems) console.error("  •", p);
  console.error("");
  process.exit(1);
}
console.log(`content ok: no prices, no package names, no stray placeholders; ${confirms.length} [CONFIRM] item(s) left as written${DRAFT ? " (draft)" : ""}`);
