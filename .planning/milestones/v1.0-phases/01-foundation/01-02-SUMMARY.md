---
phase: 01-foundation
plan: "02"
subsystem: infra
tags: [pwa, manifest, icons, next-pwa, sharp, meta-tags, app-router]

# Dependency graph
requires:
  - phase: 01-foundation/01-01
    provides: Next.js 14 App Router project with next-pwa installed and configured
provides:
  - public/manifest.json with name, display standalone, theme_color #18181b, two icon sizes
  - public/icons/icon-192x192.png — valid 192x192 PNG placeholder icon
  - public/icons/icon-512x512.png — valid 512x512 PNG placeholder icon
  - src/app/layout.tsx with full PWA meta tags (apple-mobile-web-app-*, theme-color, manifest link)
  - Next.js Metadata API manifest field pointing to /manifest.json
affects: [02-chat-interface, 03-admin-interface]

# Tech tracking
tech-stack:
  added:
    - sharp@0.33.x (dev dependency — icon generation on Windows without native canvas bindings)
  patterns:
    - Next.js Metadata API manifest field for <link rel="manifest"> generation
    - Direct <head> JSX in RootLayout for iOS-specific meta tags not covered by Metadata API
    - Node.js script (scripts/generate-icons.mjs) with sharp for programmatic PNG generation

key-files:
  created:
    - public/manifest.json
    - public/icons/icon-192x192.png
    - public/icons/icon-512x512.png
    - scripts/generate-icons.mjs
  modified:
    - src/app/layout.tsx
    - package.json
    - package-lock.json

key-decisions:
  - "Used sharp instead of canvas for icon generation: Windows environment lacks the native build tools (Python, Visual C++) required by canvas's node-gyp bindings; sharp ships prebuilt binaries and works without build tools"
  - "Direct <head> element in RootLayout JSX: Next.js App Router Metadata API does not expose all iOS PWA meta tags (apple-mobile-web-app-capable, apple-mobile-web-app-status-bar-style, apple-touch-icon); adding <head> directly in JSX alongside <html> and <body> is the correct App Router pattern"
  - "Manifest field in Metadata API for <link rel=manifest>: Next.js Metadata API manifest property generates the correct <link rel=manifest href=/manifest.json> tag automatically"

patterns-established:
  - "PWA manifest at public/manifest.json — served statically by Next.js"
  - "Icons at public/icons/ — served statically, referenced from manifest.json"
  - "RootLayout <head> block for platform-specific meta tags not covered by Metadata API"

requirements-completed: [PWA-01, PWA-02, PWA-03, PWA-04]

# Metrics
duration: 10min
completed: 2026-02-23
---

# Phase 1 Plan 02: PWA Manifest, Icons, and Meta Tags Summary

**Web app manifest with 192x192/512x512 placeholder icons (sharp-generated) and full iOS/Android PWA meta tags in Next.js App Router root layout**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-02-23T08:55:15Z
- **Completed:** 2026-02-23T09:05:00Z
- **Tasks:** 3 complete (including Task 3 human-verify checkpoint — approved 2026-02-23)
- **Files modified:** 7

## Accomplishments

- Created `public/manifest.json` with all required PWA fields: name "Toolbox AI", display "standalone", theme_color "#18181b", start_url "/", both icon sizes
- Generated valid PNG icons at both required sizes (192x192 and 512x512) using sharp without native build tools
- Updated `src/app/layout.tsx` with manifest link via Metadata API and all iOS/Android PWA meta tags in direct `<head>` JSX
- `npm run build` passes cleanly; next-pwa service worker now generates in production builds

## Task Commits

Each task was committed atomically:

1. **Task 1: Create manifest.json and generate placeholder icons** - `cd2d05a` (feat)
2. **Task 2: Add PWA meta tags and manifest link to root layout** - `6194814` (feat)
3. **Task 3: Verify PWA installability in browser DevTools** - human-verify checkpoint approved (manifest confirmed in Chrome DevTools; icons display with dark background and white T lettermark; screenshots show mock chat UI; all 4 DevTools warnings resolved)

**Plan metadata:** `e109313` (docs: complete PWA manifest plan)

## Files Created/Modified

- `public/manifest.json` - PWA manifest with name, display, theme_color, start_url, two icon entries
- `public/icons/icon-192x192.png` - 192x192 PNG placeholder (dark #18181b background, 24-channel RGBA)
- `public/icons/icon-512x512.png` - 512x512 PNG placeholder (dark #18181b background, 24-channel RGBA)
- `scripts/generate-icons.mjs` - Node.js icon generation script using sharp
- `src/app/layout.tsx` - Root layout with manifest Metadata field + full PWA meta tag `<head>` block
- `package.json` - Added sharp as devDependency
- `package-lock.json` - Updated lockfile

## Decisions Made

- **sharp over canvas for icon generation**: The `canvas` package requires native bindings compiled via node-gyp, which needs Python and Visual C++ on Windows. `sharp` ships prebuilt WASM/native binaries for Windows x64 with no build tool requirements. Both produce identical valid PNG output.

- **Direct `<head>` in RootLayout JSX**: Next.js App Router Metadata API covers `<link rel="manifest">` via the `manifest` field, `<title>`, and `<meta name="description">`, but does NOT expose `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, or `<link rel="apple-touch-icon">`. Adding a `<head>` element directly in the RootLayout JSX (alongside `<html>` and `<body>`) is the correct documented pattern for App Router.

## Deviations from Plan

None — plan executed exactly as written. The plan explicitly documented the `canvas` vs `sharp` fallback for Windows. The `<head>` pattern was also documented in the plan.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- PWA manifest and icons confirmed valid in Chrome DevTools (checkpoint approved 2026-02-23)
- `01-03-PLAN.md` (environment variables) completed after this checkpoint
- All downstream phases (02-chat-interface, 03-admin-interface) have their PWA foundation ready
- Phase 1 complete — no blockers

---
*Phase: 01-foundation*
*Completed: 2026-02-23*

## Self-Check: PASSED

All created files verified present on disk. All three task commits (cd2d05a, 6194814, human-verify checkpoint approved) confirmed. Plan docs commit e109313 confirmed in git log.
