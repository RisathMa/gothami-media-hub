import { useState, useMemo } from "react";
import { X, Loader2, ArrowLeft, Search, Image as ImageIcon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase, GalleryImage } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PhotoGallery = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [lightbox, setLightbox] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: images, isLoading } = useQuery({
        queryKey: ["full-gallery"],
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

    // Group images by category for the "Categories View"
    const categories = useMemo(() => {
        const groups: Record<string, GalleryImage[]> = {};
        images.forEach(img => {
            if (!groups[img.category]) groups[img.category] = [];
            groups[img.category].push(img);
        });
        return Object.entries(groups).map(([name, items]) => ({
            name,
            preview: items[0].src,
            count: items.length
        }));
    }, [images]);

    const filteredImages = useMemo(() => {
        let result = images;
        if (selectedCategory) {
            result = result.filter(img => img.category === selectedCategory);
        }
        if (searchTerm) {
            result = result.filter(img =>
                img.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                img.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return result;
    }, [images, selectedCategory, searchTerm]);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            {selectedCategory ? (
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                                >
                                    <ArrowLeft size={20} />
                                    Back to Categories
                                </button>
                            ) : (
                                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium">
                                    <ArrowLeft size={20} />
                                    Back to Home
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                                    {selectedCategory ? selectedCategory : "Photo Gallery"}
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    {selectedCategory
                                        ? `Explore moments from our ${selectedCategory.toLowerCase()} events.`
                                        : "Discover the visual journey of Gothami School Media Unit through our categorized collections."}
                                </p>
                            </div>

                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search photos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-32">
                            <Loader2 className="animate-spin text-primary" size={48} />
                        </div>
                    ) : !selectedCategory && !searchTerm ? (
                        /* Categories View */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={cat.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedCategory(cat.name)}
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg mb-4">
                                        <img
                                            src={cat.preview}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-maroon-dark/20 group-hover:bg-maroon-dark/40 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight className="text-white" size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                                            <p className="text-muted-foreground text-sm">{cat.count} photos</p>
                                        </div>
                                        <ImageIcon className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        /* Photos View */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredImages.map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (i % 8) * 0.05 }}
                                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-md"
                                    onClick={() => setLightbox(i)}
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-maroon-dark/0 group-hover:bg-maroon-dark/40 transition-colors flex items-end">
                                        <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!selectedCategory && (
                                                <p className="text-white font-bold text-[10px] uppercase tracking-wider mb-1 px-2 py-0.5 rounded-full bg-primary/80 inline-block">{img.category}</p>
                                            )}
                                            <p className="text-primary-foreground font-medium text-sm">
                                                {img.alt}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!isLoading && filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-muted-foreground">No photos found.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightbox(null)}
                    >
                        <button
                            onClick={() => setLightbox(null)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X size={28} />
                        </button>
                        <motion.img
                            key={lightbox}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={filteredImages[lightbox].src}
                            alt={filteredImages[lightbox].alt}
                            className="max-w-full max-h-[90vh] rounded-lg object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGallery;
