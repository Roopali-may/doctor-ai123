import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { appointmentService } from "@/services/appointmentService";
import { useAuth } from "@/context/AuthContext";

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
  addAppointment: (apt: Omit<Appointment, "id" | "status">) => Promise<Appointment>;
  updateStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
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

  useEffect(() => {
    if (!isAuthenticated) return;
    appointmentService.getMine().then(setAppointments).catch(() => undefined);
  }, [isAuthenticated]);

  const addAppointment = async (apt: Omit<Appointment, "id" | "status">) => {
    const saved = await appointmentService.book(apt);
    setAppointments((prev) => [saved, ...prev]);
    return saved;
  };

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    await appointmentService.updateStatus(id, status);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const cancelAppointment = async (id: string) => {
    await appointmentService.cancel(id);
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
