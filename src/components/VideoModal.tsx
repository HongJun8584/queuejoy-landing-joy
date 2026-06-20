import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import poster from "@/assets/demo-video-poster.jpg";

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

    const handlePlay = () => {
      setIsPlaying(true);
      setShowCta(false);
    };
    
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
    window.open('https://queuejoy-live.netlify.app/index.html?slug=queuejoy-test-cafe-4/', '_blank', 'noopener,noreferrer');
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
      <DialogContent className="sm:max-w-5xl p-0 bg-gradient-to-br from-background via-background to-primary/5">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border/50">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Watch How QueueJoy Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative p-4">
          <video
            ref={setVideoElement}
            className="w-full rounded-lg shadow-2xl border-2 border-primary/20"
            controls
            playsInline
            preload="metadata"
            poster="/demo/queuejoy-poster.jpg"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
