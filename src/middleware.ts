import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const session = request.cookies.get("admin_session")?.value;

    // Protect /admin and /api/ingest routes
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isProtectedApi = request.nextUrl.pathname.startsWith("/api/ingest") || request.nextUrl.pathname.startsWith("/api/docs");

    if (isAdminRoute || isProtectedApi) {
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            if (isProtectedApi) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            // If navigating to /admin, we still render the page but the page will show the login form
            // That is handled by AdminRoute checking auth. Wait, middleware could just redirect to a proper login page,
            // but the current design renders the login form inline if not authenticated.
            // So for /admin UI, we don't redirect. We let the page render, and check session there.
            // We will inject a header so the client component knows if it's authenticated.
            const response = NextResponse.next();
            response.headers.set("x-is-admin", "false");
            return response;
        }

        // Authenticated
        const response = NextResponse.next();
        response.headers.set("x-is-admin", "true");
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/ingest", "/api/docs"],
};
