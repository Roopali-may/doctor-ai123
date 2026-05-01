import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { doctors } from "@/data/doctors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Video,
  Monitor,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Search,
  MessageSquare,
  PhoneCall,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Search, title: "Choose a Doctor", desc: "Browse our specialists and pick one based on your symptoms." },
  { icon: Clock, title: "Select a Time Slot", desc: "Pick a convenient date and time for your video consultation." },
  { icon: Video, title: "Join Video Call", desc: "Connect with your doctor via secure HD video call from anywhere." },
  { icon: FileText, title: "Get Prescription", desc: "Receive digital prescription and follow-up plan instantly." },
];

const benefits = [
  { icon: Shield, title: "100% Secure & Private", desc: "End-to-end encrypted consultations with complete privacy." },
  { icon: Monitor, title: "HD Video Quality", desc: "Crystal clear audio and video for accurate diagnosis." },
  { icon: MessageSquare, title: "Chat & Follow-up", desc: "Message your doctor before and after the consultation." },
  { icon: PhoneCall, title: "24/7 Availability", desc: "Consult doctors round the clock for emergencies." },
];

const OnlineConsultation = () => {
  const [search, setSearch] = useState("");
  const onlineDoctors = doctors.filter((d) => d.available);
  const filtered = onlineDoctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-primary/10 text-primary">🩺 Online Treatment</Badge>
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Consult a Doctor <span className="text-primary">Online</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Get expert medical advice from the comfort of your home. Book a video consultation with our top specialists — no waiting rooms, no travel.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-card">
                <CheckCircle className="h-4 w-4 text-success" /> Verified Doctors
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-card">
                <Shield className="h-4 w-4 text-primary" /> Secure & Private
              </div>
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-card">
                <Clock className="h-4 w-4 text-warning" /> Instant Booking
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">How Online Consultation Works</h2>
          <p className="mt-2 text-center text-muted-foreground">Simple 4-step process to consult a doctor online</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative rounded-xl border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-heading font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-accent/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">Why Choose Online Consultation?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <b.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-heading font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Doctors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">Available for Online Consultation</h2>
          <p className="mt-2 text-center text-muted-foreground">Book a video call with any of our available specialists</p>

          <div className="mx-auto mt-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-card transition-all hover:shadow-card-hover"
              >
                <img src={doc.image} alt={doc.name} className="h-16 w-16 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-heading font-semibold">{doc.name}</h3>
                  <p className="text-sm text-primary">{doc.specialization}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {doc.rating}
                    </span>
                    <span>₹{doc.fee}</span>
                  </div>
                </div>
                <Link to={`/book/${doc.id}`}>
                  <Button size="sm" className="gap-1">
                    <Video className="h-3.5 w-3.5" /> Book
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-muted-foreground">No doctors found matching your search.</p>
          )}
        </div>
      </section>

      {/* Pricing Info */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold">Affordable Online Consultation</h2>
          <p className="mt-2 text-muted-foreground">Transparent pricing with no hidden charges</p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <p className="text-sm text-muted-foreground">General Physician</p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary">₹600</p>
              <p className="mt-1 text-xs text-muted-foreground">per consultation</p>
            </div>
            <div className="rounded-xl border-2 border-primary bg-card p-6 shadow-card">
              <Badge className="mb-2">Most Popular</Badge>
              <p className="text-sm text-muted-foreground">Specialist</p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary">₹1,000</p>
              <p className="mt-1 text-xs text-muted-foreground">per consultation</p>
            </div>
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <p className="text-sm text-muted-foreground">Super Specialist</p>
              <p className="mt-2 font-heading text-3xl font-bold text-primary">₹1,500</p>
              <p className="mt-1 text-xs text-muted-foreground">per consultation</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default OnlineConsultation;
