"use client";

import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const images = [
  "/images/fto1.jpeg",
  "/images/fto2.jpeg",
  "/images/fto3.jpeg",
  "/images/fto4.jpeg",
  "/images/fto5.jpeg",
  "/images/fto6.jpeg",
  "/images/fto7.jpeg",
  "/images/fto8.jpeg",
  "/images/fto9.jpeg",
  "/images/fto10.jpeg",
  "/images/fto11.jpeg",
];

export function GallerySection() {
  return (
    <section
      id="galeria"
      className="relative h-[250vh]"
      style={{
        background: "linear-gradient(180deg, #0d0d0d 0%, #111 100%)",
      }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
        
        {/* Header - posicionado absoluto para que flote sobre la galería */}
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

        {/* Contenedor de la galería */}
        <div className="w-full relative h-[450px] md:h-[600px] mt-16 md:mt-24">
          <InfiniteGallery 
            images={images}
            speed={1.5}
            visibleCount={11}
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
