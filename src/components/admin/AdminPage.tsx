"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadZone } from "@/components/admin/UploadZone";
import { SystemPromptEditor } from "@/components/admin/SystemPromptEditor";
import { Trash2, Home } from "lucide-react";
import Link from "next/link";

type DocItem = { id: string; filename: string; uploadedAt: string };

const INITIAL_DOCS: DocItem[] = [
  { id: "1", filename: "employee-handbook.pdf", uploadedAt: "2026-01-10" },
  { id: "2", filename: "product-catalog-2025.pdf", uploadedAt: "2026-01-15" },
  { id: "3", filename: "onboarding-guide.pdf", uploadedAt: "2026-02-01" },
];

export function AdminPage({ initialAuthed }: { initialAuthed: boolean }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authed) {
      fetch("/api/docs")
        .then((res) => res.json())
        .then((data) => {
          if (data.docs) setDocs(data.docs);
        })
        .catch(() => { });
    }
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setAuthed(true);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Network error");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setPassword("");
    setError("");
  }

  async function handleDelete(id: string) {
    // Optimistic UI update could be done, but let's just do it sequentially 
    // to ensure it actually deleted
    try {
      const res = await fetch(`/api/docs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocs((prev) => prev.filter((d) => d.id !== id));
      }
    } catch {
      // Error handling
    }
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
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
        <div className="flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold">Toolbox Admin</h1>
        </div>
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
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                    Active
                  </span>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
