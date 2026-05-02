import api from "./api";
import type { Prescription, VitalReading } from "@/context/HealthContext";

export const prescriptionService = {
  /** GET /prescriptions */
  list: async (): Promise<Prescription[]> => {
    const { data } = await api.get<Prescription[]>("/prescriptions");
    return data;
  },

  /** POST /prescriptions  (doctor) */
  create: async (payload: Omit<Prescription, "id">): Promise<Prescription> => {
    const { data } = await api.post<Prescription>("/prescriptions", payload);
    return data;
  },
};

export const vitalsService = {
  /** GET /vitals */
  list: async (): Promise<VitalReading[]> => {
    const { data } = await api.get<VitalReading[]>("/vitals");
    return data;
  },

  /** POST /vitals */
  add: async (payload: Omit<VitalReading, "id">): Promise<VitalReading> => {
    const { data } = await api.post<VitalReading>("/vitals", payload);
    return data;
  },
};
