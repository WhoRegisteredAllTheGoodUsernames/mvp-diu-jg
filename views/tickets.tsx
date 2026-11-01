"use client";

import { useMemo, useState } from "react";
import type { Ticket, View } from "@/lib/ticket-types";
import { StatusBadge } from "@/components/header";

export function Tickets({
  tickets,
  onNavigate,
  onSelect,
}: {
  tickets: Ticket[];
  onNavigate: (view: View) => void;
  onSelect: (ticket: Ticket) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<"All" | "Open" | "Resolved">("All");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTickets = useMemo(() => {
    const filtered = tickets.filter((ticket) => {
      // Filtro por Estado
      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Resolved"
          ? ticket.status === "Resolved" || ticket.status === "Closed"
          : ticket.status !== "Resolved" && ticket.status !== "Closed";

      // Filtro por Búsqueda (ID, Título, Ubicación o Categoría)
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        ticket.id.toLowerCase().includes(q) ||
        ticket.title.toLowerCase().includes(q) ||
        ticket.category.toLowerCase().includes(q) ||
        ticket.location.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      const comparison = (a.created || "").localeCompare(b.created || "");
      return sortOrder === "recent" ? -comparison : comparison;
    });
  }, [tickets, statusFilter, sortOrder, searchQuery]);

  // Contadores para las pestañas
  const counts = useMemo(() => {
    const openCount = tickets.filter(
      (t) => t.status !== "Resolved" && t.status !== "Closed"
    ).length;
    const resolvedCount = tickets.filter(
      (t) => t.status === "Resolved" || t.status === "Closed"
    ).length;
    return { all: tickets.length, open: openCount, resolved: resolvedCount };
  }, [tickets]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      {/* Encabezado Principal */}
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <button
            type="button"
            className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#002D72]"
            onClick={() => onNavigate("home")}
          >
            ← Volver al inicio
          </button>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.14em] text-[#002D72]">
            <span className="h-0.5 w-5 bg-[#D49000]" />
            SEGUIMIENTO DE CASOS
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Mis Solicitudes y Reportes
            <span className="ml-3 inline-flex items-center rounded-full bg-[#EBF2FA] px-2.5 py-0.5 align-middle font-mono text-xs font-bold text-[#002D72]">
              {tickets.length} totales
            </span>
          </h1>
          <p className="mt-1 text-xs text-slate-600 sm:text-sm">
            Revisa el estado en tiempo real, complementa información o consulta la resolución de tus requerimientos.
          </p>
        </div>

        {/* Botón directo para crear ticket */}
        <button
          className="flex items-center gap-2 rounded-lg bg-[#002D72] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#001F52]"
          onClick={() => onNavigate("create")}
        >
          <span>+ Reportar un problema</span>
        </button>
      </div>

      {/* Barra de Filtros, Búsqueda y Ordenamiento */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Pestañas de estado */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter("All")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
              statusFilter === "All"
                ? "bg-[#002D72] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>Todas</span>
            <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
              statusFilter === "All" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}>
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Open")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
              statusFilter === "Open"
                ? "bg-[#002D72] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>En atención / Activas</span>
            <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
              statusFilter === "Open" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
            }`}>
              {counts.open}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Resolved")}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
              statusFilter === "Resolved"
                ? "bg-[#002D72] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>Resueltas</span>
            <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
              statusFilter === "Resolved" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800"
            }`}>
              {counts.resolved}
            </span>
          </button>
        </div>

        {/* Buscador + Orden */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:max-w-md">
          {/* Input de Búsqueda rápida */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por ID, título o sala..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3 pl-8 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
            />
            <span className="absolute left-2.5 top-2.5 text-xs text-slate-400">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Selector de ordenamiento */}
          <label className="shrink-0 text-xs text-slate-500">
            <span className="sr-only">Ordenar solicitudes</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "recent" | "oldest")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#002D72]"
            >
              <option value="recent">Más recientes</option>
              <option value="oldest">Más antiguas</option>
            </select>
          </label>
        </div>
      </div>

      {/* Listado de Tickets (Resuelve la Tarea 3 al mostrar estado claro y directo) */}
      <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {visibleTickets.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl text-slate-400">
              📋
            </div>
            <h3 className="text-sm font-bold text-slate-800">No se encontraron solicitudes</h3>
            <p className="mt-1 text-xs text-slate-500">
              {searchQuery
                ? "Prueba buscando con otros términos o limpia el filtro."
                : "Aún no has generado requerimientos en este estado."}
            </p>
          </div>
        ) : (
          visibleTickets.map((ticket) => {
            const isIncidence = ticket.type === "Incidence";
            return (
              <button
                type="button"
                key={ticket.id}
                onClick={() => onSelect(ticket)}
                className="group flex w-full flex-col gap-3 p-5 text-left transition hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:gap-5"
              >
                {/* ID e Ícono de tipo */}
                <div className="flex items-center gap-3 sm:w-36 shrink-0">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold ${
                      isIncidence ? "bg-red-50 text-[#C8102E]" : "bg-[#EBF2FA] text-[#002D72]"
                    }`}
                    title={isIncidence ? "Incidencia técnica" : "Requerimiento de servicio"}
                  >
                    {isIncidence ? "⚠️" : "📋"}
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#002D72] group-hover:underline">
                      {ticket.id}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {ticket.created || "Reciente"}
                    </span>
                  </div>
                </div>

                {/* Contenido principal: Título, Categoría y Ubicación */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#002D72] line-clamp-1">
                    {ticket.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                    <span className="font-medium text-slate-700">
                      {ticket.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      📍 {ticket.location || "Campus San Joaquín"}
                    </span>
                  </div>
                </div>

                {/* Badge de Estado: Destacado visualmente para Tarea 3 */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <StatusBadge status={ticket.status} />
                  <span className="text-xs font-bold text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#002D72]">
                    Ver detalle →
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Pie de lista */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <p>
          Mostrando <strong className="text-slate-700">{visibleTickets.length}</strong> de{" "}
          <strong className="text-slate-700">{tickets.length}</strong> solicitudes
        </p>
        <span className="text-[11px] text-slate-400">
          💡 Haz clic en cualquier ticket para ver la bitácora o complementarlo
        </span>
      </div>
    </main>
  );
}
