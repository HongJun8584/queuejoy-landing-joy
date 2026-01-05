import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { ExternalLink, Play, X, Megaphone, Palette, BarChart3 } from "lucide-react";
import announcementImg from "@/assets/announcement-system.png";

export const AdminPanelSections = () => {
  const { t } = useLanguage();
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  return (
    <div id="admin-panel">
      {/* Announcements Section */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Media - Left */}
            <div className="space-y-6">
              {/* Video - Landscape highlight */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  src="/demo/announcement-demo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              </div>
              
              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={announcementImg}
                  alt="Direct Announcements to Customers"
                  className="w-full h-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Content - Right */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Megaphone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-semibold text-primary">{t("admin.announcement.badge")}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                {t("admin.announcement.title")}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("admin.announcement.desc")}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => setShowAnnouncementModal(true)} size="lg" className="rounded-full">
                  <Play className="w-4 h-4 mr-2" />
                  {t("admin.announcement.cta")}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="https://queuejoy.netlify.app/admin.html" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("admin.liveDemo")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content - Left */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm font-semibold text-accent">{t("admin.customize.badge")}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black leading-tight">
                {t("admin.customize.title")}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t("admin.customize.desc")}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={() => setShowCustomizeModal(true)} size="lg" className="rounded-full">
                  <Play className="w-4 h-4 mr-2" />
                  {t("admin.customize.cta")}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="https://queuejoy.netlify.app/admin.html" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("admin.liveDemo")}
                  </a>
                </Button>
              </div>
            </div>

            {/* Media - Right - Video shown on page */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  src="/demo/customization-demo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-24 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">{t("admin.analytics.badge")}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              {t("admin.analytics.title")}
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("admin.analytics.desc")}
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button onClick={() => setShowAnalyticsModal(true)} size="lg" className="rounded-full">
                <Play className="w-4 h-4 mr-2" />
                {t("admin.analytics.cta")}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="https://queuejoy.netlify.app/admin.html" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("admin.liveDemo")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {showAnnouncementModal && (
        <Modal 
          onClose={() => setShowAnnouncementModal(false)}
          title={t("admin.announcement.title")}
          description={t("admin.announcement.modalDesc")}
          videoSrc="/demo/announcement-demo.mp4"
          demoUrl="https://queuejoy.netlify.app/admin.html"
          t={t}
        />
      )}
      
      {showCustomizeModal && (
        <Modal 
          onClose={() => setShowCustomizeModal(false)}
          title={t("admin.customize.title")}
          description={t("admin.customize.modalDesc")}
          videoSrc="/demo/customization-demo.mp4"
          demoUrl="https://queuejoy.netlify.app/admin.html"
          t={t}
        />
      )}
      
      {showAnalyticsModal && (
        <Modal 
          onClose={() => setShowAnalyticsModal(false)}
          title={t("admin.analytics.title")}
          description={t("admin.analytics.modalDesc")}
          videoSrc="/demo/queuejoy-streamline.mp4"
          demoUrl="https://queuejoy.netlify.app/admin.html"
          t={t}
        />
      )}
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
  title: string;
  description: string;
  videoSrc: string;
  demoUrl: string;
  t: (key: string) => string;
}

const Modal = ({ onClose, title, description, videoSrc, demoUrl, t }: ModalProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="rounded-xl overflow-hidden mb-6">
          <video
            src={videoSrc}
            controls
            autoPlay
            className="w-full"
          />
        </div>
        
        <Button asChild className="w-full rounded-xl" size="lg">
          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t("admin.liveDemo")}
          </a>
        </Button>
      </div>
    </div>
  </div>
);
