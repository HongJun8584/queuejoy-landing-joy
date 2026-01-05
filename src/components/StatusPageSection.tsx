import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ExternalLink, Play, X, Bell, Smartphone, MessageCircle } from "lucide-react";
import telegramLinkingImg from "@/assets/telegram-linking.png";

export const StatusPageSection = () => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const steps = [
    { icon: Smartphone, text: t("statuspage.step1") },
    { icon: Bell, text: t("statuspage.step2") },
    { icon: MessageCircle, text: t("statuspage.step3") },
  ];

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Media - Left side */}
          <div className="space-y-6">
            {/* Video - Landscape highlight at top */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                src="/demo/status-notification-demo.mp4"
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
                src={telegramLinkingImg}
                alt="Automatic Telegram Linking"
                className="w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content - Right side */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
              {t("statuspage.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              {t("statuspage.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("statuspage.subtitle")}
            </p>

            {/* Steps */}
            <div className="space-y-4 py-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-medium">0{index + 1}</span>
                    <p className="font-medium">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => setShowModal(true)} size="lg" className="rounded-full">
                <Play className="w-4 h-4 mr-2" />
                {t("statuspage.cta")}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="https://queuejoy.netlify.app/status.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("statuspage.liveDemo")}
                </a>
              </Button>
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
              <h3 className="text-2xl font-bold mb-4">{t("statuspage.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("statuspage.modalDesc")}</p>
              
              <div className="rounded-xl overflow-hidden mb-6">
                <video
                  src="/demo/status-notification-demo.mp4"
                  controls
                  autoPlay
                  className="w-full"
                />
              </div>
              
              <Button asChild className="w-full rounded-xl" size="lg">
                <a href="https://queuejoy.netlify.app/status.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("statuspage.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
