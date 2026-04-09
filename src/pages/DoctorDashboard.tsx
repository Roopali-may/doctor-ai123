import MainLayout from "@/layouts/MainLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const DoctorDashboard = () => {
  const { appointments, updateStatus } = useAppointments();
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ]);
  const [newSlot, setNewSlot] = useState("");

  const pending = appointments.filter((a) => a.status === "pending");
  const approved = appointments.filter((a) => a.status === "approved");

  const stats = [
    { label: "Pending Requests", value: pending.length, icon: Clock, color: "bg-warning/10 text-warning" },
    { label: "Approved", value: approved.length, icon: CheckCircle, color: "bg-success/10 text-success" },
    { label: "Total", value: appointments.length, icon: Calendar, color: "bg-primary/10 text-primary" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Doctor Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back, {user?.name || "Doctor"}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-heading text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Availability */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold">Manage Availability</h2>
          <div className="mt-4 rounded-xl border bg-card p-6 shadow-card">
            <div className="flex flex-wrap gap-2">
              {availableSlots.map((slot) => (
                <Badge
                  key={slot}
                  variant="outline"
                  className="cursor-pointer px-4 py-2 hover:bg-destructive/10"
                  onClick={() => setAvailableSlots((s) => s.filter((x) => x !== slot))}
                >
                  {slot} ×
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="time"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                className="rounded-md border bg-background px-3 py-2 text-sm"
              />
              <button
                onClick={() => {
                  if (newSlot) {
                    setAvailableSlots((s) => [...s, newSlot]);
                    setNewSlot("");
                  }
                }}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>

        {/* Appointment Requests */}
        <h2 className="mt-10 font-heading text-xl font-semibold">Appointment Requests</h2>
        <div className="mt-4 grid gap-4">
          {pending.length > 0 ? (
            pending.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                isDoctorView
                onApprove={(id) => updateStatus(id, "approved")}
                onReject={(id) => updateStatus(id, "rejected")}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No pending requests.</p>
          )}
        </div>

        <h2 className="mt-10 font-heading text-xl font-semibold">Approved Appointments</h2>
        <div className="mt-4 grid gap-4">
          {approved.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} isDoctorView showActions={false} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDashboard;
