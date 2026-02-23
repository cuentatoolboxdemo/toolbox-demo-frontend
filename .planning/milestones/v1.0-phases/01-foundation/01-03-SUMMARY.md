---
phase: 01-foundation
plan: "03"
subsystem: infra
tags: [environment-variables, nextjs, webhooks, dotenv]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js project scaffold and src/ directory structure
provides:
  - .env.example committed template with NEXT_PUBLIC_CHAT_WEBHOOK_URL and NEXT_PUBLIC_INGEST_WEBHOOK_URL
  - .env.local with placeholder values for local development (excluded from git)
  - Pattern: NEXT_PUBLIC_ prefix for client-accessible webhook URLs in Next.js
affects:
  - 02-chat (reads NEXT_PUBLIC_CHAT_WEBHOOK_URL for inference fetch)
  - 03-admin (reads NEXT_PUBLIC_INGEST_WEBHOOK_URL for PDF upload fetch)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - NEXT_PUBLIC_ prefix for client-side environment variables in Next.js App Router
    - .env.example as committed template, .env.local as uncommitted secrets file

key-files:
  created:
    - .env.example
    - .env.local
  modified: []

key-decisions:
  - "Used NEXT_PUBLIC_ prefix because Phase 2 (chat) and Phase 3 (admin upload) call webhooks from the browser via client-side fetch; without this prefix vars are only available server-side"
  - ".env.local excluded from git via .env*.local rule already present in .gitignore from Next.js scaffold"
  - "Placeholder URLs used (placeholder.example.com) so dev server starts without errors while real webhook URLs are TBD"

patterns-established:
  - "Env pattern: NEXT_PUBLIC_<SERVICE>_WEBHOOK_URL for externally-hosted webhook endpoints callable from the browser"

requirements-completed: [INFRA-01]

# Metrics
duration: 1min
completed: 2026-02-23
---

# Phase 1 Plan 03: Environment Variables Summary

**NEXT_PUBLIC_ webhook URL env vars wired via .env.example template and .env.local placeholder, verified injected into Next.js client bundle**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-23T08:55:07Z
- **Completed:** 2026-02-23T08:56:15Z
- **Tasks:** 1
- **Files modified:** 2 created (.env.example, .env.local); .gitignore already correct

## Accomplishments

- Created `.env.example` as the safe-to-commit developer template documenting both webhook URL variables with placeholder values
- Created `.env.local` with placeholder webhook URLs for local development — excluded from git by the pre-existing `.env*.local` rule in `.gitignore`
- Verified Next.js build injects `NEXT_PUBLIC_CHAT_WEBHOOK_URL` into the client bundle (console.log during build output confirmed `https://placeholder.example.com/webhook/chat`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create .env.local and .env.example with webhook URL variables** - `5096825` (chore)

**Plan metadata:** [pending — added after SUMMARY commit]

## Files Created/Modified

- `.env.example` - Committed template documenting NEXT_PUBLIC_CHAT_WEBHOOK_URL and NEXT_PUBLIC_INGEST_WEBHOOK_URL with placeholder values for new developers
- `.env.local` - Local dev env file with placeholder webhook URLs; excluded from git via `.env*.local` in `.gitignore`

## Decisions Made

- **NEXT_PUBLIC_ prefix:** Both Phase 2 (chat) and Phase 3 (admin upload) POST to these webhooks from the browser using client-side `fetch`. Without `NEXT_PUBLIC_`, Next.js only exposes env vars server-side (API routes / Server Components). If webhook calls are later moved to Server Actions or API routes, the prefix can be dropped.
- **.gitignore already correct:** The scaffold from Plan 01-01 included `.env*.local` in `.gitignore`, covering `.env.local`. No modification was needed.
- **Placeholder values:** Using `https://placeholder.example.com/webhook/...` as placeholder values allows the dev server and build to succeed without errors while real webhook URLs (n8n instances) remain TBD.

## Deviations from Plan

None - plan executed exactly as written. The `.gitignore` check in step 3 confirmed `.env*.local` was already present — no modification was needed.

## Issues Encountered

None. The build confirmed NEXT_PUBLIC_ variable injection works correctly. Real webhook URLs (chat inference and n8n ingest) remain TBD as documented in STATE.md — they will be filled in when Phase 2 and Phase 3 are ready for end-to-end testing.

## User Setup Required

**When real webhook URLs become available:** Edit `.env.local` and replace the placeholder values:

```bash
# .env.local
NEXT_PUBLIC_CHAT_WEBHOOK_URL=https://your-actual-n8n.com/webhook/chat
NEXT_PUBLIC_INGEST_WEBHOOK_URL=https://your-actual-n8n.com/webhook/ingest
```

Restart the dev server (`npm run dev`) after editing — no source code changes required.

## Next Phase Readiness

- Phase 2 (chat) can read `process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL` for inference fetch calls
- Phase 3 (admin) can read `process.env.NEXT_PUBLIC_INGEST_WEBHOOK_URL` for PDF upload fetch calls
- **Blocker (carried from STATE.md):** Real webhook URLs are TBD — Phase 2 and 3 can be built using the placeholder values, but end-to-end testing requires the actual n8n webhook URLs to be filled in `.env.local`

## Self-Check: PASSED

- FOUND: .env.example
- FOUND: .env.local
- FOUND: .planning/phases/01-foundation/01-03-SUMMARY.md
- FOUND: commit 5096825

---
*Phase: 01-foundation*
*Completed: 2026-02-23*
