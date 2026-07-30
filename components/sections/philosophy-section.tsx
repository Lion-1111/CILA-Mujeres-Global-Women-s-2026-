"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { TextRevealScroll } from "@/components/ui/text-reveal-scroll";

const titles = [
  "Somos CILA Mujeres.",
  "Somos red y liderazgo.",
  "Somos Latinoamérica.",
];

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Title rotates through 3 texts based on scroll progress
    setTitleOpacity(progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="nosotras" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-7xl px-4">
            {/* Title - centered with 3D rotation */}
            <div 
              className="flex items-center justify-center pointer-events-none"
              style={{ 
                perspective: '1000px',
              }}
            >
              <div className="relative w-full" style={{ transformStyle: 'preserve-3d', minHeight: '150px' }}>
                {titles.map((title, index) => {
                  // Last text "Built to last" stays visible at the end
                  const isLastText = index === titles.length - 1;
                  
                  // Calculate which text should be visible based on scroll progress
                  const segmentSize = 1 / titles.length;
                  const startProgress = index * segmentSize;
                  const endProgress = (index + 1) * segmentSize;
                  
                  let rotateX = 0;
                  let opacity = 0;
                  
                  if (titleOpacity >= startProgress && titleOpacity < endProgress) {
                    // Active text - rotating in
                    const localProgress = (titleOpacity - startProgress) / segmentSize;
                    rotateX = (1 - localProgress) * 90;
                    opacity = localProgress;
                  } else if (titleOpacity >= endProgress) {
                    // Text that has passed - last text stays visible
                    if (isLastText) {
                      rotateX = 0;
                      opacity = 1;
                    } else {
                      rotateX = -90;
                      opacity = 0;
                    }
                  } else {
                    // Text that hasn't appeared yet
                    rotateX = 90;
                    opacity = 0;
                  }
                  
                  return (
                    <h2 
                      key={index}
                      className="absolute inset-0 flex items-center justify-center text-[8vw] sm:text-[7vw] font-medium leading-tight tracking-tighter text-blue-600 md:text-[6vw] lg:text-[5vw] text-center px-4"
                      style={{
                        transform: `rotateX(${rotateX}deg) translateZ(0)`,
                        opacity,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        willChange: 'transform, opacity',
                        WebkitFontSmoothing: 'antialiased',
                      }}
                    >
                      {title}
                    </h2>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description using new Text Reveal Animation */}
      <div className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-36">
        <div className="text-center mx-auto max-w-5xl">
          <TextRevealScroll 
            text="CILA Mujeres es la comunidad de mujeres líderes de la Confederación Inmobiliaria Latinoamericana. Impulsamos el liderazgo femenino, la formación y las alianzas entre profesionales inmobiliarias de toda la región."
            className="text-3xl md:text-5xl lg:text-[3.5rem] text-center"
          />
        </div>

        {/* Bienvenida */}
        <div className="mx-auto mt-24 max-w-3xl border-t border-border pt-16">
          <p className="font-serif text-xl leading-relaxed text-foreground md:text-2xl text-center">
            &ldquo;Orgullosamente representamos a CILA Mujeres y te invitamos a formar parte de un espacio donde la trayectoria, la unión y la cooperación se convierten en oportunidades que se expanden más allá de nuestras fronteras, comprometidas con un liderazgo ético, innovador, sostenible y humano.&rdquo;
          </p>
        </div>

        {/* Países y Nos distingue */}
        <div className="mx-auto mt-24 max-w-5xl grid grid-cols-1 gap-16 md:grid-cols-2 border-t border-border pt-16">
          
          {/* Representación */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Representación
            </span>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground md:text-3xl">
              Presencia internacional
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Con representación en España, Costa Rica, Brasil, México, Uruguay, Paraguay, Colombia, República Dominicana, Bolivia, Venezuela, Ecuador, Panamá, El Salvador y Argentina — compartiendo una visión común y un firme compromiso con el fortalecimiento del sector en el ámbito global.
            </p>
          </div>

          {/* Nos distingue */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Nos distingue
            </span>
            <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground md:text-3xl">
              Lo que nos define
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                "Responsabilidad y alto estándar profesional.",
                "Vinculación entre naciones con lazos sólidos de confianza.",
                "Modernización del ecosistema inmobiliario con visión estratégica.",
                "Desarrollo sostenible y consciente.",
                "Un entorno donde la mujer inspira, respalda y fortalece a otras mujeres.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
