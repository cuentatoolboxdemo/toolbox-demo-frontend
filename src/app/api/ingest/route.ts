import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
    try {
        const session = cookies().get("admin_session")?.value;
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const webhookUrl = process.env.NEXT_PUBLIC_INGEST_WEBHOOK_URL || process.env.INGEST_WEBHOOK_URL;
        if (!webhookUrl) throw new Error("INGEST_WEBHOOK_URL is not set");

        const response = await fetch(webhookUrl, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with status: ${response.status}`);
        }

        // Since we don't have n8n docs dynamically fetching yet, 
        // we should append the doc to our local docs.json mock file if needed, (for Plan 3).
        // For now, let's just return success
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Ingest API Error:", error);
        return NextResponse.json({ error: "Failed to process ingest request" }, { status: 500 });
    }
}
