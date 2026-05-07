import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authService } from "@/services/authService";

export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const me = await authService.me();
      if (active && me) {
        setUser(me);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(me));
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string, role: UserRole) => {
    const { user: u } = await authService.login(email, password, role);
    persist(u);
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    const { user: u } = await authService.signup(name, email, password, role);
    persist(u);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore */
    }
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
