"use client";

import React from "react";

export default function ChatInput({ message, setMessage, sendMessage, loading }) {
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        className="flex-1 border rounded p-2 bg-gray-100 text-black"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Send
      </button>
    </div>
  );
}
