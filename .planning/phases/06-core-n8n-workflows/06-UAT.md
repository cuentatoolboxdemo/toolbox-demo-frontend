---
status: testing
phase: 06-core-n8n-workflows
source: [06-01-SUMMARY.md, 06-02-SUMMARY.md, 06-03-SUMMARY.md]
started: 2026-02-24T10:02:00Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 1
name: Import and Configure n8n Ingest Workflow
expected: |
  User successfully imports the JSON to n8n, configures the S3, Qdrant, and OpenRouter credentials, and manually uploads a PDF in the Next.js UI to trigger ingestion into Qdrant.
awaiting: user response

## Tests

### 1. Import and Configure n8n Ingest Workflow
expected: User successfully imports the JSON to n8n, configures the S3, Qdrant, and OpenRouter credentials, and manually uploads a PDF in the Next.js UI to trigger ingestion into Qdrant.
result: [pending]

### 2. Import and Configure n8n Delete Workflow
expected: User successfully imports the Delete JSON to n8n, configures S3/Qdrant, and clicks the Trash icon in Admin UI. The document disappears from the UI and Qdrant removes the vectors.
result: [pending]

### 3. Import and Configure n8n Chat Workflow
expected: User successfully imports the Chat JSON, maps OpenRouter and Qdrant. When asking a question on the Chat interface, the AI accurately responds using context from the previously ingested PDF.
result: [pending]

## Summary

total: 3
passed: 0
issues: 0
pending: 3
skipped: 0

## Gaps

- None yet.
