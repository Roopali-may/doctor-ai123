import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1666214277657-2d96f70d1d8c?w=800&auto=format&fit=crop",
];

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
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 8) * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl border bg-card shadow-card"
            >
              <img
                src={src}
                alt={`Hospital facility ${i + 1}`}
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </MainLayout>
);

export default Gallery;
