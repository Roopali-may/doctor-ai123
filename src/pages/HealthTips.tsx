import MainLayout from "@/layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Apple, Dumbbell, Moon, Droplets, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const tips = [
  {
    category: "Heart Health",
    icon: Heart,
    color: "bg-destructive/10 text-destructive",
    title: "5 Heart-Healthy Habits for a Longer Life",
    excerpt: "Adopt these daily habits to reduce cardiovascular risk by up to 80%. From diet changes to exercise routines, small steps make a big difference.",
    date: "Apr 5, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
  },
  {
    category: "Mental Health",
    icon: Brain,
    color: "bg-primary/10 text-primary",
    title: "Managing Stress in a Fast-Paced World",
    excerpt: "Learn evidence-based techniques for stress management including mindfulness, breathing exercises, and cognitive behavioral strategies.",
    date: "Apr 3, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop",
  },
  {
    category: "Nutrition",
    icon: Apple,
    color: "bg-success/10 text-success",
    title: "The Mediterranean Diet: A Complete Guide",
    excerpt: "Discover why the Mediterranean diet is consistently ranked as the healthiest eating pattern by nutritionists worldwide.",
    date: "Apr 1, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=250&fit=crop",
  },
  {
    category: "Fitness",
    icon: Dumbbell,
    color: "bg-warning/10 text-warning",
    title: "Home Workout Routines That Actually Work",
    excerpt: "No gym needed. These 20-minute daily routines can help you stay fit, build muscle, and improve flexibility from the comfort of your home.",
    date: "Mar 28, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=250&fit=crop",
  },
  {
    category: "Sleep",
    icon: Moon,
    color: "bg-accent text-accent-foreground",
    title: "Sleep Hygiene: The Science of Better Rest",
    excerpt: "Quality sleep is the foundation of good health. Learn how to optimize your sleep environment and establish a consistent routine.",
    date: "Mar 25, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=250&fit=crop",
  },
  {
    category: "Hydration",
    icon: Droplets,
    color: "bg-primary/10 text-primary",
    title: "How Much Water Do You Really Need?",
    excerpt: "The 8-glasses-a-day rule might not be accurate. Find out how much water your body actually needs based on your lifestyle and activity level.",
    date: "Mar 22, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=250&fit=crop",
  },
];

const HealthTips = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">Health Tips & Articles</h1>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">Stay informed with the latest health advice from our medical experts</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, i) => (
          <motion.article
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:shadow-card-hover"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={tip.image} alt={tip.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <Badge className={`absolute left-3 top-3 ${tip.color}`}>
                <tip.icon className="mr-1 h-3 w-3" />
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
              <Button variant="ghost" className="mt-3 h-auto p-0 text-sm text-primary hover:text-primary/80">
                Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default HealthTips;
