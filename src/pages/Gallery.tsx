import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import g1 from "@/assets/gallery-1.png";
import g2 from "@/assets/gallery-2.png";
import g3 from "@/assets/gallery-3.png";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import g9 from "@/assets/gallery-9.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8, g9];

const Gallery = () => (
  <MainLayout>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Gallery</h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A glimpse inside our hospital — modern facilities, comfortable rooms, and advanced operating theatres.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl border bg-card shadow-card"
            >
              <img
                src={src}
                alt={`Hospital facility ${i + 1}`}
                loading="lazy"
                width={800}
                height={600}
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </MainLayout>
);

export default Gallery;
