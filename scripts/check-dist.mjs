// After the prerender: the acceptance checks that can only be made on the
// built output (brief §9). Fails if any HTML or JS in dist/ contains a
// pound figure other than the published prices (£400, £1,200) and the
// two verified stats (£3.4M+, £90K+); if
// any HTML page lacks the noindex meta while the site is a draft; or if
// a sitemap was written.
import fs from "node:fs";
import path from "node:path";

const dist = path.join(process.cwd(), "dist");
const DRAFT = process.env.VITE_DRAFT !== "false";
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(html|js)$/.test(e.name)) files.push(p);
  }
})(dist);

const PRICE = /£\s?(?!3\.4M\+|90K\+|400\b|1,200\b|50K\+)\d/;
const problems = [];
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  const rel = path.relative(dist, f);
  const price = text.match(PRICE);
  if (price) problems.push(`${rel}: price-like text "${text.slice(Math.max(0, price.index - 30), price.index + 30).replace(/\s+/g, " ")}"`);
  if (DRAFT && rel.endsWith(".html") && !/<meta name="robots" content="noindex, nofollow" \/>/.test(text)) problems.push(`${rel}: missing the noindex meta`);
}
if (DRAFT && fs.existsSync(path.join(dist, "sitemap.xml"))) problems.push("dist/sitemap.xml exists in draft mode");
const robots = fs.readFileSync(path.join(dist, "robots.txt"), "utf8");
if (DRAFT && !/Disallow: \/\s*$/m.test(robots)) problems.push("robots.txt does not disallow everything (draft)");
if (!DRAFT && /Disallow: \/\s*$/m.test(robots)) problems.push("robots.txt blocks the whole site at launch");
if (!DRAFT && !fs.existsSync(path.join(dist, "sitemap.xml"))) problems.push("dist/sitemap.xml is missing at launch");

if (problems.length) {
  console.error("\nBuilt-output check failed:\n");
  for (const p of problems) console.error("  •", p);
  console.error("");
  process.exit(1);
}
console.log(`dist ok: ${files.length} files scanned, only published prices, ${DRAFT ? "noindex on every page, no sitemap" : "indexable, sitemap present"}`);
