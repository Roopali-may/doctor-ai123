import api from "./api";
import type { PatientProfile, MedicalRecord } from "@/context/PatientContext";

export const patientService = {
  /** GET /patients/me */
  getProfile: async (): Promise<PatientProfile> => {
    const { data } = await api.get<PatientProfile>("/patients/me");
    return data;
  },

  /** PUT /patients/me */
  updateProfile: async (payload: Partial<PatientProfile>): Promise<PatientProfile> => {
    const { data } = await api.put<PatientProfile>("/patients/me", payload);
    return data;
  },

  /** GET /patients/me/records */
  getRecords: async (): Promise<MedicalRecord[]> => {
    const { data } = await api.get<MedicalRecord[]>("/patients/me/records");
    return data;
  },

  /** POST /patients/me/records  (multipart/form-data for file upload) */
  addRecord: async (
    record: Omit<MedicalRecord, "id">,
    file?: File
  ): Promise<MedicalRecord> => {
    const form = new FormData();
    Object.entries(record).forEach(([k, v]) => form.append(k, String(v)));
    if (file) form.append("file", file);
    const { data } = await api.post<MedicalRecord>("/patients/me/records", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  /** DELETE /patients/me/records/:id */
  deleteRecord: async (id: string): Promise<void> => {
    await api.delete(`/patients/me/records/${id}`);
  },
};
