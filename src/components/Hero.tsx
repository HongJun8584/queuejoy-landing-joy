import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-queue-telegram.png";
import Toast from "./Toast";
import { VideoModal } from "./VideoModal";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const Hero = () => {
  const [showToast, setShowToast] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleDemoClick = () => {
    window.open('https://queuejoy.netlify.app/', '_blank', 'noopener,noreferrer');
    setShowToast(true);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {showToast && (
        <Toast
          message="Demo opened in a new tab — try the live app!"
          onClose={() => setShowToast(false)}
        />
      )}
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-slide-up">
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-up">
              Queue Joy <span className="text-gradient">—</span> Smart queue, zero headaches
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              QueueJoy transforms traditional slow queues into a modern, fast, and easy system—no expensive hardware or complicated setup needed. Staff can focus on service, not crowd control.
            </p>
            
            <p className="text-lg text-muted-foreground/80 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              Turn your queue into a smart way to reach customers and keep them coming back — <span className="font-semibold text-foreground">only RM10/month, no setup, no hassle.</span>
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <Button 
                variant="hero"
                size="lg"
                onClick={() => setShowVideo(true)}
                className="hover:scale-105 transition-transform group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
              <StripeCheckoutButton 
                variant="outline" 
                size="lg"
                className="hover:scale-105 transition-transform"
              >
                Buy Now — RM10/month
              </StripeCheckoutButton>
            </div>
          </div>
          
          {/* Right mockup */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div 
              className="relative cursor-pointer animate-float hover:scale-105 transition-transform duration-300"
              onClick={handleDemoClick}
            >
              <img 
                src={heroImage} 
                alt="Queue management system with Telegram notifications" 
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl rounded-2xl"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
      
      <VideoModal 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)} 
        videoSrc="/demo/queuejoy-demo.mp4"
      />
    </section>
  );
};

export default Hero;
