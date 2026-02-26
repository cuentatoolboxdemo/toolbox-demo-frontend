---
status: complete
phase: 07-directory-navigation-ux
source:
  - 07-01-SUMMARY.md
  - 07-02-SUMMARY.md
started: "2026-02-25T13:40:00Z"
updated: "2026-02-25T13:47:00Z"
---

## Current Test

[testing complete]
awaiting: next steps

## Tests

### 1. Tenant Directory Landing Page
expected: |
  Navigate to the root URL `/`. 
  You should see a "Toolbox AI" header and a grid of 3 tenant cards:
  - Calzedonia
  - Sabores
  - IDE Marketing
  Each card should have a "Bot" icon and a chevron at the right.
result: pass

### 2. Tenant Navigation Links
expected: |
  Click on any of the cards in the directory.
  It should navigate to the respective chat interface at `/[tenant]` (e.g., `/calzedonia`).
result: pass

### 3. Home Navigation from Chat
expected: |
  While in a chat interface (e.g., `/sabores`), look for a "Home" icon (house shape) at the top left.
  Clicking it should return you to the root directory `/`.
result: pass

### 4. Home Navigation from Admin
expected: |
  Navigate to a tenant admin page (e.g., `/admin/calzedonia`).
  In the header next to "Toolbox Admin", there should be a "Home" icon.
  Clicking it should return you to the root directory `/`.
result: pass

## Summary

total: 4
passed: 4
issues: 0
pending: 0
skipped: 0

## Gaps

- truth: "User doesn't need to guess/type the admin URL."
  status: failed
  reason: "User reported that the root directory lacks direct links to admin panels. Authentication should happen before routing to decide between Chat or Admin view."
  severity: major
  test: 4
