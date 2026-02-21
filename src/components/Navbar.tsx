import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "News", href: "#news" },
  { label: "Gallery", href: "#gallery" },
  { label: "Creative Hub", href: "#creative-hub" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-card/95 backdrop-blur-md shadow-lg border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-4">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden gradient-maroon flex items-center justify-center">
            {/* 
              Logo Image Placeholder 
              Replace src with your actual logo path (e.g., "/logo.png") 
            */}
            <img
              src="/school-logo.png"
              alt="GKV Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <span className="text-primary-foreground font-heading font-bold text-lg group-hover:opacity-0 transition-opacity">G</span>
          </div>
          <div>
            <span className={`font-heading font-bold text-lg leading-tight block ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
              Gothami Kanishta Vidyalaya
            </span>
            <span className={`text-xs leading-tight block ${scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
              Sanjanani Media Unit
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${scrolled
                  ? "text-foreground hover:bg-secondary hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 rounded-lg text-foreground hover:bg-secondary hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
