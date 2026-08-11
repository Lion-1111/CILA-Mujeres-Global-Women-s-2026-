"use client";

import { FadeImage } from "@/components/fade-image";
import { motion, useAnimationFrame, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedScroll } from "@/components/ui/animated-scroll";

const paisesCircuito = [
  { pais: "España", code: "es", mesa: 1 },
  { pais: "México", code: "mx", mesa: 2 },
  { pais: "Brasil", code: "br", mesa: 3 },
  { pais: "Colombia", code: "co", mesa: 4 },
  { pais: "Argentina", code: "ar", mesa: 5 },
  { pais: "Costa Rica", code: "cr", mesa: 6 },
  { pais: "Uruguay", code: "uy", mesa: 7 },
  { pais: "Paraguay", code: "py", mesa: 8 },
  { pais: "Rep. Dominicana", code: "do", mesa: 9 },
  { pais: "Bolivia", code: "bo", mesa: 10 },
  { pais: "Venezuela", code: "ve", mesa: 11 },
  { pais: "Ecuador", code: "ec", mesa: 12 },
  { pais: "Panamá", code: "pa", mesa: 13 },
  { pais: "El Salvador", code: "sv", mesa: 14 },
  { pais: "Chile", code: "cl", mesa: 15 },
  { pais: "Perú", code: "pe", mesa: 16 },
  { pais: "Guatemala", code: "gt", mesa: 17 },
  { pais: "Honduras", code: "hn", mesa: 18 },
];

const program = [
  {
    id: 2,
    day: "12:00 – 12:42",
    name: "Apertura Oficial",
    description:
      "Ceremonia de apertura con mensajes de bienvenida de las representantes de cada país participante.",
    image: "/images/apertura%20oficial.jpg",
  },
  {
    id: 3,
    day: "12:42 – 13:06",
    name: "Presentación de Países",
    description:
      "Presentación oficial de todas las delegaciones participantes en el encuentro internacional.",
    image: "/images/presentacion%20de%20paises.jpg",
  },
  {
    id: 4,
    day: "13:06 – 14:12",
    name: "Circuito Internacional de Negocios",
    description:
      "Rotación por las mesas país del Circuito Internacional de Negocios: alianzas y oportunidades en tiempo real.",
    image: "/images/circulo%20de%20negocios.jpg",
  },
  {
    id: 5,
    day: "14:12 – 14:30",
    name: "Cierre & Lanzamiento 2026 - 365",
    description:
      "Taller de negocios CILA Mujeres",
    image: "/images/cierre%20y%20lanzamiento.jpeg",
  },
];

const programPages = program.map((item) => ({
  bgImage: item.image,
  subtitle: item.day,
  heading: item.name,
  description: item.description,
}));

// ─── Premium Text Reveal Animation ───────────────────────────────────────────
function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = text.split("");
  return (
    <span className="inline-block">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 15, rotateX: 90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, delay: delay + i * 0.02, type: "spring", damping: 12, stiffness: 200 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ─── Premium Scroll Word Reveal (Inline) ─────────────────────────────────────
function ScrollWordReveal({ text, className = "" }: { text: string; className?: string }) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "start 45%"],
  });

  const words = text.split(" ");

  // Palabras que queremos resaltar en negrita
  const boldWords = ["18", "mesas", "redondas,", "rotan", "entre", "las", "mesas", "alianza", "real,"];

  return (
    <p ref={container} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["var(--muted-foreground)", "var(--foreground)"]);

        // Remove trailing commas/periods for bold check
        const cleanWord = word.replace(/[.,]/g, "");
        const isBold = boldWords.includes(word) || boldWords.includes(cleanWord);

        return (
          <motion.span
            key={i}
            style={{ opacity, color: color as any }}
            className={`inline-block mr-[0.25em] ${isBold ? "font-bold" : "font-normal"}`}
          >
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

// ─── Infinite ticker using framer-motion useAnimationFrame ───────────────────
function CountryTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const SPEED = 0.5; // px per frame

  // total width of one set (will be measured dynamically, we use CSS for that)
  useAnimationFrame(() => {
    if (paused || !trackRef.current) return;
    xRef.current -= SPEED;
    // reset when we've scrolled one full copy width
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (Math.abs(xRef.current) >= halfWidth) {
      xRef.current = 0;
    }
    trackRef.current.style.transform = `translateX(${xRef.current}px)`;
  });

  const all = [...paisesCircuito, ...paisesCircuito];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div ref={trackRef} className="flex gap-5 py-4 will-change-transform" style={{ width: "max-content" }}>
        {all.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group flex shrink-0 items-center gap-5 rounded-full border border-border/80 bg-background/80 p-3 pr-8 shadow-sm backdrop-blur-md cursor-default transition-all hover:border-accent/40 hover:bg-accent/5 hover:shadow-md hover:shadow-accent/10"
          >
            {/* Real Flag Image (Circular) - Larger size */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-background shadow-[0_0_10px_rgba(0,0,0,0.1)] group-hover:ring-accent/20 transition-all">
              <img
                src={`https://flagcdn.com/w160/${p.code}.png`}
                alt={`Bandera de ${p.pais}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-full shadow-inner ring-1 ring-inset ring-black/10 pointer-events-none"></div>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-lg font-serif font-semibold text-foreground">
                {p.pais}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function CollectionSection() {
  return (
    <section id="programa" className="bg-background">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="px-6 py-20 md:px-12 lg:px-20 md:py-16"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Programa
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground md:text-5xl">
          Agenda del evento
        </h2>
      </motion.div>

      {/* ============================================ */}
      {/* PROGRAM: Animated Split-Screen Scroll       */}
      {/* ============================================ */}
      <AnimatedScroll pages={programPages} />

      {/* ============================================ */}
      {/* CIRCUITO DE NEGOCIOS — Explicación + Ticker  */}
      {/* ============================================ */}
      <div className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">

          {/* Two-col header */}
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 items-start">

            {/* Left: Description */}
            <div className="relative">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="block text-center text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                13:06 – 14:12
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 text-center font-serif text-3xl leading-tight text-foreground md:text-5xl mb-8"
              >
                Circuito Internacional de Negocios
              </motion.h2>

              <ScrollWordReveal
                text="Imagina un meetup de negocios — pero con estructura. Son 18 mesas redondas, cada una con la placa de un país del directorio CILA."
                className="text-justify text-xl md:text-2xl leading-relaxed font-serif"
              />
              <div className="h-4"></div>
              <ScrollWordReveal
                text="Los asistentes rotan entre las mesas — cada conversación es una oportunidad de alianza real, en tiempo real."
                className="text-justify text-xl md:text-2xl leading-relaxed font-serif"
              />

              {/* Mini stats */}
              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  { val: "18", lbl: "Mesas país", delay: 0.1 },
                  { val: "66", lbl: "Minutos", delay: 0.2 },
                  { val: "🔄", lbl: "Rotación siguiendo la ruta de negocios de Latinoamérica", delay: 0.3 },
                ].map((s) => (
                  <motion.div
                    key={s.lbl}
                    initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ type: "spring", bounce: 0.6, duration: 0.8, delay: s.delay }}
                    className="rounded-2xl border border-border/60 bg-secondary/30 px-6 py-5 text-center backdrop-blur-sm shadow-sm hover:border-accent/40 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/10 transition-all cursor-default"
                  >
                    <p className="text-4xl font-bold text-foreground">{s.val}</p>
                    <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">{s.lbl}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Steps summarized */}
            <motion.div
              className="mt-8 md:mt-0 flex flex-col justify-center h-full"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              <div className="rounded-3xl bg-secondary/20 border border-border/50 p-8 md:p-10 backdrop-blur-sm">
                <h3 className="text-center font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Dinámica del Circuito
                </h3>
                <p className="text-justify text-muted-foreground leading-relaxed text-lg">
                  Al registrarte, recibes una asignación de mesa inicial. A lo largo del circuito, tendrás conversaciones reales y directas con representantes de cada país.
                  <br /><br />
                  Cuando el tiempo lo indique, el grupo rotará a la siguiente mesa, permitiéndote multiplicar tu red de contactos y formar alianzas internacionales en una sola tarde.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Ticker carousel */}
          <div className="mt-16">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Las 18 mesas país
            </p>
            <CountryTicker />
          </div>
        </div>
      </div>
    </section>
  );
}
