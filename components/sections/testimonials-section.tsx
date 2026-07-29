"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="cita" className="bg-background">
      {/* Imagen con texto superpuesto */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/art-11.png"
          alt="Obra artística de mujer sobre arena negra junto al mar"
          fill
          className="object-cover"
        />
        {/* Degradado oscuro en la parte inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Texto superpuesto */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl font-serif text-2xl leading-snug text-white md:text-3xl lg:text-[2.75rem] lg:leading-tight text-center text-balance">
            Cuando las mujeres se encuentran, la industria se transforma. Global
            Women&apos;s 2026 es el espacio donde nace ese cambio.
          </p>
        </div>
      </div>
    </section>
  );
}
