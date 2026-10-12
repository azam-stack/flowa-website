# FLOWA lead endpoint (Cloudflare Worker)

The website is static (GitHub Pages), so the contact form and the pricing quote quiz post to this worker. Two payload kinds share one schema: `contact` and `quote` (see `src/lib/lead-schema.ts`). For the Frank draft, deploy a **separate** test worker (its own name and KV namespace) and set it as `VITE_CONTACT_ENDPOINT` on this lab repo or in `.env.local`; at launch the live repo's existing `VITE_CONTACT_ENDPOINT` takes over. It validates and sanitises the payload with the same schema the form uses (`src/lib/lead-schema.ts`), rate-limits by IP, drops honeypot hits, de-duplicates identical submissions within ten minutes, stores every lead in KV, forwards it to any configured CRM provider, and sends an internal notification through Resend. Secrets never reach the browser.

## Deploy

```bash
cd backend
npx wrangler login
npx wrangler kv namespace create LEADS      # put the id in wrangler.toml
npx wrangler secret put RESEND_API_KEY      # from resend.com, with flowa.dk verified as a sending domain
npx wrangler deploy                         # prints https://flowa-contact.<account>.workers.dev
```

Then set the draft's build variable `VITE_CONTACT_ENDPOINT` to `https://<draft-worker>.<account>.workers.dev/api/contact` (GitHub: repository → Settings → Secrets and variables → Actions → Variables). Until that variable is set, both forms open the visitor's email client and say so; they never claim a submission was sent.

## CRM

`src/crm/provider.ts` is the interface. `KvStoreProvider` always runs; `WebhookProvider` runs when `CRM_WEBHOOK_URL` is set and posts the lead as JSON (HubSpot, Pipedrive and Salesforce all accept this through Zapier/Make/n8n or their own inbound endpoints). A native provider is a new class implementing `createLead(lead)` and one line in `handler.ts`.

## Reading leads

```bash
npx wrangler kv key list --binding LEADS --prefix lead:
npx wrangler kv key get --binding LEADS "lead:<createdAt>:<id>"
```

## Typecheck

```bash
npx tsc -p backend/tsconfig.json
```
