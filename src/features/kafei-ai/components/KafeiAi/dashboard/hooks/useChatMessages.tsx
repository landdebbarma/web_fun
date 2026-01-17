// src/hooks/useChatMessages.tsx
import { useState } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: number;
  sender: "user" | "ai";
}

export const useChatMessages = () => {
  // ❌ Removed demo messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (
    text: string,
    sender: "user" | "ai" = "user",
    id?: string
  ) => {
    setMessages((prev) => {
      // If id is provided and message exists, update it
      if (id) {
        const existingIndex = prev.findIndex((msg) => msg.id === id);
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], text };
          return updated;
        }
      }

      // Otherwise, create a new message
      const newMessage: ChatMessage = {
        id: id || crypto.randomUUID(),
        text,
        sender,
        timestamp: Date.now(),
      };
      return [...prev, newMessage];
    });
  };

  const updateMessage = (id: string, text: string) => {
    setMessages((prev) => {
      const existingIndex = prev.findIndex((msg) => msg.id === id);
      if (existingIndex === -1) return prev;

      const updated = [...prev];
      updated[existingIndex] = { ...updated[existingIndex], text };
      return updated;
    });
  };

  return { messages, addMessage, updateMessage };
};
