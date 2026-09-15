import { SITE_CONFIG } from "@/config/site";
import { getUtm, track } from "./analytics";
import { sanitizeLead, validateLead, type LeadErrors, type LeadInput } from "./lead-schema";
import { finalCta } from "@/content/site.en";

/**
 * Submits a lead. With VITE_CONTACT_ENDPOINT set, POSTs JSON and reports
 * the real outcome (timeout, network, server error, or success). Without
 * it, the honest fallback: open the visitor's email client with the
 * details filled in, and the UI says exactly that.
 */
export type SubmitResult =
  | { status: "sent"; id?: string }
  | { status: "mailto" }
  | { status: "invalid"; errors: LeadErrors }
  | { status: "error"; reason: "network" | "timeout" | "server" | "rate-limited"; retryable: boolean };

const TIMEOUT_MS = 12000;

export function buildLead(fields: Record<string, unknown>, service?: string): LeadInput {
  const utm = getUtm();
  return sanitizeLead({
    ...fields,
    sourcePage: typeof window === "undefined" ? "/" : window.location.pathname + window.location.search,
    service,
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    utmTerm: utm.utm_term,
    utmContent: utm.utm_content,
  });
}

export async function submitLead(lead: LeadInput): Promise<SubmitResult> {
  const errors = validateLead(lead);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  track("form_submit", { service: lead.service, page: lead.sourcePage });

  if (!SITE_CONFIG.contactEndpoint) {
    openMailto(lead);
    return { status: "mailto" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(SITE_CONFIG.contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (res.ok) {
      const data = (await res.json().catch(() => ({}))) as { id?: string };
      track("form_success", { service: lead.service, page: lead.sourcePage });
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
  const subject = `Book a call - ${lead.company}`;
  const lines = [
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Company: ${lead.company}`,
    lead.jobTitle ? `Job title: ${lead.jobTitle}` : "",
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.companySize ? `Company size: ${lead.companySize}` : "",
    lead.industry ? `Industry: ${lead.industry}` : "",
    lead.website ? `Website: ${lead.website}` : "",
    lead.preferredTiming ? `Preferred timing: ${lead.preferredTiming}` : "",
    lead.service ? `Service: ${lead.service}` : "",
    "",
    lead.goal ? `What I'm looking to achieve:\n${lead.goal}` : "",
  ].filter((l) => l !== "");
  window.location.href = `mailto:${finalCta.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
