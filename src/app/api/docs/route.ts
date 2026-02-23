import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DOCS_FILE = path.join(DATA_DIR, "docs.json");

const INITIAL_DOCS = [
    { id: "1", filename: "employee-handbook.pdf", uploadedAt: "2026-01-10" },
    { id: "2", filename: "product-catalog-2025.pdf", uploadedAt: "2026-01-15" },
    { id: "3", filename: "onboarding-guide.pdf", uploadedAt: "2026-02-01" },
];

export async function GET() {
    try {
        let docs = [];
        try {
            const data = await fs.readFile(DOCS_FILE, "utf-8");
            docs = JSON.parse(data);
        } catch {
            docs = INITIAL_DOCS;
            // Initialize the file
            await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => { });
            await fs.writeFile(DOCS_FILE, JSON.stringify(docs, null, 2), "utf-8").catch(() => { });
        }
        return NextResponse.json({ docs });
    } catch (error) {
        return NextResponse.json({ docs: INITIAL_DOCS });
    }
}
