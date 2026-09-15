/**
 * The lead: one shape shared by the form (client), the submission
 * client and the backend handler. Validation and sanitisation live here
 * so the server enforces exactly what the form promises. No framework
 * imports: this file is bundled into the worker too.
 */
export type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  goal?: string;
  preferredTiming?: string;

  sourcePage: string;
  service?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;

  createdAt: string;
};

/** What the browser sends. The server adds id and createdAt and re-validates. */
export type LeadInput = Omit<Lead, "id" | "createdAt">;

export const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"] as const;
export const TIMINGS = ["This week", "Next week", "Within a month", "Just exploring"] as const;

export const LIMITS = {
  short: 120,
  email: 254,
  phone: 40,
  website: 200,
  goal: 2000,
} as const;

export type LeadField = keyof LeadInput;
export type LeadErrorCode = "required" | "email" | "phone" | "website" | "invalid";
export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits, spaces, +, (), -, . with at least 6 digits in total. */
const PHONE = /^[+()\d\s.-]{6,40}$/;
const WEBSITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}([/?#][^\s]*)?$/i;
/** C0 control characters except tab/newline, plus DEL. */
const CONTROL = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

/** Trims, collapses whitespace, strips control characters and caps length. Never throws. */
export function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Returns a sanitised copy of the input. Unknown keys are dropped. */
export function sanitizeLead(raw: Record<string, unknown>): LeadInput {
  const s = (k: string, max: number = LIMITS.short) => clean(raw[k], max);
  const opt = (k: string, max: number = LIMITS.short) => {
    const v = s(k, max);
    return v ? v : undefined;
  };
  return {
    firstName: s("firstName"),
    lastName: s("lastName"),
    email: s("email", LIMITS.email).toLowerCase(),
    phone: opt("phone", LIMITS.phone),
    company: s("company"),
    jobTitle: opt("jobTitle"),
    companySize: opt("companySize", 20),
    industry: opt("industry"),
    website: opt("website", LIMITS.website),
    goal: opt("goal", LIMITS.goal),
    preferredTiming: opt("preferredTiming", 40),
    sourcePage: s("sourcePage", LIMITS.website) || "/",
    service: opt("service", 60),
    utmSource: opt("utmSource"),
    utmMedium: opt("utmMedium"),
    utmCampaign: opt("utmCampaign"),
    utmTerm: opt("utmTerm"),
    utmContent: opt("utmContent"),
  };
}

/** Validates a sanitised lead. An empty object means valid. */
export function validateLead(lead: LeadInput): LeadErrors {
  const errors: LeadErrors = {};
  if (!lead.firstName) errors.firstName = "required";
  if (!lead.lastName) errors.lastName = "required";
  if (!lead.company) errors.company = "required";
  if (!lead.email) errors.email = "required";
  else if (!EMAIL.test(lead.email)) errors.email = "email";
  if (lead.phone && (!PHONE.test(lead.phone) || (lead.phone.match(/\d/g) || []).length < 6)) errors.phone = "phone";
  if (lead.website && !WEBSITE.test(lead.website)) errors.website = "website";
  if (lead.companySize && !(COMPANY_SIZES as readonly string[]).includes(lead.companySize)) errors.companySize = "invalid";
  if (lead.preferredTiming && !(TIMINGS as readonly string[]).includes(lead.preferredTiming)) errors.preferredTiming = "invalid";
  return errors;
}

/** A stable key for duplicate detection: same email and company within a window. */
export function leadDedupeKey(lead: LeadInput): string {
  return `${lead.email}|${lead.company.toLowerCase()}`;
}
