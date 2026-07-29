"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const fields = [
  { id: "nombre", label: "Nombre completo", type: "text", autoComplete: "name", placeholder: "Tu nombre y apellidos" },
  { id: "pais", label: "País", type: "text", autoComplete: "country-name", placeholder: "¿Desde dónde nos acompañas?" },
  { id: "empresa", label: "Empresa u organización", type: "text", autoComplete: "organization", placeholder: "Nombre de tu empresa" },
  { id: "email", label: "Correo electrónico", type: "email", autoComplete: "email", placeholder: "nombre@correo.com" },
  { id: "telefono", label: "WhatsApp / teléfono", type: "tel", autoComplete: "tel", placeholder: "+52 ..." },
] as const;

export function RegistrationSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Maqueta: aún no guarda datos. Más adelante se conectará a una base de datos.
    setSubmitted(true);
  };

  return (
    <section id="registro" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-2xl px-6 py-20 md:px-12 md:py-28 lg:py-32">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            Regístrate
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl text-balance">
            Reserva tu lugar en Global Women&apos;s 2026
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            Completa tus datos en menos de un minuto. Te enviaremos la confirmación
            y los detalles del evento por correo y WhatsApp.
          </p>
        </div>

        {submitted ? (
          <div
            className="mt-10 flex flex-col items-center rounded-2xl bg-primary-foreground/10 px-6 py-12 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check size={28} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-2xl">¡Gracias por registrarte!</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              Hemos recibido tu solicitud. Muy pronto te contactaremos con toda la
              información de Global Women&apos;s 2026.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-full border border-primary-foreground/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
            >
              Registrar a otra persona
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="text-sm font-medium text-primary-foreground/90"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required
                  className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/50"
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Confirmar mi registro
            </button>
            <p className="text-center text-xs text-primary-foreground/60">
              Al registrarte aceptas recibir información sobre el evento de CILA Mujeres.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
