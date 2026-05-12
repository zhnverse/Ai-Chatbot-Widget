import { useEffect, useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import axios from "axios";

// In production (Vercel), use the deployed Render backend URL.
const API_BASE = import.meta.env.VITE_API_URL ?? "";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    businessName: "AI Assistant",
    primaryColor: "#2563eb",
  });
  const { messages, isTyping, error, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef(null);
  const [unread, setUnread] = useState(0);

  // Fetch business config from backend
  useEffect(() => {
    axios.get(`${API_BASE}/api/config`).then(({ data }) => {
      setConfig(data);
      document.documentElement.style.setProperty("--primary-color", data.primaryColor);
    }).catch(() => {});
    document.documentElement.style.setProperty("--primary-color", config.primaryColor);
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!isOpen && messages.length > 1) {
      setUnread((n) => n + 1);
    }
  }, [messages, isTyping]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  const toggleChat = () => setIsOpen((v) => !v);

  return (
    <>
      {/* ── Chat Window ──────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="chat-window"
          className="
            chat-window-enter fixed bottom-24 right-4 sm:right-6
            w-[calc(100vw-2rem)] max-w-sm
            bg-white rounded-2xl shadow-2xl shadow-slate-900/20
            flex flex-col overflow-hidden z-50
            border border-slate-200
          "
          style={{ height: "min(600px, calc(100dvh - 120px))" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5"
            style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.primaryColor}dd)` }}
          >
            <div className="flex items-center gap-3">
              {/* Bot icon */}
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-600 text-sm leading-tight">{config.businessName}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-xs">Online · AI Assistant</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                id="chat-clear-btn"
                onClick={clearChat}
                title="Clear chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                id="chat-close-btn"
                onClick={toggleChat}
                title="Close chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto chat-scroll px-4 py-4 flex flex-col gap-3 bg-slate-50">
            {messages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            {error && (
              <div className="text-center">
                <span className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-full px-3 py-1">
                  {error}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <ChatInput onSend={sendMessage} disabled={isTyping} />

          {/* Powered-by footer */}
          <div className="text-center py-1.5 bg-white border-t border-slate-100">
            <span className="text-[10px] text-slate-400 tracking-wide">Powered by <span className="font-medium text-slate-500">AI Chat</span> · Groq llama3</span>
          </div>
        </div>
      )}

      {/* ── Floating Bubble ───────────────────────────────────────────── */}
      <button
        id="chat-bubble-btn"
        onClick={toggleChat}
        aria-label="Open chat"
        className="
          fixed bottom-5 right-4 sm:right-6 z-50
          w-14 h-14 rounded-full shadow-xl shadow-slate-900/25
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          hover:scale-110 active:scale-95
        "
        style={{ backgroundColor: config.primaryColor }}
      >
        {/* Pulse ring (only when closed) */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full opacity-60 bubble-pulse"
            style={{ backgroundColor: config.primaryColor }}
          />
        )}

        {/* Unread badge */}
        {unread > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10">
            {unread > 9 ? "9+" : unread}
          </span>
        )}

        {/* Icon toggle */}
        <span className="relative z-10 transition-transform duration-300" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}
