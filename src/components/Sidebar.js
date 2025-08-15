"use client";

import React from "react";

export default function Sidebar({ pages, currentPage, setCurrentPage, newPage, deletePage }) {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="font-bold">Chats</span>
        <button className="bg-green-600 px-2 py-1 rounded" onClick={newPage}>
          +
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {pages.map((p) => (
          <div
            key={p.id}
            className={`p-3 flex justify-between items-center cursor-pointer ${
              p.id === currentPage ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setCurrentPage(p.id)}
          >
            <span>{p.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePage(p.id);
              }}
              className="text-red-400 hover:text-red-600"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
