import { sanitizeLead, validateLead, leadDedupeKey, type Lead } from "../../src/lib/lead-schema";
import type { Env } from "./env";
import type { CRMProvider } from "./crm/provider";
import { KvStoreProvider } from "./crm/kv-store";
import { WebhookProvider } from "./crm/webhook";
import { notifyByEmail } from "./notify";
import { rateLimited, isDuplicate } from "./rate-limit";

/**
 * POST /api/contact
 *
 * 1. CORS: only the configured origins.
 * 2. Rate limit per IP.
 * 3. Parse and sanitise the payload (shared schema with the form).
 * 4. Validate; 400 with field errors if invalid.
 * 5. Honeypot: silently accept.
 * 6. Duplicate within 10 minutes: 200 with `duplicate: true`, not stored twice.
 * 7. Add id, timestamp; source page, service and UTM come from the client and were sanitised.
 * 8. Store (KV) and forward to every configured CRM provider.
 * 9. Notify by email (failure logged, not surfaced to the visitor).
 * 10. 200 { ok: true, id }.
 */
const WINDOW_SECONDS = 600;

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const ok = origin && allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin : allowed[0] || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers } });
}

function providers(env: Env): CRMProvider[] {
  const list: CRMProvider[] = [new KvStoreProvider(env.LEADS)];
  if (env.CRM_WEBHOOK_URL) list.push(new WebhookProvider(env.CRM_WEBHOOK_URL, env.CRM_WEBHOOK_TOKEN));
  return list;
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  const origin = request.headers.get("Origin");
  const cors = corsHeaders(origin, env);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, cors);
  if (cors["Access-Control-Allow-Origin"] !== origin) return json({ ok: false, error: "origin" }, 403, cors);

  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
  const limit = Number(env.RATE_LIMIT || "5");
  if (await rateLimited(env.LEADS, ip, limit, WINDOW_SECONDS)) return json({ ok: false, error: "rate-limited" }, 429, cors);

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
    if (!raw || typeof raw !== "object") throw new Error("not an object");
  } catch {
    return json({ ok: false, error: "payload" }, 400, cors);
  }

  // Honeypot field from the form: a filled value means a bot. Accept quietly, store nothing.
  if (typeof raw.company_website_confirm === "string" && raw.company_website_confirm.trim()) return json({ ok: true, id: crypto.randomUUID() }, 200, cors);

  const input = sanitizeLead(raw);
  const errors = validateLead(input);
  if (Object.keys(errors).length) return json({ ok: false, error: "validation", errors }, 400, cors);

  if (await isDuplicate(env.LEADS, leadDedupeKey(input), WINDOW_SECONDS)) return json({ ok: true, duplicate: true }, 200, cors);

  const lead: Lead = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...input };

  const results = await Promise.allSettled(providers(env).map((p) => p.createLead(lead)));
  const stored = results[0].status === "fulfilled";
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`provider ${i} failed`, r.reason);
  });
  if (!stored) return json({ ok: false, error: "storage" }, 500, cors);

  await notifyByEmail(env, lead);
  return json({ ok: true, id: lead.id }, 200, cors);
}
