import { Link, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles, Phone } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <NotFound />;

  const Icon = service.icon;
  const others = services.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <MainLayout>
      <section className={`relative overflow-hidden bg-gradient-to-br ${service.color}`}>
        <div className="container mx-auto px-4 py-16">
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-3xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-card">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mt-5 font-heading text-4xl font-bold md:text-5xl">{service.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{service.long}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/doctors"><Button size="lg">Book Now <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline"><Phone className="mr-2 h-4 w-4" /> Talk to Us</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl border bg-card p-6 shadow-card">
            <Sparkles className="h-8 w-8 text-primary" />
            <h2 className="mt-3 font-heading text-2xl font-bold">Features</h2>
            <ul className="mt-4 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-xl border bg-card p-6 shadow-card">
            <Sparkles className="h-8 w-8 text-warning" />
            <h2 className="mt-3 font-heading text-2xl font-bold">Why Patients Love It</h2>
            <ul className="mt-4 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold">Other Services</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => {
              const I = s.icon;
              return (
                <Link key={s.slug} to={`/services/${s.slug}`} className="group rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <I className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-heading font-semibold group-hover:text-primary">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ServiceDetail;
