import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { StripeCheckoutButton } from "./StripeCheckoutButton";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export const VideoModal = ({ isOpen, onClose, videoSrc }: VideoModalProps) => {
  const [showCta, setShowCta] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    const handleEnded = () => {
      setShowCta(true);
      setIsPlaying(false);
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [videoElement]);

  const handleMaybeLater = () => {
    setShowCta(false);
    if (videoElement) {
      videoElement.play();
    }
  };

  const handleBuyNow = () => {
    window.open('https://queuejoy.netlify.app/', '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setShowCta(false);
    setIsPlaying(false);
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-5xl p-0 bg-black">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl text-white">QueueJoy Demo</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <video
            ref={setVideoElement}
            className="w-full rounded-b-lg"
            controls
            playsInline
            preload="metadata"
            poster="/demo/queuejoy-poster.jpg"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fixed CTA bar during playback */}
          {isPlaying && !showCta && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
              <div className="bg-background/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border-2 border-primary/30 max-w-xs">
                <p className="text-sm font-semibold mb-3 text-center">
                  Ideas matter. Action matters more.
                </p>
                <StripeCheckoutButton size="default" className="w-full" />
              </div>
            </div>
          )}

          {/* Mobile: Bottom CTA bar during playback */}
          {isPlaying && !showCta && (
            <div className="absolute bottom-16 left-0 right-0 lg:hidden">
              <div className="bg-background/95 backdrop-blur-sm p-4 mx-4 rounded-xl shadow-2xl border-2 border-primary/30">
                <p className="text-xs font-semibold mb-2 text-center">
                  Ideas matter. Action matters more.
                </p>
                <StripeCheckoutButton size="sm" className="w-full" />
              </div>
            </div>
          )}

          {/* End CTA Overlay */}
          {showCta && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-b-lg">
              <div className="bg-background p-8 rounded-xl max-w-md mx-4 text-center shadow-glow">
                <h4 className="text-2xl font-bold mb-2">Set up in 10 minutes. Cancel anytime.</h4>
                <p className="text-muted-foreground mb-6">Join 100+ businesses cutting wait time today.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <StripeCheckoutButton className="flex-1">
                    Buy Now — RM10/month
                  </StripeCheckoutButton>
                  <Button variant="outline" size="lg" onClick={handleMaybeLater} className="flex-1">
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const VideoButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button 
      variant="hero" 
      size="lg"
      onClick={onClick}
      className="group hover-glow"
    >
      <Play className="mr-2" />
      Watch Demo Video
    </Button>
  );
};
