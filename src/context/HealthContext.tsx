import React, { createContext, useContext, useState, ReactNode } from "react";

export interface VitalReading {
  id: string;
  date: string;
  systolic: number;
  diastolic: number;
  sugar: number;
  weight: number;
  heartRate: number;
}

export interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  medicines: { name: string; dosage: string; frequency: string; duration: string }[];
  nextVisit?: string;
  notes?: string;
}

interface HealthContextType {
  vitals: VitalReading[];
  prescriptions: Prescription[];
  addVital: (v: Omit<VitalReading, "id">) => void;
  addPrescription: (p: Omit<Prescription, "id">) => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const seedVitals: VitalReading[] = [
  { id: "v1", date: "2026-01-05", systolic: 122, diastolic: 80, sugar: 98, weight: 168, heartRate: 72 },
  { id: "v2", date: "2026-01-25", systolic: 126, diastolic: 82, sugar: 102, weight: 167, heartRate: 74 },
  { id: "v3", date: "2026-02-15", systolic: 120, diastolic: 78, sugar: 95, weight: 166, heartRate: 70 },
  { id: "v4", date: "2026-03-08", systolic: 118, diastolic: 76, sugar: 92, weight: 165, heartRate: 68 },
  { id: "v5", date: "2026-03-28", systolic: 124, diastolic: 80, sugar: 99, weight: 165, heartRate: 71 },
  { id: "v6", date: "2026-04-15", systolic: 119, diastolic: 77, sugar: 94, weight: 164, heartRate: 69 },
];

const seedPrescriptions: Prescription[] = [
  {
    id: "rx1",
    date: "2026-03-20",
    doctorName: "Dr. James Wilson",
    diagnosis: "Mild hypertension",
    medicines: [
      { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", duration: "30 days" },
      { name: "Vitamin D3", dosage: "1000 IU", frequency: "Once daily", duration: "60 days" },
    ],
    nextVisit: "2026-04-25",
    notes: "Reduce sodium intake, walk 30 min/day.",
  },
  {
    id: "rx2",
    date: "2026-02-12",
    doctorName: "Dr. Sarah Chen",
    diagnosis: "Seasonal allergy",
    medicines: [
      { name: "Cetirizine", dosage: "10mg", frequency: "At night", duration: "10 days" },
    ],
    notes: "Avoid known allergens.",
  },
];

export const HealthProvider = ({ children }: { children: ReactNode }) => {
  const [vitals, setVitals] = useState<VitalReading[]>(seedVitals);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(seedPrescriptions);

  const addVital = (v: Omit<VitalReading, "id">) =>
    setVitals((prev) => [...prev, { ...v, id: `v-${Date.now()}` }].sort((a, b) => a.date.localeCompare(b.date)));

  const addPrescription = (p: Omit<Prescription, "id">) =>
    setPrescriptions((prev) => [{ ...p, id: `rx-${Date.now()}` }, ...prev]);

  return (
    <HealthContext.Provider value={{ vitals, prescriptions, addVital, addPrescription }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const ctx = useContext(HealthContext);
  if (!ctx) throw new Error("useHealth must be used within HealthProvider");
  return ctx;
};
