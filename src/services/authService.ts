import api from "./api";
import type { UserRole } from "@/context/AuthContext";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authService = {
  /** POST /auth/login */
  login: async (email: string, password: string, role: UserRole): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password, role });
    if (data.token) localStorage.setItem("auth_token", data.token);
    return data;
  },

  /** POST /auth/register */
  signup: async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
      role,
    });
    if (data.token) localStorage.setItem("auth_token", data.token);
    return data;
  },

  /** POST /auth/logout */
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("auth_token");
    }
  },

  /** GET /auth/me */
  me: async (): Promise<AuthUser | null> => {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    try {
      const { data } = await api.get<{ user: AuthUser }>("/auth/me");
      return data.user ?? null;
    } catch {
      return null;
    }
  },

  /** POST /auth/forgot-password */
  forgotPassword: async (email: string): Promise<void> => {
    await api.post("/auth/forgot-password", { email });
  },
};
