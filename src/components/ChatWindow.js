"use client";

import React from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ chat, loading }) {
  return (
    <div className="flex-1 overflow-y-auto border rounded p-2 bg-gray-50 prose prose-sm max-w-none">
      {chat.map((msg, i) => (
        <ChatMessage key={i} msg={msg} />
      ))}
      {loading && <div className="text-gray-500">AI is typing...</div>}
    </div>
  );
}
