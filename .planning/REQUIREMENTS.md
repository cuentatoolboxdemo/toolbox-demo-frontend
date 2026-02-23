# Requirements: Toolbox AI — RAG Training Web App

**Defined:** 2026-02-23
**Core Value:** Employees get instant, context-aware answers from company documents through a familiar chat UI — installable on their phone like any other app.

## v1 Requirements

### Chat Interface

- [ ] **CHAT-01**: User navigates to `/[tenant]` and sees a welcome message specific to that tenant
- [ ] **CHAT-02**: User can type and submit a message via input + send button
- [ ] **CHAT-03**: User sees their message appear immediately in the chat thread
- [ ] **CHAT-04**: User sees a loading indicator while the AI response is pending
- [ ] **CHAT-05**: User sees the AI response appear in the chat thread after the webhook returns
- [ ] **CHAT-06**: Chat history persists in component state for the session (not persisted across refreshes)
- [ ] **CHAT-07**: Webhook POST includes `{ question, tenant, history, systemPrompt }` with OpenAI-style history and systemPrompt always present (empty string if unset)

### Admin Interface

- [ ] **ADMIN-01**: Admin navigates to `/admin` and is prompted for a password
- [ ] **ADMIN-02**: Correct password ("demo123") grants access; wrong password shows an error
- [ ] **ADMIN-03**: Admin sees a drag-and-drop zone for PDF uploads
- [ ] **ADMIN-04**: Dropping a PDF triggers a progress spinner and POSTs the file via FormData to the n8n ingest URL
- [ ] **ADMIN-05**: Admin sees a static list of 3–4 "Active Documents" with a green "Active" badge
- [ ] **ADMIN-06**: Admin can edit a system prompt in a textarea; value is saved to localStorage on change

### PWA

- [x] **PWA-01**: App has a valid `manifest.json` (name: "Toolbox AI", display: standalone, theme color set)
- [x] **PWA-02**: Necessary `<meta>` tags are present for iOS and Android "Add to Home Screen" prompt
- [x] **PWA-03**: App has placeholder icons at 192×192 and 512×512 referenced in the manifest
- [x] **PWA-04**: App is installable — browser install prompt fires on supported devices

### Infrastructure

- [x] **INFRA-01**: Webhook URLs configured via environment variables (`.env.local`)
- [ ] **INFRA-02**: Unknown tenant slugs fall back gracefully (generic name or 404)
- [x] **INFRA-03**: Project scaffolded with Next.js App Router, Tailwind CSS, Shadcn UI, Lucide React, next-pwa

## v2 Requirements

### Chat Enhancements

- **CHATv2-01**: Chat history persisted across browser refreshes (localStorage or IndexedDB)
- **CHATv2-02**: User can clear chat history
- **CHATv2-03**: Markdown rendering in AI responses

### Admin Enhancements

- **ADMINv2-01**: Real document list fetched from backend
- **ADMINv2-02**: Ability to delete/deactivate documents
- **ADMINv2-03**: Upload history with status (processing / active / failed)
- **ADMINv2-04**: Multiple admin accounts with real auth

### PWA Enhancements

- **PWAv2-01**: Real branded icons (from design assets)
- **PWAv2-02**: Offline mode with cached responses

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real document storage / RAG backend | Handled entirely by external n8n webhooks |
| User authentication beyond hardcoded password | Demo only — no real auth library needed |
| Dynamic tenant creation UI | Fixed list of 2 tenants is sufficient for demo |
| Push notifications | Not needed for demo scope |
| Service worker response caching | Offline AI responses not feasible without backend |
| Mobile app (React Native) | PWA covers installability requirement |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-03 | Phase 1 | Complete |
| PWA-01 | Phase 1 | Complete |
| PWA-02 | Phase 1 | Complete |
| PWA-03 | Phase 1 | Complete |
| PWA-04 | Phase 1 | Complete |
| INFRA-01 | Phase 1 | Complete |
| CHAT-01 | Phase 2 | Pending |
| CHAT-02 | Phase 2 | Pending |
| CHAT-03 | Phase 2 | Pending |
| CHAT-04 | Phase 2 | Pending |
| CHAT-05 | Phase 2 | Pending |
| CHAT-06 | Phase 2 | Pending |
| CHAT-07 | Phase 2 | Pending |
| INFRA-02 | Phase 2 | Pending |
| ADMIN-01 | Phase 3 | Pending |
| ADMIN-02 | Phase 3 | Pending |
| ADMIN-03 | Phase 3 | Pending |
| ADMIN-04 | Phase 3 | Pending |
| ADMIN-05 | Phase 3 | Pending |
| ADMIN-06 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 after initial definition*
