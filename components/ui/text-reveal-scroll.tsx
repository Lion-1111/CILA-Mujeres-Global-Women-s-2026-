"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextRevealScrollProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

export const TextRevealScroll = ({
  text,
  className,
  containerClassName,
}: TextRevealScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedWordCount, setRevealedWordCount] = useState(0);

  const words = text.split(" ");
  const totalWords = words.length;

  useEffect(() => {
    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;

    const smoothScroll = () => {
      const difference = targetProgress - currentProgress;
      currentProgress += difference * 0.12;

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        const wordsToReveal = Math.floor(currentProgress * totalWords);
        setRevealedWordCount(wordsToReveal);
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        setRevealedWordCount(Math.floor(targetProgress * totalWords));
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger area (adjust based on where you want it to start/end)
      const eyeLevel = windowHeight * 0.6;

      const animationStart = rect.top + window.scrollY - eyeLevel;
      const animationEnd = rect.top + window.scrollY + rect.height - eyeLevel;
      const scrollDistance = animationEnd - animationStart;
      const currentScroll = window.scrollY;

      let progress = (currentScroll - animationStart) / scrollDistance;
      targetProgress = Math.max(0, Math.min(1, progress));

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [totalWords]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full relative", containerClassName)}
      style={{ minHeight: "150vh" }} // Provides scrollable space to animate
    >
      <div className="sticky top-1/3 w-full">
        <p
          className={cn(
            "leading-tight font-serif tracking-tight",
            className
          )}
        >
          {words.map((word, i) => {
            const isRevealed = i < revealedWordCount;
            return (
              <span
                key={i}
                className={
                  isRevealed
                    ? "text-foreground"
                    : "text-muted-foreground opacity-40"
                }
                style={{
                  transition: "all 0.3s ease-out",
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
