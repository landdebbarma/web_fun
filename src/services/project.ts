import { apiClient } from "@/lib/api-client";

// Types
export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Conversation {
  id: string;
  title: string;
  project_id: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface CreateConversationRequest {
  title: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
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

export const projectService = {
  /**
   * Get all projects for the user
   */
  getProjects: async (): Promise<Project[]> => {
    const token = getAuthToken();
    return apiClient.get<Project[]>("/projects/", { token });
  },

  /**
   * Create a new project
   */
  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const token = getAuthToken();
    return apiClient.post<Project>("/projects/", data, { token });
  },

  /**
   * Get all conversations for a project
   */
  getConversations: async (projectId: string): Promise<Conversation[]> => {
    const token = getAuthToken();
    return apiClient.get<Conversation[]>(
      `/projects/${projectId}/conversations`,
      { token }
    );
  },

  /**
   * Create a conversation within a project
   */
  createConversation: async (
    projectId: string,
    data: CreateConversationRequest
  ): Promise<Conversation> => {
    const token = getAuthToken();
    return apiClient.post<Conversation>(
      `/projects/${projectId}/conversations`,
      data,
      { token }
    );
  },
};
