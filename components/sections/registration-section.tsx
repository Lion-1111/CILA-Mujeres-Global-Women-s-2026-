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

const mesas = [
  { mesa: 1,  pais: "España",          bandera: "🇪🇸" },
  { mesa: 2,  pais: "México",          bandera: "🇲🇽" },
  { mesa: 3,  pais: "Brasil",          bandera: "🇧🇷" },
  { mesa: 4,  pais: "Colombia",        bandera: "🇨🇴" },
  { mesa: 5,  pais: "Argentina",       bandera: "🇦🇷" },
  { mesa: 6,  pais: "Costa Rica",      bandera: "🇨🇷" },
  { mesa: 7,  pais: "Uruguay",         bandera: "🇺🇾" },
  { mesa: 8,  pais: "Paraguay",        bandera: "🇵🇾" },
  { mesa: 9,  pais: "Rep. Dominicana", bandera: "🇩🇴" },
  { mesa: 10, pais: "Bolivia",         bandera: "🇧🇴" },
  { mesa: 11, pais: "Venezuela",       bandera: "🇻🇪" },
  { mesa: 12, pais: "Ecuador",         bandera: "🇪🇨" },
  { mesa: 13, pais: "Panamá",          bandera: "🇵🇦" },
  { mesa: 14, pais: "El Salvador",     bandera: "🇸🇻" },
  { mesa: 15, pais: "Chile",           bandera: "🇨🇱" },
  { mesa: 16, pais: "Perú",            bandera: "🇵🇪" },
  { mesa: 17, pais: "Guatemala",       bandera: "🇬🇹" },
  { mesa: 18, pais: "Honduras",        bandera: "🇭🇳" },
];

// Simulate round-robin assignment based on timestamp
function assignMesa(): typeof mesas[number] {
  const index = Math.floor(Date.now() / 1000) % mesas.length;
  return mesas[index];
}

export function RegistrationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [mesaAsignada, setMesaAsignada] = useState<typeof mesas[number] | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const asignacion = assignMesa();
    setMesaAsignada(asignacion);
    setSubmitted(true);
  };

  return (
    <section id="registro" className="bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#15803d] text-primary-foreground">
      <div className="mx-auto max-w-2xl px-6 py-20 md:px-12 md:py-28 lg:py-32">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
            Regístrate
          </span>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-5xl text-balance">
            Reserva tu lugar en Global Women&apos;s 2026
          </h2>
          <p className="mt-4 leading-relaxed text-primary-foreground/80">
            Completa tus datos en menos de un minuto. Al confirmar, te asignaremos tu
            mesa del Circuito de Negocios y recibirás todos los detalles por correo y WhatsApp.
          </p>
        </div>

        {submitted && mesaAsignada ? (
          <div
            className="mt-10 flex flex-col items-center rounded-2xl bg-primary-foreground/10 px-6 py-12 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Check size={28} className="text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-2xl">¡Gracias por registrarte!</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              Hemos recibido tu solicitud. Pronto te contactaremos con los detalles de Global Women&apos;s 2026.
            </p>

            {/* Mesa asignada */}
            <div className="mt-8 w-full max-w-xs rounded-2xl border border-white/20 bg-white/10 px-6 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
                Tu mesa asignada
              </p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-5xl leading-none">{mesaAsignada.bandera}</span>
                <div className="text-left">
                  <p className="font-serif text-2xl font-bold">{mesaAsignada.pais}</p>
                  <p className="text-sm text-primary-foreground/70">Mesa {mesaAsignada.mesa} · Circuito de Negocios</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-primary-foreground/60">
                Recibirás la confirmación y el detalle de tu mesa por correo y WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setSubmitted(false); setMesaAsignada(null); }}
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
                  className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 outline-none transition-colors focus:border-white/60 focus:ring-2 focus:ring-white/20"
                />
              </div>
            ))}

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-white px-6 py-4 text-base font-semibold text-[#1e3a8a] transition-opacity hover:opacity-90"
            >
              Confirmar mi registro y obtener mi mesa →
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
