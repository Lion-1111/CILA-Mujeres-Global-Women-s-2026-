"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  explore: [
    { label: "Quiénes somos", href: "#nosotras" },
    { label: "Programa", href: "#programa" },
    { label: "Galería", href: "#galeria" },
    { label: "Representantes", href: "#representantes" },
  ],
  evento: [
    { label: "Registro", href: "#registro" },
    { label: "Experiencia", href: "#experiencia" },
    { label: "Ceremonia", href: "#representantes" },
  ],
  contacto: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "WhatsApp", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="#hero" className="text-lg font-medium text-foreground">
              CILA Mujeres
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Confederación Inmobiliaria Latinoamericana — fortaleciendo el liderazgo femenino en el sector inmobiliario global.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Evento */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Evento</h4>
            <ul className="space-y-3">
              {footerLinks.evento.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Contacto</h4>
            <ul className="space-y-3">
              {footerLinks.contacto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 CILA Mujeres. Todos los derechos reservados.
          </p>



          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
