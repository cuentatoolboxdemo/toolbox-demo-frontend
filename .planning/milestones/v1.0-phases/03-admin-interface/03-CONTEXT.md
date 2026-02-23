# Phase 3: Admin Interface - Context

**Gathered:** 2026-02-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Password-gated admin page at `/admin` — login gate, drag-and-drop PDF upload, a document list with Active badges, and a system prompt textarea. All persistence is localStorage/sessionStorage only. No backend auth, no real document storage — this is a demo-grade admin panel.

</domain>

<decisions>
## Implementation Decisions

### Password gate & session
- Full-page login card (centered, simple) — replaces the full admin UI until authenticated
- Auth state saved in `sessionStorage` so it survives a page refresh during the demo
- Wrong password shows simple red error text below the input (no lockout, no attempts limit)

### Admin page layout
- Single scrollable page — no tabs
- Header: "Toolbox Admin" title + "Logout" button (clears sessionStorage, returns to login card)
- Section order: 1. Upload Zone, 2. Active Documents, 3. System Prompt

### Upload UX & feedback
- Dashed border dropzone with Lucide `UploadCloud` icon and label text
- While uploading: show spinner inside/over dropzone and disable the drop zone
- On success: Shadcn `toast` notification (or simple success text if toast unavailable)
- POSTs the file via FormData to the ingest URL (from env variable)

### Document list
- Initialized with 3 hardcoded mock documents in local React state (filename, fake upload date, "Active" badge)
- A successful upload appends the new file to this local state list — immediate visual feedback for demo
- Each row displays: filename, fake upload date, green "Active" badge

### System prompt
- Textarea that persists its value to localStorage on change (or on blur)
- Value is read by the chat interface and included in every webhook POST as `systemPrompt`
- Empty string if nothing has been saved (already handled by chat side per Phase 2)

### Claude's Discretion
- Exact Tailwind spacing, card sizing, and typography details
- Whether to use a `<label htmlFor>` dropzone pattern or a div with `onDrop`/`onDragOver`
- How to detect drag-over state visually (border color change etc.)
- Toast vs inline success text — prefer Shadcn toast if already in project, otherwise simple inline text

</decisions>

<specifics>
## Specific Ideas

- Header title: "Toolbox Admin" (exact string)
- Logout clears sessionStorage and returns to the login card (no redirect to another page, just re-renders)
- The dropzone should feel like a real upload area — dashed border, centered icon, instructional label

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-admin-interface*
*Context gathered: 2026-02-23*
