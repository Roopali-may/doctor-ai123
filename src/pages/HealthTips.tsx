import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { articles } from "@/data/articles";

const HealthTips = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Health Tips & Articles</h1>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Stay informed with the latest health advice from our medical experts</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <motion.article
              key={tip.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={tip.image} alt={tip.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <Badge className={`absolute left-3 top-3 ${tip.color}`}>
                  <Icon className="mr-1 h-3 w-3" />
                  {tip.category}
                </Badge>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{tip.date}</span>
                  <span>·</span>
                  <span>{tip.readTime}</span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-snug group-hover:text-primary transition-colors">{tip.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tip.excerpt}</p>
                <Link to={`/health-tips/${tip.slug}`}>
                  <Button variant="ghost" className="mt-3 h-auto p-0 text-sm text-primary hover:text-primary/80">
                    Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </MainLayout>
);

export default HealthTips;
