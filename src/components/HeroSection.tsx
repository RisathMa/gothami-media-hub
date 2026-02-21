import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  { image: hero1, title: "Broadcasting Student Voices", subtitle: "Gothami School Radio — Live from the Studio" },
  { image: hero2, title: "Celebrating Talent & Culture", subtitle: "Annual Day Performances that Inspire" },
  { image: hero3, title: "Capturing Every Moment", subtitle: "Our Photography Club in Action" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          {/* The provided snippet for <p> was syntactically incorrect here. Assuming it was meant for the content overlay. */}
          <div className="absolute inset-0 bg-gradient-to-b from-maroon-dark/70 via-maroon-dark/50 to-maroon-dark/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          key={`text-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-6 border border-accent/30">
            🎬 Sanjanani Media Unit — GKV
          </span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 max-w-4xl leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {slides[current].subtitle}
          </p>
          {/* Added the new description paragraph here, assuming it was intended for the main content area */}
          <p className="section-subtitle text-primary-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Part of Gothami Kanishta Vidyalaya (Established 1932). Empowering students to tell their stories through journalism, broadcasting, and digital media.
          </p>
          <a
            href="#news"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-maroon text-primary-foreground font-semibold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Latest News
          </a>
        </motion.div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-4">
        <button onClick={prev} className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground transition-colors">
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-accent" : "w-2 bg-primary-foreground/40"}`}
            />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
