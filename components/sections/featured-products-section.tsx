"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const representatives = [
  {
    quote: "Nos enorgullece ser parte de este evento y conectar con líderes de toda la región para fortalecer nuestra comunidad y seguir creciendo juntas.",
    name: "Elena Rodríguez",
    designation: "Presidenta CILA 2026",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1376&auto=format&fit=crop",
  },
  {
    quote: "Este espacio es vital para el desarrollo sostenible, la innovación y la colaboración en el sector inmobiliario a nivel latinoamericano y mundial.",
    name: "Sofía Martínez",
    designation: "Directora de Alianzas Internacionales",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
  },
  {
    quote: "Invitamos a todas las mujeres profesionales a sumarse a esta iniciativa que transforma el liderazgo y el futuro en nuestra industria.",
    name: "Carolina Silva",
    designation: "Coordinadora General del Evento",
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop",
  },
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

        {/* Carrusel Circular de Testimonios/Representantes */}
        <div className="mx-auto w-full max-w-7xl">
          <CircularTestimonials
            testimonials={representatives}
            autoplay={true}
            colors={{
              name: "currentColor",
              designation: "#888888",
              testimony: "currentColor",
              arrowBackground: "#141414",
              arrowForeground: "#f1f1f7",
              arrowHoverBackground: "#bd1b5f", // Color acento
            }}
            fontSizes={{
              name: "24px",
              designation: "16px",
              quote: "18px",
            }}
          />
        </div>
      </div>
    </section>
  );
}
