"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Registro } from "@/lib/supabase";
import { LogOut, RefreshCw, Users, Search, Download, X, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

const ADMIN_PASSWORD = "cila2026admin";

// ── Helper: encontrar duplicados agrupados por email ──────────────────────────
function getDuplicateGroups(registros: Registro[]): Record<string, Registro[]> {
  const byEmail: Record<string, Registro[]> = {};
  for (const r of registros) {
    const key = r.email.trim().toLowerCase();
    if (!byEmail[key]) byEmail[key] = [];
    byEmail[key].push(r);
  }
  // Solo devolver los que tienen más de 1 registro
  const duplicates: Record<string, Registro[]> = {};
  for (const [email, group] of Object.entries(byEmail)) {
    if (group.length > 1) {
      // Ordenar por created_at ascendente (el primero = el más antiguo = el que se conserva)
      duplicates[email] = group.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
  }
  return duplicates;
}

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
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<"registros" | "duplicados">("registros");
  const [cleaningDups, setCleaningDups] = useState(false);
  const [cleanResult, setCleanResult] = useState<{ removed: number } | null>(null);
  const [dupDeleteConfirm, setDupDeleteConfirm] = useState<number | null>(null);
  const [dupDeleting, setDupDeleting] = useState(false);

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

  const handleDelete = async (id: number) => {
    setDeleting(true);
    const { error } = await supabase.from("registros").delete().eq("id", id);
    if (!error) {
      setRegistros((prev) => prev.filter((r) => r.id !== id));
    }
    setDeleteConfirm(null);
    setDeleting(false);
  };

  // Elimina todos los duplicados conservando solo el registro más antiguo por email
  const cleanDuplicates = async () => {
    setCleaningDups(true);
    setCleanResult(null);
    const groups = getDuplicateGroups(registros);
    const idsToDelete: number[] = [];

    for (const group of Object.values(groups)) {
      // group[0] es el más antiguo (se conserva), los demás se eliminan
      const extras = group.slice(1);
      for (const r of extras) {
        idsToDelete.push(r.id);
      }
    }

    if (idsToDelete.length === 0) {
      setCleanResult({ removed: 0 });
      setCleaningDups(false);
      return;
    }

    const { error } = await supabase
      .from("registros")
      .delete()
      .in("id", idsToDelete);

    if (!error) {
      setRegistros((prev) => prev.filter((r) => !idsToDelete.includes(r.id)));
      setCleanResult({ removed: idsToDelete.length });
    }
    setCleaningDups(false);
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
        {(() => {
          const MAX_CUPO = 200;
          const dupGroups = getDuplicateGroups(registros);
          const dupEmailCount = Object.keys(dupGroups).length;
          const uniqueCount = new Set(registros.map((r) => r.email.trim().toLowerCase())).size;
          const cupoRestante = MAX_CUPO - uniqueCount;
          const pct = Math.min(100, Math.round((uniqueCount / MAX_CUPO) * 100));
          return (
            <div className="flex flex-col gap-4 mb-8">
              {/* Barra de cupo */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/60 text-sm font-medium">Cupo del evento</span>
                  <span className={`text-sm font-bold ${cupoRestante <= 0 ? "text-red-400" : "text-green-400"}`}>
                    {cupoRestante <= 0 ? "¡Cupo completo!" : `${cupoRestante} lugares disponibles`}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-yellow-400" : "bg-green-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-white/40">
                  <span>{uniqueCount} personas únicas registradas</span>
                  <span>Meta: {MAX_CUPO}</span>
                </div>
              </div>

              {/* Tarjetas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users size={20} className="text-blue-400" />
                    <span className="text-white/60 text-sm">Total filas</span>
                  </div>
                  <p className="text-4xl font-bold text-white">{registros.length}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 size={20} className="text-green-400" />
                    <span className="text-white/60 text-sm">Únicos reales</span>
                  </div>
                  <p className="text-4xl font-bold text-green-400">{uniqueCount}</p>
                </div>
                <div className={`rounded-2xl border p-6 ${dupEmailCount > 0 ? "bg-red-900/20 border-red-500/40" : "bg-white/5 border-white/10"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle size={20} className={dupEmailCount > 0 ? "text-red-400" : "text-white/30"} />
                    <span className="text-white/60 text-sm">Duplicados</span>
                  </div>
                  <p className={`text-4xl font-bold ${dupEmailCount > 0 ? "text-red-400" : "text-white"}`}>{dupEmailCount}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">🌎</span>
                    <span className="text-white/60 text-sm">Países</span>
                  </div>
                  <p className="text-4xl font-bold text-white">{new Set(registros.map((r) => r.pais)).size}</p>
                </div>
              </div>
            </div>
          );
        })()}


        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("registros")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === "registros"
                ? "bg-white text-[#0f172a]"
                : "border border-white/20 text-white/60 hover:bg-white/10"
            }`}
          >
            Todos los registros
          </button>
          <button
            onClick={() => { setActiveTab("duplicados"); setCleanResult(null); }}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition ${
              activeTab === "duplicados"
                ? "bg-red-500 text-white"
                : "border border-red-500/40 text-red-400 hover:bg-red-500/10"
            }`}
          >
            <AlertTriangle size={14} />
            Gestionar duplicados
          </button>
        </div>

        {activeTab === "duplicados" ? (
          (() => {
            const groups = getDuplicateGroups(registros);
            const emails = Object.keys(groups);
            return (
              <div>
                <div className="rounded-2xl border border-red-500/30 bg-red-900/10 p-6 mb-6">
                  <h2 className="text-lg font-bold text-red-300 mb-1">Correos registrados más de una vez</h2>
                  <p className="text-sm text-white/50 mb-4">
                    Se conservará <strong className="text-white">únicamente el primer registro</strong> de cada correo (el más antiguo).
                    Los registros duplicados serán eliminados permanentemente.
                  </p>
                  {cleanResult && (
                    <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm mb-4 ${
                      cleanResult.removed > 0
                        ? "bg-green-900/30 border border-green-500/30 text-green-300"
                        : "bg-white/5 border border-white/10 text-white/60"
                    }`}>
                      <CheckCircle2 size={16} />
                      {cleanResult.removed > 0
                        ? `✅ Se eliminaron ${cleanResult.removed} registros duplicados. Ahora hay ${registros.length} registros únicos.`
                        : "No se encontraron duplicados. La lista ya está limpia."}
                    </div>
                  )}
                  <button
                    onClick={cleanDuplicates}
                    disabled={cleaningDups || emails.length === 0}
                    className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-500 transition disabled:opacity-40"
                  >
                    {cleaningDups ? (
                      <><RefreshCw size={15} className="animate-spin" /> Limpiando...</>
                    ) : emails.length === 0 ? (
                      <><CheckCircle2 size={15} /> Sin duplicados — lista limpia</>
                    ) : (
                      <><Trash2 size={15} /> Eliminar {Object.values(groups).reduce((acc, g) => acc + g.length - 1, 0)} duplicados ({emails.length} correos afectados)</>
                    )}
                  </button>
                </div>

                {emails.length === 0 ? (
                  <p className="text-center text-white/30 py-12">🎉 No hay correos duplicados en la base de datos.</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {emails.map((email) => {
                      const group = groups[email];
                      return (
                        <div key={email} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                          <div className="bg-red-900/20 border-b border-red-500/20 px-4 py-2 flex items-center justify-between">
                            <span className="text-red-300 text-sm font-medium">{email}</span>
                            <span className="text-xs text-white/40">{group.length} registros</span>
                          </div>
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="border-b border-white/5">
                                <th className="text-left px-4 py-2 text-white/40 font-medium">Estado</th>
                                <th className="text-left px-4 py-2 text-white/40 font-medium">Fecha</th>
                                <th className="text-left px-4 py-2 text-white/40 font-medium">Nombre</th>
                                <th className="text-left px-4 py-2 text-white/40 font-medium">País</th>
                                <th className="text-left px-4 py-2 text-white/40 font-medium">Empresa</th>
                                <th className="px-4 py-2"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {group.map((r, idx) => (
                                <tr key={r.id} className={`border-b border-white/5 ${
                                  idx === 0 ? "bg-green-900/10" : "bg-red-900/10"
                                }`}>
                                  <td className="px-4 py-2">
                                    {idx === 0
                                      ? <span className="text-green-400 font-semibold">✅ Se conserva</span>
                                      : <span className="text-red-400">🗑 Se elimina</span>}
                                  </td>
                                  <td className="px-4 py-2 text-white/50">
                                    {new Date(r.created_at).toLocaleString("es-MX", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                  </td>
                                  <td className="px-4 py-2 text-white">{r.nombre}</td>
                                  <td className="px-4 py-2 text-white/70">{r.pais}</td>
                                  <td className="px-4 py-2 text-white/70">{r.empresa}</td>
                                  <td className="px-4 py-2">
                                    {idx !== 0 && (
                                      dupDeleteConfirm === r.id ? (
                                        <div className="flex items-center gap-1 whitespace-nowrap">
                                          <button
                                            onClick={async () => {
                                              setDupDeleting(true);
                                              const { error } = await supabase.from("registros").delete().eq("id", r.id);
                                              if (!error) setRegistros((prev) => prev.filter((x) => x.id !== r.id));
                                              setDupDeleteConfirm(null);
                                              setDupDeleting(false);
                                            }}
                                            disabled={dupDeleting}
                                            className="rounded-lg bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-500 transition disabled:opacity-50"
                                          >
                                            {dupDeleting ? "..." : "Confirmar"}
                                          </button>
                                          <button
                                            onClick={() => setDupDeleteConfirm(null)}
                                            className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white/60 hover:bg-white/10 transition"
                                          >
                                            Cancelar
                                          </button>
                                        </div>
                                      ) : (
                                        <button
                                          onClick={() => setDupDeleteConfirm(r.id)}
                                          className="flex items-center gap-1 rounded-lg border border-red-500/30 px-2 py-1.5 text-red-400 hover:bg-red-500/20 transition"
                                          title="Eliminar este registro duplicado"
                                        >
                                          <Trash2 size={12} />
                                          <span>Borrar</span>
                                        </button>
                                      )
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <>
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
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Mesa Asignada</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Empresa</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Teléfono</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium max-w-[220px]">Necesidad</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium max-w-[220px]">Ofrecimiento</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Borrar</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-white/40">
                      Cargando registros...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16 text-white/40">
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
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1.5 text-xs font-semibold text-blue-200">
                          {r.mesa_bandera?.startsWith("http") ? (
                            <img src={r.mesa_bandera} alt="bandera" className="w-4 h-3 object-cover rounded-sm" />
                          ) : (
                            <span>{r.mesa_bandera}</span>
                          )}
                          Mesa {r.mesa_numero} ({r.mesa_pais})
                        </span>
                      </td>
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
                          {deleteConfirm === r.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(r.id)}
                                disabled={deleting}
                                className="rounded-lg bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-500 transition disabled:opacity-50"
                              >
                                {deleting ? "..." : "Confirmar"}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="rounded-lg border border-white/20 px-2 py-1 text-xs text-white/60 hover:bg-white/10 transition"
                              >
                                Cancelar
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(r.id)}
                              className="flex items-center gap-1 rounded-lg border border-red-500/30 px-2 py-1.5 text-red-400 hover:bg-red-500/10 transition"
                              title="Borrar registro"
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
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
        </>
        )}
      </main>
    </div>
  );
}
