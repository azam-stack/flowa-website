import type { Lead } from "../../../src/lib/lead-schema";
import type { KVNamespace } from "../env";
import type { CRMProvider } from "./provider";

/**
 * Stores every lead in the worker's KV namespace. This is the record of
 * truth while no CRM is connected, and stays on as a backup afterwards.
 * Key: lead:<createdAt>:<id>, so a list by prefix is chronological.
 */
export class KvStoreProvider implements CRMProvider {
  readonly name = "kv-store";
  constructor(private readonly kv: KVNamespace) {}

  async createLead(lead: Lead): Promise<void> {
    await this.kv.put(`lead:${lead.createdAt}:${lead.id}`, JSON.stringify(lead), { metadata: { email: lead.email, company: lead.company } });
  }
}
