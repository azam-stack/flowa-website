/**
 * Minimal Cloudflare Workers types so the worker typechecks without the
 * full workers-types package. If you install @cloudflare/workers-types,
 * delete this file.
 */
export interface KVNamespace {
  get(key: string, type?: "text"): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number; metadata?: unknown }): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}

/** Cloudflare Workers AI binding ([ai] binding = "AI" in wrangler.toml). */
export interface Ai {
  run(model: string, input: Record<string, unknown>): Promise<{ response?: string }>;
}

export interface Env {
  /** Workers AI: answers the "Ask a question" box for free (daily free allocation). */
  AI?: Ai;
  /** Leads and rate-limit counters. Bind a KV namespace named LEADS in wrangler.toml. */
  LEADS: KVNamespace;
  /** Comma-separated list of allowed origins, e.g. "https://flowa.dk,https://azam-stack.github.io". */
  ALLOWED_ORIGINS: string;
  /** Where the internal notification goes. */
  NOTIFY_TO: string;
  /** The sender address on a domain verified with the mail provider. */
  NOTIFY_FROM: string;
  /** Resend API key (https://resend.com). Secret: `wrangler secret put RESEND_API_KEY`. */
  RESEND_API_KEY?: string;
  /** Optional: a webhook (Zapier, Make, n8n, a CRM's inbound endpoint) that receives every lead as JSON. */
  CRM_WEBHOOK_URL?: string;
  /** Optional: bearer token sent with the webhook. */
  CRM_WEBHOOK_TOKEN?: string;
  /** Optional: an Anthropic API key. If set, /api/ask uses Claude instead of Workers AI. */
  ANTHROPIC_API_KEY?: string;
  /** Claude model, only used with ANTHROPIC_API_KEY. Default "claude-haiku-4-5". */
  ASK_MODEL?: string;
  /** Workers AI model. Default "@cf/meta/llama-3.3-70b-instruct-fp8-fast". */
  ASK_WORKERS_MODEL?: string;
  /** /api/ask requests per IP per 10 minutes. Default 8. */
  ASK_RATE_LIMIT?: string;
  /** /api/ask requests per day across all visitors. Default 120 (stays inside the Workers AI free allocation). */
  ASK_DAILY_CAP?: string;
  /** Requests per IP per 10 minutes. Default 5. */
  RATE_LIMIT?: string;
}
