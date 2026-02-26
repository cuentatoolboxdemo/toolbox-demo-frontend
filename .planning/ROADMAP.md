# Roadmap: Toolbox AI — RAG Training Web App

## Milestones

- ✅ **v1.0 MVP** — Phases 1-3 (shipped 2026-02-23)
- 🚧 **v1.1 Usability & Tenant Management** — Phases 7-8 (current)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-3) — SHIPPED 2026-02-23</summary>

- [x] Phase 1: Foundation (3/3 plans) — completed 2026-02-23
- [x] Phase 2: Chat Interface (3/3 plans) — completed 2026-02-23
- [x] Phase 3: Admin Interface (3/3 plans) — completed 2026-02-23

See: `.planning/milestones/v1.0-ROADMAP.md` for full details.

</details>

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | 2026-02-23 |
| 2. Chat Interface | v1.0 | 3/3 | Complete | 2026-02-23 |
| 3. Admin Interface | v1.0 | 3/3 | Complete | 2026-02-23 |

### Phase 4: Consolidación y Seguridad

**Goal:** [To be planned]
**Depends on:** Phase 3
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 4 to break down)

### Phase 5: Preparacion de Demo

**Goal:** [To be planned]
**Depends on:** Phase 4
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 5 to break down)

### Phase 6: Core n8n Workflows

**Goal:** [To be planned]
**Depends on:** Phase 5
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 6 to break down)

### Phase 7: Directory & Navigation UX

**Goal:** Centralized landing page directory for tenants
**Depends on:** Phase 3
**Plans:** 2 plans

Plans:
- [ ] 07-01: Centralized Landing Page
- [ ] 07-02: Navigation Back to Directory

### Phase 8: Tenant Admin Isolation

**Goal:** Isolate admin panel views and document management per tenant
**Depends on:** Phase 7
**Plans:** 2 plans

Plans:
- [x] 08-01: Tenant Isolated Admin & System Prompt
- [x] 08-02: Tenant Isolated Document Lists & Uploads

### Phase 9: Unified Auth & Role-based Routing

**Goal:** Centralized login gate determining navigation to Chat or Admin based on user role
**Depends on:** Phase 8
**Plans:** 1 plans

Plans:
- [x] 09-01: Login Gate and Role Router

### Phase 10: Chat UI/UX Polish

**Goal:** Add a dynamic animated element to the chat that indicates the AI is alive, which scales down as the conversation fills the screen.
**Depends on:** Phase 9
**Plans:** 1/1 plans complete

Plans:
- [x] 10-01: Animated AI Avatar Component

### Phase 11: Tenant Branding

**Goal:** Allow each tenant to have custom styling, dynamically altering the AI Avatar's colors or injecting unique logos based on the active client context.
**Depends on:** Phase 10
**Plans:** 1/1 plans complete

Plans:
- [ ] 11-01: Dynamic Tenant Theming & Avatar Customization


### Phase 12: User View Visual Polish

**Goal:** Expand to 6 branded tenants with real logos and brand colors, update directory to 2x3 grid, and extend branding to admin header. Keep existing avatar unchanged per user decision.
**Depends on:** Phase 11
**Requirements:** [VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, VIS-06]
**Plans:** 3/3 plans complete

Plans:
- [x] 12-01-PLAN.md — Tenant config expansion (6 tenants, brand colors, logo URLs)
- [x] 12-02-PLAN.md — Directory 2x3 branded grid & admin header logo
- [ ] 12-03-PLAN.md — Visual verification checkpoint (all views demo-ready)

### Phase 13: Document ingestion improvements & admin changes

**Goal:** [To be planned]
**Depends on:** Phase 12
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 13 to break down)
