import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest } from "next/server";

const DATA_DIR = path.join(process.cwd(), "data");

function getDocsFile(tenantId: string) {
    return path.join(DATA_DIR, `docs_${tenantId}.json`);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = cookies().get("auth_session")?.value;
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = params.id;
        const searchParams = request.nextUrl.searchParams;
        const tenantId = searchParams.get("tenantId");

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant is required" }, { status: 400 });
        }

        // Read local docs
        const docsFile = getDocsFile(tenantId);
        let docs: any[] = [];

        try {
            const data = await fs.readFile(docsFile, "utf-8");
            docs = JSON.parse(data);
        } catch {
            // File might not exist or be invalid, nothing to delete locally
        }

        const docToDelete = docs.find(d => d.id === id);

        if (docToDelete) {
            // Attempt to hit n8n webhook to delete from vector store
            try {
                const webhookUrl = process.env.NEXT_PUBLIC_DELETE_WEBHOOK_URL || process.env.DELETE_WEBHOOK_URL;
                console.log("Attempting to call delete webhook:", webhookUrl);

                if (webhookUrl) {
                    const response = await fetch(webhookUrl, {
                        method: "POST", // Webhooks usually accept POST for actions even if REST semantics say DELETE
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: docToDelete.id, filename: docToDelete.filename, tenant: tenantId })
                    });
                    console.log("n8n response status:", response.status);
                } else {
                    console.warn("No DELETE_WEBHOOK_URL found in environment variables");
                }
            } catch (error) {
                console.warn("Failed to notify n8n of deletion, continuing with local cleanup...", error);
            }

            // Remove locally
            docs = docs.filter(d => d.id !== id);
            await fs.writeFile(docsFile, JSON.stringify(docs, null, 2), "utf-8");
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
    }
}
