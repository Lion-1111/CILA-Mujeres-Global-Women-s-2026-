"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Slower animation - more viewport range
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;

      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;

      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="text-3xl font-semibold leading-snug text-white md:text-4xl lg:text-5xl"
    >
      {words.map((word, index) => {
        // Calculate blur and opacity based on scroll progress
        const appearProgress = progress * (words.length + 1);
        const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - index));
        const wordOpacity = wordAppearProgress;
        const wordBlur = (1 - wordAppearProgress) * 40;

        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordOpacity,
              filter: `blur(${wordBlur}px)`,
              transition: 'opacity 0.1s linear, filter 0.1s linear',
              marginRight: '0.3em',
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}

// Side images removed based on user request

const textCycles = [
  "Inspiración.",
  "Comunidad.",
  "Liderazgo femenino.",
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);

  const descriptionText = "Global Women's 2026 es el encuentro que reunirá a representantes de Latinoamérica y el mundo, empresarios inmobiliarios, desarrolladores, inversionistas, fondos de inversión, empresas PropTech, instituciones financieras, cámaras empresariales e invitados especiales. Brasil, 27 de agosto de 2026.";

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 4; // Increased for 3 text cycles
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);

      // Text scroll progress
      if (textSectionRef.current) {
        const textRect = textSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const startOffset = windowHeight * 0.9;
        const endOffset = windowHeight * 0.1;

        const totalDistance = startOffset - endOffset;
        const currentPosition = startOffset - textRect.top;

        const newTextProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
        setTextProgress(newTextProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Title fades out first (0 to 0.2)
  const titleOpacity = Math.max(0, 1 - (scrollProgress / 0.2));

  // Image transforms start after title fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Smooth interpolations (Adjusted for no side images)
  const centerWidth = 100 - (imageProgress * 10); // 100% to 90% (slight cinematic shrink)
  const centerHeight = 100 - (imageProgress * 10); // 100% to 90%
  const gap = 0;

  // Calculate grayscale for text section based on textProgress
  const grayscaleAmount = Math.round((1 - textProgress) * 100);

  return (
    <section id="experiencia" ref={sectionRef} className="relative bg-foreground">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px` }}
          >

            {/* Center Image Container */}
            <div
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: "100%",
                flex: "0 0 auto",
              }}
            >
              {/* Layered Images - Progressive Fade In */}
              {/* Image 1 - Base (Inspiración) */}
              <Image
                src="/images/inspirazion%20femenina.jpg"
                alt="Inspiración - CILA Mujeres"
                fill
                className="object-cover"
                style={{
                  opacity: 1,
                }}
              />

              {/* Image 2 - Comunidad */}
              <Image
                src="/images/comunidad2.jpg"
                alt="Comunidad - CILA Mujeres"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.15)),
                  transition: 'opacity 0.3s ease',
                }}
              />

              {/* Image 3 - Liderazgo Femenino */}
              <Image
                src="/images/liderazgo%20femenino%202.jpg"
                alt="Liderazgo Femenino - CILA Mujeres"
                fill
                className="absolute inset-0 object-cover"
                style={{
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.6) / 0.15)),
                  transition: 'opacity 0.3s ease',
                }}
              />

              <div className="absolute inset-0 bg-foreground/40" />

              {/* Title Text - Cycles through 3 texts with blur effect */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                {textCycles.map((text, cycleIndex) => {
                  // Each text cycle takes 1/3 of the scroll progress
                  const cycleStart = cycleIndex / textCycles.length;
                  const cycleEnd = (cycleIndex + 1) / textCycles.length;
                  const cycleMid = (cycleStart + cycleEnd) / 2;

                  const words = text.split(" ");

                  return (
                    <h2
                      key={cycleIndex}
                      className="absolute max-w-3xl font-medium leading-tight tracking-tight text-blue-400 drop-shadow-md md:text-5xl lg:text-7xl text-5xl"
                    >
                      {words.map((word, wordIndex) => {
                        let wordOpacity = 0;
                        let wordBlur = 40;

                        if (scrollProgress >= cycleStart && scrollProgress < cycleEnd) {
                          const localProgress = (scrollProgress - cycleStart) / (cycleEnd - cycleStart);

                          // First half: appear (blur 40→0, opacity 0→1)
                          if (localProgress < 0.5) {
                            const appearProgress = (localProgress / 0.5) * (words.length + 1);
                            const wordAppearProgress = Math.max(0, Math.min(1, appearProgress - wordIndex));
                            wordOpacity = wordAppearProgress;
                            wordBlur = (1 - wordAppearProgress) * 40;
                          }
                          // Second half: disappear (blur 0→40, opacity 1→0)
                          else {
                            const disappearProgress = ((localProgress - 0.5) / 0.5) * (words.length + 1);
                            const wordDisappearProgress = Math.max(0, Math.min(1, disappearProgress - wordIndex));
                            wordOpacity = 1 - wordDisappearProgress;
                            wordBlur = wordDisappearProgress * 40;
                          }
                        }

                        return (
                          <span
                            key={wordIndex}
                            className="inline-block"
                            style={{
                              opacity: wordOpacity,
                              filter: `blur(${wordBlur}px)`,
                              transition: 'opacity 0.1s linear, filter 0.1s linear',
                              marginRight: '0.3em',
                            }}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </h2>
                  );
                })}
              </div>
            </div>

            {/* Right Column removed */}

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation - increased for 3 text cycles */}
      <div className="h-[400vh]" />

      {/* Description Section with Background Image and Scroll Reveal */}
      <div
        ref={textSectionRef}
        className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-black"
      >
        {/* Gradient Overlay - Top to transparent */}
        <div
          className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
          style={{
            height: '150px',
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
          }}
        />

        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
