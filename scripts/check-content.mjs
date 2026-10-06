// Fails the build if the content modules break one of the brief's rules:
//  - a bracketed placeholder other than a [CONFIRM …] marker (brief §0:
//    [CONFIRM] placeholders stay exactly as written; anything else is a
//    mistake), and any placeholder at all once VITE_DRAFT=false;
//  - a pound figure other than the published prices (£400, £1,200) and
//    the two verified track-record stats (the onboarding fee amount is
//    never published; Ahmed and Anton tell clients themselves);
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
const MONEY = /£\s?[\d.,]+\s?[KMkm]?\+?|\d\s?(?:GBP|DKK|EUR)\b/g;
const ALLOWED_MONEY = ["£3.4M+", "£90K+", "£400", "£1,200", "£50K+"];
const EM_DASH = /—/;

const problems = [];
const confirms = [];

function walk(value, trail) {
  if (typeof value === "string") {
    for (const m of value.match(PLACEHOLDER) ?? []) {
      if (CONFIRM.test(m)) confirms.push(`${trail}: ${m}`);
      else problems.push(`${trail}: placeholder "${m}"`);
    }
    for (const m of value.match(MONEY) ?? []) if (!ALLOWED_MONEY.includes(m.replace(/\s/g, "").replace(/[.,]+$/, ""))) problems.push(`${trail}: unpublished price "${m}": "${value.slice(0, 80)}"`);
    if (EM_DASH.test(value)) problems.push(`${trail}: em dash in copy: "${value.slice(0, 80)}"`);
  } else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${trail}[${i}]`));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) walk(v, trail ? `${trail}.${k}` : k);
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
console.log(`content ok: only published prices, no stray placeholders; ${confirms.length} [CONFIRM] item(s) left as written${DRAFT ? " (draft)" : ""}`);
