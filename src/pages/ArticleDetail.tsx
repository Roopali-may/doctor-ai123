import { Link, useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { articles } from "@/data/articles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const ArticleDetail = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const Icon = article.icon;

  return (
    <MainLayout>
      <article className="container mx-auto px-4 py-10">
        <Link to="/health-tips" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Health Tips
        </Link>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 max-w-3xl">
          <Badge className={article.color}>
            <Icon className="mr-1 h-3 w-3" /> {article.category}
          </Badge>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-4 w-4" />{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{article.readTime}</span>
          </div>
        </motion.header>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mt-6 overflow-hidden rounded-2xl">
          <img src={article.image} alt={article.title} className="h-72 w-full object-cover md:h-96" />
        </motion.div>

        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5 text-base leading-relaxed text-foreground/90">
            <p className="text-lg italic text-muted-foreground">{article.excerpt}</p>
            {article.content.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                {p}
              </motion.p>
            ))}
          </div>
          <aside className="rounded-xl border bg-card p-6 shadow-card h-fit sticky top-24">
            <h3 className="font-heading text-lg font-semibold">Key Takeaways</h3>
            <ul className="mt-4 space-y-3">
              {article.keyPoints.map((kp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
            <Link to="/doctors"><Button className="mt-5 w-full">Consult a Doctor <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">Related Articles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={`/health-tips/${r.slug}`} className="group overflow-hidden rounded-xl border bg-card shadow-card transition-all hover:shadow-card-hover">
                <img src={r.image} alt={r.title} className="h-40 w-full object-cover transition-transform group-hover:scale-105" />
                <div className="p-4">
                  <Badge className={r.color}>{r.category}</Badge>
                  <h3 className="mt-2 font-heading font-semibold leading-snug group-hover:text-primary">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </MainLayout>
  );
};

export default ArticleDetail;
