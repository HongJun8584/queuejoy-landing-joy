import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import notificationImage from "@/assets/hero-queue-telegram.png";
import queueCrowd from "@/assets/queue-crowd.png";
import memoryGame from "@/assets/memory-game.png";
import adsEngagement from "@/assets/ads-engagement.png";

export const FeatureSections = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: "feature1",
      image: notificationImage,
      imageAlt: "Telegram notification examples",
      reverse: false,
    },
    {
      id: "feature2",
      image: queueCrowd,
      imageAlt: "Live queue status screen",
      reverse: true,
    },
    {
      id: "feature3",
      image: adsEngagement,
      imageAlt: "Announcement board",
      reverse: false,
    },
    {
      id: "feature4",
      image: memoryGame,
      imageAlt: "Customer engagement features",
      reverse: true,
    },
  ];

  return (
    <div className="space-y-32 py-24">
      {features.map((feature) => (
        <section
          key={feature.id}
          className={`container mx-auto px-4 scroll-reveal`}
        >
          <div
            className={`flex flex-col ${
              feature.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-12 lg:gap-20`}
          >
            {/* Image */}
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 hover-lift">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">{t(`${feature.id}.title`)}</span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {t(`${feature.id}.subtitle`)}
              </p>

              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-lg text-foreground/90">
                      {t(`${feature.id}.bullet${i}`)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button size="lg" variant="outline" className="text-lg">
                  {t(`${feature.id}.cta`)}
                </Button>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
