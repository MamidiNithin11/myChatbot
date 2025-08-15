"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ msg }) {
  return (
    <div className="mb-4 p-2 rounded bg-gray-100">
      <strong className={msg.role === "user" ? "text-blue-600" : "text-green-600"}>
        {msg.role === "user" ? "You" : "AI"}:
      </strong>
      {msg.role === "assistant" ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="text-orange-600">{children}</p>,
            h1: ({ children }) => <h1 className="text-orange-700 font-bold text-xl">{children}</h1>,
            h2: ({ children }) => <h2 className="text-orange-700 font-semibold text-lg">{children}</h2>,
            li: ({ children }) => <li className="text-orange-600">{children}</li>,
            strong: ({ children }) => <strong className="text-orange-800">{children}</strong>,
          }}
        >
          {msg.content}
        </ReactMarkdown>
      ) : (
        <p className="text-black">{msg.content}</p>
      )}
    </div>
  );
}
