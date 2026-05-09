import axios, { AxiosInstance, AxiosError } from "axios";

/**
 * Axios client for the MERN backend.
 *
 * Configure the base URL via Vite env var:
 *   VITE_BASEURL=http://localhost:8080/api/v1
 *
 * Place this in a local `.env.local` file at the project root when running on
 * your machine alongside your Express + MongoDB server. The Lovable cloud
 * preview cannot reach `localhost:8080`; authService will use a demo fallback
 * there so the login screen stays usable.
 */
const BASE_URL =
  (import.meta.env.VITE_BASEURL as string | undefined) ??
  "http://localhost:8080/api/v1";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies for JWT/session auth if your backend uses them
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage (if your backend uses Bearer tokens)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Network error. Is your backend running on " + BASE_URL + "?";
    const normalized = new Error(message) as Error & { status?: number; isNetworkError?: boolean };
    normalized.status = error.response?.status;
    normalized.isNetworkError = !error.response;
    return Promise.reject(normalized);
  }
);

export default api;
