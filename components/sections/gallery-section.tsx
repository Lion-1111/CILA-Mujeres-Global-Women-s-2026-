"use client";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";

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

const slides = images.map((img) => ({ src: img, alt: "Momento CILA Mujeres" }));

export function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative h-[100vh] md:h-[1000vh]"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #111 100%)",
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10">

        {/* Header */}
        <div className="text-center absolute top-20 left-0 right-0 z-10 pointer-events-none px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Galería
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white">
            Momentos CILA Mujeres
          </h2>
          <p className="mt-4 text-white/40 text-sm max-w-md mx-auto">
            Recuerdos de nuestros encuentros internacionales
          </p>
        </div>

        {/* Galería — versión móvil: CoverflowCarousel 3D */}
        <div className="block md:hidden w-full h-[450px] px-4 mt-32">
          <CoverflowCarousel
            slides={slides}
            cardClassName="rounded-2xl"
            cardWidth="clamp(200px, 70vw, 300px)"
            rotate={40}
            depth={0.5}
          />
        </div>

        {/* Galería — versión desktop: InfiniteGallery 3D */}
        <div className="hidden md:block w-full relative h-[600px] mt-24">
          <InfiniteGallery
            images={images}
            speed={0.25}
            visibleCount={9}
            className="w-full h-full"
          />
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
          <span className="text-xs uppercase tracking-widest text-white">Sigue bajando</span>
          <div className="w-[1px] h-8 bg-white" />
        </div>

      </div>
    </section>
  );
}
