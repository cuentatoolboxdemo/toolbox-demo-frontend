import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = cookies().get("admin_session")?.value;
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = params.id;

        // Read local docs
        const DATA_DIR = path.join(process.cwd(), "data");
        const DOCS_FILE = path.join(DATA_DIR, "docs.json");
        let docs: any[] = [];

        try {
            const data = await fs.readFile(DOCS_FILE, "utf-8");
            docs = JSON.parse(data);
        } catch {
            // File might not exist or be invalid, nothing to delete locally
        }

        const docToDelete = docs.find(d => d.id === id);

        if (docToDelete) {
            // Attempt to hit n8n webhook to delete from vector store
            try {
                const webhookUrl = process.env.NEXT_PUBLIC_DELETE_WEBHOOK_URL || process.env.DELETE_WEBHOOK_URL;
                if (webhookUrl) {
                    await fetch(webhookUrl, {
                        method: "POST", // Webhooks usually accept POST for actions even if REST semantics say DELETE
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: docToDelete.id, filename: docToDelete.filename })
                    });
                }
            } catch (error) {
                console.warn("Failed to notify n8n of deletion, continuing with local cleanup...", error);
            }

            // Remove locally
            docs = docs.filter(d => d.id !== id);
            await fs.writeFile(DOCS_FILE, JSON.stringify(docs, null, 2), "utf-8");
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }
}
