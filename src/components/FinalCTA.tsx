import { StripeCheckoutButton } from "./StripeCheckoutButton";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

export const FinalCTA = () => {
  const scrollToDemo = () => {
    const el = document.getElementById("demo");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto rounded-[2rem] overflow-hidden p-10 md:p-16 text-center shadow-elevated border border-primary/15 bg-mesh">
          <div aria-hidden className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary/15 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-highlight/20 text-foreground text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight" />
              Start in minutes · No app required
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Ready to make waiting feel <span className="text-gradient">modern?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Give customers a better experience while keeping them connected — long after they leave.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <StripeCheckoutButton variant="hero" size="lg" className="text-lg px-8 py-6 shadow-glow" />
              <Button variant="outline" size="lg" onClick={scrollToDemo} className="text-lg px-8 py-6 border-2 rounded-full">
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
