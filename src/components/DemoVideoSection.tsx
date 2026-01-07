import { useState, useRef } from "react";
import { Play, ExternalLink } from "lucide-react";
import { VideoModal } from "./VideoModal";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const DemoVideoSection = () => {
  const { t } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoHover = (entering: boolean) => {
    if (videoRef.current) {
      if (entering) {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.muted = true;
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <section id="demo" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{t("demo.videoTitle") || "Watch How QueueJoy Works"}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("demo.videoSubtitle") || "See the magic in action — 2 minutes that'll change how you think about queues"}
            </p>
          </div>

          {/* Video Thumbnail */}
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30 cursor-pointer group transition-all duration-500 hover:shadow-glow hover:scale-[1.02] hover:border-primary/50"
              onClick={() => setShowVideo(true)}
              onMouseEnter={() => handleVideoHover(true)}
              onMouseLeave={() => handleVideoHover(false)}
            >
              <video 
                ref={videoRef}
                src="/demo/hero-demo.mp4"
                muted
                loop
                playsInline
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Play Button Overlay - hide when playing */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-24 h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-12 h-12 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Hover Text */}
              <div className={`absolute bottom-8 left-0 right-0 text-center transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                <p className="text-white text-lg font-bold drop-shadow-lg">
                  {t("demo.clickToWatch") || "Click to watch demo"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={showVideo} 
        onClose={() => setShowVideo(false)} 
        videoSrc="/demo/hero-demo.mp4"
      />
    </>
  );
};
