import adsImage from "@/assets/ads-engagement.png";
import memoryGameImage from "@/assets/memory-game.png";
import { DollarSign, Gamepad2, Video } from "lucide-react";

const AdsEngagement = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ads & Engagement
          </h2>
          <p className="text-xl text-muted-foreground">
            Turn waiting into opportunity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Ads Panel - Updated */}
          <div className="scroll-reveal hover-lift">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
              <div className="aspect-video overflow-hidden">
                <img
                  src={adsImage}
                  alt="Digital advertisement display showing promotional content"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center shadow-glow">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Promote Your Business</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Display your own promotions</strong> or highlight special offers to customers while they wait</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Sell ad space to partners</strong> and generate extra revenue from idle screen time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Video className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span><strong>Video support</strong> — Show videos, GIFs, and images</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Engagement - Updated */}
          <div className="scroll-reveal hover-lift" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50">
              <div className="aspect-video overflow-hidden">
                <img
                  src={memoryGameImage}
                  alt="Interactive mini-games for customer engagement"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-glow">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Make Wait Time Fun</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Interactive mini-games</strong> — Simple, fun games that work on any device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Reduce perceived wait</strong> — Keeps customers entertained and happy, reducing wait time perception by up to 40%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span><strong>Boost customer experience</strong> — Engaging content keeps visitors focused on your brand, not the queue</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsEngagement;
