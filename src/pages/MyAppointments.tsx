import MainLayout from "@/layouts/MainLayout";
import AppointmentCard from "@/components/AppointmentCard";
import { useAppointments } from "@/context/AppointmentContext";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

const MyAppointments = () => {
  const { appointments, cancelAppointment } = useAppointments();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">My Appointments</h1>
            <p className="mt-1 text-muted-foreground">{appointments.length} total appointments</p>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {filtered.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} onCancel={cancelAppointment} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center text-center text-muted-foreground">
            <Calendar className="h-12 w-12 text-muted-foreground/40" />
            <p className="mt-3">No appointments found.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyAppointments;
