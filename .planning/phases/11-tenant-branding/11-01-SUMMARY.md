---
phase: 11
plan: 1
subsystem: ui-polish
depends_on: [10-01-PLAN]
requirements_completed: [UX-03]
---
# Phase 11 Plan 1 Summary: Dynamic Tenant Theming & Avatar Customization

## Execution Details
- Expanded the `Tenant` definition in `src/lib/tenants.ts` to include a `TenantTheme` structure with variables for `primary`, `primaryText`, `avatarGlow`, `avatarPulse`, `ring`, and an optional `logoUrl`.
- Populated `TENANTS` mapping with distinct visual identities: 
  - Calzedonia: Elegant monochrome (Black/White/Gray).
  - Sabores: Warm palette (Orange/Amber shades).
  - IDE Marketing: Tech scheme (Blue/Indigo hues).
- Refactored `AnimatedAvatar.tsx` to accept the `theme` object. Rewrote statically compiled Tailwind constants mapping to dynamic inline `style` objects (`backgroundColor`, `borderColor`, `boxShadow`) driven by the `theme` variables. This circumvented Tailwind's JIT stripping issues safely.
- Appended `<img>` element rendering within `AnimatedAvatar`'s center if `logoUrl` is provided, retaining pulsing behavior over the image. Added suppression of `eslint-disable @next/next/no-img-element`.
- Modified `MessageList.tsx` to receive the `theme` and adapt the user message bubble configurations dynamically to match the configured `primary` brand properties.

## Verification Output
All UI scaling properties, pulse arrays, and static tailwind fallback bounds remain operable. Transition to dynamic CSS properties functions seamlessly with no hydration or layout shifting errors. The chat visuals strictly isolate according to URL directory.
