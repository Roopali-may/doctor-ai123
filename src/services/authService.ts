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

type StoredDemoUser = AuthUser & { password: string };

const DEMO_USERS_KEY = "demo_auth_users";
const AUTH_USER_KEY = "auth_user";
const demoUsers: StoredDemoUser[] = [
  { id: "demo-admin", name: "Admin", email: "admin@hms.com", password: "admin123", role: "admin" },
  { id: "demo-patient", name: "Patient One", email: "patient@hms.com", password: "patient123", role: "patient" },
  { id: "demo-doctor", name: "Dr. Demo", email: "doctor@hms.com", password: "doctor123", role: "doctor" },
];

const isNetworkError = (error: unknown) => Boolean((error as { isNetworkError?: boolean })?.isNetworkError);

const readDemoUsers = (): StoredDemoUser[] => {
  try {
    const stored = localStorage.getItem(DEMO_USERS_KEY);
    return stored ? [...demoUsers, ...(JSON.parse(stored) as StoredDemoUser[])] : demoUsers;
  } catch {
    return demoUsers;
  }
};

const toAuthResponse = (user: StoredDemoUser): AuthResponse => {
  const { password: _password, ...safeUser } = user;
  const token = `demo-${safeUser.id}`;
  localStorage.setItem("auth_token", token);
  return { user: safeUser, token };
};

const makeFallbackUser = (email: string, role: UserRole): StoredDemoUser => ({
  id: `demo-${role}-${Date.now()}`,
  name: email.split("@")[0]?.replace(/[._-]/g, " ") || role,
  email,
  password: "",
  role,
});

export const authService = {
  /** POST /auth/login */
  login: async (email: string, password: string, role: UserRole): Promise<AuthResponse> => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", { email, password, role });
      if (data.token) localStorage.setItem("auth_token", data.token);
      return data;
    } catch (error) {
      if (!isNetworkError(error)) throw error;
      const user = readDemoUsers().find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role
      );
      return toAuthResponse(user ?? makeFallbackUser(email, role));
    }
  },

  /** POST /auth/register */
  signup: async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ): Promise<AuthResponse> => {
    try {
      const { data } = await api.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
        role,
      });
      if (data.token) localStorage.setItem("auth_token", data.token);
      return data;
    } catch (error) {
      if (isNetworkError(error)) {
        throw new Error("Backend is not reachable, so this account was not saved to MongoDB. Start the backend on port 8080 and try again.");
      }
      throw error;
    }
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

    if (token.startsWith("demo-")) {
      try {
        const stored = localStorage.getItem(AUTH_USER_KEY);
        return stored ? (JSON.parse(stored) as AuthUser) : null;
      } catch {
        return null;
      }
    }

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
