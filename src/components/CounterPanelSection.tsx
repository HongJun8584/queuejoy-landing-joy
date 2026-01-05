import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ExternalLink, Play, X, Zap, RefreshCw, Settings } from "lucide-react";
import counterPanelImg from "@/assets/counter-panel.png";

export const CounterPanelSection = () => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const features = [
    { icon: Zap, title: t("counter.feature1.title"), desc: t("counter.feature1.desc") },
    { icon: RefreshCw, title: t("counter.feature2.title"), desc: t("counter.feature2.desc") },
    { icon: Settings, title: t("counter.feature3.title"), desc: t("counter.feature3.desc") },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content - Left side */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-600 text-sm font-semibold">
              {t("counter.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              {t("counter.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("counter.subtitle")}
            </p>

            {/* Feature list */}
            <div className="space-y-4 py-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight */}
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="font-medium text-accent">{t("counter.highlight")}</p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => setShowModal(true)} size="lg" className="rounded-full">
                <Play className="w-4 h-4 mr-2" />
                {t("counter.cta")}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="https://queuejoy.netlify.app/counter.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("counter.liveDemo")}
                </a>
              </Button>
            </div>
          </div>

          {/* Media - Right side */}
          <div className="space-y-6">
            {/* Video - Landscape highlight at top */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                src="/demo/counter-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto"
              />
            </div>
            
            {/* Landscape image */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={counterPanelImg}
                alt="Counter Management Panel"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-4">{t("counter.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("counter.modalDesc")}</p>
              
              <div className="rounded-xl overflow-hidden mb-6">
                <video
                  src="/demo/counter-demo.mp4"
                  controls
                  autoPlay
                  className="w-full"
                />
              </div>
              
              <Button asChild className="w-full rounded-xl" size="lg">
                <a href="https://queuejoy.netlify.app/counter.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("counter.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
