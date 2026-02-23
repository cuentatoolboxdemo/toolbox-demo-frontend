---
phase: 02-chat-interface
plan: "03"
subsystem: ui
tags: [react, nextjs, fetch, webhook, localstorage, chat]

# Dependency graph
requires:
  - phase: 02-chat-interface/02-02
    provides: ChatInterface shell with useState, MessageList, MessageInput wired to tenant page
provides:
  - Webhook POST in handleSend with { question, tenant, history, systemPrompt } payload
  - Loading indicator (Thinking... animate-pulse bubble) via isLoading prop on MessageList
  - Graceful error fallback message when fetch fails
  - systemPrompt read from localStorage with SSR-safe guard and empty-string fallback
affects:
  - 03-admin-panel (reads systemPrompt from localStorage set by admin panel)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Async handleSend with try/catch/finally for fetch lifecycle"
    - "History built before appending user message — snapshot of prior conversation"
    - "isLoading prop flows from ChatInterface to MessageList for loading bubble"
    - "typeof window !== undefined guard for localStorage in use client component"

key-files:
  created: []
  modified:
    - src/components/chat/ChatInterface.tsx
    - src/components/chat/MessageList.tsx

key-decisions:
  - "history snapshot taken before setMessages to capture prior turns only (not current question)"
  - "response.json() fallback to response.text() handles non-standard webhook response shapes"
  - "isLoading suppresses empty-state prompt to avoid flicker when first message is in flight"

patterns-established:
  - "Webhook fetch pattern: build payload → setIsLoading(true) → fetch → parse → append → finally setIsLoading(false)"
  - "Error boundary pattern: catch all fetch errors, never crash, always show user-facing message"

requirements-completed: [CHAT-04, CHAT-05, CHAT-07]

# Metrics
duration: 1min
completed: 2026-02-23
---

# Phase 2 Plan 03: Webhook POST, Loading State, and Assistant Reply Rendering Summary

**Async handleSend in ChatInterface POSTs OpenAI-style history + systemPrompt to n8n webhook with animated loading bubble and graceful error fallback.**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-23T14:09:01Z
- **Completed:** 2026-02-23T14:09:52Z
- **Tasks:** 1 (of 1 auto task)
- **Files modified:** 2

## Accomplishments
- Replaced TODO stub with async handleSend that POSTs to NEXT_PUBLIC_CHAT_WEBHOOK_URL
- Webhook payload matches CHAT-07 schema: { question, tenant, history, systemPrompt }
- History built as snapshot of messages before current user message (OpenAI-style prior turns only)
- MessageList now accepts isLoading prop and renders animated "Thinking..." bubble
- On any fetch error: graceful assistant message shown, component never crashes
- systemPrompt read from localStorage with typeof window guard (SSR-safe)
- npm run build passes — zero TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement webhook POST with loading state and response rendering** - `d899a11` (feat)

**Plan metadata:** pending final commit (docs)

## Files Created/Modified
- `src/components/chat/ChatInterface.tsx` - Full handleSend with async fetch, history, systemPrompt, error handling
- `src/components/chat/MessageList.tsx` - Added isLoading?: boolean prop, renders Thinking... bubble when true

## Decisions Made
- History snapshot taken from messages state before appending userMessage — ensures current question is NOT in history array, only prior conversation turns
- response.json() attempted first with fallback to response.text() to handle both structured { answer } and plain text webhook responses
- Empty-state "Send a message to get started" prompt suppressed while isLoading=true to avoid showing it alongside the Thinking... bubble

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

The webhook URL (NEXT_PUBLIC_CHAT_WEBHOOK_URL) must be set in .env.local before end-to-end testing works. With a placeholder/missing URL the fetch fails gracefully and the error fallback message is shown (expected behavior).

## Next Phase Readiness
- Complete chat interface is ready: tenant routing, iMessage UI, webhook integration with history and systemPrompt
- Phase 3 (admin panel) can write "systemPrompt" to localStorage; ChatInterface will pick it up automatically
- Webhook URL needed in .env.local before real end-to-end verification can pass

---
*Phase: 02-chat-interface*
*Completed: 2026-02-23*
