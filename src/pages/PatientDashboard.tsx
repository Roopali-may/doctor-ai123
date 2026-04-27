import MainLayout from "@/layouts/MainLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import { usePatient } from "@/context/PatientContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, FileText, Heart, CreditCard, Activity, Pill } from "lucide-react";

const PatientDashboard = () => {
  const { appointments } = useAppointments();
  const { user } = useAuth();
  const { profile, medicalRecords } = usePatient();
  const upcoming = appointments.filter((a) => a.status === "approved" || a.status === "pending");

  const stats = [
    { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "bg-primary/10 text-primary" },
    { label: "Upcoming", value: upcoming.length, icon: Clock, color: "bg-success/10 text-success" },
    { label: "Completed", value: appointments.filter((a) => a.status === "completed").length, icon: User, color: "bg-accent text-accent-foreground" },
    { label: "Medical Records", value: medicalRecords.length, icon: FileText, color: "bg-warning/10 text-warning" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Welcome, {user?.name || "Patient"}</h1>
            <p className="mt-1 text-muted-foreground">Here's your health overview</p>
          </div>
          {profile && (
            <div className="flex items-center gap-2 rounded-lg bg-accent/50 px-4 py-2 text-sm">
              <Heart className="h-4 w-4 text-destructive" />
              <span>Blood Group: <strong>{profile.bloodGroup}</strong></span>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/doctors">
            <Button className="w-full justify-start gap-2" variant="outline">
              <User className="h-4 w-4" /> Find a Doctor
            </Button>
          </Link>
          <Link to="/health-tracker">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Activity className="h-4 w-4" /> Health Tracker
            </Button>
          </Link>
          <Link to="/prescriptions">
            <Button className="w-full justify-start gap-2" variant="outline">
              <Pill className="h-4 w-4" /> Prescriptions
            </Button>
          </Link>
          <Link to="/medical-records">
            <Button className="w-full justify-start gap-2" variant="outline">
              <FileText className="h-4 w-4" /> Medical Records
            </Button>
          </Link>
        </div>

        {/* Health Summary Card */}
        {profile && (
          <div className="mt-8 rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold">Health Summary</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.allergies.length > 0 ? profile.allergies.map((a) => (
                    <span key={a} className="rounded bg-warning/10 px-2 py-0.5 text-xs text-warning">{a}</span>
                  )) : <span className="text-sm text-muted-foreground">None</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conditions</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {profile.chronicConditions.length > 0 ? profile.chronicConditions.map((c) => (
                    <span key={c} className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">{c}</span>
                  )) : <span className="text-sm text-muted-foreground">None</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Insurance</p>
                <p className="mt-1 text-sm font-medium">{profile.insuranceProvider || "Not set"}</p>
                <p className="text-xs text-muted-foreground">{profile.insurancePolicyNumber}</p>
              </div>
            </div>
          </div>
        )}

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
