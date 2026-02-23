"use client";

import { useState, useEffect } from "react";

export function SystemPromptEditor() {
  const [value, setValue] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("systemPrompt");
    if (saved) setValue(saved);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = e.target.value;
    setValue(newValue);
    localStorage.setItem("systemPrompt", newValue);
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted-foreground">
        This prompt is included in every chat request. Leave blank for no system prompt.
      </p>
      <textarea
        className="w-full min-h-[120px] rounded-lg border bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 placeholder:text-muted-foreground"
        placeholder="e.g. You are a helpful assistant for Calzedonia employees..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
