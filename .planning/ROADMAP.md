# Roadmap: Toolbox AI — RAG Training Web App

## Overview

Three phases deliver a complete demo: stand up the project scaffolding and PWA plumbing (Phase 1), then build the employee-facing chat interface that sends questions to the external webhook (Phase 2), then build the admin interface for document uploads and system prompt management (Phase 3). Each phase delivers something independently verifiable. Nothing is built speculatively — the scope is exactly what a 48-hour demo requires.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffolded, PWA configured, environment wired up (completed 2026-02-23)
- [ ] **Phase 2: Chat Interface** - Employees can ask questions and receive AI answers at `/[tenant]`
- [ ] **Phase 3: Admin Interface** - Admin can upload documents and manage the system prompt at `/admin`

## Phase Details

### Phase 1: Foundation
**Goal**: The project exists, runs, and is installable as a PWA — all downstream phases build on this
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-03, INFRA-01, PWA-01, PWA-02, PWA-03, PWA-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts the app with no errors and the home route responds
  2. The browser shows an "Add to Home Screen" / install prompt on a mobile device or Chrome
  3. The installed app opens in standalone mode (no browser chrome)
  4. Placeholder icons at 192x192 and 512x512 are served and referenced in manifest.json
  5. Webhook URLs can be changed by editing `.env.local` without touching source code
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — Scaffold Next.js 14 App Router project with Tailwind, Shadcn UI, Lucide React, next-pwa
- [x] 01-02-PLAN.md — Configure manifest.json, placeholder icons, and PWA meta tags (with human verify checkpoint)
- [x] 01-03-PLAN.md — Wire environment variables for chat and ingest webhook URLs

### Phase 2: Chat Interface
**Goal**: Employees can navigate to a tenant URL, read a welcome message, send questions, and receive AI answers
**Depends on**: Phase 1
**Requirements**: CHAT-01, CHAT-02, CHAT-03, CHAT-04, CHAT-05, CHAT-06, CHAT-07, INFRA-02
**Success Criteria** (what must be TRUE):
  1. Navigating to `/calzedonia` shows "Calzedonia AI Assistant" welcome; `/sabores` shows "Sabores AI Assistant" welcome
  2. Typing a message and pressing send shows the message immediately in the chat thread
  3. A loading indicator appears while the webhook is processing and disappears when the reply arrives
  4. The AI reply appears in the chat thread below the user's message
  5. Navigating to an unknown tenant slug (e.g., `/foobar`) shows a graceful fallback rather than a crash
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — Tenant routing, welcome heading per tenant, and unknown-slug 404 fallback
- [ ] 02-02-PLAN.md — iMessage-style chat UI shell with MessageList, MessageInput, and session message state
- [ ] 02-03-PLAN.md — Webhook POST, loading indicator, AI response rendering, and human-verify checkpoint

### Phase 3: Admin Interface
**Goal**: Admin can log in, upload PDFs, and set a system prompt that flows into every chat request
**Depends on**: Phase 1
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, ADMIN-04, ADMIN-05, ADMIN-06
**Success Criteria** (what must be TRUE):
  1. Navigating to `/admin` shows a password prompt; entering "demo123" grants access, wrong password shows an error
  2. Admin can drag and drop a PDF onto the upload zone; a progress spinner appears and the file POSTs to the ingest URL
  3. A static list of 3-4 documents with green "Active" badges is visible after login
  4. Admin can type in the system prompt textarea and the value is still present after a page refresh
  5. System prompt saved by admin is included in every chat webhook POST (empty string if nothing was saved)
**Plans**: TBD

Plans:
- [ ] 03-01: Build password gate, admin layout, and static Active Documents list
- [ ] 03-02: Implement drag-and-drop PDF upload with progress spinner and FormData POST
- [ ] 03-03: Build system prompt textarea with localStorage persistence

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete    | 2026-02-23 |
| 2. Chat Interface | 1/3 | In Progress|  |
| 3. Admin Interface | 0/3 | Not started | - |
