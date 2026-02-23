import { NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password === "demo123") {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const session = await encrypt({ role: "admin", expires });

            cookies().set("admin_session", session, {
                expires,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Invalid password" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Authentication failed" },
            { status: 500 }
        );
    }
}
