# Phase 12: User View Visual Polish - Context

**Gathered:** 2026-02-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Expand the tenant roster from 3 to 6 branded tenants, update the directory page to show a 2×3 grid with real logos, and ensure the admin and chat views reflect each tenant's logo and brand colors. No new capabilities (no new avatar, no new features).

</domain>

<decisions>
## Implementation Decisions

### Tenant Roster & Ordering
- Expand from 3 tenants to 6 tenants.
- Rename the existing "Sabores" tenant to **"Sabor a España"** (slug: `sabor_a_espana`).
- Add 3 new tenants: **SegurCaixa Adeslas**, **NEX (grupo Michelín)**, **RCI (grupo Renault)**.
- Display order on the directory grid (left-to-right, top-to-bottom):
  1. IDE Marketing
  2. Calzedonia
  3. Sabor a España
  4. SegurCaixa Adeslas
  5. NEX
  6. RCI

### Brand Colors (from provided color reference images)
- **IDE Marketing:** primary `#C00B00` (Guardsman Red), secondary `#000000` (Black), text `#FFFFFF`
- **Calzedonia:** primary `#8F2C4B` (Camelot), secondary `#2B313D` (Ebony Clay), text `#FFFFFF`
- **Sabor a España:** primary `#FF9C00` (Orange Peel), secondary `#D9B069` (Apache), accent `#0044CC` (Science Blue), text `#FFFFFF`
- **SegurCaixa Adeslas:** primary `#0F77AE` (Denim), secondary `#333333` (Mine Shaft), text `#FFFFFF`
- **NEX:** primary `#39FF14` (Neon Green — from logo), secondary `#333333` (Dark Gray — from logo background), text `#FFFFFF`
- **RCI:** primary `#F47216` (Ecstasy/Orange), secondary `#006C8B` (Blue Lagoon), text `#FFFFFF`

### Logo Assets (all in `public/icons/`)
- **IDE Marketing:** `IDE Marketing_idNTrdiV4p_1.png`
- **Calzedonia:** `Calzedonia_idFVQbCbFh_1.png`
- **Sabor a España:** `sabor1.png`
- **SegurCaixa Adeslas:** `segurcaixa.png`
- **NEX:** `nex.png`
- **RCI:** `rci.png`

### Directory Grid
- Current layout is 3 cards in a single row — user LIKES this card style.
- Expand to 2 rows × 3 columns (6 cards total).
- Each card must show its brand logo.
- Long tenant names (e.g. "SegurCaixa Adeslas") must NOT wrap to 2 lines — use text sizing / truncation as needed.
- Card design remains identical to current style; no redesign.

### Chat & Admin Branding
- The chat and admin screens must reflect the active tenant's logo and brand colors (header, avatar glow, message bubbles, etc.).
- NO changes to the avatar animation (keep the current animated avatar as-is).
- NO additional branding beyond what already exists in the chat/admin views for the 3 current tenants — just extend the same pattern to the 3 new tenants.

### Claude's Discretion
- Exact slug naming for the new tenants (suggested: `segurcaixa_adeslas`, `nex`, `rci`).
- Derived theme colors (avatarGlow, avatarPulse, ring) for the new tenants — derive sensibly from the primary brand color.
- Whether to rename logo files to cleaner names or keep existing filenames.

</decisions>

<specifics>
## Specific Ideas

- The user explicitly said "las tarjetas las quiero igual que ahora" — do NOT redesign the card component.
- The user explicitly said "NO" to changing the avatar — keep the current AnimatedAvatar component unchanged.
- The user explicitly said "NO" to additional branding in chat/admin beyond extending existing patterns to new tenants.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 12-user-view-visual-polish*
*Context gathered: 2026-02-26*
