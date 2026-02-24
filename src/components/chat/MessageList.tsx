"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
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
      <div ref={bottomRef} />
    </div>
  );
}
