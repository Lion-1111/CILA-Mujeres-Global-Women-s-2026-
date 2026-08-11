"use client";

import Image from "next/image";
import { ImageGallery } from "@/components/ui/carousel-circular-image-gallery";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface Member {
  id: number;
  name: string;
  country: string;
  role: string;
  img: string;
}

// ─── Datos del directorio ─────────────────────────────────────────────────────
const directoryData: Member[] = [
  { id: 1, name: "Miriam Constantino", country: "México", role: "Coordinadora", img: "/images/1.jpg" },
  { id: 2, name: "Ofelia M. Ulloa", country: "Costa Rica", role: "Asesora Cila Mujeres", img: "/images/2.jpg" },
  { id: 3, name: "Ruth Blanco", country: "España", role: "Asesora Cila Mujeres", img: "/images/3.jpg" },
  { id: 4, name: "Martha Menéndez", country: "Costa Rica", role: "Pro - Secretaria / Vocal", img: "/images/4.jpg" },
  { id: 5, name: "Ingrid Suárez", country: "Venezuela", role: "Vocal", img: "/images/5.jpg" },
  { id: 6, name: "Marta Faustino", country: "Brasil", role: "Vocal", img: "/images/6.jpg" },
  { id: 7, name: "Claudia Castillo", country: "República Dominicana", role: "Vocal", img: "/images/7.jpg" },
  { id: 8, name: "Zorayda Galardo", country: "Nicaragua", role: "Vocal", img: "/images/8.jpg" },
  { id: 9, name: "Rubí Sánchez", country: "Perú", role: "Vocal", img: "/images/9.jpg" },
  { id: 10, name: "Viviana Olmos", country: "Bolivia", role: "Vocal", img: "/images/10.jpg" },
  { id: 11, name: "Emma Vega", country: "Ecuador", role: "Vocal", img: "/images/11.jpg" },
  { id: 12, name: "Nery Carrión", country: "Panamá", role: "Vocal", img: "/images/12.jpg" },
  { id: 13, name: "Sandra Navas", country: "El Salvador", role: "Vocal", img: "/images/13.jpg" },
  { id: 14, name: "Cinthia Castañeda", country: "México", role: "Vocal", img: "/images/14.jpg" },
  { id: 15, name: "Luciana Porras Luján", country: "Argentina", role: "Vocal", img: "/images/15.jpg" },
];

const REPRESENTATIVES = directoryData.map((member) => ({
  title: member.name,
  url: member.img,
}));

// ─── Componente de tarjeta reutilizable ──────────────────────────────────────
function MemberCard({ member, priority = false }: { member: Member; priority?: boolean }) {
  return (
    <div className="flex flex-col items-center w-[45%] md:w-[22%] text-center">
      <div className="relative w-full aspect-[4/4.8] rounded-[1.5rem] border-[1.5px] border-yellow-600/70 shadow-lg overflow-hidden mb-4 bg-muted">
        <Image
          src={member.img}
          fill
          alt={member.name}
          sizes="(max-width: 768px) 45vw, 22vw"
          className="object-cover object-top hover:scale-105 transition-transform duration-500"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <h3 className="font-bold text-foreground text-sm md:text-base leading-tight mb-1">{member.name}</h3>
      <p className="text-[10px] md:text-xs font-medium text-muted-foreground">{member.country}</p>
      <p className="text-[10px] md:text-xs italic text-muted-foreground mt-0.5">{member.role}</p>
    </div>
  );
}

// ─── Sección principal ────────────────────────────────────────────────────────
export function RepresentativesStackSection() {
  const [coordinator, ...rest] = directoryData;

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-16">

          {/* Encabezado */}
          <div className="space-y-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
              Directorio CILA Mujeres 2026
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Conoce a las extraordinarias mujeres profesionales de toda Latinoamérica que integran nuestro directorio oficial, uniendo fuerzas para transformar el liderazgo en el sector inmobiliario global.
            </p>
          </div>

          {/* Coordinadora – destacada arriba */}
          <div className="flex justify-center w-full max-w-4xl mx-auto">
            <MemberCard member={coordinator} priority />
          </div>

          {/* Grid de vocales */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 w-full max-w-4xl mx-auto">
            {rest.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Carrusel animado */}
          <div className="w-full flex justify-center items-center mt-24">
            <ImageGallery images={REPRESENTATIVES} />
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Sección Exclusiva del Grid (Sin Carrusel) ──────────────────────────────
export function RepresentativesGridOnly() {
  const [coordinator, ...rest] = directoryData;

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-16">
          <div className="space-y-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
              Directorio CILA Mujeres 2026
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Conoce a las extraordinarias mujeres profesionales de toda Latinoamérica que integran nuestro directorio oficial, uniendo fuerzas para transformar el liderazgo en el sector inmobiliario global.
            </p>
          </div>
          <div className="flex justify-center w-full max-w-4xl mx-auto">
            <MemberCard member={coordinator} priority />
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-10 w-full max-w-4xl mx-auto">
            {rest.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sección Exclusiva del Carrusel Animado ─────────────────────────────────
export function RepresentativesCarouselOnly() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-bold leading-tight">
            Directorio CILA Mujeres 2026
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Conoce a las extraordinarias mujeres profesionales de toda Latinoamérica que integran nuestro directorio oficial, uniendo fuerzas para transformar el liderazgo en el sector inmobiliario global.
          </p>
        </div>
        <div className="w-full flex justify-center items-center">
          <ImageGallery images={REPRESENTATIVES} />
        </div>
      </div>
    </section>
  );
}
