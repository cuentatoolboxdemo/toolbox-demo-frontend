"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/tenants";
import { MessageList, type Message } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

interface ChatInterfaceProps {
  tenant: Tenant;
}

export function ChatInterface({ tenant: _tenant }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSend(text: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    // TODO(02-03): POST to webhook and append assistant reply
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <MessageList messages={messages} />
      <MessageInput onSubmit={handleSend} disabled={isLoading} />
    </div>
  );
}
