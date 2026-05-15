# Dialyatech / Medehub CRM

Professional cloud-ready CRM software for Medehub marketing and operations teams. Built with React, Vite, TailwindCSS, persisted demo data, reusable components, and a service layer prepared for future backend APIs.

## Modules

- Dashboard with funnel, activity, WhatsApp replies, and priority follow-ups
- Pharmacy onboarding CRM with KYC, GST, drug-license, assignment, block, edit, delete, and follow-up workflows
- Delivery partner onboarding CRM with vehicle, license, police verification, and training tracking
- B2B sales CRM with customer category, deal value, quotation, negotiation, and lost reason fields
- Drag-and-drop sales pipeline with status dropdown fallback
- Follow-up management with today, overdue, upcoming, completed, reschedule, and complete actions
- WhatsApp / Interakt API center with template UI, settings, logs, and service structure
- Campaign management, team performance, reports, settings, login placeholder, and role UI placeholders

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
VITE_INTERAKT_API_KEY=
VITE_INTERAKT_BASE_URL=https://api.interakt.ai
```

Do not hardcode real API keys in frontend code. Move secrets to a backend service before production.

## Deployment

### GitHub Pages

This repo includes `.github/workflows/pages.yml`.

1. Go to repository Settings → Pages.
2. Set Source to `GitHub Actions`.
3. Push to `main`.
4. Wait for the Pages workflow to finish.

Live URL:

```text
https://medehub2026.github.io/Dialyatech-CRM/
```

### Vercel

1. Import the GitHub repository into Vercel.
2. Framework preset: Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.

## Future Backend Integration

The app currently uses `localStorage` for persistence. Backend connection points are separated for easier migration:

- `src/services/storageService.js`: replace local storage with API reads/writes.
- `src/services/interaktService.js`: connect Interakt WhatsApp API through a secure backend proxy.
- `src/hooks/useCRMData.jsx`: central CRM state/actions; replace functions with API calls.
- `src/data/demoData.js`: seed data only.

Recommended production backend:

- Auth with role-based access control.
- REST or GraphQL CRM APIs for leads, messages, campaigns, users, reports, and settings.
- Server-side Interakt webhook handler.
- Audit logs for lead edits, deletes, blocks, and status changes.
