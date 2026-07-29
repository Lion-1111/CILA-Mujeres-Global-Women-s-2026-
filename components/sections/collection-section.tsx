"use client";

import { FadeImage } from "@/components/fade-image";

const program = [
  {
    id: 1,
    day: "Día 1",
    name: "Apertura & Bienvenida",
    description:
      "Ceremonia inaugural, presentación de representantes y cóctel de bienvenida para conectar con mujeres de toda la región.",
    image: "/images/art-01.png",
  },
  {
    id: 2,
    day: "Día 2",
    name: "Conferencias & Networking",
    description:
      "Paneles de liderazgo, casos de éxito inmobiliario y espacios de networking para crear alianzas latinoamericanas.",
    image: "/images/art-09.png",
  },
  {
    id: 3,
    day: "Día 3",
    name: "Arte & Celebración",
    description:
      "Exposición artística, reconocimientos y gala de cierre celebrando el talento y la fuerza de las mujeres CILA.",
    image: "/images/art-10.png",
  },
];

export function CollectionSection() {
  return (
    <section id="programa" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Programa
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl">
          Tres días de encuentro
        </h2>
      </div>

      {/* Program Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {program.map((item) => (
            <div key={item.id} className="group flex-shrink-0 w-[75vw] snap-center">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>
              <div className="py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.day}
                </span>
                <h3 className="mt-2 text-lg font-medium leading-snug text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {program.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>
              <div className="py-6">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {item.day}
                </span>
                <h3 className="mt-2 text-xl font-medium leading-snug text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
