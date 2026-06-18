import { Send, Repeat, Megaphone, Heart } from "lucide-react";
import { ScrollHighlight } from "./ScrollHighlight";

const items = [
  { icon: Send, title: "High open rates", desc: "Messages land directly in Telegram — read in minutes, not days." },
  { icon: Repeat, title: "Built for repeat visits", desc: "Reach customers who already used your queue. No cold outreach." },
  { icon: Megaphone, title: "Promotions & reminders", desc: "Send offers, recalls, and updates with one click." },
  { icon: Heart, title: "No loyalty app needed", desc: "No cards, no points app. Just a familiar messenger your customers already use." },
];

export const LoyaltyTelegramSection = () => {
  return (
    <section className="py-24 bg-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-primary border border-primary/15 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Telegram retention
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
            <ScrollHighlight variant="half">Turn every queue</ScrollHighlight> into a{" "}
            <span className="text-gradient">repeat-customer channel.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            When customers join the queue and link Telegram, they stay reachable. Send updates, reminders, and promotions whenever you need to bring them back.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative rounded-2xl bg-card border border-border p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
