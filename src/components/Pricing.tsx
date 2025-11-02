import { Check } from "lucide-react";
import { VideoButton } from "./VideoModal";
import { useState } from "react";
import { VideoModal } from "./VideoModal";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

const features = [
  "Telegram alerts",
  "Multi-counter support",
  "Ads panel",
  "Memory game",
  "Real-time sync",
  "Audio notifications",
  "Regular updates"
];

const Pricing = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="text-gradient">transparent pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need, nothing you don't
          </p>
        </div>
        
        {/* Pricing card */}
        <div className="max-w-lg mx-auto">
          <div className="relative p-8 lg:p-12 rounded-2xl bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-primary/30 scroll-reveal hover-lift">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full gradient-accent text-white text-sm font-bold shadow-glow">
              Most Popular
            </div>
            
            {/* Price */}
            <div className="text-center mb-8">
              <div className="text-7xl font-black mb-2">
                <span className="text-gradient">RM10</span>
              </div>
              <div className="text-muted-foreground text-lg font-medium">per month</div>
            </div>
            
            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA */}
            <div className="w-full space-y-3">
              <StripeCheckoutButton className="w-full" />
              <VideoButton onClick={() => setShowVideo(true)} />
            </div>
            
            {/* Legal note */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              No credit card needed for demo. Cancel anytime.
            </p>
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

export default Pricing;
