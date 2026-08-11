"use client";

import { motion } from "framer-motion";

const valores = [
  {
    label: "Proyección Global",
    description:
      "Llevamos el talento femenino más allá de las fronteras, conectando continentes con propósito y visión estratégica.",
  },
  {
    label: "Excelencia Profesional",
    description:
      "Actuamos con responsabilidad, rigor y los más altos estándares del sector inmobiliario.",
  },
  {
    label: "Representatividad Femenina",
    description:
      "Construimos un liderazgo compartido donde la mujer inspira, respalda y fortalece a otras mujeres.",
  },
];

export function MissionSection() {
  return (
    <section id="mision" className="bg-background">

      {/* Misión y Visión */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 border-t border-border">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-16 md:grid-cols-2">

          {/* Misión */}
          <div className="relative pl-6 md:pl-10">
            {/* Línea animada */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px] origin-top bg-accent/80"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Misión
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
                Nuestra misión
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Fortalecer el liderazgo femenino en el sector inmobiliario a nivel global, impulsando alianzas y negocios internacionales con ética y profesionalismo como pilares de acción, convencidas de que el talento y la capacidad de las mujeres son transformadores.
              </p>
            </motion.div>
          </div>

          {/* Visión */}
          <div className="relative pl-6 md:pl-10">
            {/* Línea animada */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px] origin-top bg-accent/80"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Visión
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
                Nuestra visión
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Ser la plataforma internacional que represente el talento femenino del sector inmobiliario hacia nuevos horizontes, convirtiendo relaciones en oportunidades de alto valor, estableciendo referentes de excelencia global, consolidando una comunidad sólida que conecte continentes con innovación, integridad, profundo sentido humano y un firme compromiso con la sostenibilidad y el equilibrio ecológico.
              </p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Valores */}
      <div className="border-t border-border px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Valores
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Lo que nos guía
          </h2>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
          >
            {valores.map((valor) => (
              <motion.div
                key={valor.label}
                className="bg-background px-8 py-10"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <h3 className="font-serif text-xl text-foreground">
                  {valor.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {valor.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
