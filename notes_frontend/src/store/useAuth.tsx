"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { User } from "@/types";
import { AuthAPI } from "@/lib/api";
import { TokenStorage } from "@/lib/storage";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (args: { email: string; password: string }) => Promise<void>;
  signup: (args: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * PUBLIC_INTERFACE
 * AuthProvider manages user session and exposes auth actions.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Restore session on mount
  useEffect(() => {
    const t = TokenStorage.get();
    if (!t) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const me = await AuthAPI.me(t);
        setUser(me.data);
        setToken(t);
      } catch {
        TokenStorage.clear();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await AuthAPI.login(email, password);
      const t = res.data.token;
      setUser(res.data.user);
      setToken(t);
      TokenStorage.set(t);
      router.replace("/notes");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const signup = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await AuthAPI.signup(name, email, password);
      const t = res.data.token;
      setUser(res.data.user);
      setToken(t);
      TokenStorage.set(t);
      router.replace("/notes");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(async () => {
    TokenStorage.clear();
    setUser(null);
    setToken(null);
    router.replace("/auth/login");
  }, [router]);

  const value = useMemo<AuthContextType>(() => ({
    user, token, loading, login, signup, logout
  }), [user, token, loading, login, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useAuth returns the auth context, ensuring provider is present.
 */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
