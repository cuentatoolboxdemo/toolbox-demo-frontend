import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PROMPT_FILE = path.join(DATA_DIR, "systemPrompt.txt");

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Read the System Prompt securely from the server
        let systemPrompt = "";
        try {
            systemPrompt = await fs.readFile(PROMPT_FILE, "utf-8");
        } catch {
            // Keep it empty if not set
        }

        // Override the body object with the secure system prompt
        body.systemPrompt = systemPrompt;

        const webhookUrl = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || process.env.CHAT_WEBHOOK_URL;
        if (!webhookUrl) throw new Error("CHAT_WEBHOOK_URL is not set");

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with status: ${response.status}`);
        }

        // Pass the response forward
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            // Map n8n's default `output` or `text` field to `answer`
            const answerText = data.output || data.text || data.answer || JSON.stringify(data);
            return NextResponse.json({ answer: answerText });
        } else {
            const text = await response.text();
            return NextResponse.json({ answer: text });
        }
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 });
    }
}
