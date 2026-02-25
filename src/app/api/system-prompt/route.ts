import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const DATA_DIR = path.join(process.cwd(), "data");

function getPromptFile(tenantId: string) {
    return path.join(DATA_DIR, `systemPrompt_${tenantId}.txt`);
}

async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (err) {
        // Ignore error
    }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
        return NextResponse.json({ prompt: "" });
    }

    try {
        await ensureDataDir();
        const prompt = await fs.readFile(getPromptFile(tenantId), "utf-8");
        return NextResponse.json({ prompt });
    } catch (error) {
        return NextResponse.json({ prompt: "" }); // Default to empty string
    }
}

export async function POST(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tenantId = searchParams.get("tenantId");

        if (!tenantId) {
            return NextResponse.json({ error: "Tenant ID required" }, { status: 400 });
        }

        const session = cookies().get("auth_session")?.value;
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await request.json();
        await ensureDataDir();
        await fs.writeFile(getPromptFile(tenantId), prompt, "utf-8");
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save prompt" }, { status: 500 });
    }
}
