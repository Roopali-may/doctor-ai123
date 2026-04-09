import { Link } from "react-router-dom";
import { Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Doctor } from "@/data/doctors";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover">
    <div className="relative overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        loading="lazy"
        width={512}
        height={512}
        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <Badge
        className={`absolute right-3 top-3 ${
          doctor.available
            ? "bg-success text-success-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {doctor.available ? "Available" : "Unavailable"}
      </Badge>
    </div>
    <div className="p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground">{doctor.name}</h3>
      <p className="mt-1 text-sm text-primary font-medium">{doctor.specialization}</p>
      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {doctor.experience} yrs
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          {doctor.rating} ({doctor.reviews})
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-heading text-lg font-bold text-foreground">${doctor.fee}</span>
        <Link to={`/doctors/${doctor.id}`}>
          <Button size="sm">View Profile</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default DoctorCard;
