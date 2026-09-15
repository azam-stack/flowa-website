# Flowa lead endpoint (Cloudflare Worker)

The website is static (GitHub Pages), so the form posts to this worker. It validates and sanitises the payload with the same schema the form uses (`src/lib/lead-schema.ts`), rate-limits by IP, drops honeypot hits, de-duplicates identical submissions within ten minutes, stores every lead in KV, forwards it to any configured CRM provider, and sends an internal notification through Resend. Secrets never reach the browser.

## Deploy

```bash
cd backend
npx wrangler login
npx wrangler kv namespace create LEADS      # put the id in wrangler.toml
npx wrangler secret put RESEND_API_KEY      # from resend.com, with flowa.dk verified as a sending domain
npx wrangler deploy                         # prints https://flowa-contact.<account>.workers.dev
```

Then set the site's build variable `VITE_CONTACT_ENDPOINT` to `https://flowa-contact.<account>.workers.dev/api/contact` (GitHub: repository → Settings → Secrets and variables → Actions → Variables). Until that variable is set, the form opens the visitor's email client and says so; it never claims a submission was sent.

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
