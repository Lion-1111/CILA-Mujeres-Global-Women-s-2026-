"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#nosotras", label: "Quiénes somos" },
  { href: "#programa", label: "Programa" },
  { href: "#galeria", label: "Galería" },
  { href: "#representantes", label: "Representantes" },
  { href: "#sumate", label: "Súmate a la pantalla CILA" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white shadow-sm"}`}
    >
      {/* Mobile top bar */}
      <div className="relative flex min-h-24 items-center justify-between px-5 md:hidden">
        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors text-gray-700 z-10 flex-shrink-0"
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logo centrado */}
        <Link href="#hero" aria-label="CILA Mujeres — inicio" className="absolute left-1/2 -translate-x-1/2">
          <span className="relative block h-20 w-44">
            <Image
              src="/images/Captura de pantalla 2026-08-11 110713.png"
              alt="CILA Mujeres — Confederación Inmobiliaria Latinoamericana"
              fill
              className="object-contain mix-blend-multiply"
              sizes="176px"
            />
          </span>
        </Link>

        {/* Placeholder derecha */}
        <div className="w-7 flex-shrink-0" />
      </div>

      {/* Desktop top bar */}
      <div className="hidden md:flex items-center justify-between px-12 py-3 lg:px-20">
        {/* Logo */}
        <Link href="#hero" className="flex items-center gap-3" aria-label="CILA Mujeres — inicio">
          <span className="relative h-14 w-48 flex-shrink-0">
            <Image
              src="/images/Captura de pantalla 2026-08-11 110713.png"
              alt="CILA Mujeres — Confederación Inmobiliaria Latinoamericana"
              fill
              className="object-contain mix-blend-multiply scale-125"
              sizes="192px"
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors text-gray-600 hover:text-[#1e3a8a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-6">
          <Link
            href="#registro"
            className="px-6 py-2 text-sm font-semibold transition-all rounded bg-[#1e3a8a] text-white hover:bg-blue-700 shadow-md"
          >
            Registro
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-gray-700 hover:text-[#1e3a8a]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#registro"
              className="mt-4 bg-blue-700 px-5 py-3 text-center text-sm font-bold text-white rounded shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Registro
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
