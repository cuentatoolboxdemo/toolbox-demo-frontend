# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Employees get instant, context-aware answers from company documents through a familiar chat UI — installable on their phone like any other app.
**Current focus:** Phase 2 — Chat Interface

## Current Position

Phase: 2 of 3 (Chat Interface)
Plan: 2 of 3 in current phase
Status: In progress
Last activity: 2026-02-23 — Completed 02-02-PLAN.md (iMessage-style chat UI shell with MessageList, MessageInput, ChatInterface wired into tenant page)

Progress: [█████░░░░░] 55%

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 7min
- Total execution time: 35min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3/3 | 31min | 10min |
| 02-chat-interface | 2/3 | 4min | 2min |

**Recent Trend:**
- Last 5 plans: 2min
- Trend: improving

*Updated after each plan completion*

## Accumulated Context

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

### Pending Todos

None yet.

### Blockers/Concerns

- Webhook URLs (chat inference + n8n ingest) are TBD — must be available before Phase 2/3 can be tested end-to-end. `.env.local` is the injection point.

## Session Continuity

Last session: 2026-02-23
Stopped at: Completed 02-02-PLAN.md — iMessage-style chat UI with MessageList, MessageInput, ChatInterface wired into tenant page
Resume file: None
