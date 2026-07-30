'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

type Theme = 'system' | 'light' | 'dark';

export type ShipStickyHeaderProps = {
  items?: string[];
  showFooter?: boolean;
  theme?: Theme;
  animate?: boolean;
  hue?: number;
  startVh?: number;
  spaceVh?: number;
  debug?: boolean;
  taglineHTML?: string;
  prefixText?: string;
};

export function WordHeroSection({
  items = ['liderar.', 'conectar.', 'inspirar.', 'crecer.', 'negociar.', 'trascender.', 'triunfar.'],
  showFooter = false,
  theme = 'light',
  animate = true,
  hue = 210,
  startVh = 25,
  spaceVh = 5,
  debug = false,
  taglineHTML = `en el Circuito de Negocios.<br /><a href="#registro" class="cila-link">Regístrate ahora</a>`,
  prefixText = "tú puedes ",
}: ShipStickyHeaderProps) {
  useEffect(() => {
    // We don't pollute documentElement, we will apply these to the container style directly via React.
  }, []);

  return (
    <div
      className="word-hero-wrapper relative w-full bg-background overflow-hidden"
      style={
        {
          ['--count' as any]: items.length,
          ['--hue' as any]: hue,
          ['--start' as any]: `${startVh}vh`,
          ['--space' as any]: `${spaceVh}vh`,
        } as React.CSSProperties
      }
      data-theme={theme}
      data-animate={animate}
      data-debug={debug}
    >
      <div className="word-hero-grid-bg" />

      <header className="word-hero-header fluid z-10">
        <section className="word-hero-section-first">
          <h1 className="sr-only sm:not-sr-only text-foreground">
            <span aria-hidden="true">{prefixText}</span>
            <span className="sr-only">{prefixText}{items.join(' ')}</span>
          </h1>

          {/* Visible cycling words (aria-hidden) */}
          <ul aria-hidden="true" className="word-hero-ul">
            {items.map((word, i) => (
              <li key={i} className="word-hero-li" style={{ ['--i' as any]: i } as React.CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      <motion.main 
        className="relative z-10 flex min-h-[40vh] md:min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden"
        initial={{ scale: 0.9, borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem", borderBottomLeftRadius: "2rem", borderBottomRightRadius: "2rem" }}
        whileInView={{ scale: 1, borderTopLeftRadius: "2rem", borderTopRightRadius: "2rem", borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/WhatsApp Image 2026-07-28 at 9.49.24 PM.jpeg" 
            alt="Regístrate ahora" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-[#0f172a]/80" />
        </div>

        <motion.p
          className="fluid relative z-10 text-center text-white px-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: taglineHTML }}
        />
      </motion.main>

      {showFooter && <footer className="word-hero-footer text-center py-8">CILA Mujeres &copy; 2026</footer>}

      <style dangerouslySetInnerHTML={{__html: `
        .word-hero-wrapper {
          --accent: #06b6d4; /* Cyan accent */
          --dimmed: rgba(150, 160, 180, 0.2);
          --switch: #fff;
          --font-size-min: 24;
          --font-size-max: 48;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
        }

        .word-hero-grid-bg {
          --size: 45px; 
          --line: rgba(0, 0, 0, 0.04);
          position: absolute; 
          inset: 0; 
          z-index: 0;
          background:
            linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 0 50% / var(--size) var(--size),
            linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0 0 / var(--size) var(--size);
          mask: linear-gradient(-20deg, transparent 50%, white);
          -webkit-mask: linear-gradient(-20deg, transparent 50%, white);
          pointer-events: none;
        }

        .fluid {
          --fluid-min: calc(var(--font-size-min) * 1px);
          --fluid-max: calc(var(--font-size-max) * 1px);
          font-size: clamp(var(--fluid-min), 5vw, var(--fluid-max));
        }

        .word-hero-header {
          --font-size-min: 32;
          --font-size-max: 80;
          position: sticky;
          top: calc((var(--count) - 1) * -1.2em);
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: var(--space);
        }
        
        .word-hero-section-first {
          display: flex; 
          width: 100%;
          align-items: start; 
          justify-content: center;
          padding-top: calc(var(--start) - 0.5em);
          gap: 0.25em;
        }

        .word-hero-section-first h1 {
          position: sticky; 
          top: calc(var(--start) - 0.5em);
          margin: 0; 
          font-weight: 700;
          font-family: serif;
        }

        .word-hero-ul {
          font-weight: 700; 
          font-family: serif;
          list-style: none; 
          padding: 0; 
          margin: 0;
        }

        .word-hero-li {
          background: linear-gradient(
              180deg,
              var(--dimmed) 0 calc(var(--start) - 0.6em),
              var(--accent) calc(var(--start) - 0.55em) calc(var(--start) + 0.55em),
              var(--dimmed) calc(var(--start) + 0.5em)
            );
          background-attachment: fixed;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .cila-link {
          color: var(--accent); 
          text-decoration: none; 
          font-weight: 700;
          display: inline-block;
          margin-top: 1.5rem;
        }
        .cila-link:hover { 
          text-decoration: underline; 
        }
      `}} />
    </div>
  );
}
