import type { Env } from "./env";
import { handleContact } from "./handler";

/**
 * Cloudflare Worker entry. Routes:
 *   POST /api/contact   the lead endpoint
 *   GET  /api/health    liveness
 * Set VITE_CONTACT_ENDPOINT on the site to this worker's /api/contact URL.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    if (url.pathname === "/api/health") return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
    return new Response("Not found", { status: 404 });
  },
};
