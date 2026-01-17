import React, { useEffect, useState } from "react";
import { authService } from "@/services/auth";
import type { User } from "@/services/auth";
import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";

type AuthUser = User | null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper: fetch /users/me to validate token
  const validateToken = async (tkn: string) => {
    try {
      const data = await authService.getCurrentUser(tkn);
      setUser(data);
      setToken(tkn);
      Cookies.set("auth_token", tkn, {
        expires: 7,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      });
      localStorage.setItem("user_data", JSON.stringify(data));
      return true;
    } catch {
      setUser(null);
      setToken(null);
      Cookies.remove("auth_token");
      localStorage.removeItem("user_data");
      return false;
    }
  };

  useEffect(() => {
    // On mount, check for token in cookies and validate
    const t = Cookies.get("auth_token");
    if (!t) {
      setLoading(false);
      return;
    }

    (async () => {
      await validateToken(t);
      setLoading(false);
    })();
  }, []);

  const login = (tkn: string | null, u?: User) => {
    if (u) {
      setUser(u);
      localStorage.setItem("user_data", JSON.stringify(u));
    }

    setToken(tkn);

    if (tkn) {
      Cookies.set("auth_token", tkn, {
        expires: 7,
        secure: window.location.protocol === "https:",
        sameSite: "strict",
      });
    } else {
      Cookies.remove("auth_token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("auth_token");
    localStorage.removeItem("user_data");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
