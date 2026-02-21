import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Image as ImageIcon, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase, GalleryImage } from "@/lib/supabase";

const HomePhotoPreview = () => {
    const { data: images, isLoading } = useQuery({
        queryKey: ["home-previews"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(3);

            if (error) throw error;
            return data as GalleryImage[];
        },
        initialData: [],
    });

    return (
        <section className="py-12 bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-primary flex items-center gap-3">
                            <ImageIcon className="text-primary" />
                            Captured Moments
                        </h2>
                        <p className="text-muted-foreground mt-2">A glimpse into our visual storytelling journey.</p>
                    </div>

                    <Link
                        to="/photo-gallery"
                        className="group flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md"
                    >
                        Explore All Photos
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.id || i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                            >
                                <Link to="/photo-gallery">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-maroon-dark/20 group-hover:bg-maroon-dark/40 transition-colors flex items-center justify-center">
                                        <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            View in Gallery
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HomePhotoPreview;
