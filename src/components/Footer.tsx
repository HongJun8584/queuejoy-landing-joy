import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="py-12 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">QueueJoy</h3>
            <p className="text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/HongJun8584/queue-joy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/HongJun8584/queue-joy#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.documentation")}
                </a>
              </li>
              <li>
                <a 
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/legal" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link 
                  to="/legal" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} QueueJoy. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
