'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export type AnimatedScrollPage = {
  bgImage: string;
  subtitle: string;
  heading: string;
  description: string;
};

export function AnimatedScroll({ pages }: { pages: AnimatedScrollPage[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = pages.length;
    let index = Math.floor(latest * total);
    if (index >= total) index = total - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${pages.length * 100}vh` }}
      className="relative w-full"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background border-t border-border">

        {/* Progress dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
          {pages.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 rounded-full transition-all duration-500 ${
                activeIndex === idx
                  ? 'h-6 bg-accent'
                  : 'h-1.5 bg-border'
              }`}
            />
          ))}
        </div>

        {pages.map((page, idx) => {
          const isActive = activeIndex === idx;
          const isPast = idx < activeIndex;

          return (
            <div
              key={idx}
              className="absolute inset-0"
              style={{ zIndex: isActive ? 10 : 1 }}
            >
              {/* 
                Mobile: top half = image, bottom half = text
                Desktop: left half = image, right half = text
                Opposing directions for each half
              */}

              {/* IMAGE half */}
              <motion.div
                className="absolute top-0 left-0 w-full h-[50%] md:w-1/2 md:h-full"
                animate={{
                  y: isActive ? '0%' : isPast ? '-100%' : '100%',
                  opacity: isActive ? 1 : 0.3,
                }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${page.bgImage})` }}
                />
              </motion.div>

              {/* TEXT half */}
              <motion.div
                className="absolute bottom-0 right-0 w-full h-[50%] md:top-0 md:left-1/2 md:w-1/2 md:h-full bg-background"
                animate={{
                  y: isActive ? '0%' : isPast ? '100%' : '-100%',
                  opacity: isActive ? 1 : 0.3,
                }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center justify-center h-full px-8 py-10 md:px-16 md:py-20 border-t md:border-t-0 md:border-l border-border/40">
                  <motion.span
                    className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-[0.7rem] font-medium tracking-[0.28em] text-blue-700 shadow-[0_4px_16px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                  >
                    {page.subtitle}
                  </motion.span>
                  <motion.h2
                    className="mb-5 text-center font-serif text-4xl leading-[0.9] tracking-[-0.04em] text-foreground md:text-6xl"
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                  >
                    {page.heading}
                  </motion.h2>
                  <motion.p
                    className="text-base md:text-lg text-muted-foreground max-w-prose leading-relaxed text-justify"
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                  >
                    {page.description}
                  </motion.p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
