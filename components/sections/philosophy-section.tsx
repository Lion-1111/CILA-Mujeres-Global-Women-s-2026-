"use client";

import { motion } from "framer-motion";
import { TextRevealScroll } from "@/components/ui/text-reveal-scroll";

export function PhilosophySection() {
  return (
    <section id="nosotras" className="bg-background">

      {/* Frases con transición */}
      <div className="px-6 pt-16 pb-4 md:px-12 lg:px-20 text-center max-w-4xl mx-auto">
        <div className="flex flex-col gap-2 font-serif text-2xl md:text-3xl text-blue-600">
          {["Inspiramos a otras mujeres.", "Transformamos el sector.", "Fortalecemos el liderazgo."].map((frase, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
            >
              {frase}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-36">

        {/* Text Reveal */}
        <div className="text-center mx-auto max-w-5xl mt-12">
          <TextRevealScroll
            text="CILA Mujeres surge desde el corazón de CILA para proyectar el liderazgo femenino con identidad, estructura y alcance internacional."
            className="text-3xl md:text-5xl lg:text-[3.5rem] text-center"
          />
        </div>

        {/* Quote */}
        <div className="mx-auto mt-24 max-w-3xl border-t border-border pt-16">
          <p className="font-serif text-xl leading-relaxed text-foreground md:text-2xl text-center">
            &ldquo;Orgullosamente representamos a CILA Mujeres y te invitamos a formar parte de un espacio donde la trayectoria, la unión y la cooperación se convierten en oportunidades que se expanden más allá de nuestras fronteras, comprometidas con un liderazgo ético, innovador, sostenible y humano.&rdquo;
          </p>

          {/* Trascender fronteras */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <p className="text-3xl md:text-5xl lg:text-6xl text-blue-700 font-serif font-semibold leading-tight text-center">
              ¿Estás lista para trascender fronteras?
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium text-center"
            >
              Súmate a CILA Mujeres y representa con liderazgo, ética y visión internacional.
            </motion.p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
