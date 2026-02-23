"use client";

import { useState, useRef } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

interface UploadZoneProps {
  onUploadSuccess: (filename: string) => void;
}

export function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file) return;
    setIsUploading(true);
    setStatusMsg(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(process.env.NEXT_PUBLIC_INGEST_WEBHOOK_URL!, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      setStatusMsg({
        type: "success",
        text: `"${file.name}" uploaded successfully.`,
      });
      onUploadSuccess(file.name);
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Upload failed.",
      });
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function getDropzoneClassName() {
    const base =
      "relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors";
    if (isUploading) return `${base} border-border bg-muted/20 cursor-not-allowed opacity-70`;
    if (isDragging) return `${base} border-primary bg-primary/5`;
    return `${base} border-border bg-background hover:bg-muted/30`;
  }

  return (
    <div>
      <div
        className={getDropzoneClassName()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Uploading…</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop a PDF here, or{" "}
              <span className="text-primary font-medium">click to browse</span>
            </p>
          </>
        )}
      </div>
      {statusMsg && (
        <p
          className={`text-sm mt-3 ${
            statusMsg.type === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {statusMsg.text}
        </p>
      )}
    </div>
  );
}
