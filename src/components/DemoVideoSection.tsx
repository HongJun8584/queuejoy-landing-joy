import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { VideoModal } from "./VideoModal";
import { Button } from "./ui/button";
import video2 from "@/assets/queuejoy-demo-video-2.mp4.asset.json";
import video1 from "@/assets/queuejoy-demo-video-1.mp4.asset.json";

export const DemoVideoSection = () => {
  const [showFullDemo, setShowFullDemo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleHover = (entering: boolean) => {
    if (!videoRef.current) return;
    if (entering) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.muted = true;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <>
      <section id="demo" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Watch a customer go from joining to getting served
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              See <span className="text-gradient">QueueJoy in action</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See how QueueJoy makes waiting easier and keeps customers coming back.
            </p>
          </div>

          <div className="max-w-4xl mx-auto scroll-reveal">
            <div
              className="relative rounded-3xl overflow-hidden shadow-elevated border border-primary/15 cursor-pointer group transition-all duration-500 hover:shadow-glow"
              onClick={() => setShowFullDemo(true)}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <video
                ref={videoRef}
                src={video2.url}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className={`absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/15 transition-all duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                <div className="w-20 h-20 rounded-full bg-primary/95 backdrop-blur-sm flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-primary-foreground fill-current ml-1" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm text-muted-foreground">Want the deeper walkthrough?</p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFullDemo(true)}
                className="rounded-full border-2"
              >
                <Play className="mr-2 h-4 w-4" />
                Learn more — watch the full demo
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
