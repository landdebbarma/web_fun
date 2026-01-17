import { apiClient } from "@/lib/api-client";
import type { AIResult } from "@/features/kafei-ai/components/KafeiAi/dashboard/hooks/useFlowdata";

export interface ChatResponse {
  reply?: string;
  response?: string;
  message?: string;
  text?: string;
  data?: AIResult;
  type?: string;
  questions?: string[];
  chunk?: unknown;
  [key: string]: unknown;
}

// Helper to get auth token
const getAuthToken = (): string | null => {
  return (
    localStorage.getItem("auth_token") ||
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1] ||
    null
  );
};

export const chatService = {
  sendMessage: async (message: string) => {
    const token = getAuthToken();
    return apiClient.post<ChatResponse>("/chat/", { message }, { token });
  },
  
  streamMessage: async (message: string, onData: (data: ChatResponse) => void): Promise<ChatResponse | null> => {
    const token = getAuthToken();
    return apiClient.streamPost<ChatResponse>("/chat/", { message }, onData, { token });
  }
};
