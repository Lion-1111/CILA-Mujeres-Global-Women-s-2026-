"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const paises = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Canadá",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "España",
  "Estados Unidos",
  "Guatemala",
  "Honduras",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "Rep. Dominicana",
  "Uruguay",
  "Venezuela",
  "Otro país / Otra región"
];

const fields = [
  { id: "nombre", label: "Nombre completo", type: "text", autoComplete: "name", placeholder: "Tu nombre y apellidos" },
  { id: "pais", label: "País", type: "select", autoComplete: "country-name", placeholder: "Selecciona tu país..." },
  { id: "empresa", label: "Empresa u organización", type: "text", autoComplete: "organization", placeholder: "Nombre de tu empresa" },
  { id: "email", label: "Correo electrónico", type: "email", autoComplete: "email", placeholder: "nombre@correo.com" },
  { id: "telefono", label: "WhatsApp / teléfono", type: "tel", autoComplete: "tel", placeholder: "+52 ..." },
  { id: "necesidad", label: "¿Qué producto o alianza inmobiliaria necesitas?", type: "text", autoComplete: "off", placeholder: "Ej. Busco inversionistas, propiedades..." },
  { id: "ofrecimiento", label: "¿Qué producto o alianza inmobiliaria nos compartirás?", type: "text", autoComplete: "off", placeholder: "Ej. Ofrezco desarrollos exclusivos..." },
] as const;

const mesas = [
  { mesa: 1, pais: "España", bandera: "🇪🇸" },
  { mesa: 2, pais: "México", bandera: "🇲🇽" },
  { mesa: 3, pais: "Brasil", bandera: "🇧🇷" },
  { mesa: 4, pais: "Colombia", bandera: "🇨🇴" },
  { mesa: 5, pais: "Argentina", bandera: "🇦🇷" },
  { mesa: 6, pais: "Costa Rica", bandera: "🇨🇷" },
  { mesa: 7, pais: "Uruguay", bandera: "🇺🇾" },
  { mesa: 8, pais: "Paraguay", bandera: "🇵🇾" },
  { mesa: 9, pais: "Rep. Dominicana", bandera: "🇩🇴" },
  { mesa: 10, pais: "Bolivia", bandera: "🇧🇴" },
  { mesa: 11, pais: "Venezuela", bandera: "🇻🇪" },
  { mesa: 12, pais: "Ecuador", bandera: "🇪🇨" },
  { mesa: 13, pais: "Panamá", bandera: "🇵🇦" },
  { mesa: 14, pais: "El Salvador", bandera: "🇸🇻" },
  { mesa: 15, pais: "Chile", bandera: "🇨🇱" },
  { mesa: 16, pais: "Perú", bandera: "🇵🇪" },
  { mesa: 17, pais: "Guatemala", bandera: "🇬🇹" },
  { mesa: 18, pais: "Honduras", bandera: "🇭🇳" },
];

function assignMesa(inputPais: string): typeof mesas[number] {
  const normalized = inputPais.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const matchedMesa = mesas.find(m => {
    const mesaPais = m.pais.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (mesaPais === "rep. dominicana" && normalized.includes("dominicana")) return true;
    if (normalized === mesaPais) return true;
    return normalized.includes(mesaPais);
  });

  if (matchedMesa) {
    return matchedMesa;
  }

  // Si no hay coincidencia exacta o es otro país, asigna Mesa Internacional
  return {
    mesa: 19,
    pais: "Internacional",
    bandera: "🌐"
  };
}

export function RegistrationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mesaAsignada, setMesaAsignada] = useState<typeof mesas[number] | null>(null);
  const [registeredName, setRegisteredName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      nombre: (form.elements.namedItem("nombre") as HTMLInputElement).value,
      pais: (form.elements.namedItem("pais") as HTMLInputElement).value,
      empresa: (form.elements.namedItem("empresa") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefono: (form.elements.namedItem("telefono") as HTMLInputElement).value,
      necesidad: (form.elements.namedItem("necesidad") as HTMLInputElement).value,
      ofrecimiento: (form.elements.namedItem("ofrecimiento") as HTMLInputElement).value,
    };

    const asignacion = assignMesa(data.pais);

    const { error: dbError } = await supabase.from("registros").insert({
      ...data,
      mesa_numero: asignacion.mesa,
      mesa_pais: asignacion.pais,
      mesa_bandera: asignacion.bandera,
    });

    setLoading(false);

    if (dbError) {
      setError("Hubo un problema al guardar tu registro. Por favor intenta de nuevo.");
      console.error(dbError);
      return;
    }

    setMesaAsignada(asignacion);
    setRegisteredName(data.nombre.split(" ")[0]); // Use first name for a friendlier welcome
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
            className="mt-10 flex flex-col items-center rounded-2xl bg-primary-foreground/10 px-6 py-12 text-center shadow-lg backdrop-blur-sm border border-white/10"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-2">
              <Check size={32} className="text-white" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-serif text-3xl text-white">¡Bienvenida(o), {registeredName}!</h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-primary-foreground/90">
              Es un honor contar contigo. Tu registro ha sido exitoso y hemos reservado tu lugar en Global Women&apos;s 2026.
            </p>

            <div className="mt-8 w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 px-8 py-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="text-8xl">{mesaAsignada.bandera}</span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60 mb-4 relative z-10">
                Tu mesa asignada
              </p>
              <div className="flex items-center justify-start gap-5 relative z-10">
                <span className="text-6xl drop-shadow-md leading-none">{mesaAsignada.bandera}</span>
                <div className="text-left">
                  <p className="font-serif text-3xl font-bold text-white">{mesaAsignada.pais}</p>
                  <p className="text-sm text-primary-foreground/80 mt-1 font-medium">Mesa {mesaAsignada.mesa} · Circuito de Negocios</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-primary-foreground/70 text-left border-t border-white/10 pt-4 relative z-10">
                Pronto recibirás la confirmación oficial y tu código de acceso por correo y WhatsApp.
              </p>
            </div>

            <button
              type="button"
              onClick={() => { setSubmitted(false); setMesaAsignada(null); setRegisteredName(null); }}
              className="mt-8 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-[#1e3a8a]"
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
                {field.type === "select" ? (
                  <div className="relative">
                    <select
                      id={field.id}
                      name={field.id}
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground outline-none transition-colors focus:border-white/60 focus:ring-2 focus:ring-white/20 appearance-none"
                    >
                      <option value="" disabled className="text-black">
                        {field.placeholder}
                      </option>
                      {paises.map((pais) => (
                        <option key={pais} value={pais} className="text-black">
                          {pais}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground placeholder:text-primary-foreground/50 outline-none transition-colors focus:border-white/60 focus:ring-2 focus:ring-white/20"
                  />
                )}
              </div>
            ))}

            {error && (
              <p className="rounded-xl bg-red-500/20 border border-red-400/40 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-white px-6 py-4 text-base font-semibold text-[#1e3a8a] transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                "Confirmar mi registro y obtener mi mesa →"
              )}
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
