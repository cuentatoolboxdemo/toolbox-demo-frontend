# Toolbox AI — RAG Training Web App

## Current Milestone: v1.1 Usability & Tenant Management

**Goal:** Improve navigation UX with a centralized directory and isolate admin functionality per tenant.

**Target features:**
- Root path landing page for tenants
- Tenant-isolated admin views (password protected)
- Tenant-isolated system prompts and document views
- New "IDE Marketing" tenant
## What This Is

A functional V1 demo of an AI-powered RAG (Retrieval-Augmented Generation) training web app, delivered as a Progressive Web App installable on mobile devices. Employees access a chat interface at a tenant-specific URL (e.g., `/calzedonia`) to ask questions answered by an AI trained on uploaded company documents. Admins manage documents and configure the system prompt at `/admin`.

## Core Value

Employees get instant, context-aware answers from company documents through a familiar chat UI — installable on their phone like any other app.

## Requirements

### Validated

- ✓ Multi-tenant chat interface at `/[tenant]` with mobile-first iMessage/WhatsApp-style UI — v1.0
- ✓ Fixed tenant list (calzedonia, sabores) with hardcoded welcome messages per tenant — v1.0
- ✓ Chat sends POST to external webhook with `{ question, tenant, history, systemPrompt }` — v1.0
- ✓ History uses OpenAI-style format `[{ role, content }]` — v1.0
- ✓ System prompt always included in payload (empty string if unset) — v1.0
- ✓ Loading indicator while awaiting AI response — v1.0
- ✓ Admin interface at `/admin` protected by hardcoded password "demo123" — v1.0
- ✓ Admin: drag-and-drop PDF upload with progress spinner, POST via FormData to n8n ingest URL — v1.0
- ✓ Admin: system prompt textarea persisted to localStorage — v1.0
- ✓ Admin: mock "Active Documents" list (3 static PDF entries with green "Active" badge) — v1.0
- ✓ PWA: valid manifest.json (name: "Toolbox AI", display: standalone) — v1.0
- ✓ PWA: meta tags for iOS and Android "Add to Home Screen" prompt — v1.0
- ✓ PWA: auto-generated placeholder icons at 192x192 and 512x512 — v1.0

### Active

- Centralized directory (`/`) for available tenants
- Tenant-specific admin panel isolation (`/admin/[tenant]`)
- Addition of `ide_marketing` tenant to the demo

### Out of Scope

- Real document storage or retrieval logic — AI/RAG backend is external (n8n webhooks)
- User authentication beyond the single hardcoded admin password
- Dynamic tenant creation or tenant management UI
- Push notifications
- Offline mode / service worker caching of chat responses
- Real document list from backend — mock data only for demo

## Context

Shipped v1.0 with 625 LOC TypeScript/TSX across 3 phases, 9 plans, 19 tasks in one day.

- **Tech stack**: Next.js 14.2.35 (App Router), React 18, Tailwind CSS, Shadcn UI (new-york style), Lucide React icons, next-pwa
- **PWA**: next-pwa with `withPWA` wrapper; placeholder PNG icons at 192x192 and 512x512; service worker disabled in dev mode
- **Webhooks**: Two external endpoints via `.env.local` — `NEXT_PUBLIC_CHAT_WEBHOOK_URL` (chat inference) and `NEXT_PUBLIC_INGEST_WEBHOOK_URL` (document ingest)
- **Tenants**: Hardcoded map in `src/lib/tenants.ts` — `{ calzedonia: "Calzedonia AI Assistant", sabores: "Sabores AI Assistant" }`
- **System prompt flow**: Stored in `localStorage("systemPrompt")` by admin, read by `ChatInterface` in every webhook POST body
- **Admin auth**: `sessionStorage("adminAuth")` gate with password "demo123"; survives page refresh, clears on tab close
- **Known tech debt**: Phase 3 missing formal VERIFICATION.md (human-tested via checkpoint), hydration fix applied post-execution

## Constraints

- **Timeline**: 48 hours — no over-engineering, no abstractions for hypothetical future scale
- **Tech Stack**: Next.js App Router, Tailwind, Shadcn UI, Lucide React — no deviations
- **Backend**: Zero backend logic in this repo — all AI/RAG handled by external n8n webhooks
- **Auth**: Single hardcoded password ("demo123") — no JWT, no sessions, no real auth library
- **Icons**: Programmatically generated placeholders — no design assets required to ship

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| next-pwa for PWA setup | Mature, well-documented, minimal config for Next.js App Router | ✓ Good — installed, configured, icons and manifest verified |
| localStorage for system prompt | Simplest possible persistence for a demo, no backend needed | ✓ Good — works cross-component (admin writes, chat reads) |
| Hardcoded tenant map | Fixed list of 2 tenants for demo; avoids dynamic routing complexity | ✓ Good — clean `[tenant]` dynamic route with `notFound()` fallback |
| FormData for PDF upload | Required by n8n file ingest endpoints | ✓ Good — UploadZone POSTs FormData with spinner and success feedback |
| OpenAI-style history format | Predictable schema for n8n webhook parsing | ✓ Good — history built as `[{role, content}]` array from message state |
| sessionStorage for admin auth | Survives page refresh (demo-friendly) but clears on tab close (secure enough for demo) | ✓ Good — no hydration issues after useEffect fix |
| useEffect for storage reads | useState lazy initializers caused hydration mismatch (server vs client) | ✓ Good — moved to useEffect; slight flash but no errors |
| Shadcn new-york style | `--defaults` flag selected neutral base color | ✓ Good — clean, professional look |

---
*Last updated: 2026-02-25 after v1.1 milestone definition*
