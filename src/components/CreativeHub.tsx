import { Radio, Tv, Play, Headphones, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase, CreativeHubItem } from "@/lib/supabase";

const initialRadioItems = ["Morning Assembly Recap", "Student Interviews — Ep 12", "Weekly News Roundup"];
const initialTvItems = [
  { title: "Annual Day 2025 Highlights", views: "1.2K views" },
  { title: "Science Fair Documentary", views: "890 views" },
];

const CreativeHub = () => {
  const { data: items, isLoading } = useQuery({
    queryKey: ["creative-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creative_hub")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CreativeHubItem[];
    },
    initialData: [],
  });

  const radioItems = items.filter(i => i.type === 'radio');
  const tvItems = items.filter(i => i.type === 'tv');

  const handleMediaClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="creative-hub" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Creative Hub</h2>
          <p className="section-subtitle">Explore student-produced podcasts, radio shows, and video content.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* School Radio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-maroon flex items-center justify-center">
                  <Radio className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">School Radio</h3>
                  <p className="text-sm text-muted-foreground">Gothami FM — Student Voices Live</p>
                </div>
              </div>

              <div className="space-y-3">
                {radioItems.length > 0 ? radioItems.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer group"
                    onClick={() => handleMediaClick(item.url)}
                  >
                    <button className="w-10 h-10 rounded-full gradient-maroon flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {i === 0 ? <Headphones className="text-primary-foreground" size={16} /> : <Play className="text-primary-foreground" size={16} />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle} • {item.duration || '10 min'}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-muted-foreground text-center py-4">No radio episodes available.</p>
                )}
              </div>
            </motion.div>

            {/* School TV */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-maroon flex items-center justify-center">
                  <Tv className="text-primary-foreground" size={22} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">School TV</h3>
                  <p className="text-sm text-muted-foreground">Watch Our Latest Productions</p>
                </div>
              </div>

              <div className="grid gap-4">
                {tvItems.length > 0 ? tvItems.map((video) => (
                  <div
                    key={video.id}
                    className="relative rounded-xl overflow-hidden bg-secondary aspect-video cursor-pointer group"
                    onClick={() => handleMediaClick(video.url)}
                  >
                    {video.image && (
                      <img src={video.image} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-maroon-dark/30 flex items-center justify-center group-hover:bg-maroon-dark/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="text-accent-foreground ml-1" size={28} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-maroon-dark/80 to-transparent">
                      <p className="text-primary-foreground font-medium text-sm">{video.title}</p>
                      <p className="text-primary-foreground/60 text-xs">{video.views}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-muted-foreground text-center py-10">No videos available.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreativeHub;
