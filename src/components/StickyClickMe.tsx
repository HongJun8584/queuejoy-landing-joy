import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, X, Play, ExternalLink, ShoppingCart } from "lucide-react";

export const StickyClickMe = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      const offset = 80;
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      const offset = 80;
      const elementPosition = pricingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const quickActions = [
    { 
      icon: ShoppingCart, 
      label: t("sticky.buyNow"), 
      onClick: scrollToPricing,
      primary: true
    },
    { 
      icon: Play, 
      label: t("sticky.watchDemo"), 
      onClick: scrollToDemo,
      primary: false
    },
    { 
      icon: ExternalLink, 
      label: t("sticky.status"), 
      href: "https://queuejoy.netlify.app/status.html",
      external: true
    },
    { 
      icon: ExternalLink, 
      label: t("sticky.counter"), 
      href: "https://queuejoy.netlify.app/counter.html",
      external: true
    },
    { 
      icon: ExternalLink, 
      label: t("sticky.admin"), 
      href: "https://queuejoy.netlify.app/admin.html",
      external: true
    },
  ];

  const clickMeContent = `Hi! I'm Hong Jun, 14, and I built QueueJoy to help businesses like yours save time and keep customers happy. I can even promote your business on my Instagram to reach more people.

Benefits of QueueJoy:
• No more long lines – let customers join your queue digitally
• Keep your customers informed with real-time updates
• Boost customer satisfaction and loyalty
• Easily track visits and manage your queue
• Promote your business directly to my Instagram audience`;

  return (
    <>
      {/* Sticky Button - positioned to not overlap with AboutDialog */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Quick actions"
        className={`
          fixed bottom-24 right-6 z-40
          w-14 h-14 md:w-16 md:h-16
          rounded-full bg-primary text-primary-foreground
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 active:scale-95
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
        `}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-card rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{t("sticky.title")}</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message from Hong Jun */}
            <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground whitespace-pre-line">{clickMeContent}</p>
            </div>

            <div className="space-y-3">
              {quickActions.map((action, index) => (
                action.external ? (
                  <a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-muted transition-colors text-left"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </a>
                ) : (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className={`
                      flex items-center gap-3 w-full p-3 rounded-xl transition-colors text-left
                      ${action.primary 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "hover:bg-muted"
                      }
                    `}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.primary ? "bg-primary-foreground/20" : "bg-muted"}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
