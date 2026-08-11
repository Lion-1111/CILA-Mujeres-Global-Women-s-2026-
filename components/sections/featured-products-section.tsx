"use client";

import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";

const slides: CoverflowSlide[] = [
  { src: "/images/1.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/2.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/3.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/4.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/5.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/6.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/7.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/8.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/9.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/10.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/11.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/12.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/13.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/14.jpeg", alt: "Representante CILA Mujeres" },
  { src: "/images/victoria irun.jpeg", alt: "Victoria Irun - Representante CILA Mujeres" },
];

export function FeaturedProductsSection() {
  return (
    <section id="representantes" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        {/* Encabezado */}
        <div className="mx-auto mb-10 max-w-7xl text-center md:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Representantes
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Mujeres que lideran
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
            Las representantes de CILA Mujeres que darán vida a Global Women&apos;s 2026.
          </p>
        </div>

        {/* Coverflow Carousel */}
        <div className="mx-auto w-full max-w-7xl">
          <CoverflowCarousel
            slides={slides}
            cardWidth="clamp(200px, 28vw, 380px)"
            rotate={48}
            depth={0.5}
            perspective={2.8}
            fade={0.08}
            showNavigation
            showPagination
            loop={true}
            label="Representantes CILA Mujeres 2026"
            cardClassName="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
