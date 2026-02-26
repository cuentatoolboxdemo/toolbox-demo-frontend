---
status: complete
phase: 08-tenant-admin-isolation
source:
  - 08-01-SUMMARY.md
  - 08-02-SUMMARY.md
started: "2026-02-25T13:48:00Z"
updated: "2026-02-25T13:54:00Z"
---

## Current Test

[testing complete]
awaiting: next steps

## Tests

### 1. Global /admin Redirect
expected: |
  Navigate to `/admin`.
  The application should automatically redirect you back to the root directory `/`.
result: pass

### 2. Tenant Admin Access
expected: |
  Navigate to `/admin/calzedonia` and `/admin/sabores`.
  You should see the "Toolbox Admin" login screen for each valid tenant. 
  Navigating to `/admin/invalid-tenant` should return a 404.
result: pass

### 3. Isolated System Prompts
expected: |
  1. Go to `/admin/calzedonia`. Log in with `demo123`.
  2. Set the System Prompt to: "I am Calzedonia's assistant." and Save.
  3. Go to `/admin/sabores`. Log in with `demo123`.
  4. Verify the System Prompt is EMPTY (or different) and NOT the Calzedonia one.
result: pass

### 4. Isolated Document Lists
expected: |
  1. Under `/admin/calzedonia`, you should see the tenant ID "calzedonia" next to the documents list.
  2. Under `/admin/sabores`, you should see "sabores" next to the documents list.
  3. Deleting or uploading in one should not affect the list in the other.
result: pass

### 5. API Payload Isolation
expected: |
  1. Open Network Tools.
  2. Upload a file in `/admin/ide_marketing`.
  3. Verify the `POST` payload to `/api/ingest` contains a `tenant` field with value `ide_marketing`.
result: pass

## Summary

total: 5
passed: 5
issues: 0
pending: 0
skipped: 0

## Gaps

[none yet]
