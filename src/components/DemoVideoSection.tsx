import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";
import { Button } from "./ui/button";
import video2 from "@/assets/queuejoy-demo-video-2.mp4.asset.json";
import video1 from "@/assets/queuejoy-demo-video-1.mp4.asset.json";
import poster from "@/assets/demo-video-poster.jpg";

export const DemoVideoSection = () => {
  const [showFullDemo, setShowFullDemo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const playInline = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      setIsPlaying(true);
    } catch {
      // Autoplay-with-sound rejected — retry muted (always allowed)
      try {
        v.muted = true;
        await v.play();
        setIsPlaying(true);
      } catch {
        /* user will need to use modal */
      }
    }
  };

  const pauseInline = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <>
      <section id="demo" className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Video 2 · The post-purchase experience
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              See <span className="text-gradient">QueueJoy in action</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              See how QueueJoy makes waiting easier and keeps customers coming back.
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-reveal">
            <div
              className="relative rounded-3xl overflow-hidden shadow-elevated border border-primary/15 group transition-all duration-500 hover:shadow-glow bg-black"
              onMouseEnter={() => !isMobile && playInline()}
              onMouseLeave={() => !isMobile && pauseInline()}
            >
              <video
                ref={videoRef}
                src={video2.url}
                poster={poster}
                muted
                loop
                playsInline
                preload="metadata"
                controls={isPlaying && isMobile}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {!isPlaying && (
                <button
                  type="button"
                  aria-label="Play QueueJoy showcase video"
                  onClick={playInline}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/95 backdrop-blur-sm flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
                  </div>
                </button>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">Want the full walkthrough?</p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFullDemo(true)}
                className="rounded-full border-2"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch full demo — Video 1
              </Button>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={showFullDemo}
        onClose={() => setShowFullDemo(false)}
        videoSrc={video1.url}
      />
    </>
  );
};
