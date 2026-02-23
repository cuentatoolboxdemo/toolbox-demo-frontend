"use client";

import { useEffect, useRef } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col gap-2 overflow-y-auto flex-1 p-4 items-center justify-center">
        <p className="text-muted-foreground text-sm text-center">
          Send a message to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto flex-1 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === "user"
              ? "ml-auto max-w-[80%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 text-sm"
              : "mr-auto max-w-[80%] bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 text-sm"
          }
        >
          {message.content}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
