import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollHighlightProps {
  children: ReactNode;
  variant?: "background" | "underline" | "half";
  className?: string;
}

/**
 * Scroll-activated highlight. Animates from 0% to 100% background-size
 * when the element enters the viewport, so important phrases "light up"
 * as the visitor scrolls.
 */
export const ScrollHighlight = ({
  children,
  variant = "half",
  className,
}: ScrollHighlightProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      data-highlight={variant}
      className={cn("scroll-highlight", active && "is-active", className)}
    >
      {children}
    </span>
  );
};
