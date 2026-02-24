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
        const file = formData.get("file") as File;
        const newId = crypto.randomUUID();

        // n8n expects document_id inside the form data payload to attach it as metadata
        formData.append("document_id", newId);

        let webhookSuccess = false;
        try {
            const webhookUrl = process.env.NEXT_PUBLIC_INGEST_WEBHOOK_URL || process.env.INGEST_WEBHOOK_URL;
            if (webhookUrl) {
                const response = await fetch(webhookUrl, {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) webhookSuccess = true;
            }
        } catch (e) {
            console.warn("Webhook off, continuing via mock...");
        }

        // Append to docs.json
        const DATA_DIR = path.join(process.cwd(), "data");
        const DOCS_FILE = path.join(DATA_DIR, "docs.json");
        let docs = [];
        try {
            const data = await fs.readFile(DOCS_FILE, "utf-8");
            docs = JSON.parse(data);
        } catch {
            docs = [
                { id: "1", filename: "employee-handbook.pdf", uploadedAt: "2026-01-10" },
                { id: "2", filename: "product-catalog-2025.pdf", uploadedAt: "2026-01-15" },
                { id: "3", filename: "onboarding-guide.pdf", uploadedAt: "2026-02-01" },
            ];
        }

        const today = new Date().toISOString().split("T")[0];
        if (file) {
            docs.push({ id: newId, filename: file.name, uploadedAt: today });
            await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => { });
            await fs.writeFile(DOCS_FILE, JSON.stringify(docs, null, 2), "utf-8");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Ingest API Error:", error);
        return NextResponse.json({ error: "Failed to process ingest request" }, { status: 500 });
    }
}
