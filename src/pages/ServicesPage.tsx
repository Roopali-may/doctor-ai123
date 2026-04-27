import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ServicesPage = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Our Services</h1>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Comprehensive healthcare solutions designed around your needs</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/services/${s.slug}`}
                className={`group block rounded-2xl border bg-gradient-to-br ${s.color} p-6 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  </MainLayout>
);

export default ServicesPage;
