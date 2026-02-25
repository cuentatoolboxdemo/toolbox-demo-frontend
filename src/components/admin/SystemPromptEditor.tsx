"use client";

import { useState, useEffect } from "react";

export function SystemPromptEditor({ tenantId }: { tenantId: string }) {
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadPrompt() {
      try {
        const res = await fetch(`/api/system-prompt?tenantId=${tenantId}`);
        const data = await res.json();
        if (data.prompt) setValue(data.prompt);
      } catch (err) { }
    }
    loadPrompt();
  }, [tenantId]);

  async function handleSave() {
    setIsSaving(true);
    try {
      await fetch(`/api/system-prompt?tenantId=${tenantId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value }),
      });
    } catch (err) { }
    setIsSaving(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          This prompt is included in every chat request. Leave blank for no system prompt.
        </p>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>
      <textarea
        className="w-full min-h-[120px] rounded-lg border bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 placeholder:text-muted-foreground"
        placeholder="e.g. You are a helpful assistant for Calzedonia employees..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
