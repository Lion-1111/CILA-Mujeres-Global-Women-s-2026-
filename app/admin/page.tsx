"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Registro } from "@/lib/supabase";
import { LogOut, RefreshCw, Users, Search, Download, X } from "lucide-react";

const ADMIN_PASSWORD = "cila2026admin";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Check if already logged in via sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin_auth") === "true") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchRegistros();
  }, [authed]);

  const fetchRegistros = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("registros")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setRegistros(data as Registro[]);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setAuthed(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
    setPassword("");
    setRegistros([]);
  };

  const exportCSV = () => {
    const headers = ["ID", "Fecha", "Nombre", "País", "Empresa", "Email", "Teléfono", "Necesidad", "Ofrecimiento", "Mesa #", "Mesa País"];
    const rows = registros.map((r) => [
      r.id,
      new Date(r.created_at).toLocaleString("es-MX"),
      r.nombre,
      r.pais,
      r.empresa,
      r.email,
      r.telefono,
      // Asegurar que las columnas existan y evitar comas internas rompan el CSV
      (r as any).necesidad ? String((r as any).necesidad).replace(/\n/g, " ").replace(/,/g, ";") : "",
      (r as any).ofrecimiento ? String((r as any).ofrecimiento).replace(/\n/g, " ").replace(/,/g, ";") : "",
      r.mesa_numero,
      r.mesa_pais,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registros-cila-mujeres-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = registros.filter(
    (r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.pais.toLowerCase().includes(search.toLowerCase()) ||
      r.empresa.toLowerCase().includes(search.toLowerCase())
  );

  // ── LOGIN SCREEN ──────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-white/70 text-xs font-medium uppercase tracking-widest mb-6">
              Panel Administrativo
            </div>
            <h1 className="text-3xl font-bold text-white">CILA Mujeres</h1>
            <p className="text-white/60 mt-2 text-sm">Acceso restringido · Solo personal autorizado</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 flex flex-col gap-4">
            <label className="text-white/80 text-sm font-medium">Contraseña de acceso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20"
            />
            {passwordError && (
              <p className="text-red-300 text-sm">Contraseña incorrecta. Intenta de nuevo.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-white px-6 py-3 text-[#1e3a8a] font-bold transition hover:bg-white/90"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ADMIN DASHBOARD ───────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">CILA Mujeres · Panel Admin</h1>
            <p className="text-white/40 text-xs mt-0.5">Registros de Global Women&apos;s 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchRegistros}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Actualizar
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500 transition"
            >
              <Download size={14} />
              Exportar CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70 hover:bg-white/10 transition"
            >
              <LogOut size={14} />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users size={20} className="text-blue-400" />
              <span className="text-white/60 text-sm">Total registradas</span>
            </div>
            <p className="text-4xl font-bold text-white">{registros.length}</p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">🌎</span>
              <span className="text-white/60 text-sm">Países representados</span>
            </div>
            <p className="text-4xl font-bold text-white">
              {new Set(registros.map((r) => r.pais)).size}
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg">🏢</span>
              <span className="text-white/60 text-sm">Último registro</span>
            </div>
            <p className="text-base font-semibold text-white truncate">
              {registros[0]
                ? new Date(registros[0].created_at).toLocaleString("es-MX", {
                    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                  })
                : "—"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, país o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30"
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="text-left px-4 py-3 text-white/50 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Nombre</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">País</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Empresa</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Teléfono</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium max-w-[220px]">Necesidad</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium max-w-[220px]">Ofrecimiento</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Mesa</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-white/40">
                      Cargando registros...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-white/40">
                      {search ? "No hay resultados para tu búsqueda." : "Aún no hay registros."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-white/40">{i + 1}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap">
                        {new Date(r.created_at).toLocaleString("es-MX", {
                          day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3 font-medium text-white">{r.nombre}</td>
                      <td className="px-4 py-3 text-white/80">{r.pais}</td>
                      <td className="px-4 py-3 text-white/70">{r.empresa}</td>
                      <td className="px-4 py-3 text-blue-300">{r.email}</td>
                      <td className="px-4 py-3 text-white/70">{r.telefono}</td>
                        <td className="px-4 py-3 text-white/70">
                          <div className="max-w-[220px] truncate inline-block align-middle">{(r as any).necesidad ?? ""}</div>
                          {(r as any).necesidad ? (
                            <button
                              type="button"
                              onClick={() => { setModalTitle("Necesidad"); setModalContent((r as any).necesidad); setModalOpen(true); }}
                              className="ml-2 text-white/60 hover:text-white text-xs underline"
                            >
                              Ver
                            </button>
                          ) : null}
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          <div className="max-w-[220px] truncate inline-block align-middle">{(r as any).ofrecimiento ?? ""}</div>
                          {(r as any).ofrecimiento ? (
                            <button
                              type="button"
                              onClick={() => { setModalTitle("Ofrecimiento"); setModalContent((r as any).ofrecimiento); setModalOpen(true); }}
                              className="ml-2 text-white/60 hover:text-white text-xs underline"
                            >
                              Ver
                            </button>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium">
                            {r.mesa_bandera} {r.mesa_pais}
                          </span>
                        </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-white/30 text-xs mt-4 text-right">
          Mostrando {filtered.length} de {registros.length} registros
        </p>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
            <div className="relative z-10 max-w-2xl w-full bg-[#0b1220] rounded-2xl border border-white/10 p-6 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{modalTitle}</h3>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-white/5"><X /></button>
              </div>
              <div className="mt-4 max-h-72 overflow-auto text-sm whitespace-pre-wrap text-white/90">
                {modalContent}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
