"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

const specs = [
  { label: "Fecha", value: "27 AGO" },
  { label: "Mesas", value: "18" },
  { label: "Horario", value: "12–14h" },
  { label: "Edición", value: "2026" },
];

export function EditorialSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!videoRef.current) return;

    const rect = videoRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate when video enters and exits viewport
    const videoTop = rect.top;
    const videoBottom = rect.bottom;

    // Progress from 0 (entering viewport) to 1 (exiting viewport)
    if (videoBottom > 0 && videoTop < windowHeight) {
      const progress = 1 - (videoTop + rect.height / 2) / (windowHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateParallax]);

  // Parallax effect: video moves up as you scroll down
  const parallaxY = (scrollProgress - 0.5) * 30; // -15px to +15px range

  return (
    <section className="bg-background">
      {/* Newsletter Banner */}


      {/* Decorative Icons */}
      <div className="flex items-center justify-center gap-6 pb-20">


      </div>

      {/* Full-width Image with Parallax */}
      <div ref={videoRef} className="relative aspect-[16/9] w-full md:aspect-[21/9] overflow-hidden">
        <Image
          src="/images/circuito-negocios.jpg"
          alt="Circuito de Negocios - CILA Mujeres"
          fill
          className="object-cover"
          style={{
            transform: `scale(1.15) translate3d(0, ${parallaxY}px, 0) translateZ(0)`,
          }}
          priority
        />
        {/* Subtle dark overlay so it's not too bright compared to the rest of the dark sections */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-b border-border md:grid-cols-4">
        {specs.map((spec, index) => (
          <div
            key={spec.label}
            className={`p-6 sm:p-8 text-center border-border ${
              index < 2 ? "border-b md:border-b-0" : ""
            } ${
              index % 2 === 0 ? "border-r md:border-r-0" : ""
            } ${
              index !== 3 ? "md:border-r" : ""
            }`}
          >
            <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground whitespace-nowrap">
              {spec.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
