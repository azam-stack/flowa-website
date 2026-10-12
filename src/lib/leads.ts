import { SITE_CONFIG } from "@/config/site";
import { getUtm, track } from "./analytics";
import { sanitizeLead, validateLead, type Attribution, type LeadErrors, type LeadInput } from "./lead-schema";

/**
 * Submits a contact or quote lead: POSTs JSON to the lead endpoint
 * (VITE_CONTACT_ENDPOINT, the Cloudflare Worker in backend/) and
 * reports the real outcome (timeout, network, server error, or success).
 * If no endpoint is configured at all,
 * the honest fallback: open the visitor's email client with the details
 * filled in, addressed to info@flowa.dk, and the UI says exactly that.
 */
export type SubmitResult =
  | { status: "sent"; id?: string }
  | { status: "mailto" }
  | { status: "invalid"; errors: LeadErrors }
  | { status: "error"; reason: "network" | "timeout" | "server" | "rate-limited"; retryable: boolean };

const TIMEOUT_MS = 12000;

/** The page URL, the timestamp and the UTM parameters captured on landing. */
export function attribution(): Attribution {
  const utm = getUtm();
  return {
    page_url: typeof window === "undefined" ? "/" : window.location.href.slice(0, 400),
    submitted_at: new Date().toISOString(),
    ...utm,
  };
}

export function buildLead(fields: Record<string, unknown>): LeadInput {
  return sanitizeLead({ ...fields, ...attribution() });
}

export async function submitLead(lead: LeadInput): Promise<SubmitResult> {
  const errors = validateLead(lead);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  track("form_submit", { kind: lead.kind });

  if (!SITE_CONFIG.leadEndpoint) {
    openMailto(lead);
    return { status: "mailto" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SITE_CONFIG.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as { id?: string; success?: string | boolean };
      track("form_success", { kind: lead.kind });
      return { status: "sent", id: data.id };
    }
    if (res.status === 429) {
      track("form_error", { reason: "rate-limited" });
      return { status: "error", reason: "rate-limited", retryable: false };
    }
    if (res.status === 400) {
      const data = (await res.json().catch(() => ({}))) as { errors?: LeadErrors };
      if (data.errors) return { status: "invalid", errors: data.errors };
    }
    track("form_error", { reason: "server", code: res.status });
    return { status: "error", reason: "server", retryable: true };
  } catch (e) {
    const timedOut = e instanceof DOMException && e.name === "AbortError";
    track("form_error", { reason: timedOut ? "timeout" : "network" });
    return { status: "error", reason: timedOut ? "timeout" : "network", retryable: true };
  } finally {
    clearTimeout(timer);
  }
}

function openMailto(lead: LeadInput): void {
  const subject = lead.kind === "quote" ? "Quote request" : `Enquiry from ${lead.first_name}`;
  const lines =
    lead.kind === "quote"
      ? [`Company type: ${lead.company_type}`, `Team size: ${lead.team_size}`, `Goals: ${lead.goals.join(", ")}`, `Email: ${lead.email}`]
      : [`Name: ${lead.first_name}`, `Email: ${lead.email}`, "", lead.message];
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
