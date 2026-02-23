"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/tenants";
import { MessageList, type Message } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

interface ChatInterfaceProps {
  tenant: Tenant;
}

export function ChatInterface({ tenant }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend(text: string) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    // Build history from current messages BEFORE appending userMessage
    const history = messages.map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const systemPrompt =
        typeof window !== "undefined"
          ? (localStorage.getItem("systemPrompt") ?? "")
          : "";

      const response = await fetch(
        process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL!,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: text,
            tenant: tenant.slug,
            history,
            systemPrompt,
          }),
        }
      );

      let answer: string;
      const json = await response.json().catch(() => null);
      if (json && typeof json.answer === "string") {
        answer = json.answer;
      } else {
        answer = await response.text().catch(() => "Sorry, something went wrong. Please try again.");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSubmit={handleSend} disabled={isLoading} />
    </div>
  );
}
