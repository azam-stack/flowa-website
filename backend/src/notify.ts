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
  const rows: [string, string | undefined][] = [
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["Company", lead.company],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Job title", lead.jobTitle],
    ["Company size", lead.companySize],
    ["Industry", lead.industry],
    ["Website", lead.website],
    ["Preferred timing", lead.preferredTiming],
    ["Service", lead.service],
    ["Source page", lead.sourcePage],
    ["UTM", [lead.utmSource, lead.utmMedium, lead.utmCampaign, lead.utmTerm, lead.utmContent].filter(Boolean).join(" / ") || undefined],
    ["Submitted", lead.createdAt],
    ["Lead id", lead.id],
  ];
  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .concat(lead.goal ? ["", "What they want to achieve:", lead.goal] : [])
    .join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.NOTIFY_FROM,
      to: env.NOTIFY_TO.split(",").map((s) => s.trim()),
      reply_to: lead.email,
      subject: `New lead: ${lead.company} (${lead.firstName} ${lead.lastName})${lead.service ? ` · ${lead.service}` : ""}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("notify: resend responded", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}
