import { Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Appointment, AppointmentStatus } from "@/context/AppointmentContext";

const statusColors: Record<AppointmentStatus, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  completed: "bg-primary/10 text-primary border-primary/20",
};

interface Props {
  appointment: Appointment;
  onCancel?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
  isDoctorView?: boolean;
}

const AppointmentCard = ({ appointment, onCancel, onApprove, onReject, showActions = true, isDoctorView }: Props) => (
  <div className="rounded-xl border bg-card p-5 shadow-card">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-heading font-semibold text-foreground">
          {isDoctorView ? appointment.patientName : appointment.doctorName}
        </h4>
        <p className="text-sm text-primary">{appointment.doctorSpecialization}</p>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{appointment.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{appointment.time}</span>
        </div>
      </div>
      <Badge variant="outline" className={statusColors[appointment.status]}>
        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
      </Badge>
    </div>
    {showActions && (
      <div className="mt-4 flex gap-2">
        {isDoctorView && appointment.status === "pending" && (
          <>
            <Button size="sm" onClick={() => onApprove?.(appointment.id)}>Approve</Button>
            <Button size="sm" variant="destructive" onClick={() => onReject?.(appointment.id)}>Reject</Button>
          </>
        )}
        {!isDoctorView && appointment.status === "pending" && (
          <Button size="sm" variant="destructive" onClick={() => onCancel?.(appointment.id)}>Cancel</Button>
        )}
      </div>
    )}
  </div>
);

export default AppointmentCard;
