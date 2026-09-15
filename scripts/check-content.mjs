// Fails the build if any user-facing string in src/content/site.en.ts
// still contains a bracketed placeholder like "[Company name]" or
// "[NO-SHOW POLICY — founders to confirm]", or if pricing is in tiers
// mode while a tier price is still £TBC. Missing content must be omitted
// from the page, never shown as a note to the founders.
import { pathToFileURL } from "node:url";
import path from "node:path";

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

if (problems.length) {
  console.error("\nContent check failed — placeholders must be omitted, not shipped:\n");
  for (const p of problems) console.error("  •", p);
  console.error("");
  process.exit(1);
}
console.log("content ok: no placeholders in src/content/site.en.ts");
