# Requirements: Milestone v1.1

## Category: Navigation & Directory (NAV)
- [ ] **NAV-01**: User can view a centralized directory of tenants at the root (`/`) path.
- [ ] **NAV-02**: User can click a tenant card/link in the directory to navigate to that tenant's chat interface (`/[tenant]`).
- [ ] **NAV-03**: User can easily return to the root directory from any tenant chat or admin page.
- [ ] **NAV-04**: New tenant "IDE Marketing" (`ide_marketing`) is available across the system along with `calzedonia` and `sabores`.

## Category: Admin Isolation (ADMIN)
- [ ] **ADMIN-01**: Admin interface is isolated per tenant at the path `/admin/[tenant]`.
- [ ] **ADMIN-02**: Admin can access the tenant-specific admin page using the shared password ("demo123").
- [ ] **ADMIN-03**: System prompt configuration is saved and loaded specific to the active tenant in `localStorage` (e.g., `systemPrompt_[tenant]`).
- [ ] **ADMIN-04**: Active documents list is isolated per tenant.
- [ ] **ADMIN-05**: Document uploads via the dropzone are associated with the active tenant.

## Future Requirements
- TBD

## Out of Scope
- Backend enforcement of tenant data separation (handling mock frontend isolation only for this milestone).
- Unique passwords per tenant.
