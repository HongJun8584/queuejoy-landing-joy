import { Check } from "lucide-react";
import { VideoButton } from "./VideoModal";
import { useState } from "react";
import { VideoModal } from "./VideoModal";
import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { useLanguage } from "@/contexts/LanguageContext";

const FEATURE_KEYS = [
  "pricing.includes.telegram",
  "pricing.feature.multiCounter",
  "pricing.includes.counters",
  "pricing.includes.analytics",
  "pricing.includes.announcements",
  "pricing.includes.support",
] as const;

const Pricing = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative p-6 sm:p-8 lg:p-12 rounded-2xl bg-card shadow-card border border-border scroll-reveal">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-sm">
              {t("pricing.popular")}
            </div>

            <div className="text-center mb-6 mt-2">
              <p className="text-sm text-primary font-medium">
                {t("pricing.scarcity")}
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl sm:text-7xl font-black mb-2 text-foreground tracking-tight">
                RM25
              </div>
              <div className="text-muted-foreground text-base sm:text-lg font-medium">
                {t("pricing.perMonth")}
              </div>
            </div>

            <ul className="space-y-3.5 mb-8">
              {FEATURE_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-base sm:text-lg">{t(key)}</span>
                </li>
              ))}
            </ul>

            <div className="w-full space-y-3">
              <StripeCheckoutButton className="w-full" />
              <VideoButton onClick={() => setShowVideo(true)} />
            </div>

            <div className="text-center mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm font-semibold">
                🛡️ {t("pricing.guarantee")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("pricing.guaranteeDesc")}
              </p>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              {t("pricing.cancel")}
            </p>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoSrc="/demo/queuejoy-demo.mp4"
      />
    </section>
  );
};

export default Pricing;
