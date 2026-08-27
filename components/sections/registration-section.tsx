"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Loader2, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── Constantes ────────────────────────────────────────────────────────────────

const MAX_CUPO = 200;

const PAIS_CODIGO: Record<string, string> = {
  "Argentina": "ar", "Bolivia": "bo", "Brasil": "br", "Canadá": "ca",
  "Chile": "cl", "Colombia": "co", "Costa Rica": "cr", "Cuba": "cu",
  "Ecuador": "ec", "El Salvador": "sv", "España": "es", "Estados Unidos": "us",
  "Guatemala": "gt", "Honduras": "hn", "México": "mx", "Nicaragua": "ni",
  "Panamá": "pa", "Paraguay": "py", "Perú": "pe", "Puerto Rico": "pr",
  "Rep. Dominicana": "do", "Uruguay": "uy", "Venezuela": "ve",
};

const paises = [...Object.keys(PAIS_CODIGO).sort((a, b) => a.localeCompare(b, "es")), "Otro país / Otra región"];

const MESAS = [
  { mesa: 1,  pais: "España",          codigo: "es" },
  { mesa: 2,  pais: "México",          codigo: "mx" },
  { mesa: 3,  pais: "Brasil",          codigo: "br" },
  { mesa: 4,  pais: "Colombia",        codigo: "co" },
  { mesa: 5,  pais: "Argentina",       codigo: "ar" },
  { mesa: 6,  pais: "Costa Rica",      codigo: "cr" },
  { mesa: 7,  pais: "Uruguay",         codigo: "uy" },
  { mesa: 8,  pais: "Paraguay",        codigo: "py" },
  { mesa: 9,  pais: "Rep. Dominicana", codigo: "do" },
  { mesa: 10, pais: "Bolivia",         codigo: "bo" },
  { mesa: 11, pais: "Venezuela",       codigo: "ve" },
  { mesa: 12, pais: "Ecuador",         codigo: "ec" },
  { mesa: 13, pais: "Panamá",          codigo: "pa" },
  { mesa: 14, pais: "El Salvador",     codigo: "sv" },
  { mesa: 15, pais: "Chile",           codigo: "cl" },
  { mesa: 16, pais: "Perú",            codigo: "pe" },
  { mesa: 17, pais: "Guatemala",       codigo: "gt" },
  { mesa: 18, pais: "Honduras",        codigo: "hn" },
];

const VIP_CODES  = ["01", "011", "001", "0001"];
const INT_MESAS  = [19, 20, 21];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getFlagUrl(pais: string, size = 80): string {
  const code = PAIS_CODIGO[pais];
  return code ? `https://flagcdn.com/w${size}/${code}.png` : "";
}

type MesaAsignada = { mesa: number | string; pais: string; codigo: string };

function assignMesa(inputPais: string, vipCode?: string | null): MesaAsignada {
  const codigo = PAIS_CODIGO[inputPais] || "global";

  if (vipCode && VIP_CODES.includes(vipCode)) {
    return { mesa: vipCode, pais: "Invitado Especial", codigo };
  }

  const normalized = inputPais.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  const match = MESAS.find((m) => {
    const mp = m.pais.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return mp === "rep. dominicana" ? normalized.includes("dominicana") : normalized === mp || normalized.includes(mp);
  });

  if (match) return match;

  const randomMesa = INT_MESAS[Math.floor(Math.random() * INT_MESAS.length)];
  const displayPais = inputPais === "Otro país / Otra región" ? "Internacional" : inputPais;
  return { mesa: randomMesa, pais: displayPais, codigo };
}

/** Cuenta cuántos correos únicos hay actualmente en la BD */
async function fetchUniqueCount(): Promise<number> {
  const { data, error } = await supabase.from("registros").select("email");
  if (error || !data) return 0;
  return new Set(data.map((r) => r.email.trim().toLowerCase())).size;
}

// ── Componente ────────────────────────────────────────────────────────────────

const FIELDS = [
  { id: "nombre",      label: "Nombre completo",                                    type: "text",   autoComplete: "name",         placeholder: "Tu nombre y apellidos" },
  { id: "pais",        label: "País",                                               type: "select", autoComplete: "country-name", placeholder: "Selecciona tu país..." },
  { id: "empresa",     label: "Empresa u organización",                             type: "text",   autoComplete: "organization", placeholder: "Nombre de tu empresa" },
  { id: "email",       label: "Correo electrónico",                                 type: "email",  autoComplete: "email",        placeholder: "nombre@correo.com" },
  { id: "telefono",    label: "WhatsApp / teléfono",                                type: "tel",    autoComplete: "tel",          placeholder: "+52 ..." },
  { id: "necesidad",   label: "¿Qué producto o alianza inmobiliaria necesitas?",    type: "text",   autoComplete: "off",          placeholder: "Ej. Busco inversionistas, propiedades..." },
  { id: "ofrecimiento",label: "¿Qué producto o alianza inmobiliaria nos compartirás?", type: "text", autoComplete: "off",         placeholder: "Ej. Ofrezco desarrollos exclusivos..." },
] as const;

export function RegistrationSection() {
  const [cupoRestante, setCupoRestante]     = useState<number | null>(null); // null = cargando
  const [submitted, setSubmitted]           = useState(false);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState<string | null>(null);
  const [mesaAsignada, setMesaAsignada]     = useState<MesaAsignada | null>(null);
  const [registeredName, setRegisteredName] = useState<string | null>(null);
  const [selectedPais, setSelectedPais]     = useState("");
  const [vipCode, setVipCode]               = useState<string | null>(null);

  // Leer cupo real al montar el componente
  useEffect(() => {
    fetchUniqueCount().then((unique) => setCupoRestante(MAX_CUPO - unique));
  }, []);

  // Leer código VIP del query string
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vip = new URLSearchParams(window.location.search).get("vip");
    if (vip) setVipCode(vip);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    let inputPais = (form.elements.namedItem("pais") as HTMLInputElement).value;

    if (inputPais === "Otro país / Otra región") {
      const custom = (form.elements.namedItem("customPais") as HTMLInputElement)?.value.trim();
      if (custom) inputPais = custom;
    }

    const data = {
      nombre:       (form.elements.namedItem("nombre")       as HTMLInputElement).value,
      pais:         inputPais,
      empresa:      (form.elements.namedItem("empresa")      as HTMLInputElement).value,
      email:        (form.elements.namedItem("email")        as HTMLInputElement).value.trim().toLowerCase(),
      telefono:     (form.elements.namedItem("telefono")     as HTMLInputElement).value,
      necesidad:    (form.elements.namedItem("necesidad")    as HTMLInputElement).value,
      ofrecimiento: (form.elements.namedItem("ofrecimiento") as HTMLInputElement).value,
    };

    // 1. Re-verificar cupo en tiempo real (protección ante race condition)
    const uniqueNow = await fetchUniqueCount();
    if (uniqueNow >= MAX_CUPO) {
      setError("Lo sentimos, el cupo está completo. No es posible registrar más personas.");
      setCupoRestante(0);
      setLoading(false);
      return;
    }

    // 2. Verificar que el correo no esté ya registrado
    const { data: existing, error: checkErr } = await supabase
      .from("registros")
      .select("email")
      .eq("email", data.email)
      .limit(1);

    if (checkErr) {
      setError("Hubo un error al verificar tus datos. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    if (existing && existing.length > 0) {
      setError("Este correo electrónico ya está registrado. Por favor, utiliza otro.");
      setLoading(false);
      return;
    }

    // 3. Insertar registro
    const asignacion = assignMesa(inputPais, vipCode);
    const bandera = asignacion.codigo === "global" ? "🌐" : `https://flagcdn.com/w80/${asignacion.codigo}.png`;

    const { error: dbError } = await supabase.from("registros").insert({
      ...data,
      mesa_numero:  asignacion.mesa,
      mesa_pais:    asignacion.pais,
      mesa_bandera: bandera,
    });

    setLoading(false);

    if (dbError) {
      setError("Hubo un problema al guardar tu registro. Por favor intenta de nuevo.");
      console.error(dbError);
      return;
    }

    setCupoRestante((prev) => (prev !== null ? prev - 1 : null));
    setMesaAsignada(asignacion);
    setRegisteredName(data.nombre.split(" ")[0]);
    setSubmitted(true);
  };

  const flagUrl = selectedPais ? getFlagUrl(selectedPais) : null;

  // ── Renders condicionales ─────────────────────────────────────────────────

  const renderCupoLleno = () => (
    <div className="mt-10 flex flex-col items-center rounded-2xl bg-primary-foreground/10 px-6 py-12 text-center shadow-lg backdrop-blur-sm border border-white/10">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-4">
        <Users size={32} className="text-white" />
      </span>
      <h3 className="font-serif text-3xl text-white">Cupo completo</h3>
      <p className="mt-3 max-w-md text-base leading-relaxed text-primary-foreground/80">
        Los 200 lugares de Global Women&apos;s 2026 han sido reservados. Gracias por tu interés — ¡nos vemos en el evento!
      </p>
    </div>
  );

  const renderConfirmacion = () => (
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

      {mesaAsignada && (
        <div className="mt-8 w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 px-8 py-6 shadow-md relative overflow-hidden">
          {/* Watermark bandera */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            {mesaAsignada.codigo === "global" ? (
              <span className="text-8xl">🌐</span>
            ) : (
              <Image src={`https://flagcdn.com/w160/${mesaAsignada.codigo}.png`} alt={mesaAsignada.pais} width={120} height={90} className="object-cover rounded" />
            )}
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60 mb-4 relative z-10">
            Tu mesa asignada
          </p>

          <div className="flex items-center justify-start gap-5 relative z-10">
            {mesaAsignada.codigo === "global" ? (
              <span className="text-6xl drop-shadow-md leading-none">🌐</span>
            ) : (
              <Image src={`https://flagcdn.com/w80/${mesaAsignada.codigo}.png`} alt={mesaAsignada.pais} width={80} height={54} className="rounded-md shadow-md object-cover" />
            )}
            <div className="text-left">
              <p className="font-serif text-3xl font-bold text-white">{mesaAsignada.pais}</p>
              <p className="text-sm text-primary-foreground/80 mt-1 font-medium">Mesa {mesaAsignada.mesa} · Circuito de Negocios</p>
            </div>
          </div>

          <p className="mt-5 text-sm text-primary-foreground/70 text-left border-t border-white/10 pt-4 relative z-10">
            Pronto recibirás la confirmación oficial y tu código de acceso por correo y WhatsApp.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => { setSubmitted(false); setMesaAsignada(null); setRegisteredName(null); setSelectedPais(""); }}
        className="mt-8 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-[#1e3a8a]"
      >
        Registrar a otra persona
      </button>
    </div>
  );

  const renderFormulario = () => (
    <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
      {cupoRestante !== null && cupoRestante > 0 && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-white">
          <Users size={15} className="text-red-400" />
          <span>
            <strong className="font-semibold text-red-400">Últimos lugares</strong> disponibles
          </span>
        </div>
      )}
      {FIELDS.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <label htmlFor={field.id} className="text-sm font-medium text-primary-foreground/90">
            {field.label}
          </label>

          {field.type === "select" ? (
            <>
              <div className="relative">
                {flagUrl && (
                  <div className="absolute inset-y-0 left-3 flex items-center z-10 pointer-events-none">
                    <Image src={flagUrl} alt={selectedPais} width={28} height={20} className="rounded-sm object-cover shadow" />
                  </div>
                )}
                <select
                  id={field.id}
                  name={field.id}
                  required
                  value={selectedPais}
                  onChange={(e) => setSelectedPais(e.target.value)}
                  className={`w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 py-3 pr-10 text-base text-primary-foreground outline-none transition-colors focus:border-white/60 focus:ring-2 focus:ring-white/20 appearance-none ${flagUrl ? "pl-12" : "pl-4"}`}
                >
                  <option value="" disabled className="text-black">{field.placeholder}</option>
                  {paises.map((p) => (
                    <option key={p} value={p} className="text-black">{p}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {selectedPais === "Otro país / Otra región" && (
                <input
                  type="text"
                  name="customPais"
                  required
                  placeholder="Escribe tu país o región"
                  className="mt-2 w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-base text-primary-foreground outline-none transition-colors focus:border-white/60 focus:ring-2 focus:ring-white/20 placeholder:text-white/50"
                />
              )}
            </>
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
          <><Loader2 size={18} className="animate-spin" /> Guardando...</>
        ) : (
          "Confirmar mi registro y obtener mi mesa →"
        )}
      </button>

      <p className="text-center text-xs text-primary-foreground/60">
        Al registrarte aceptas recibir información sobre el evento de CILA Mujeres.
      </p>
    </form>
  );

  // ── Render principal ──────────────────────────────────────────────────────

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

        {/* Estado: cargando cupo */}
        {cupoRestante === null && (
          <div className="mt-10 flex justify-center">
            <Loader2 size={32} className="animate-spin text-white/50" />
          </div>
        )}

        {/* Estado: cupo lleno */}
        {cupoRestante !== null && cupoRestante <= 0 && !submitted && renderCupoLleno()}

        {/* Estado: registro exitoso */}
        {submitted && mesaAsignada && renderConfirmacion()}

        {/* Estado: formulario disponible */}
        {cupoRestante !== null && cupoRestante > 0 && !submitted && renderFormulario()}
      </div>
    </section>
  );
}
