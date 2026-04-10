import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { doctors } from "@/data/doctors";
import { useAppointments } from "@/context/AppointmentContext";
import { useAuth } from "@/context/AuthContext";
import PaymentForm from "@/components/PaymentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, Star, Clock } from "lucide-react";

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);
  const { addAppointment } = useAppointments();
  const { user } = useAuth();

  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  if (!doctor) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-2xl font-bold">Doctor not found</h1>
          <Link to="/doctors"><Button className="mt-4">Back to Doctors</Button></Link>
        </div>
      </MainLayout>
    );
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select a date and time slot.");
      return;
    }
    setStep("payment");
  };

  const handlePaymentComplete = () => {
    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      doctorImage: doctor.image,
      patientName: name,
      patientEmail: email,
      patientPhone: phone,
      date: selectedDate,
      time: selectedSlot,
      notes,
    });
    setStep("success");
    toast.success("Payment successful! Appointment booked!");
  };

  if (step === "success") {
    return (
      <MainLayout>
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
          <CheckCircle className="h-16 w-16 text-success" />
          <h1 className="mt-4 font-heading text-3xl font-bold">Appointment Booked!</h1>
          <p className="mt-2 text-muted-foreground">
            Your appointment with {doctor.name} on {selectedDate} at {selectedSlot} has been confirmed.
          </p>
          <p className="mt-1 text-sm text-success">Payment of ${(doctor.fee + 2 + doctor.fee * 0.05).toFixed(2)} received</p>
          <div className="mt-6 flex gap-3">
            <Link to="/my-appointments"><Button>View Appointments</Button></Link>
            <Link to="/"><Button variant="outline">Go Home</Button></Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Progress Steps
  const steps = [
    { label: "Details", active: step === "details", completed: step === "payment" },
    { label: "Payment", active: step === "payment", completed: false },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <Link to={`/doctors/${doctor.id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Doctor Profile
        </Link>
        <h1 className="font-heading text-3xl font-bold">Book Appointment</h1>

        {/* Step Indicator */}
        <div className="mt-6 flex items-center gap-4">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                s.completed ? "bg-success text-success-foreground" : s.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>{s.completed ? "✓" : i + 1}</div>
              <span className={`text-sm font-medium ${s.active || s.completed ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className="mx-2 h-px w-12 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Doctor Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-card p-5 shadow-card">
              <img src={doctor.image} alt={doctor.name} className="h-48 w-full rounded-lg object-cover" />
              <h3 className="mt-4 font-heading text-lg font-semibold">{doctor.name}</h3>
              <p className="text-sm text-primary">{doctor.specialization}</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{doctor.rating}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{doctor.experience} yrs</span>
              </div>
              <p className="mt-3 font-heading text-lg font-bold">${doctor.fee} <span className="text-sm font-normal text-muted-foreground">per visit</span></p>
              {selectedDate && selectedSlot && (
                <div className="mt-4 rounded-lg bg-accent/50 p-3 text-sm">
                  <p className="font-medium">Selected Slot</p>
                  <p className="text-muted-foreground">{selectedDate} at {selectedSlot}</p>
                </div>
              )}
            </div>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-2">
            {step === "details" && (
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6 shadow-card">
                  <h2 className="font-heading text-lg font-semibold">Select Date</h2>
                  <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-3 max-w-xs" min={new Date().toISOString().split("T")[0]} />
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-card">
                  <h2 className="font-heading text-lg font-semibold">Select Time Slot</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {doctor.slots.map((slot) => (
                      <Badge key={slot} variant={selectedSlot === slot ? "default" : "outline"} className="cursor-pointer px-4 py-2" onClick={() => setSelectedSlot(slot)}>
                        {slot}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-card">
                  <h2 className="font-heading text-lg font-semibold">Patient Details</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" /></div>
                    <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" /></div>
                    <div><Label>Phone</Label><Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1" /></div>
                  </div>
                  <div className="mt-4">
                    <Label>Notes (optional)</Label>
                    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1" placeholder="Any symptoms or concerns..." />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Proceed to Payment — ${doctor.fee}
                </Button>
              </form>
            )}

            {step === "payment" && (
              <PaymentForm
                amount={doctor.fee}
                doctorName={doctor.name}
                onPaymentComplete={handlePaymentComplete}
                onBack={() => setStep("details")}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookAppointment;
