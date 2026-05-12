import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-3 border-t border-slate-200 bg-white rounded-b-2xl">
      <textarea
        ref={textareaRef}
        id="chat-input"
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Type a message…"
        className="
          flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50
          px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
          outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
          transition-all duration-200 leading-relaxed max-h-[120px]
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        id="chat-send-btn"
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="
          shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
          bg-blue-600 text-white transition-all duration-200
          hover:bg-blue-700 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600
        "
        style={{ backgroundColor: "var(--primary-color)" }}
        aria-label="Send message"
      >
        <svg className="w-4 h-4 rotate-45" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </button>
    </div>
  );
}
