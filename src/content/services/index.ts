import type { ServiceDefinition } from "../types";
import { appointmentSetting } from "./appointment-setting";
import { linkedinOutreach } from "./linkedin-outreach";
import { coldEmail } from "./cold-email";

/**
 * The service registry. Order here is the order everywhere: navigation,
 * the hub, the footer, related-service lists. To add a service, add its
 * data file and register it here; the routes, menus and pages follow.
 *
 * Cold calling was retired when Flowa stopped doing phone outreach. Its
 * URL is kept alive as a redirect to /why-flowa (scripts/routes.ts), and
 * LinkedIn outreach took its place in the line-up.
 *
 * Planned services (lead research as a standalone page, multichannel
 * outreach) can be registered with `status: "planned"` once their
 * content exists; nothing is listed until it is real.
 */
export const services: ServiceDefinition[] = [appointmentSetting, linkedinOutreach, coldEmail];

export const liveServices = services.filter((s) => s.status === "live");

export function getService(slug: string | undefined): ServiceDefinition | undefined {
  return liveServices.find((s) => s.slug === slug);
}

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}
