import api from "./api";
import type { Doctor } from "@/data/doctors";

export const doctorService = {
  /** GET /doctors */
  getAll: async (): Promise<Doctor[]> => {
    const { data } = await api.get<Doctor[]>("/doctors");
    return data;
  },

  /** GET /doctors/:id */
  getById: async (id: string): Promise<Doctor> => {
    const { data } = await api.get<Doctor>(`/doctors/${id}`);
    return data;
  },

  /** GET /doctors?specialization=... */
  search: async (params: { specialization?: string; q?: string }): Promise<Doctor[]> => {
    const { data } = await api.get<Doctor[]>("/doctors", { params });
    return data;
  },

  /** POST /doctors  (admin) */
  create: async (payload: Partial<Doctor>): Promise<Doctor> => {
    const { data } = await api.post<Doctor>("/doctors", payload);
    return data;
  },

  /** PUT /doctors/:id  (admin/doctor) */
  update: async (id: string, payload: Partial<Doctor>): Promise<Doctor> => {
    const { data } = await api.put<Doctor>(`/doctors/${id}`, payload);
    return data;
  },

  /** DELETE /doctors/:id  (admin) */
  remove: async (id: string): Promise<void> => {
    await api.delete(`/doctors/${id}`);
  },
};
