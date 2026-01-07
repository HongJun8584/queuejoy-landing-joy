import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface IslandNavProps {
  onSectionClick: (section: string) => void;
}

export const IslandNav = ({ onSectionClick }: IslandNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languages = [
    { code: "en", name: "EN" },
    { code: "ms", name: "MS" },
    { code: "zh", name: "中文" }
  ];

  const navItems = [
    { id: "hero", label: t("nav.home") },
    { id: "functions", label: t("nav.functions") },
    { id: "demo", label: t("nav.demo") },
    { id: "pricing", label: t("nav.pricing") },
    { id: "contact", label: t("nav.contact") },
    { id: "pricing", label: t("hero.cta.buy") || "Buy Now", isCta: true }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div 
        className={`
          relative rounded-full px-4 py-2 transition-all duration-300
          ${scrolled 
            ? "bg-background/95 backdrop-blur-xl shadow-lg border border-border/50" 
            : "bg-background/80 backdrop-blur-md border border-border/30"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onSectionClick("hero")}
            className="text-xl font-black text-primary hover:scale-105 transition-transform px-2"
          >
            QueueJoy
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className="px-3 py-1.5 text-sm font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-all"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Selector - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-full px-3">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">{languages.find(l => l.code === language)?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ms" | "zh")}
                    className="rounded-lg"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile - Language + Menu */}
          <div className="md:hidden flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ms" | "zh")}
                    className="rounded-lg"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-lg animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 px-4 rounded-xl hover:bg-muted transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
