# Dialyatech / Medehub CRM

Zoho-style full-stack CRM for Medehub marketing, onboarding, sales, follow-up, WhatsApp, campaign, team, and reporting workflows.

## Tech Stack

- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Auth: JWT with role-based access placeholders
- Database: PostgreSQL + Prisma ORM
- Fallback: API and frontend can run with in-memory/localStorage demo data when a database is not configured

## CRM Modules

- Login and protected CRM shell
- Dashboard with lead KPIs, follow-ups, activity, funnel, and reports
- Pharmacy onboarding leads with a pharmacy-specific form
- Delivery partner onboarding leads with a rider/KYC-specific form
- B2B customer sales leads with a deal-specific form
- Kanban sales pipeline
- Follow-up task management
- WhatsApp / Interakt center with backend service structure
- Campaign management with campaign-specific form
- Team performance
- Reports
- Settings and role permission placeholder

## Environment Variables

Create `.env` from `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:4000/api

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dialyatech_crm
JWT_SECRET=change-this-secret-before-production
PORT=4000

INTERAKT_API_KEY=
INTERAKT_BASE_URL=https://api.interakt.ai
INTERAKT_WEBHOOK_SECRET=
```

Do not expose Interakt API keys in frontend code. Keep `INTERAKT_API_KEY` only on the backend.

## Install

```bash
npm install
```

## Run Frontend Only

Uses localStorage fallback if no backend URL is configured.

```bash
npm run dev
```

## Run Backend

Without `DATABASE_URL`, the API runs with in-memory demo fallback:

```bash
npm run dev:api
```

Health check:

```bash
curl http://localhost:4000/api/health
```

Demo login:

```text
admin@medehub.in
admin123
```

## Run Full Stack

```bash
npm run dev:full
```

## Database Setup

Use Supabase PostgreSQL, Neon, Railway PostgreSQL, or local PostgreSQL.

```bash
npm run prisma:generate
npm run prisma:migrate
```

Open Prisma Studio:

```bash
npm run prisma:studio
```

## API Routes

Auth:

- `POST /api/auth/login`
- `GET /api/auth/me`

Lead APIs:

- `/api/pharmacy-leads`
- `/api/delivery-leads`
- `/api/b2b-leads`

Each lead API supports:

- `GET /`
- `POST /`
- `GET /:id`
- `PUT /:id`
- `DELETE /:id`
- `PATCH /:id/status`
- `PATCH /:id/assign`
- `PATCH /:id/block`

Other APIs:

- `/api/followups`
- `/api/whatsapp/send-template`
- `/api/whatsapp/messages`
- `/api/whatsapp/webhook`
- `/api/whatsapp/templates`
- `/api/campaigns`
- `/api/reports/dashboard`
- `/api/reports/conversion`
- `/api/reports/team-performance`
- `/api/reports/whatsapp`
- `/api/reports/area-wise-leads`

## Build

```bash
npm run build
```

## Deployment

Frontend on Vercel:

1. Import GitHub repo.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add `VITE_API_BASE_URL=https://your-backend/api`

Backend on Render or Railway:

1. Create a Node service from this repo.
2. Start command: `npm run dev:api` or `node server/src/index.js`
3. Add `DATABASE_URL`, `JWT_SECRET`, `INTERAKT_API_KEY`, `INTERAKT_BASE_URL`, `INTERAKT_WEBHOOK_SECRET`.
4. Run Prisma migration against your PostgreSQL database.

Database:

- Supabase PostgreSQL or Neon is recommended.

GitHub Pages:

The workflow builds the frontend only. Backend APIs must be hosted separately.

## Future Production Hardening

- Replace fallback storage with PostgreSQL in all environments.
- Add refresh tokens and password reset.
- Add audit log UI for every lead mutation.
- Add server-side Interakt webhook signature verification.
- Add pagination, CSV export endpoints, and background campaign jobs.
- Add file upload for KYC/compliance documents.
