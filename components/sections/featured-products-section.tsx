"use client";

import { FadeImage } from "@/components/fade-image";
import { User } from "lucide-react";

// Sección RESERVADA para las representantes de la ceremonia.
// Deja `image` en null para mostrar el marcador reservado.
// Cuando tengas las fotos, solo cambia `image` por la ruta (ej: "/images/representante-1.png")
// y `name` / `role` por los datos de cada participante. La animación se mantiene igual.
const representatives: {
  image: string | null;
  name?: string;
  role?: string;
  span: string;
}[] = [
  { image: null, span: "col-span-2 row-span-2" },
  { image: null, span: "col-span-1 row-span-1" },
  { image: null, span: "col-span-1 row-span-1" },
  { image: null, span: "col-span-1 row-span-2" },
  { image: null, span: "col-span-1 row-span-1" },
  { image: null, span: "col-span-2 row-span-1" },
  { image: null, span: "col-span-1 row-span-1" },
  { image: null, span: "col-span-1 row-span-2" },
  { image: null, span: "col-span-2 row-span-1" },
  { image: null, span: "col-span-1 row-span-1" },
];

export function FeaturedProductsSection() {
  return (
    <section id="representantes" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        {/* Encabezado */}
        <div className="mx-auto mb-10 max-w-7xl md:mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Ceremonia
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl">
            Representantes de la ceremonia
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Espacio reservado para presentar a las participantes y representantes de
            la organización. Muy pronto revelaremos a las mujeres que darán vida a
            Global Women&apos;s 2026.
          </p>
        </div>

        {/* Bento Grid - mantiene la animación de aparición */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[220px]">
          {representatives.map((rep, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg border border-border ${rep.span}`}
            >
              {rep.image ? (
                <FadeImage
                  src={rep.image}
                  alt={rep.name ? `Representante: ${rep.name}` : `Representante ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary text-center animate-fade-in">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/70 text-primary">
                    <User size={22} aria-hidden="true" />
                  </span>
                  <span className="px-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Por anunciar
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
