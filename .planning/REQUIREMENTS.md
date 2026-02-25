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

## Category: Unified Auth (AUTH)
- [x] **AUTH-01**: Upon opening the application, user selects a tenant from the directory.
- [x] **AUTH-02**: Selecting a tenant prompts a universal Login overlay or page.
- [x] **AUTH-03**: Submitting the form with a regular user credential navigates to the tenant's conversational chat.
- [x] **AUTH-04**: Submitting the form with an admin credential navigates to the tenant's admin dashboard explicitly.

## Category: Chat UX (UX)
- [x] **UX-01**: The chat interface features a central, animated "AI Avatar" or "Orb" when the chat is empty or has few messages, indicating the AI is listening or active.
- [x] **UX-02**: The animated element gracefully shrinks or hides itself as the conversation history grows, so as not to obstruct the text.
- [x] **UX-03**: The chat platform displays custom branding per tenant, manipulating visual themes (e.g. colors) and logos across the chat layout and Animated Avatar.

## Future Requirements
- TBD

## Out of Scope
- Backend enforcement of tenant data separation (handling mock frontend isolation only for this milestone).
- Unique passwords per tenant.
