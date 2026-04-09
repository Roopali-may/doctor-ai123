import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DoctorCard from "@/components/DoctorCard";
import MainLayout from "@/layouts/MainLayout";
import { doctors } from "@/data/doctors";
import heroBanner from "@/assets/hero-banner.jpg";
import {
  Search,
  Stethoscope,
  HeartPulse,
  Video,
  ShieldCheck,
  Clock,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const [search, setSearch] = useState("");
  const topDoctors = doctors.filter((d) => d.available).slice(0, 4);

  const services = [
    { icon: Stethoscope, title: "Consultation", desc: "Expert doctors available for in-person and virtual consultations." },
    { icon: HeartPulse, title: "Emergency Care", desc: "24/7 emergency services with rapid response medical teams." },
    { icon: Video, title: "Online Care", desc: "Connect with doctors from home through secure video calls." },
    { icon: ShieldCheck, title: "Health Checkup", desc: "Comprehensive health screening and preventive care packages." },
  ];

  const testimonials = [
    { name: "Maria Garcia", text: "MediCare made booking my appointment so easy. The doctor was professional and caring.", rating: 5 },
    { name: "David Kim", text: "Excellent experience with the online consultation. Saved me a trip to the hospital!", rating: 5 },
    { name: "Lisa Thompson", text: "The best healthcare platform I've used. Clean, intuitive, and the doctors are top-notch.", rating: 4 },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBanner} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl"
            >
              Your Health, Our <span className="text-gradient">Priority</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-4 text-lg text-muted-foreground"
            >
              Book appointments with the best doctors. Quality healthcare, accessible to everyone.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by specialization..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Link to={`/doctors${search ? `?q=${search}` : ""}`}>
                <Button size="lg">
                  Find Doctors <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> 24/7 Support</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning" /> 4.8 Rating</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-success" /> Verified Doctors</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">Our Services</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">
            Comprehensive healthcare solutions designed around your needs.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Top Doctors</h2>
              <p className="mt-2 text-muted-foreground">Highly rated medical professionals</p>
            </div>
            <Link to="/doctors">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">What Patients Say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-xl border bg-card p-6 shadow-card"
              >
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-3 text-sm text-muted-foreground">{t.text}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mt-2 font-heading font-semibold text-sm">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">
            Ready to Book Your Appointment?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            Join thousands of patients who trust MediCare for their healthcare needs.
          </p>
          <Link to="/doctors">
            <Button size="lg" variant="secondary" className="mt-6">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
