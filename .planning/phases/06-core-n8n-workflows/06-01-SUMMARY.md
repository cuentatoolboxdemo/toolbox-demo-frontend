---
phase: 6
plan: 1
subsystem: n8n-ingest
depends_on: []
files_modified:
  - "n8n/workflows/01-Ingest.json"
  - "src/app/api/ingest/route.ts"
autonomous: true
requirements_completed: [SYS-01]
key-decisions:
  - Injected `document_id` straight into the `FormData` on Next.js so n8n can natively parse it.
---

# Phase 6 Plan 1: n8n Ingest Workflow Summary

## Substantive Changes
- Updated `src/app/api/ingest/route.ts` to generate `newId` upfront and append it to the outgoing `FormData` hitting the webhook.
- Authored `n8n/workflows/01-Ingest.json`, an exportable node collection simulating the exact setup for the Webhook -> S3 -> Read PDF -> Qdrant indexing chain.

## Deviations from Plan
- None.
