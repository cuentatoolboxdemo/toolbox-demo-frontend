"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/tenants";
import { MessageList, type Message } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { Home } from "lucide-react";
import Link from "next/link";

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

    // Build history from current messages BEFORE appending userMessage, filtering out error messages
    const history = messages
      .filter((msg) => !msg.content.startsWith("Sorry, something went wrong"))
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          tenant: tenant.slug,
          history,
        }),
      });

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
    <div className="flex flex-col flex-1 h-full overflow-hidden relative">
      <div className="absolute top-4 left-4 z-20">
        <Link href="/" className="p-2 bg-white/80 backdrop-blur-sm shadow-sm rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center justify-center">
          <Home className="w-5 h-5" />
        </Link>
      </div>

      <div className="flex flex-col flex-1 h-full overflow-hidden relative z-10">
        <MessageList messages={messages} isLoading={isLoading} theme={tenant.theme} />
        <MessageInput onSubmit={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
