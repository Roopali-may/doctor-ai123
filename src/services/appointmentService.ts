import api from "./api";
import type { Appointment, AppointmentStatus } from "@/context/AppointmentContext";

export const appointmentService = {
  /** GET /appointments  (current user) */
  getMine: async (): Promise<Appointment[]> => {
    const { data } = await api.get<Appointment[]>("/appointments");
    return data;
  },

  /** GET /appointments/all  (admin/doctor) */
  getAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get<Appointment[]>("/appointments/all");
    return data;
  },

  /** POST /appointments */
  book: async (
    payload: Omit<Appointment, "id" | "status">
  ): Promise<Appointment> => {
    const { data } = await api.post<Appointment>("/appointments", payload);
    return data;
  },

  /** PATCH /appointments/:id/status */
  updateStatus: async (id: string, status: AppointmentStatus): Promise<Appointment> => {
    const { data } = await api.patch<Appointment>(`/appointments/${id}/status`, { status });
    return data;
  },

  /** DELETE /appointments/:id */
  cancel: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },
};
