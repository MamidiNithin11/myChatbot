"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

export default function HomePage() {
  const [pages, setPages] = useState([{ id: Date.now(), title: "New Chat", messages: [] }]);
  const [currentPage, setCurrentPage] = useState(pages[0].id);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chat = pages.find((p) => p.id === currentPage)?.messages || [];

const sendMessage = async () => {
  if (!message.trim()) return;

  const updatedPages = pages.map((p) =>
    p.id === currentPage
      ? { ...p, messages: [...p.messages, { role: "user", content: message }] }
      : p
  );
  setPages(updatedPages);
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message,
        system: "You are an AI assistant. Always respond in English."
      }),
    });

    const data = await res.json();

    setPages((prev) =>
      prev.map((p) =>
        p.id === currentPage
          ? { ...p, messages: [...p.messages, { role: "assistant", content: data.reply }] }
          : p
      )
    );
  } catch (error) {
    console.error("Chat error:", error);
  } finally {
    setLoading(false);
  }
};


  const newPage = () => {
    const id = Date.now();
    setPages([...pages, { id, title: `Chat ${pages.length + 1}`, messages: [] }]);
    setCurrentPage(id);
  };

  const deletePage = (id) => {
    const filtered = pages.filter((p) => p.id !== id);
    setPages(filtered);
    if (id === currentPage && filtered.length > 0) {
      setCurrentPage(filtered[0].id);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        newPage={newPage}
        deletePage={deletePage}
      />
      <main className="flex-1 p-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">💬 AI Chatbot</h1>
        <ChatWindow chat={chat} loading={loading} />
        <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} loading={loading} />
      </main>
    </div>
  );
}
