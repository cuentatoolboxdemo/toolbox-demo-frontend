"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadZone } from "@/components/admin/UploadZone";
import { SystemPromptEditor } from "@/components/admin/SystemPromptEditor";

type DocItem = { id: string; filename: string; uploadedAt: string };

const INITIAL_DOCS: DocItem[] = [
  { id: "1", filename: "employee-handbook.pdf", uploadedAt: "2026-01-10" },
  { id: "2", filename: "product-catalog-2025.pdf", uploadedAt: "2026-01-15" },
  { id: "3", filename: "onboarding-guide.pdf", uploadedAt: "2026-02-01" },
];

export function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("adminAuth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === "demo123") {
      sessionStorage.setItem("adminAuth", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("adminAuth");
    setAuthed(false);
    setPassword("");
    setError("");
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm p-8 rounded-2xl border bg-card shadow-sm">
          <h1 className="text-xl font-semibold mb-6">Toolbox Admin</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-lg font-semibold">Toolbox Admin</h1>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-10">
        <section>
          <h2 className="text-base font-semibold mb-4">Document Upload</h2>
          <UploadZone
            onUploadSuccess={(filename) => {
              const today = new Date().toISOString().split("T")[0];
              setDocs((prev) => [
                ...prev,
                { id: crypto.randomUUID(), filename, uploadedAt: today },
              ]);
            }}
          />
        </section>
        <section>
          <h2 className="text-base font-semibold mb-4">Active Documents</h2>
          <div>
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-sm">{doc.filename}</span>
                  <span className="text-xs text-muted-foreground">
                    {doc.uploadedAt}
                  </span>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  Active
                </span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-base font-semibold mb-4">System Prompt</h2>
          <SystemPromptEditor />
        </section>
      </main>
    </div>
  );
}
