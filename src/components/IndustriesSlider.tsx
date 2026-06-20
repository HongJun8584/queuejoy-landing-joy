import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ThumbsDown, ThumbsUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Import images
import healthcareImg from "@/assets/a_healthcare.avif";
import financeImg from "@/assets/b_finance.avif";
import fnbImg from "@/assets/c_fnb.avif";
import beautyImg from "@/assets/d_beauty.avif";

interface SectorData {
  id: string;
  titleKey: string;
  fit: string;
  image: string;
  alt: string;
  oldKeys: string[];
  joyKeys: string[];
  chips: string[];
  benefitKey: string;
  cta: string;
}

const sectors: SectorData[] = [
  {
    id: "healthcare",
    titleKey: "industries.healthcare.title",
    fit: "Great",
    image: healthcareImg,
    alt: "Calm clinic waiting area with seated patients",
    oldKeys: ["industries.healthcare.old1", "industries.healthcare.old2"],
    joyKeys: ["industries.healthcare.joy1", "industries.healthcare.joy2"],
    chips: ["Long waits", "Repeat visits", "Patient communication"],
    benefitKey: "industries.healthcare.benefit",
    cta: "/demo?utm_campaign=healthcare"
  },
  {
    id: "finance",
    titleKey: "industries.finance.title",
    fit: "Great",
    image: healthcareImg,
    alt: "Dental clinic with patient chair and bright interior",
    oldKeys: ["industries.finance.old1", "industries.finance.old2"],
    joyKeys: ["industries.finance.joy1", "industries.finance.joy2"],
    chips: ["Recall reminders", "Fewer no-shows", "Quiet waiting room"],
    benefitKey: "industries.finance.benefit",
    cta: "/demo?utm_campaign=dental"
  },
  {
    id: "fnb",
    titleKey: "industries.fnb.title",
    fit: "Great",
    image: fnbImg,
    alt: "Busy cafe counter with customers waiting at peak hour",
    oldKeys: ["industries.fnb.old1", "industries.fnb.old2"],
    joyKeys: ["industries.fnb.joy1", "industries.fnb.joy2"],
    chips: ["Peak hour rush", "Repeat visits", "Telegram promos"],
    benefitKey: "industries.fnb.benefit",
    cta: "/demo?utm_campaign=fnb"
  },
  {
    id: "beauty",
    titleKey: "industries.beauty.title",
    fit: "Great",
    image: beautyImg,
    alt: "Beauty salon waiting area with stylist chairs",
    oldKeys: ["industries.beauty.old1", "industries.beauty.old2"],
    joyKeys: ["industries.beauty.joy1", "industries.beauty.joy2"],
    chips: ["Walk-in + booking", "Repeat clients", "Direct rebooking"],
    benefitKey: "industries.beauty.benefit",
    cta: "/demo?utm_campaign=beauty"
  }
];

interface SectorCardProps {
  sector: SectorData;
  onExploreClick: (sector: SectorData) => void;
}

const SectorCard = ({ sector, onExploreClick }: SectorCardProps) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="bg-card rounded-2xl border border-border overflow-hidden hover-lift transition-all duration-300 h-full"
      role="region"
      aria-label={`${t(sector.titleKey)} sector card`}
      data-sector={sector.id}
    >
      <div className="flex flex-col md:flex-row h-full min-h-[320px]">
        {/* Image Area - 33% width on desktop */}
        <div className="relative w-full md:w-[33%] h-48 md:h-auto overflow-hidden bg-muted">
          {/* LQIP placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
          )}
          <img
            src={sector.image}
            alt={sector.alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          {/* Fit badge overlay */}
          <div className="absolute top-3 left-3 bg-secondary/95 text-secondary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {sector.fit} fit
          </div>
        </div>

        {/* Content Area - 67% width on desktop */}
        <div className="flex-1 p-5 flex flex-col">
          {/* Header */}
          <h3 className="text-lg font-bold mb-4">{t(sector.titleKey)}</h3>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {/* Old Way */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <ThumbsDown className="w-4 h-4" />
                <span className="font-semibold text-sm">{t("comparison.old")}</span>
              </div>
              <ul className="space-y-1">
                {sector.oldKeys.map((key, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                    <span className="text-destructive">•</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            {/* QueueJoy Way */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-semibold text-sm">{t("comparison.new")}</span>
              </div>
              <ul className="space-y-1">
                {sector.joyKeys.map((key, idx) => (
                  <li key={idx} className="text-xs text-foreground flex items-start gap-1">
                    <span className="text-accent">•</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer: Chips + CTA */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-2 mb-3">
              {sector.chips.map((chip, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onExploreClick(sector)}
              className="w-full sm:w-auto group"
              data-track="sector_demo_click"
              data-sector={sector.id}
            >
              {t("industries.exploreMore")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const IndustriesSlider = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorData | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? sectors.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === sectors.length - 1 ? 0 : prev + 1));
  }, []);

  const handleExploreClick = (sector: SectorData) => {
    setSelectedSector(sector);
    // Track event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sector_demo_click', { detail: { sectorId: sector.id } }));
    }
  };

  const handleTryDemo = () => {
    setSelectedSector(null);
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Track card view
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sector_card_view', { 
        detail: { sectorId: sectors[currentIndex].id } 
      }));
    }
  }, [currentIndex]);

  return (
    <>
      <section 
        className="py-24 bg-muted/30 scroll-reveal"
        role="region"
        aria-label="Industries — QueueJoy examples"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("comparison.title")} <span className="text-gradient">{t("comparison.subtitle")}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("comparison.description")}
            </p>
          </div>

          {/* Desktop: 2x2 Grid */}
          <div className="hidden md:grid grid-cols-2 gap-6 max-w-6xl mx-auto">
            {sectors.map((sector) => (
              <SectorCard 
                key={sector.id} 
                sector={sector} 
                onExploreClick={handleExploreClick}
              />
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur rounded-full shadow-lg border border-border hover:bg-background transition-colors"
              aria-label="Previous sector"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur rounded-full shadow-lg border border-border hover:bg-background transition-colors"
              aria-label="Next sector"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Card */}
            <div className="mx-10">
              <SectorCard 
                sector={sectors[currentIndex]} 
                onExploreClick={handleExploreClick}
              />
            </div>

            {/* Pagination Dots */}
            <div 
              className="flex justify-center gap-2 mt-6"
              role="tablist"
              aria-label="Sector navigation"
            >
              {sectors.map((sector, idx) => (
                <button
                  key={sector.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`View ${t(sector.titleKey)}`}
                  aria-controls={`sector-${sector.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explore More Dialog */}
      <Dialog open={!!selectedSector} onOpenChange={() => setSelectedSector(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedSector && t(selectedSector.titleKey)}
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              {selectedSector && t(selectedSector.benefitKey)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Benefits list */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">{t("industries.howQueueJoyHelps")}</h4>
              <ul className="space-y-2">
                {selectedSector?.joyKeys.map((key, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-accent mt-0.5">✓</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              {selectedSector?.chips.map((chip, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Button 
              variant="hero" 
              className="w-full rounded-full"
              onClick={handleTryDemo}
            >
              {t("demo.liveDemo")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
