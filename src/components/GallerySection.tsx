import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase, GalleryImage } from "@/lib/supabase";

const GallerySection = () => {
  const navigate = useNavigate();

  const { data: images, isLoading } = useQuery({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GalleryImage[];
    },
    initialData: [],
  });

  return (
    <section id="gallery" className="section-padding gradient-maroon-subtle">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">Highlights from our events, activities, and celebrations.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${img.span || (i % 5 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1")} rounded-xl overflow-hidden cursor-pointer group relative`}
                onClick={() => navigate("/photo-gallery")}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-maroon-dark/0 group-hover:bg-maroon-dark/40 transition-colors flex items-end">
                  <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-primary-foreground font-bold text-xs uppercase tracking-wider mb-1">{img.category}</p>
                    <p className="text-primary-foreground font-medium text-sm">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
