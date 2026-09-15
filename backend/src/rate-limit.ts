import type { KVNamespace } from "./env";

/**
 * Fixed-window rate limit per client IP, stored in KV: `limit` requests
 * per `windowSeconds`. Coarse but enough to stop a script hammering the
 * endpoint; the honeypot and the duplicate check do the rest.
 */
export async function rateLimited(kv: KVNamespace, ip: string, limit: number, windowSeconds: number): Promise<boolean> {
  const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
  const key = `rl:${ip}:${bucket}`;
  const current = Number((await kv.get(key)) || "0");
  if (current >= limit) return true;
  await kv.put(key, String(current + 1), { expirationTtl: windowSeconds + 60 });
  return false;
}

/** Same email + company within the window is one request, not two. */
export async function isDuplicate(kv: KVNamespace, dedupeKey: string, windowSeconds: number): Promise<boolean> {
  const key = `dedupe:${dedupeKey}`;
  if (await kv.get(key)) return true;
  await kv.put(key, "1", { expirationTtl: windowSeconds });
  return false;
}
