import type { Lead } from "../../src/lib/lead-schema";
import type { Env } from "./env";

/**
 * Internal notification by email through Resend's HTTP API. Sent from the
 * worker, never from the browser; the API key is a worker secret.
 * Returns false (and logs) rather than throwing: a failed notification
 * must not turn a stored lead into a "failed" submission for the visitor.
 */
export async function notifyByEmail(env: Env, lead: Lead): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.NOTIFY_TO || !env.NOTIFY_FROM) return false;
  const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_term, lead.utm_content].filter(Boolean).join(" / ") || undefined;
  const rows: [string, string | undefined][] =
    lead.kind === "quote"
      ? [
          ["Company type", lead.company_type],
          ["Team size", lead.team_size],
          ["Goals", lead.goals.join(", ")],
          ["Email", lead.email],
        ]
      : [
          ["Name", lead.first_name],
          ["Email", lead.email],
        ];
  rows.push(["Page", lead.page_url], ["UTM", utm], ["Submitted", lead.submitted_at], ["Lead id", lead.id]);
  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .concat(lead.kind === "contact" ? ["", "What they would like to discuss:", lead.message] : [])
    .join("\n");
  const subject = lead.kind === "quote" ? `Quote request: ${lead.email} (${lead.company_type}, ${lead.team_size})` : `Enquiry: ${lead.first_name} <${lead.email}>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.NOTIFY_FROM,
      to: env.NOTIFY_TO.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject,
      text,
    }),
  });
  if (!res.ok) {
    console.error("notify: resend responded", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
