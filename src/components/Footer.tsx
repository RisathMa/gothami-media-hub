import { Facebook, Youtube, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="gradient-maroon text-primary-foreground">
      <div className="container mx-auto section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-heading font-bold text-lg">G</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg block leading-tight">Gothami School</span>
                <span className="text-xs text-primary-foreground/60 block">Media Unit</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Empowering the next generation of storytellers through digital media, journalism, and creative expression.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "News", "Gallery", "Creative Hub"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-").replace("home", "home")}`}
                    className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={16} className="flex-shrink-0" />
                <span>123 School Road, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone size={16} className="flex-shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail size={16} className="flex-shrink-0" />
                <span>media@gothamischool.lk</span>
              </li>
            </ul>
          </div>

          {/* Social & Map */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
                { icon: Instagram, label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="rounded-lg overflow-hidden h-28 bg-primary-foreground/10 flex items-center justify-center">
              <span className="text-primary-foreground/40 text-xs">Google Maps Embed</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Gothami School Media Unit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
