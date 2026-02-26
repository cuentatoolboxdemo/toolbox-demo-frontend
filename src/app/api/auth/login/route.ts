import { NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        let role = "";
        const adminPassword = process.env.ADMIN_PASSWORD;
        const userPassword = process.env.USER_PASSWORD;

        if (!adminPassword || !userPassword) {
            console.error("Authentication environment variables not configured.");
            return NextResponse.json(
                { success: false, error: "Server misconfiguration" },
                { status: 500 }
            );
        }

        if (password === adminPassword) role = "admin";
        else if (password === userPassword) role = "user";

        if (role) {
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const session = await encrypt({ role, expires });

            cookies().set("auth_session", session, {
                expires,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return NextResponse.json({ success: true, role });
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
