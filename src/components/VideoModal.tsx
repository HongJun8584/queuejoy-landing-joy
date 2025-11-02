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
  const [midpointShown, setMidpointShown] = useState(false);

  useEffect(() => {
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      if (videoElement.duration && !midpointShown && videoElement.currentTime >= videoElement.duration / 2) {
        setMidpointShown(true);
        setShowCta(true);
        videoElement.pause();
      }
    };

    const handleEnded = () => {
      setShowCta(true);
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [videoElement, midpointShown]);

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
    setMidpointShown(false);
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">QueueJoy Demo</DialogTitle>
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

          {/* CTA Overlay */}
          {showCta && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-b-lg">
              <div className="bg-background p-8 rounded-xl max-w-md mx-4 text-center">
                <h4 className="text-2xl font-bold mb-2">Would you like to purchase this system?</h4>
                <p className="text-muted-foreground mb-6">Simple. Local. RM10 / month.</p>
                <div className="flex gap-3 justify-center">
                  <StripeCheckoutButton>
                    Buy now
                  </StripeCheckoutButton>
                  <Button variant="outline" size="lg" onClick={handleMaybeLater}>
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
