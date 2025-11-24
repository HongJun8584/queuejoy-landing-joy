import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { Button } from "./ui/button";
import { Play } from "lucide-react";
import heroAppMockup from "@/assets/hero-app-mockup.png";
import phoneMockupStarbucks from "@/assets/phone-mockup-starbucks.png";

const Hero = () => {
  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      const offset = 80;
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Copy + CTAs */}
            <div className="text-center lg:text-left space-y-8 animate-fade-up">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                  Cut wait time.
                  <br />
                  <span className="text-gradient">Make money</span> while customers wait.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  No hardware. Works with Telegram. RM10/month. Setup in 10 minutes.
                </p>
              </div>

              {/* Two CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <StripeCheckoutButton 
                  variant="hero" 
                  size="lg"
                  className="text-lg px-8 py-6 shadow-glow"
                />
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToDemo}
                  className="text-lg px-8 py-6 border-2 group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust line */}
              <p className="text-sm text-muted-foreground">
                30-day money-back guarantee · Cancel anytime
              </p>

              {/* Micro-proof bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm">Reduce wait by 40%</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm">100+ businesses</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm">No app needed</span>
                </div>
              </div>
            </div>

            {/* Right: Hero mockup */}
            <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="relative mx-auto max-w-md lg:max-w-lg">
                <img
                  src={phoneMockupStarbucks}
                  alt="QueueJoy Smart Queueing - Customer using Telegram interface"
                  className="w-full h-auto drop-shadow-2xl hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;
