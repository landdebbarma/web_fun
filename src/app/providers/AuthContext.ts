import { createContext } from "react";
import type { User } from "@/services/auth";

type AuthUser = User | null;

export type AuthContextType = {
  user: AuthUser;
  token: string | null;
  loading: boolean;
  login: (token: string | null, user?: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
