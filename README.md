# Megumi Collections

Public catalog site displaying the clothing/accessory rental inventory (`clothing_inventory`
table) from the Megumi Beauty Studio admin dashboard. Read-only, no login required — anyone
with the link can browse the collection, filter by category, search, and view item details.

Data is read directly from the same Supabase project the dashboard uses. Items marked
`Rusak` (damaged) or flagged `butuh_perbaikan` (needs repair) are excluded from public view.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- `@supabase/supabase-js` (server-only reads, `SUPABASE_SERVICE_ROLE_KEY` never reaches the client)

## Development

```bash
npm install
cp .env.example .env.local   # fill in Supabase project URL + service role key
npm run dev
```

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase project URL as `megumi-dashboard` |
| `SUPABASE_SERVICE_ROLE_KEY` | Same service role key as `megumi-dashboard` (server-only, used only in Server Components) |

## Deploy

Any Next.js host (e.g. Vercel) works. Set the two env vars above in the hosting project's
dashboard — do not commit `.env.local`.
