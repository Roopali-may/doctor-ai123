import React, { createContext, useContext, useState, ReactNode } from "react";

export type AppointmentStatus = "pending" | "approved" | "rejected" | "completed";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorImage: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, "id" | "status">) => void;
  updateStatus: (id: string, status: AppointmentStatus) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "apt-1",
      doctorId: "1",
      doctorName: "Dr. James Wilson",
      doctorSpecialization: "Cardiologist",
      doctorImage: "",
      patientName: "John Doe",
      patientEmail: "john@example.com",
      patientPhone: "555-0123",
      date: "2026-04-15",
      time: "10:00 AM",
      status: "approved",
    },
    {
      id: "apt-2",
      doctorId: "4",
      doctorName: "Dr. Amara Johnson",
      doctorSpecialization: "Pediatrician",
      doctorImage: "",
      patientName: "John Doe",
      patientEmail: "john@example.com",
      patientPhone: "555-0123",
      date: "2026-04-20",
      time: "02:00 PM",
      status: "pending",
    },
  ]);

  const addAppointment = (apt: Omit<Appointment, "id" | "status">) => {
    setAppointments((prev) => [
      ...prev,
      { ...apt, id: `apt-${Date.now()}`, status: "pending" },
    ]);
  };

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, updateStatus, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointments must be used within AppointmentProvider");
  return context;
};
