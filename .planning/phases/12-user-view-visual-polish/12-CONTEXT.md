# Phase 12: User View Visual Polish - Context

**Gathered:** 2026-02-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Elevate the entire user-facing experience: expand the tenant directory to 6 branded entries with real logos, inject real brand identity (logos + colors) across all views (directory, chat, admin), and replace the current animated avatar with a stunning particle-constellation effect that delivers a WOW moment in demos.

Out of scope: document ingestion changes, admin functionality changes, new n8n workflows, authentication changes.

</domain>

<decisions>
## Implementation Decisions

### Directory page (root `/`)
- 6 tenants displayed in a 2x3 grid (2 rows, 3 columns)
- Each card shows the real brand logo prominently, brand name, and assistant subtitle
- Cards use brand colors for hover effects and accents
- The 6 tenants in order: IDE Marketing, Sabor a España, Calzedonia, Segurcaixa Adeslas, RCI (grupo Renault), NEX (grupo Michelín)
- Overall page should feel premium and polished — this is the first impression for demo clients

### New tenants to add
- **Segurcaixa Adeslas** — Spanish health insurance. Slug: `segurcaixa_adeslas`
- **RCI (grupo Renault)** — Renault group financial services. Slug: `rci_renault`
- **NEX (grupo Michelín)** — Michelin group tire tech. Slug: `nex_michelin`
- Each needs: theme colors, logo, display name, assistant name in `tenants.ts`
- n8n webhooks and system prompts for these 3 are NOT part of this phase — they get placeholder/stub config

### Brand identity sourcing
- Use real logos for all 6 brands — source from the web (official brand assets, Wikipedia SVGs, or high-quality PNGs)
- Logos appear in: directory card, chat avatar center, admin header
- Brand colors derived from each company's actual brand guidelines
- Store logo files in `/public/logos/` as optimized images (PNG or SVG)

### Chat avatar — Particle constellation WOW effect
- Replace current ring-based animation with a particle constellation system
- Floating particles that orbit the center logo, like a galaxy or neural network visualization
- Particles react to state: idle (gentle drift), thinking (accelerate, pulse, expand), new message (burst then settle)
- Brand-colored particles — each tenant's constellation uses their brand palette
- The logo sits at the center of the constellation, clearly visible
- Same shrink behavior as current: large on empty chat, scales down as messages appear
- Must be performant on mobile (limit particle count, use CSS transforms or canvas)

### Logo placement across views
- **Directory card:** Logo as the primary visual element on each card (replaces the generic Bot icon)
- **Chat view:** Logo centered in the particle constellation avatar
- **Admin header:** Logo next to "Toolbox Admin" title, brand-colored

### Claude's Discretion
- Exact particle count, orbit paths, and physics
- Directory card layout details (padding, shadows, typography)
- Logo sizing and aspect ratio handling per view
- How to handle logos that are text-heavy vs icon-only
- Animation performance optimization strategy (CSS vs canvas vs hybrid)
- Exact brand color hex values (research from official sources)

</decisions>

<specifics>
## Specific Ideas

- "Quiero un efecto WOW verdadero" — the avatar animation is the centerpiece of the demo experience
- Particle constellation direction chosen: floating particles orbiting like a galaxy or neural network
- The current avatar concept (element that shrinks with messages) is good — keep that behavior, just execute it at a much higher visual level
- "Para cada marca se vea su Logo real" — real logos everywhere, not generic icons
- This is a demo app for potential clients — first impressions matter enormously
- 2x3 grid for directory is non-negotiable (6 tenants, clean layout)

</specifics>

<deferred>
## Deferred Ideas

- n8n webhook configuration for the 3 new tenants — Phase 13 (document ingestion & admin)
- System prompts for new tenants — Phase 13
- Document data files for new tenants — Phase 13

</deferred>

---

*Phase: 12-user-view-visual-polish*
*Context gathered: 2026-02-26*
