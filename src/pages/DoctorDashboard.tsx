import MainLayout from "@/layouts/MainLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import { Calendar, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const DoctorDashboard = () => {
  const { appointments, updateStatus } = useAppointments();
  const { user } = useAuth();
  const [availableSlots, setAvailableSlots] = useState([
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ]);
  const [newSlot, setNewSlot] = useState("");

  const pending = appointments.filter((a) => a.status === "pending");
  const approved = appointments.filter((a) => a.status === "approved");
  const completed = appointments.filter((a) => a.status === "completed");

  const stats = [
    { label: "Today's Appointments", value: approved.length, icon: Calendar, color: "bg-primary/10 text-primary" },
    { label: "Total Patients", value: 84, icon: Users, color: "bg-accent text-accent-foreground" },
    { label: "Completed Cases", value: completed.length || 12, icon: CheckCircle, color: "bg-success/10 text-success" },
    { label: "Pending Requests", value: pending.length, icon: Clock, color: "bg-warning/10 text-warning" },
  ];

  const visitTrend = [
    { day: "Mon", visits: 8 },
    { day: "Tue", visits: 12 },
    { day: "Wed", visits: 9 },
    { day: "Thu", visits: 14 },
    { day: "Fri", visits: 11 },
    { day: "Sat", visits: 6 },
    { day: "Sun", visits: 3 },
  ];

  const caseDistribution = [
    { name: "Cardiology", value: 12, color: "hsl(207, 90%, 44%)" },
    { name: "Diabetes", value: 8, color: "hsl(38, 92%, 50%)" },
    { name: "Hypertension", value: 10, color: "hsl(0, 72%, 51%)" },
    { name: "Routine", value: 15, color: "hsl(152, 56%, 45%)" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Doctor Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, {user?.name || "Doctor"}</p>
          </div>
          <Badge className="gap-1 bg-success/10 text-success"><TrendingUp className="h-3 w-3" /> +12% this week</Badge>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-card transition-shadow hover:shadow-card-hover">
              <CardContent className="p-5">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 font-heading text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Patient Visits This Week</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="visits" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle className="text-lg">Case Distribution</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={caseDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value">
                    {caseDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
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
