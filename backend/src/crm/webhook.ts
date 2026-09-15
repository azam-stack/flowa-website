import type { Lead } from "../../../src/lib/lead-schema";
import type { CRMProvider } from "./provider";

/**
 * Posts the lead as JSON to a webhook. Covers most CRMs today (HubSpot,
 * Pipedrive and Salesforce all accept inbound webhooks through Zapier,
 * Make or n8n, and several natively) without a vendor SDK in the worker.
 */
export class WebhookProvider implements CRMProvider {
  readonly name = "webhook";
  constructor(
    private readonly url: string,
    private readonly token?: string,
  ) {}

  async createLead(lead: Lead): Promise<void> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  }
}
