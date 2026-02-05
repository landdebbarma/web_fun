import { apiClient } from "@/lib/api-client";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  accessToken?: string;
  user?: User;
  data?: {
    token?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  register: async (data: RegisterData, signal?: AbortSignal) => {
    return apiClient.post<AuthResponse>("/auth/register", data, { signal });
  },

  getCurrentUser: async (token: string) => {
    return apiClient.get<User>("/users/me", { token });
  },

  logout: async (token?: string): Promise<{ message?: string }> => {
    return apiClient.post("/auth/logout", {}, { token });
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    return apiClient.post("/auth/forgot-password", { email });
  },

  verifyOtp: async (email: string, otp: string): Promise<{ message: string; token?: string }> => {
    return apiClient.post("/auth/verify-otp", { email, otp });
  },

  changePassword: async (
    token: string,
    new_password: string
  ): Promise<{ message: string }> => {
    return apiClient.post("/auth/change-password", { token, new_password });
  },
};
