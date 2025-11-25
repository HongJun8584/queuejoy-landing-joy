import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface TopNavProps {
  onSectionClick: (section: string) => void;
}

export const TopNav = ({ onSectionClick }: TopNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en", name: "English" },
    { code: "ms", name: "Bahasa Melayu" },
    { code: "zh", name: "中文" }
  ];

  const navItems = [
    { id: "hero", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "demo", label: t("nav.demo") },
    { id: "testimonials", label: t("nav.testimonials") },
    { id: "pricing", label: t("nav.pricing") },
    { id: "contact", label: t("nav.contact") }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onSectionClick("hero")}
            className="text-2xl font-black text-primary hover:scale-105 transition-transform"
          >
            QueueJoy
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  {languages.find(l => l.code === language)?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as "en" | "ms" | "zh")}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionClick(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-4 hover:bg-muted transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Globe className="w-4 h-4" />
                    {languages.find(l => l.code === language)?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as "en" | "ms" | "zh")}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
