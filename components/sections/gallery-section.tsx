"use client";

import { useRef, useEffect } from "react";
import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const images = [
  "/images/IMG_2035.JPG.jpeg",
  "/images/IMG_1992.JPG.jpeg",
  "/images/IMG_1993.JPG.jpeg",
  "/images/IMG_1994.JPG.jpeg",
  "/images/IMG_1995.JPG.jpeg",
  "/images/IMG_2133.JPG.jpeg",
  "/images/IMG_2135.JPG.jpeg",
  "/images/foos paragaleria.jpeg",
  "/images/fotos para galeria.jpeg",
];

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  // progressRef goes 0→1 as user scrolls through the 5 "sticky" screens
  const progressRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      // scrollable distance = total section height minus one viewport
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, -section.getBoundingClientRect().top);
      progressRef.current = Math.min(1, scrolled / scrollable);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /*
      h-[600vh] = 6 screens tall.
      sticky container = 1 screen.
      → 5 screens of "locked" scroll to pass all photos.
      After that the user exits the sticky zone and continues.
    */
    <section
      ref={sectionRef}
      id="galeria"
      className="relative h-[600vh]"
      style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111 100%)" }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10">

        {/* Header */}
        <div className="text-center absolute top-16 left-0 right-0 z-10 pointer-events-none px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Galería
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-6xl text-white">
            Momentos CILA Mujeres
          </h2>
          <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
            Recuerdos de nuestros encuentros internacionales
          </p>
        </div>

        {/* Galería 3D — controlada por progreso de scroll */}
        <div className="w-full relative h-[55vh] md:h-[600px] mt-36 md:mt-24">
          <InfiniteGallery
            images={images}
            visibleCount={9}
            progressRef={progressRef}
            className="w-full h-full"
          />
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce pointer-events-none">
          <span className="text-xs uppercase tracking-widest text-white">Sigue bajando</span>
          <div className="w-[1px] h-8 bg-white" />
        </div>

      </div>
    </section>
  );
}
