"use client";

import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";

const REPRESENTATIVES = Array.from({ length: 16 }, (_, i) => ({
  title: `Representante ${i + 1}`,
  url: `/images/${i + 1}.jpg`,
}));

export function RepresentativesStackSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-12">
          
          <div className="space-y-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
              Directorio CILA Mujeres 2026
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Conoce a las extraordinarias mujeres profesionales de toda Latinoamérica que integran nuestro directorio oficial, uniendo fuerzas para transformar el liderazgo en el sector inmobiliario global.
            </p>
          </div>

          <div className="w-full h-full flex justify-center items-center">
            <ImageGallery images={REPRESENTATIVES} />
          </div>

        </div>
      </div>
    </section>
  );
}
