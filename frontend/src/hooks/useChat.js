import { useState, useCallback } from "react";
import axios from "axios";

// In production (Vercel), use the deployed Render backend URL.
// In local dev, Vite proxies /api to localhost:5001, so no env var needed.
const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      role: "assistant",
      content: "👋 Hi there! How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim()) return;

    const userMsg = { id: Date.now(), role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    try {
      // Build history (exclude welcome message from API history)
      const history = [...messages, userMsg]
        .filter((m) => m.role === "user" || (m.role === "assistant" && m.id !== messages[0].id))
        .map(({ role, content }) => ({ role, content }));

      const { data } = await axios.post(`${API_BASE}/api/chat`, { messages: history });

      const assistantMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "👋 Hi there! How can I help you today?",
      },
    ]);
    setError(null);
  }, []);

  return { messages, isTyping, error, sendMessage, clearChat };
}
