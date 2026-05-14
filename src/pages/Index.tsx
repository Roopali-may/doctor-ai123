import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DoctorCard from "@/components/DoctorCard";
import MainLayout from "@/layouts/MainLayout";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import heroBanner from "@/assets/hero-banner.jpg";
import heroHospital from "@/assets/hero-hospital.png";
import heroTeam from "@/assets/hero-team.png";
import heroCare from "@/assets/hero-care.png";
import {
  Search,
  ShieldCheck,
  Clock,
  Star,
  ArrowRight,
  Quote,
  Phone,
  Award,
  Users,
  Activity,
  CheckCircle,
  Lightbulb,
  Video,
  Target,
  HeartHandshake,
  Sparkles,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

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
  const [slide, setSlide] = useState(0);
  const slides = [heroHospital, heroTeam, heroCare];
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [slides.length]);
  const topDoctors = doctors.filter((d) => d.available).slice(0, 4);

  const homeServices = services.slice(0, 8);

  const stats = [
    { value: "500+", label: "Expert Doctors", icon: Users },
    { value: "50K+", label: "Happy Patients", icon: Award },
    { value: "24/7", label: "Emergency Support", icon: Phone },
    { value: "98%", label: "Satisfaction Rate", icon: Activity },
  ];

  const whyChooseUs = [
    "Board-certified and verified medical professionals",
    "Easy online appointment booking & rescheduling",
    "Secure online payments with multiple options",
    "Digital medical records & prescription storage",
    "24/7 emergency support and telemedicine",
    "Insurance integration and billing support",
  ];

  const testimonials = [
    { name: "Maria Garcia", text: "MediCare made booking my appointment so easy. The doctor was professional and caring. The online payment was seamless!", rating: 5 },
    { name: "David Kim", text: "Excellent experience with the online consultation. Saved me a trip to the hospital! Love the medical records feature.", rating: 5 },
    { name: "Lisa Thompson", text: "The best healthcare platform I've used. Clean, intuitive, and the doctors are top-notch. Highly recommend!", rating: 4 },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-accent">
        <div className="absolute inset-0 opacity-10">
          <img src={heroBanner} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-2xl text-center">
            <motion.h1 variants={fadeUp} custom={0} className="font-heading text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Your Health, Our <span className="text-gradient">Priority</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={1} className="mt-4 text-lg text-muted-foreground">
              Book appointments with the best doctors. Quality healthcare, accessible to everyone. Pay online securely.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by specialization..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              <Link to={`/doctors${search ? `?q=${search}` : ""}`}>
                <Button size="lg">Find Doctors <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> 24/7 Support</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-warning" /> 4.8 Rating</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-success" /> Verified Doctors</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Auto Carousel */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto h-[280px] w-full overflow-hidden rounded-2xl border bg-card shadow-card sm:h-[380px] md:h-[460px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide}
                src={slides[slide]}
                alt={`Highlight ${slide + 1}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === slide ? "w-8 bg-primary" : "w-2 bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <s.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 font-heading text-3xl font-extrabold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-heading text-3xl font-bold">Our Services</h2>
              <p className="mt-2 max-w-lg text-muted-foreground">Comprehensive healthcare solutions designed around your needs.</p>
            </div>
            <Link to="/services"><Button variant="outline">All Services <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={`/services/${s.slug}`}
                    className={`group block h-full rounded-xl border bg-gradient-to-br ${s.color} p-6 shadow-card transition-all hover:shadow-card-hover`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Objectives */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/30 to-success/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Badge className="bg-primary/10 text-primary"><Target className="mr-1 h-3 w-3" /> Our Mission</Badge>
            <h2 className="mt-3 font-heading text-3xl font-bold">Our Objectives</h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">Driving better health outcomes through technology, accessibility and care.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: HeartHandshake, title: "Accessible Care", desc: "Bring quality healthcare to every patient regardless of location or background." },
              { icon: Sparkles, title: "Modern Experience", desc: "Deliver a beautiful, intuitive interface that simplifies medical journeys." },
              { icon: ShieldCheck, title: "Trust & Privacy", desc: "Protect patient data with bank-grade encryption and HIPAA-aligned practices." },
              { icon: Activity, title: "Preventive Wellness", desc: "Empower patients with health tracking and early-detection screenings." },
              { icon: Globe, title: "Global Network", desc: "Connect patients with verified specialists across borders and time zones." },
              { icon: Lightbulb, title: "Continuous Innovation", desc: "Improve outcomes with AI suggestions, telemedicine, and smart automation." },
            ].map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="group rounded-2xl border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <o.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold">Why Choose MediCare?</h2>
              <p className="mt-3 text-muted-foreground">We provide a complete healthcare management platform with cutting-edge features.</p>
              <div className="mt-6 space-y-3">
                {whyChooseUs.map((item, i) => (
                  <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/doctors"><Button className="mt-6">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <Video className="h-8 w-8 text-primary" />
                <h4 className="mt-3 font-heading font-semibold">Telemedicine</h4>
                <p className="mt-1 text-xs text-muted-foreground">Video consultations from anywhere</p>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <ShieldCheck className="h-8 w-8 text-success" />
                <h4 className="mt-3 font-heading font-semibold">Secure Payments</h4>
                <p className="mt-1 text-xs text-muted-foreground">SSL encrypted payment processing</p>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <Activity className="h-8 w-8 text-warning" />
                <h4 className="mt-3 font-heading font-semibold">Health Tracking</h4>
                <p className="mt-1 text-xs text-muted-foreground">Monitor your health metrics</p>
              </div>
              <div className="rounded-xl border bg-card p-5 shadow-card">
                <Lightbulb className="h-8 w-8 text-primary" />
                <h4 className="mt-3 font-heading font-semibold">Health Tips</h4>
                <p className="mt-1 text-xs text-muted-foreground">Expert health advice daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Top Doctors</h2>
              <p className="mt-2 text-muted-foreground">Highly rated medical professionals</p>
            </div>
            <Link to="/doctors"><Button variant="outline">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-accent/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-3xl font-bold">How It Works</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-muted-foreground">Book your appointment in 4 simple steps</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "Find a Doctor", desc: "Search by specialization, rating, or availability" },
              { step: "2", title: "Book a Slot", desc: "Choose your preferred date and time slot" },
              { step: "3", title: "Pay Online", desc: "Secure payment via card, UPI, or digital wallet" },
              { step: "4", title: "Get Treatment", desc: "Visit the doctor or join online consultation" },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-primary-foreground">{item.step}</div>
                <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
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
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="rounded-xl border bg-card p-6 shadow-card">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-3 text-sm text-muted-foreground">{t.text}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mt-2 font-heading text-sm font-semibold">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">Ready to Book Your Appointment?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">Join thousands of patients who trust MediCare for their healthcare needs.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/doctors"><Button size="lg" variant="secondary">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
