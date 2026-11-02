"use client";

import type { View } from "@/lib/ticket-types";

export function Home({
  onNavigate,
  ticketCount,
}: {
  onNavigate: (view: View, initialType?: "Requirement" | "Incidence") => void;
  ticketCount: number;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:px-10 lg:py-16">
      <section className="max-w-3xl">
        <h1 className="mt-4 mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#002D72] sm:text-5xl lg:text-6xl">
          ¿En qué podemos ayudarte?
        </h1>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            className="flex items-center gap-2 rounded-lg bg-[#002D72] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#002D72]/20 transition-all hover:bg-[#001F52] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#002D72]/50"
            onClick={() => onNavigate("create")}
          >
            <span>+ Crear un ticket</span>
          </button>

          <button
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-[#002D72] shadow-sm transition-all hover:border-[#002D72] hover:bg-[#EBF2FA]/40 focus:outline-none"
            onClick={() => onNavigate("tickets")}
          >
            <span>Consultar mis solicitudes</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">{ticketCount} totales</span>
          </button>
        </div>
      </section>

      {/* Sección: Selección guiada para resolver la confusión Incidencia vs Requerimiento */}
      <section className="mt-14 border-t border-slate-200 pt-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">¿Qué necesitas?</h2>
        </div>

        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          {/* Tarjeta 1: Incidencia (Fallas, roturas, luminarias) */}
          <button
            type="button"
            onClick={() => onNavigate("create", "Incidence")}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C8102E]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-xl font-bold text-[#C8102E] ring-1 ring-red-200">

                </div>
                <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wide">Falla / Desperfecto</span>
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#002D72]">
                Reportar una Incidencia
              </h3>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#002D72] group-hover:text-[#001F52]">
              <span>Ingresar reporte de falla</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

          {/* Tarjeta 2: Requerimiento (Solicitudes de servicio, llaves, accesos) */}
          <button
            type="button"
            onClick={() => onNavigate("create", "Requirement")}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#002D72]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#002D72]/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#EBF2FA] text-xl font-bold text-[#002D72] ring-1 ring-[#002D72]/20">

                </div>
                <span className="text-xs font-bold text-[#002D72] uppercase tracking-wide">Petición / Servicio</span>
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#002D72]">
                Ingresar un Requerimiento
              </h3>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#002D72] group-hover:text-[#001F52]">
              <span>Ingresar solicitud de servicio</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

        </div>
      </section>
    </main>
  );
}
