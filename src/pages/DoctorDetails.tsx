import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { doctors } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, GraduationCap, IndianRupee, ArrowLeft } from "lucide-react";

const DoctorDetails = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <Link to="/doctors" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Doctors
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-xl border bg-card shadow-card">
              <img src={doctor.image} alt={doctor.name} className="h-72 w-full object-cover" />
              <div className="p-6">
                <h1 className="font-heading text-2xl font-bold">{doctor.name}</h1>
                <p className="mt-1 font-medium text-primary">{doctor.specialization}</p>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{doctor.experience} years experience</div>
                  <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-warning text-warning" />{doctor.rating} ({doctor.reviews} reviews)</div>
                  <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-primary" />{doctor.education}</div>
                  <div className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-primary" />₹{doctor.fee} per consultation</div>
                </div>
                <Badge className={`mt-4 ${doctor.available ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                  {doctor.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-semibold">About</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{doctor.about}</p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-semibold">Available Time Slots</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.slots.map((slot) => (
                  <Badge key={slot} variant="outline" className="cursor-pointer px-4 py-2 hover:bg-accent">
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-card">
              <h2 className="font-heading text-xl font-semibold">Patient Reviews</h2>
              <div className="mt-4 space-y-4">
                {[
                  { name: "Alice M.", text: "Very thorough and caring doctor. Highly recommend!", rating: 5 },
                  { name: "Bob R.", text: "Great experience. Took time to explain everything.", rating: 4 },
                  { name: "Carol S.", text: "Professional and punctual. Will visit again.", rating: 5 },
                ].map((r) => (
                  <div key={r.name} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-semibold text-sm">{r.name}</span>
                      <div className="flex">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {doctor.available && (
              <Link to={`/book/${doctor.id}`}>
                <Button size="lg" className="w-full">Book Appointment</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDetails;
