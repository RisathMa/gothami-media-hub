import { Calendar, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase, NewsItem } from "@/lib/supabase";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const initialNewsItems = [
  {
    title: "Annual Media Awards Ceremony 2025",
    date: "Feb 15, 2026",
    excerpt: "Celebrating outstanding student achievements in journalism, photography, and broadcasting.",
    image: gallery1,
  },
  {
    title: "Cultural Festival Highlights",
    date: "Jan 28, 2026",
    excerpt: "Students showcased traditional dances and performances at this year's cultural festival.",
    image: gallery2,
  },
  {
    title: "Inter-School Sports Day Coverage",
    date: "Jan 10, 2026",
    excerpt: "Our media team covered the exciting inter-school sports day with live commentary.",
    image: gallery3,
  },
  {
    title: "New Broadcasting Studio Launched",
    date: "Dec 20, 2025",
    excerpt: "State-of-the-art radio and TV studio inaugurated for student productions.",
    image: gallery1,
  },
];

const NewsSection = () => {
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ["news-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      return data as NewsItem[];
    },
    initialData: [],
  });

  const displayNews = newsItems && newsItems.length > 0 ? newsItems : initialNewsItems;

  return (
    <section id="news" className="section-padding gradient-maroon-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">News & Events</h2>
          <p className="section-subtitle">Stay updated with the latest happenings from Gothami School Media Unit.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayNews.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/60 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
