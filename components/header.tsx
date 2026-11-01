"use client";

import type { View, Status } from "@/lib/ticket-types";

export function Header({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm sm:px-10">
      <div className="flex items-center gap-8 sm:gap-12">
        {/* Identidad Institucional USM con Logo oficial */}
        <button
          className="flex items-center gap-3.5 border-0 bg-transparent text-left focus:outline-none"
          onClick={() => onNavigate("home")}
          aria-label="Ir al inicio de USM Denuncia"
        >
          {/* Contenedor del Logo Institucional (logo.png) */}
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white p-0.5 shadow-sm ring-1 ring-slate-200 transition hover:ring-[#002D72]/40">
            <img
              src="/img/logo.jpg"
              alt="Logo USM"
              className="h-full w-full object-contain"
              onError={(e) => {
                // Fallback elegante en caso de que aún no hayas pegado el archivo en public/
                const target = e.currentTarget;
                target.style.display = "none";
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="flex h-full w-full items-center justify-center bg-[#002D72] text-[13px] font-black tracking-tight text-[#FEF7E6] rounded">
                      USM
                    </div>
                  `;
                }
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-[#002D72]">
              USM Denuncia
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Mesa de Servicios 360°
            </span>
          </div>
        </button>

        {/* Navegación Principal */}
        <nav className="hidden h-full items-center gap-6 sm:flex">
          <button
            className={`relative py-6 text-sm font-semibold transition-colors focus:outline-none ${
              view === "home"
                ? "text-[#002D72] after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:rounded-t after:bg-[#002D72]"
                : "text-slate-600 hover:text-[#002D72]"
            }`}
            onClick={() => onNavigate("home")}
          >
            Inicio
          </button>
          <button
            className={`relative py-6 text-sm font-semibold transition-colors focus:outline-none ${
              view === "tickets"
                ? "text-[#002D72] after:absolute after:inset-x-0 after:bottom-0 after:h-0.75 after:rounded-t after:bg-[#002D72]"
                : "text-slate-600 hover:text-[#002D72]"
            }`}
            onClick={() => onNavigate("tickets")}
          >
            Mis Solicitudes{" "}
            <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700">
              3
            </span>
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Botón de acción rápida: evita desvíos de búsqueda para Tarea 1 */}
        <button
          onClick={() => onNavigate("create")}
          className="hidden items-center gap-1.5 rounded-lg bg-[#002D72] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#001F52] md:flex"
        >
          + Reportar un problema
        </button>

        {/* Perfil del usuario (Diego Pérez) */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 text-xs">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#EBF2FA] text-xs font-bold text-[#002D72] ring-1 ring-[#002D72]/20">
            DP
          </div>
          <div className="hidden flex-col text-left sm:flex">
            <span className="text-xs font-bold text-slate-900">Diego Pérez</span>
            <span className="text-[10px] text-slate-500">Estudiante</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Badge de Estado mejorado:
 * Traduce y categoriza visualmente para que la Tarea 3 (consultar estado)
 * sea instantánea sin confusiones.
 */
export function StatusBadge({ status }: { status: Status | string }) {
  const normalized = (status || "").toLowerCase();

  let label = status;
  let bgStyles = "bg-slate-100 text-slate-700 border-slate-300";
  let dotStyles = "bg-slate-400";

  if (normalized.includes("open") || normalized.includes("nueva") || normalized.includes("abiert")) {
    label = "Nueva / En espera";
    bgStyles = "bg-blue-50 text-blue-800 border-blue-200";
    dotStyles = "bg-blue-600";
  } else if (normalized.includes("progress") || normalized.includes("asignada") || normalized.includes("proceso")) {
    label = "En atención / Asignada";
    bgStyles = "bg-amber-50 text-amber-800 border-amber-200";
    dotStyles = "bg-amber-500 animate-pulse";
  } else if (normalized.includes("resolved") || normalized.includes("resuelta")) {
    label = "Resuelta";
    bgStyles = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotStyles = "bg-emerald-600";
  } else if (normalized.includes("closed") || normalized.includes("cerrada")) {
    label = "Cerrada";
    bgStyles = "bg-slate-100 text-slate-600 border-slate-200";
    dotStyles = "bg-slate-500";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${bgStyles}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotStyles}`} aria-hidden="true" />
      {label}
    </span>
  );
}