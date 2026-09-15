// Fails the build if any user-facing string in the content modules still
// contains a bracketed placeholder like "[Company name]", if an internal
// pricing figure leaks into public content, if a statistic claims to be
// a benchmark without naming its source, or if a case study would show
// metrics without being verified. Missing content must be omitted from
// the page, never shown as a note to the founders.
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import fs from "node:fs";

const root = process.cwd();
const tmp = path.join(root, "node_modules", ".flowa-content-check.mjs");
fs.writeFileSync(
  path.join(root, "node_modules", ".flowa-content-entry.ts"),
  `export * as site from "@/content/site.en";
export * as hub from "@/content/services-hub";
export * as cases from "@/content/cases";
export * as demo from "@/content/demo";
export { services } from "@/content/services";
export * as pricing from "@/content/pricing";`,
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

const PLACEHOLDER = /\[[^\]]+\]/;
const problems = [];

function walk(value, trail) {
  if (typeof value === "string") {
    if (PLACEHOLDER.test(value)) problems.push(`${trail}: "${value.slice(0, 70)}"`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${trail}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, trail ? `${trail}.${k}` : k);
  }
}

for (const [name, value] of Object.entries(content.site)) walk(value, `site.${name}`);
walk(content.pricing, "pricing");
walk(content.hub, "servicesHub");
walk(content.cases, "cases");
walk(content.demo, "demo");
walk(content.services, "services");

// Pricing: one public source of truth. Scale has no public price, and no internal
// starting figure may appear anywhere in the content.
const INTERNAL = /3[,.]?600/;
function scan(value, trail) {
  if (typeof value === "string") {
    if (INTERNAL.test(value)) problems.push(`${trail}: contains an internal pricing figure`);
  } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${trail}[${i}]`));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, `${trail}.${k}`);
}
scan(content.pricing, "pricing");
scan(content.site, "site");
scan(content.services, "services");
const scale = content.pricing.packages.find((p) => p.id === "scale");
if (scale && scale.monthly !== null) problems.push("pricing: Scale must not carry a public monthly price");
for (const p of content.pricing.packages) {
  if (typeof p.setup !== "number" || (p.monthly !== null && typeof p.monthly !== "number")) problems.push(`pricing: ${p.id} has a malformed price`);
}
for (const f of content.pricing.pricingFeatures) {
  for (const id of ["pilot", "core", "plus", "scale"]) if (typeof f[id] !== "boolean") problems.push(`pricing feature ${f.id}: missing ${id}`);
  if (/linkedin/i.test(f.name)) problems.push(`pricing feature ${f.id}: LinkedIn is not part of the package table`);
}

// Statistics: a benchmark must name its source; a verified stat must have a value or be null (pending), never a placeholder word.
for (const s of content.services) {
  for (const stat of s.stats.items) {
    if (stat.sourceType === "benchmark" && !stat.source) problems.push(`services/${s.slug} stat "${stat.label}": benchmark without a source`);
    if (!["verified", "benchmark", "target", "process"].includes(stat.sourceType)) problems.push(`services/${s.slug} stat "${stat.label}": unknown sourceType`);
    if (typeof stat.value === "string" && /x%|tbd|tbc|\?/i.test(stat.value)) problems.push(`services/${s.slug} stat "${stat.label}": value "${stat.value}" is a placeholder; use null until verified`);
  }
  if (s.system) {
    for (const n of s.system.nodes) if (!["current", "supporting", "future"].includes(n.status)) problems.push(`services/${s.slug} node "${n.label}": unknown status`);
  }
}

// Cases: metrics only with verified === true is enforced by the component; here we refuse a verified case with no client-approved content.
for (const c of content.cases.caseStudies) {
  if (c.verified && (!c.testimonial || !c.outcomes.length)) problems.push(`cases: "${c.client}" is marked verified but has no outcomes or testimonial`);
}

if (problems.length) {
  console.error("\nContent check failed — placeholders must be omitted, not shipped:\n");
  for (const p of problems) console.error("  •", p);
  console.error("");
  process.exit(1);
}
console.log(`content ok: no placeholders across site, services (${content.services.length}), hub, cases, demo, pricing (${content.pricing.packages.length} packages)`);
