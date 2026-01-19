import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const ReturnPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem('popup_dismissed')) {
      return;
    }

    // Show popup after 20 seconds
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('popup_dismissed', 'true');
  };

  const handleYes = () => {
    handleDismiss();
    // Scroll to checkout/pricing section
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const offset = 80;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={handleDismiss}
    >
      <div 
        className="relative bg-card rounded-2xl max-w-md w-full p-8 shadow-2xl border border-primary/20 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3 text-gradient">
            {t("popup.title")}
          </h2>
          <p className="text-muted-foreground mb-2">
            {t("popup.subtitle")}
          </p>
          <p className="text-sm text-muted-foreground/80 mb-6">
            {t("popup.description")}
          </p>

          {/* CTAs */}
          <div className="space-y-3">
            <Button
              variant="hero"
              size="lg"
              className="w-full rounded-full"
              onClick={handleYes}
              data-track="popup_yes"
            >
              {t("popup.cta.yes")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={handleDismiss}
              data-track="popup_no"
            >
              {t("popup.cta.no")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
