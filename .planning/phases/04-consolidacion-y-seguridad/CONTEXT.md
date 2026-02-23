# Phase 4 Context: Consolidación y Seguridad

## Architectural Decisions

1. **Server Actions / Route Handlers for Webhooks**: The webhooks for chat inference and document ingest in n8n are currently exposed via `NEXT_PUBLIC_` environment variables. They MUST be moved to the server side (e.g., Next.js Server Actions or API routes) so the webhook URLs remain secret (`process.env.WEBHOOK_URL`).
2. **Remove `localStorage` for System Prompt**: The System Prompt currently relies on `localStorage`, meaning it's only persisted on the admin's device. To fix this, hardcode the system prompt on the server, store it in a remote DB, or ensure the server action has access to the canonical prompt without relying on the client's `localStorage` state. Let's create a minimal server-side configuration file or environment variable (`process.env.SYSTEM_PROMPT`) if a DB is not desirable.
3. **Dynamic Active Documents Check**: The list of documents in the `/admin` panel is hardcoded and transient. Implement a new webhook GET endpoint to fetch the real document list from n8n.
4. **JWT / HTTPOnly Cookie Auth for Admin**: The admin panel currently relies on `sessionStorage("adminAuth") = "true"`. Replace this with a minimal JWT payload stored in an `HttpOnly` cookie for real security.
5. **Clean Chat History**: The chat interface currently appends error messages (e.g., "Sorry, something went wrong") into the actual message state that gets sent back to the context history in the next turn. Filter out client-side errors before building the `history` array for the API request.

## Target Audience
This phase addresses security and robust persistence to move the MVP to a production-ready baseline.
