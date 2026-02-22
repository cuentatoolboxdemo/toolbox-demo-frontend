# Toolbox AI — RAG Training Web App

## What This Is

A functional V1 demo of an AI-powered RAG (Retrieval-Augmented Generation) training web app, delivered as a Progressive Web App installable on mobile devices. Employees access a chat interface at a tenant-specific URL (e.g., `/calzedonia`) to ask questions answered by an AI trained on uploaded company documents. Admins manage documents and configure the system prompt at `/admin`.

## Core Value

Employees get instant, context-aware answers from company documents through a familiar chat UI — installable on their phone like any other app.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multi-tenant chat interface at `/[tenant]` with mobile-first iMessage/WhatsApp-style UI
- [ ] Fixed tenant list (calzedonia, sabores) with hardcoded welcome messages per tenant
- [ ] Chat sends POST to external webhook with `{ question, tenant, history, systemPrompt }`
- [ ] History uses OpenAI-style format `[{ role, content }]`
- [ ] System prompt always included in payload (empty string if unset)
- [ ] Loading indicator while awaiting AI response
- [ ] Admin interface at `/admin` protected by hardcoded password "demo123"
- [ ] Admin: drag-and-drop PDF upload with progress spinner, POST via FormData to n8n ingest URL
- [ ] Admin: system prompt textarea persisted to localStorage
- [ ] Admin: mock "Active Documents" list (3–4 static PDF entries with green "Active" badge)
- [ ] PWA: valid manifest.json (name: "Toolbox AI", display: standalone)
- [ ] PWA: meta tags for iOS and Android "Add to Home Screen" prompt
- [ ] PWA: auto-generated placeholder icons at 192×192 and 512×512

### Out of Scope

- Real document storage or retrieval logic — AI/RAG backend is external (n8n webhooks)
- User authentication beyond the single hardcoded admin password
- Dynamic tenant creation or tenant management UI
- Push notifications
- Offline mode / service worker caching of chat responses
- Real document list from backend — mock data only for demo

## Context

- **Timeline**: 48-hour demo — every decision should favor shipping fast over architectural elegance
- **Tech stack**: Next.js 14+ (App Router), React, Tailwind CSS, Shadcn UI, Lucide React icons
- **PWA**: next-pwa or equivalent; icons are placeholder-generated (no brand assets provided yet)
- **Webhooks**: Two external endpoints — chat inference URL and n8n document ingest URL. Both URLs are TBD and will be injected via environment variables
- **Tenants**: Hardcoded map `{ calzedonia: "Calzedonia AI Assistant", sabores: "Sabores AI Assistant" }`
- **System prompt flow**: Stored in `localStorage` by admin, read by chat interface, always sent as `systemPrompt` field in every chat POST request

## Constraints

- **Timeline**: 48 hours — no over-engineering, no abstractions for hypothetical future scale
- **Tech Stack**: Next.js App Router, Tailwind, Shadcn UI, Lucide React — no deviations
- **Backend**: Zero backend logic in this repo — all AI/RAG handled by external n8n webhooks
- **Auth**: Single hardcoded password ("demo123") — no JWT, no sessions, no real auth library
- **Icons**: Programmatically generated placeholders — no design assets required to ship

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| next-pwa for PWA setup | Mature, well-documented, minimal config for Next.js App Router | — Pending |
| localStorage for system prompt | Simplest possible persistence for a demo, no backend needed | — Pending |
| Hardcoded tenant map | Fixed list of 2 tenants for demo; avoids dynamic routing complexity | — Pending |
| FormData for PDF upload | Required by n8n file ingest endpoints | — Pending |
| OpenAI-style history format | Predictable schema for n8n webhook parsing | — Pending |

---
*Last updated: 2026-02-23 after initialization*
