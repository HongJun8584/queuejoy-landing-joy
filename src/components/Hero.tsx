import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { Button } from "./ui/button";
import { Play, Shield, Zap, MessageCircle } from "lucide-react";
import heroPhoneMockup from "@/assets/hero-phone-mockup.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollHighlight } from "./ScrollHighlight";

const Hero = () => {
  const { t } = useLanguage();
  
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
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background bg-mesh pt-20">
      {/* soft gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-accent/15 blur-3xl" />

      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Copy + CTAs */}
          <div className="text-center lg:text-left space-y-8 animate-fade-up">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary border border-primary/15">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Live digital queue · Telegram alerts · Built for small businesses
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-black leading-[1.05] tracking-tight">
                Turn <ScrollHighlight variant="half">frustrating waiting lines</ScrollHighlight> into a{" "}
                <span className="text-gradient">smooth digital experience.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t("hero.subhead")}
              </p>
            </div>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <StripeCheckoutButton 
                variant="hero" 
                size="lg"
                className="text-lg px-8 py-6 shadow-glow"
                data-track="hero_cta_buy"
              />
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToDemo}
                className="text-lg px-8 py-6 border-2 group"
                data-track="hero_cta_demo"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t("hero.cta.demo")}
              </Button>
            </div>

            {/* Trust line with guarantee */}
            <div className="flex items-center gap-2 justify-center lg:justify-start text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p>{t("hero.trust")}</p>
            </div>

            {/* Micro-proof bullets with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <MessageCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">{t("hero.benefit1")}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm">{t("hero.benefit2")}</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-green-500">40</span>
                </div>
                <span className="text-sm">{t("hero.benefit3")}</span>
              </div>
            </div>
          </div>

          {/* Right: Hero mockup */}
          <div className="relative animate-fade-up hidden md:block" style={{ animationDelay: "0.2s" }}>
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              <img
                src={heroPhoneMockup}
                alt="QueueJoy Smart Queueing - Live queue status on mobile"
                className="w-full h-auto drop-shadow-2xl hover-lift"
                width={500}
                height={700}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
