import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ExternalLink, Play, X } from "lucide-react";

export const UserHomepageSection = () => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {t("userpage.badge")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              {t("userpage.title")}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("userpage.subtitle")}
            </p>
            
            <ul className="space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-500 text-sm font-bold">{i}</span>
                  </div>
                  <span className="text-muted-foreground">{t(`userpage.bullet${i}`)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => setShowModal(true)} size="lg" className="rounded-full">
                <Play className="w-4 h-4 mr-2" />
                {t("userpage.cta")}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="https://queuejoy.netlify.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("userpage.liveDemo")}
                </a>
              </Button>
            </div>
          </div>

          {/* Media - Video only, no image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <video
                src="/demo/user-homepage-demo.mp4"
                muted
                loop
                playsInline
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                onMouseEnter={(e) => {
                  e.currentTarget.muted = false;
                  e.currentTarget.play();
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.muted = true;
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 group-hover:opacity-0 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
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
              <h3 className="text-2xl font-bold mb-4">{t("userpage.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("userpage.modalDesc")}</p>
              
              <div className="rounded-xl overflow-hidden mb-6">
                <video
                  src="/demo/user-homepage-demo.mp4"
                  controls
                  autoPlay
                  className="w-full"
                />
              </div>
              
              <Button asChild className="w-full rounded-xl" size="lg">
                <a href="https://queuejoy.netlify.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("userpage.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
