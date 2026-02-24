---
phase: 5
plan: 2
subsystem: chat-ui
depends_on: []
files_modified:
  - "package.json"
  - "src/components/chat/MessageList.tsx"
autonomous: true
requirements_completed: [UX-02]
key-decisions:
  - Used `react-markdown` with mapped basic components to enforce the Tailwind design system without needing `@tailwindcss/typography`.
---

# Phase 5 Plan 2: React Markdown for Citations Summary

## Substantive Changes
- Installed `react-markdown` v9 to parse the standard markdown output from LangChain/n8n.
- Overhauled `MessageList.tsx` to conditionally render Markdown if the role is "assistant", leaving plain text for standard "user" input.
- Added a `<div className="prose ...">` wrapper and customized individual components (`a`, `p`, `ul`, `ol`, `li`, `strong`) injecting our specific Tailwind CSS utilities so lists are correctly indented and links show up as blue and clickable.
- Avoided the `className` type error on the `ReactMarkdown` component by structuring the wrappers properly according to its latest types.

## Deviations from Plan
- None.
