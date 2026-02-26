# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Employees get instant, context-aware answers from company documents through a familiar chat UI — installable on their phone like any other app.
**Current focus:** Phase 12 — User View Visual Polish

## Current Position

Phase: 12-user-view-visual-polish
Plan: 3/3 complete
Status: Complete
Last activity: 2026-02-26 — Plan 12-03 complete (visual verification approved)

Progress: [##########] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 9
- Average duration: 5min
- Total execution time: 41min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 31min | 10min |
| 02-chat-interface | 3/3 | 5min | 2min |
| 03-admin-interface | 3/3 | 5min | 2min |

**Recent Trend:**
- Last 5 plans: 1min
- Trend: improving

*Updated after each plan completion*

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 12-user-view-visual-polish | 3/3 | 8min | 3min |

## Accumulated Context

### Roadmap Evolution
- Milestone v1.1 Usability & Tenant Management defined for Phase 7 & 8
- Phase 4 added: Consolidación y Seguridad
- Phase 12 added: User View Visual Polish
- Phase 13 added: Document ingestion improvements & admin changes

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Setup]: next-pwa for PWA — mature, minimal config for App Router
- [Setup]: localStorage for system prompt — simplest possible persistence for demo
- [Setup]: Hardcoded tenant map (calzedonia, sabores) — avoids dynamic routing complexity
- [Setup]: FormData for PDF upload — required by n8n file ingest endpoints
- [Setup]: OpenAI-style history format — predictable schema for n8n webhook parsing
- [Phase 01-foundation]: Manual scaffolding used instead of create-next-app: 'RAG LM' directory name violates npm naming restrictions (spaces, uppercase)
- [Phase 01-foundation]: Shadcn UI initialized with neutral base color (not zinc) — --defaults flag selected neutral; functionally equivalent
- [Phase 01-foundation]: NEXT_PUBLIC_ prefix used for webhook env vars — Phase 2/3 use client-side fetch, requires browser-accessible vars
- [Phase 01-foundation]: .env.local excluded from git via pre-existing .env*.local rule in .gitignore (no modification needed)
- [Phase 01-foundation]: Used sharp instead of canvas for icon generation: Windows lacks native build tools for canvas node-gyp bindings; sharp ships prebuilt binaries
- [Phase 01-foundation]: Direct <head> in RootLayout JSX for iOS PWA meta tags: Next.js Metadata API does not expose apple-mobile-web-app-* tags; direct JSX head block is the correct App Router pattern
- [Phase 02-chat-interface]: Hardcoded tenant map in tenants.ts — no dynamic routing, avoids DB dependency at this stage
- [Phase 02-chat-interface]: Server Component for tenant page and not-found — no 'use client' needed yet; client interactivity added in Plan 02
- [Phase 02-chat-interface]: App Router not-found boundary (not-found.tsx) per route segment — Next.js renders it when notFound() is called
- [Phase 02-chat-interface]: Client boundary at ChatInterface — tenant page stays Server Component, client interactivity starts at ChatInterface
- [Phase 02-chat-interface]: Message type defined in MessageList.tsx and re-exported — co-located with renderer, avoids separate types file
- [Phase 02-chat-interface]: History snapshot taken before setMessages — captures prior turns only, current question excluded from history array
- [Phase 02-chat-interface]: response.json() with fallback to response.text() — handles both { answer } and plain-text webhook responses
- [Phase 02-chat-interface]: isLoading suppresses empty-state prompt — avoids flicker when first message is in-flight
- [Phase 03-admin-interface]: sessionStorage used for auth persistence — no server-side session needed for demo-level admin gate
- [Phase 03-admin-interface]: useEffect instead of useState lazy initializer for sessionStorage/localStorage reads — prevents React hydration mismatch
- [Phase 03-admin-interface]: docs and setDocs kept at AdminPage level — allows Plan 02 to inject uploaded docs via props/callbacks
- [Phase 03-admin-interface]: UploadZone as standalone component with onUploadSuccess prop — keeps AdminPage as state owner, UploadZone as pure uploader
- [Phase 03-admin-interface]: getDropzoneClassName() helper consolidates three conditional class sets (uploading, dragging, default) into readable function
- [Phase 03-admin-interface]: Plain textarea with Tailwind classes for SystemPromptEditor — no Shadcn textarea component needed
- [Phase 12-user-view-visual-polish]: Renamed sabores slug to sabor_a_espana; TENANTS ordering matches directory display order; logoUrl uses browser path /icons/filename
- [Phase 12-user-view-visual-polish]: Used <img> tag with eslint-disable instead of next/image for dynamic logo paths — avoids domain/dimension config complexity
- [Phase 12-user-view-visual-polish]: min-w-0 required on flex-1 wrapper for CSS truncate to work inside flexbox containers
- [Phase 12-user-view-visual-polish]: getTenant() called at component body level (synchronous map lookup, no side effect needed)
- [Phase 12-user-view-visual-polish]: VIS-04/VIS-05 particle constellation avatar NOT implemented per explicit user decision — existing AnimatedAvatar spinning rings and state-reactive behavior satisfies requirements
- [Phase 12-user-view-visual-polish]: All 6 tenants human-verified as demo-ready across directory, chat, and admin views (2026-02-26)

### Pending Todos

None yet.

### Blockers/Concerns

- Webhook URLs (chat inference + n8n ingest) are TBD — must be available before Phase 2/3 can be tested end-to-end. `.env.local` is the injection point.

## Session Continuity

Last session: 2026-02-26
Stopped at: Completed 12-03-PLAN.md — Visual verification of all 6 tenants approved; Phase 12 fully complete
Resume file: None
