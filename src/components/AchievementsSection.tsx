import { Award, Trophy, Star, Medal } from "lucide-react";

const achievements = [
  { icon: Trophy, text: "Best School Media Unit — National Award 2025" },
  { icon: Award, text: "1st Place — Inter-School Journalism Competition" },
  { icon: Star, text: "Outstanding Digital Content — Regional Media Fest" },
  { icon: Medal, text: "Gold Medal — School Photography Championship" },
  { icon: Trophy, text: "Best Documentary — Youth Film Festival 2024" },
  { icon: Award, text: "Excellence in Broadcasting — State Level" },
];

const AchievementsSection = () => {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto mb-8 text-center">
        <h2 className="section-title">Our Achievements</h2>
        <p className="section-subtitle">Proud moments that celebrate our students' excellence.</p>
      </div>

      <div className="relative">
        <div className="flex animate-marquee">
          {[...achievements, ...achievements].map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 flex items-center gap-3 px-6 py-4 rounded-xl glass-card border-primary/20"
            >
              <div className="w-10 h-10 rounded-lg gradient-maroon flex items-center justify-center flex-shrink-0">
                <item.icon className="text-primary-foreground" size={18} />
              </div>
              <span className="text-foreground font-medium text-sm whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
