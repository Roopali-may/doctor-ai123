import MainLayout from "@/layouts/MainLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const PatientDashboard = () => {
  const { appointments } = useAppointments();
  const { user } = useAuth();
  const upcoming = appointments.filter((a) => a.status === "approved" || a.status === "pending");

  const stats = [
    { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "bg-primary/10 text-primary" },
    { label: "Upcoming", value: upcoming.length, icon: Clock, color: "bg-success/10 text-success" },
    { label: "Completed", value: appointments.filter((a) => a.status === "completed").length, icon: User, color: "bg-accent text-accent-foreground" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Welcome, {user?.name || "Patient"}</h1>
        <p className="mt-1 text-muted-foreground">Here's your health overview</p>

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

        <div className="mt-8 flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold">Quick Actions</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/doctors"><Button>Find a Doctor <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link to="/my-appointments"><Button variant="outline">View All Appointments</Button></Link>
        </div>

        <h2 className="mt-10 font-heading text-xl font-semibold">Recent Appointments</h2>
        <div className="mt-4 grid gap-4">
          {appointments.slice(0, 3).map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} showActions={false} />
          ))}
          {appointments.length === 0 && (
            <p className="text-muted-foreground">No appointments yet. Start by finding a doctor!</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;
