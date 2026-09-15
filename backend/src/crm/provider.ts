import type { Lead } from "../../../src/lib/lead-schema";

/**
 * The integration layer. The handler calls every configured provider in
 * turn; the form never knows which CRM is behind it. To add HubSpot,
 * Pipedrive or Salesforce, implement this interface in a new file and
 * register it in handler.ts.
 */
export interface CRMProvider {
  readonly name: string;
  createLead(lead: Lead): Promise<void>;
}
