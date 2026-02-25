"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatedAvatar } from "@/components/chat/AnimatedAvatar";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

import type { TenantTheme } from "@/lib/tenants";

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  theme: TenantTheme;
}

export function MessageList({ messages, isLoading, theme }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    // Si no hay mensajes, el flex-1 empujará el avatar al centro exacto (abajo tiene otro flex-1 invisible en el html general).
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto flex-1 p-4 pt-20">
      {/* 
        This empty 'flex-1' div consumes maximum vertical space. 
        As messages get added below it, it shrinks until disappearing, 
        pushing the first message up from the very bottom.
      */}
      <div className="flex-1 min-h-2 transition-all duration-700 shrink"></div>

      {/* Avatar Container inserted into the regular DOM Flow (pushable by texts) */}
      <div
        className={`flex justify-center transition-all duration-1000 shrink-0 ${messages.length > 0 ? "scale-50 opacity-40 -my-16" : "scale-100 opacity-100 py-8"
          }`}
      >
        <AnimatedAvatar isShrunk={messages.length > 0} isThinking={isLoading ?? false} theme={theme} />
      </div>

      {/* When no messages, we insert a bottom spacer to perfectly center the Avatar */}
      {messages.length === 0 && (
        <div className="flex-1 transition-all duration-700"></div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={
            message.role === "user"
              ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm px-4 py-2 text-sm"
              : "mr-auto max-w-[80%] bg-muted text-foreground rounded-2xl rounded-bl-sm px-4 py-2 text-sm"
          }
          style={message.role === "user" ? { backgroundColor: theme.primary, color: theme.primaryText } : {}}
        >
          {message.role === "assistant" ? (
            <div className="prose prose-sm dark:prose-invert break-words max-w-none prose-p:leading-relaxed prose-pre:p-0">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => <a className="text-blue-500 hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            message.content
          )}
        </div>
      ))}
      {isLoading && (
        <div className="mr-auto max-w-[80%] bg-muted text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-2 text-sm animate-pulse">
          Thinking...
        </div>
      )}
      <div ref={bottomRef} className="h-4 shrink-0" />
    </div>
  );
}
