import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const DATA_DIR = path.join(process.cwd(), "data");
const PROMPT_FILE = path.join(DATA_DIR, "systemPrompt.txt");

async function ensureDataDir() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
    } catch (err) {
        // Ignore error
    }
}

export async function GET() {
    try {
        await ensureDataDir();
        const prompt = await fs.readFile(PROMPT_FILE, "utf-8");
        return NextResponse.json({ prompt });
    } catch (error) {
        return NextResponse.json({ prompt: "" }); // Default to empty string
    }
}

export async function POST(request: Request) {
    try {
        const session = cookies().get("admin_session")?.value;
        const parsed = await decrypt(session ?? "");
        if (!parsed || parsed.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await request.json();
        await ensureDataDir();
        await fs.writeFile(PROMPT_FILE, prompt, "utf-8");
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to save prompt" }, { status: 500 });
    }
}
