import MainLayout from "@/layouts/MainLayout";
import { useAppointments } from "@/context/AppointmentContext";
import { doctors } from "@/data/doctors";
import { Calendar, Users, Stethoscope, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { appointments, updateStatus } = useAppointments();

  const stats = [
    { label: "Total Doctors", value: doctors.length, icon: Stethoscope, color: "bg-primary/10 text-primary" },
    { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "bg-success/10 text-success" },
    { label: "Active Patients", value: 156, icon: Users, color: "bg-warning/10 text-warning" },
    { label: "Revenue", value: "$12,450", icon: TrendingUp, color: "bg-accent text-accent-foreground" },
  ];

  const chartData = [
    { month: "Jan", appointments: 45 },
    { month: "Feb", appointments: 52 },
    { month: "Mar", appointments: 61 },
    { month: "Apr", appointments: 38 },
  ];

  const pieData = [
    { name: "Approved", value: appointments.filter((a) => a.status === "approved").length || 3, color: "hsl(152, 56%, 45%)" },
    { name: "Pending", value: appointments.filter((a) => a.status === "pending").length || 2, color: "hsl(38, 92%, 50%)" },
    { name: "Rejected", value: appointments.filter((a) => a.status === "rejected").length || 1, color: "hsl(0, 72%, 51%)" },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">System overview and management</p>

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

        {/* Charts */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold">Appointment Trends</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="hsl(207, 90%, 44%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <h2 className="font-heading text-lg font-semibold">Status Distribution</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold">Manage Doctors</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Doctor</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Specialization</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Rating</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={doc.image} alt={doc.name} className="h-9 w-9 rounded-full object-cover" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.specialization}</td>
                    <td className="px-4 py-3">{doc.rating}</td>
                    <td className="px-4 py-3">
                      <Badge className={doc.available ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                        {doc.available ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* All Appointments */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold">All Appointments</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Patient</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Doctor</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-heading font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b last:border-0">
                    <td className="px-4 py-3 font-medium">{apt.patientName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{apt.doctorName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{apt.date} {apt.time}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="capitalize">{apt.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
