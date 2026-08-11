"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "CILA";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1000&h=1400&fit=crop&q=80",
    alt: "Alianzas de negocios inmobiliarios",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&h=1400&fit=crop&q=80",
    alt: "Edificio corporativo",
    position: "left",
    span: 1,
  },
  {
    src: "/images/imoviliaria%201.jpg",
    alt: "Edificio corporativo moderno",
    position: "right",
    span: 1,
  },
  {
    src: "/images/imoviliariafinal.jpg",
    alt: "Fachada de cristal de edificio moderno",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));

  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Smooth interpolations - More balanced distribution
  const centerWidth = 100 - (imageProgress * 80); // 100% to 20% (same as each side image)
  const centerHeight = 100; // Always 100% height
  const sideWidth = imageProgress * 40; // 0% to 40% (20% per image, 2 images = 40%)
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = 0; // No border radius
  const gap = imageProgress * 8; // 0px to 8px

  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section id="hero" ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px` }}
          >

            {/* Left Column */}
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Text Behind - Fades out first */}
              <div
                className="absolute inset-0 z-0 flex items-center justify-center"
                style={{ opacity: textOpacity, transform: 'translateY(-200px)' }}
              >
                <h1 className="whitespace-nowrap text-[35vw] font-bold leading-[0.8] tracking-tighter text-black">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>

              <Image
                src="/images/central%20definitive.png"
                alt="Imagen central del evento"
                fill
                className="absolute inset-0 z-10 object-cover"
                priority
              />
            </div>

            {/* Right Column */}
            <div
              className="flex h-full flex-row will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-full overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Tagline Section - Fixed at bottom */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center px-6 pb-12 text-center md:px-12 md:pb-16 lg:px-20 lg:pb-20"
        style={{ opacity: textOpacity }}
      >
        <span className="mb-3 inline-block rounded-full bg-accent/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
          CILA Mujeres
        </span>
        <p className="mx-auto max-w-4xl font-serif text-4xl leading-[1.1] text-white md:text-6xl lg:text-[6rem] lg:leading-[1.1]">
          GLOBAL WOMEN&apos;S 2026
        </p>
        <p className="mt-6 text-xl md:text-2xl font-medium italic text-sky-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Connecting Latin America and the World
        </p>
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-white/60">
          Fortalecemos, inspiramos y transformamos el liderazgo femenino
        </p>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
    </section>
  );
}
