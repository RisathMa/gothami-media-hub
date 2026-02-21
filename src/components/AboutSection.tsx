import { Target, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">About Sanjanani Media Unit</h2>
          <p className="section-subtitle">
            Part of Gothami Kanishta Vidyalaya (Established 1932). Empowering students to tell their stories through journalism, broadcasting, and digital media.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: "Our Mission", text: "To cultivate a culture of creative expression and digital literacy among students." },
            { icon: Users, title: "Our Team", text: "A passionate group of student journalists, editors, photographers, and broadcasters." },
            { icon: Lightbulb, title: "Our Vision", text: "To become the leading school media platform that inspires and informs the community." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl gradient-maroon flex items-center justify-center mx-auto mb-5">
                <item.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Principal's Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card p-8 md:p-10 border-l-4 border-l-primary"
        >
          <h3 className="font-heading text-2xl font-bold text-primary mb-4">Message from the Principal</h3>
          <p className="text-muted-foreground leading-relaxed italic text-lg">
            "At Gothami Kanishta Vidyalaya, we believe every student has a unique voice. Our Sanjanani Media Unit provides the platform, tools,
            and guidance to amplify those voices. Through radio broadcasts, video production, photography, and journalism,
            our students learn not just to consume media — but to create it responsibly and creatively."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-maroon flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold">P</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">The Principal</p>
              <p className="text-sm text-muted-foreground">Gothami Kanishta Vidyalaya</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
