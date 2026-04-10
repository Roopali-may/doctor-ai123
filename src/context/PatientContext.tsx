import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  bloodGroup: string;
  height: string;
  weight: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
  profileImage: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: "prescription" | "lab_report" | "imaging" | "discharge_summary" | "other";
  title: string;
  date: string;
  doctorName: string;
  notes: string;
  fileName: string;
}

interface PatientContextType {
  profile: PatientProfile | null;
  medicalRecords: MedicalRecord[];
  updateProfile: (data: Partial<PatientProfile>) => void;
  addMedicalRecord: (record: Omit<MedicalRecord, "id">) => void;
  deleteMedicalRecord: (id: string) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const defaultProfile: PatientProfile = {
  id: "p-1",
  userId: "1",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "555-0123",
  dateOfBirth: "1990-05-15",
  gender: "male",
  bloodGroup: "O+",
  height: "5'10\"",
  weight: "165 lbs",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "555-0456",
  emergencyContactRelation: "Spouse",
  allergies: ["Penicillin", "Peanuts"],
  chronicConditions: ["Mild Asthma"],
  currentMedications: ["Albuterol Inhaler"],
  insuranceProvider: "Blue Cross Blue Shield",
  insurancePolicyNumber: "BCBS-789456",
  profileImage: "",
};

const defaultRecords: MedicalRecord[] = [
  {
    id: "mr-1",
    patientId: "p-1",
    type: "prescription",
    title: "Blood Pressure Medication",
    date: "2026-03-20",
    doctorName: "Dr. James Wilson",
    notes: "Take once daily in the morning",
    fileName: "prescription_march2026.pdf",
  },
  {
    id: "mr-2",
    patientId: "p-1",
    type: "lab_report",
    title: "Complete Blood Count (CBC)",
    date: "2026-03-10",
    doctorName: "Dr. Sarah Chen",
    notes: "All values within normal range",
    fileName: "cbc_report.pdf",
  },
  {
    id: "mr-3",
    patientId: "p-1",
    type: "imaging",
    title: "Chest X-Ray",
    date: "2026-02-15",
    doctorName: "Dr. Rajesh Patel",
    notes: "No abnormalities detected",
    fileName: "chest_xray.pdf",
  },
];

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<PatientProfile>(defaultProfile);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(defaultRecords);

  const updateProfile = (data: Partial<PatientProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const addMedicalRecord = (record: Omit<MedicalRecord, "id">) => {
    setMedicalRecords((prev) => [
      { ...record, id: `mr-${Date.now()}` },
      ...prev,
    ]);
  };

  const deleteMedicalRecord = (id: string) => {
    setMedicalRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <PatientContext.Provider value={{ profile, medicalRecords, updateProfile, addMedicalRecord, deleteMedicalRecord }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) throw new Error("usePatient must be used within PatientProvider");
  return context;
};
