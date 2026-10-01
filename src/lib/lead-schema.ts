/**
 * The two submissions the draft site makes, in one shape shared by the
 * forms (client), the submission client and the backend handler, so the
 * server enforces exactly what the forms promise. No framework imports:
 * this file is bundled into the worker too.
 *
 * - "contact": the short form in the contact band and on /demo and
 *   /contact (brief §4.10): first name, work email, message, consent.
 * - "quote": the pricing quiz (brief §6.3): company_type, team_size,
 *   goals[], email, consent, plus submitted_at, page_url and UTM.
 */
export const COMPANY_TYPES = ["B2B SaaS & tech", "Marketing or creative agency", "Consulting & services", "Other B2B"] as const;
export const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;
export const GOALS = ["Book more qualified meetings", "Reach specific target accounts", "Test outbound before committing", "Support or replace an SDR", "Expand into the UK market"] as const;

export type Attribution = {
  page_url: string;
  submitted_at: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type ContactInput = Attribution & {
  kind: "contact";
  first_name: string;
  email: string;
  message: string;
  consent: true;
};

export type QuoteInput = Attribution & {
  kind: "quote";
  company_type: string;
  team_size: string;
  goals: string[];
  email: string;
  consent: true;
};

/** What the browser sends. The server adds id and createdAt and re-validates. */
export type LeadInput = ContactInput | QuoteInput;
export type Lead = LeadInput & { id: string; createdAt: string };

export const LIMITS = { short: 120, email: 254, message: 2000, url: 400 } as const;

export type LeadErrorCode = "required" | "email" | "work_email" | "invalid";
export type LeadErrors = Partial<Record<"first_name" | "email" | "message" | "consent" | "company_type" | "team_size" | "goals" | "kind", LeadErrorCode>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** C0 control characters except tab/newline, plus DEL. */
const CONTROL = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/**
 * Free mailbox domains the quote quiz rejects with "Please use your work
 * email" (brief §6.2). Subdomains match too.
 */
export const FREE_EMAIL_DOMAINS = [
  "gmail.com", "googlemail.com", "hotmail.com", "hotmail.co.uk", "hotmail.dk", "outlook.com", "outlook.dk", "live.com", "live.co.uk", "live.dk", "msn.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.dk", "ymail.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com", "pm.me",
  "gmx.com", "gmx.de", "gmx.net", "mail.com", "yandex.com", "yandex.ru", "zoho.com", "fastmail.com", "hey.com", "tutanota.com", "mail.ru",
] as const;

export function isFreeEmailDomain(email: string): boolean {
  const at = email.lastIndexOf("@");
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase();
  return FREE_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

/** Trims, collapses whitespace, strips control characters and caps length. Never throws. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Like clean() but keeps line breaks, for the message field. */
function cleanMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(CONTROL, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

function attribution(raw: Record<string, unknown>): Attribution {
  const opt = (k: string) => {
    const v = clean(raw[k], LIMITS.short);
    return v ? v : undefined;
  };
  return {
    page_url: clean(raw.page_url, LIMITS.url) || "/",
    submitted_at: clean(raw.submitted_at, 40) || new Date().toISOString(),
    utm_source: opt("utm_source"),
    utm_medium: opt("utm_medium"),
    utm_campaign: opt("utm_campaign"),
    utm_term: opt("utm_term"),
    utm_content: opt("utm_content"),
  };
}

/** Returns a sanitised copy of the input. Unknown keys are dropped. Consent is only ever `true` after validation. */
export function sanitizeLead(raw: Record<string, unknown>): LeadInput {
  const consent = raw.consent === true || raw.consent === "true";
  if (raw.kind === "quote") {
    const goals = Array.isArray(raw.goals) ? raw.goals.map((g) => clean(g, LIMITS.short)).filter(Boolean).slice(0, GOALS.length) : [];
    return {
      kind: "quote",
      company_type: clean(raw.company_type, LIMITS.short),
      team_size: clean(raw.team_size, 20),
      goals,
      email: clean(raw.email, LIMITS.email).toLowerCase(),
      consent: consent as true,
      ...attribution(raw),
    };
  }
  return {
    kind: "contact",
    first_name: clean(raw.first_name, LIMITS.short),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    message: cleanMultiline(raw.message, LIMITS.message),
    consent: consent as true,
    ...attribution(raw),
  };
}

/** Validates a sanitised lead. An empty object means valid. */
export function validateLead(lead: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (!lead.email) errors.email = "required";
  else if (!EMAIL.test(lead.email)) errors.email = "email";
  if (lead.consent !== true) errors.consent = "required";
  if (lead.kind === "quote") {
    if (!(COMPANY_TYPES as readonly string[]).includes(lead.company_type)) errors.company_type = "invalid";
    if (!(TEAM_SIZES as readonly string[]).includes(lead.team_size)) errors.team_size = "invalid";
    if (!lead.goals.length || lead.goals.some((g) => !(GOALS as readonly string[]).includes(g))) errors.goals = "invalid";
    if (lead.email && !errors.email && isFreeEmailDomain(lead.email)) errors.email = "work_email";
  } else if (lead.kind === "contact") {
    if (!lead.first_name) errors.first_name = "required";
    if (!lead.message) errors.message = "required";
  } else {
    errors.kind = "invalid";
  }
  return errors;
}

/** A stable key for duplicate detection: same kind and email within a window. */
export function leadDedupeKey(lead: LeadInput): string {
  return `${lead.kind}|${lead.email}`;
}
