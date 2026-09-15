// Fails the build if any user-facing string in src/content/site.en.ts
// still contains a bracketed placeholder like "[Company name]" or
// "[NO-SHOW POLICY — founders to confirm]", or if pricing is in tiers
// mode while a tier price is still £TBC. Missing content must be omitted
// from the page, never shown as a note to the founders.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const file = path.resolve(process.cwd(), "src/content/site.en.ts");
const content = await import(pathToFileURL(file).href);

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

for (const [name, value] of Object.entries(content)) {
  if (name === "PRICE_TBC") continue;
  walk(value, name);
}

if (content.pricing?.mode === "tiers") {
  for (const tier of content.pricing.tiers) {
    if (tier.price === content.PRICE_TBC) problems.push(`pricing.tiers (${tier.name}): price is ${content.PRICE_TBC} while mode is "tiers"`);
  }
  if (content.pricing.tiers.some((t) => t.popular) && !content.pricing.popularBasis) {
    problems.push(`pricing: a tier is marked popular but popularBasis is null`);
  }
}

// The FAQPage JSON-LD in index.html must say exactly what the FAQ section
// says — search engines show the structured answers, visitors see the
// rendered ones, and the two drift silently otherwise.
const html = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf8");
const faqLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((m) => JSON.parse(m[1]))
  .find((d) => d["@type"] === "FAQPage");
if (!faqLd) {
  problems.push("index.html: no FAQPage JSON-LD block found");
} else {
  const ld = faqLd.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]);
  const site = content.faq.items.map((f) => [f.q, f.a]);
  if (JSON.stringify(ld) !== JSON.stringify(site)) {
    problems.push(`index.html FAQPage JSON-LD (${ld.length} items) does not match faq.items in site.en.ts (${site.length} items) — update the JSON-LD`);
    site.forEach(([q, a], i) => {
      if (!ld[i] || ld[i][0] !== q || ld[i][1] !== a) problems.push(`  faq.items[${i}] "${q}" differs`);
    });
  }
}

if (problems.length) {
  console.error("\nContent check failed — placeholders must be omitted, not shipped:\n");
  for (const p of problems) console.error("  •", p);
  console.error("");
  process.exit(1);
}
console.log("content ok: no placeholders in src/content/site.en.ts; FAQ JSON-LD in sync");
