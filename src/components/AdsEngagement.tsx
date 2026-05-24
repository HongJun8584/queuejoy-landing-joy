import adsImage from "@/assets/ads-engagement.png";
import memoryGameImage from "@/assets/memory-game.png";
import { DollarSign, Gamepad2, Video } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdsEngagement = () => {
  const { t } = useLanguage();

  const promoteItems = [
    { key: "ads.promote.item1", icon: null },
    { key: "ads.promote.item2", icon: null },
    { key: "ads.promote.item3", icon: Video },
  ];

  const engageItems = [
    { key: "ads.engage.item1" },
    { key: "ads.engage.item2" },
    { key: "ads.engage.item3" },
  ];

  return (
    <section className="py-20 sm:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {t("ads.title")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t("ads.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="scroll-reveal">
            <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border h-full">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={adsImage}
                  alt={t("ads.promote.title")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t("ads.promote.title")}</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  {promoteItems.map(({ key, icon: Icon }) => (
                    <li key={key} className="flex items-start gap-2.5">
                      {Icon ? (
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      ) : (
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      )}
                      <span className="text-sm sm:text-base">
                        <strong className="text-foreground">{t(`${key}.b`)}</strong>{" "}
                        {t(`${key}.t`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ animationDelay: "0.15s" }}>
            <div className="bg-card rounded-2xl shadow-card overflow-hidden border border-border h-full">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={memoryGameImage}
                  alt={t("ads.engage.title")}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{t("ads.engage.title")}</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  {engageItems.map(({ key }) => (
                    <li key={key} className="flex items-start gap-2.5">
                      <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                      <span className="text-sm sm:text-base">
                        <strong className="text-foreground">{t(`${key}.b`)}</strong>{" "}
                        {t(`${key}.t`)}
                      </span>
                    </li>
                  ))}
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
