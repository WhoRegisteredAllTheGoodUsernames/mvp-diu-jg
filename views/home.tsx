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
      {/* Sección Hero / Bienvenida */}
      <section className="max-w-3xl">
        <div className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.15em] text-[#002D72]">
          <span className="h-0.5 w-6 bg-[#D49000]" />
          PORTAL DE ATENCIÓN Y REPORTES DE CAMPUS
        </div>

        <h1 className="mt-4 mb-4 text-4xl font-extrabold leading-tight tracking-tight text-[#002D72] sm:text-5xl lg:text-6xl">
          ¿Cómo podemos ayudarte <br className="hidden sm:inline" />
          <span className="italic font-normal text-slate-800">hoy en tu campus?</span>
        </h1>

        <p className="text-base text-slate-600 sm:text-lg">
          Reporta fallas de infraestructura, solicita servicios o realiza el seguimiento en tiempo real del estado de tus requerimientos.
        </p>

        {/* Botones de acción directa (Hero CTAs) */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            className="flex items-center gap-2 rounded-lg bg-[#002D72] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#002D72]/20 transition-all hover:bg-[#001F52] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#002D72]/50"
            onClick={() => onNavigate("create")}
          >
            <span>+ Reportar un problema</span>
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
          <div>
            <h2 className="text-lg font-bold text-slate-900">¿Qué tipo de atención necesitas?</h2>
            <p className="text-xs text-slate-500">Selecciona una opción para abrir directamente el formulario correspondiente</p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#002D72] bg-[#EBF2FA] px-3 py-1 rounded-full">
            💡 ¿Dudas? Revisa los ejemplos en cada tarjeta
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Tarjeta 1: Incidencia (Fallas, roturas, luminarias) */}
          <button
            type="button"
            onClick={() => onNavigate("create", "Incidence")}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C8102E]/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-xl font-bold text-[#C8102E] ring-1 ring-red-200">
                  ⚠️
                </div>
                <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wide">Falla / Desperfecto</span>
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#002D72]">
                Reportar una Incidencia
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Algo que funcionaba dejó de funcionar o presenta fallas en las dependencias.
              </p>

              <div className="mt-4 rounded-md bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-100">
                <strong className="text-slate-800">Ejemplos:</strong> Luminaria apagada, proyector averiado, enchufe roto, goteras en salas.
              </div>
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
                  📋
                </div>
                <span className="text-xs font-bold text-[#002D72] uppercase tracking-wide">Petición / Servicio</span>
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-[#002D72]">
                Ingresar un Requerimiento
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Solicitud de nuevos accesos, equipos, configuración o tareas programadas.
              </p>

              <div className="mt-4 rounded-md bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-100">
                <strong className="text-slate-800">Ejemplos:</strong> Préstamo de llaves, instalación de software en laboratorio, insumos.
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-[#002D72] group-hover:text-[#001F52]">
              <span>Ingresar solicitud de servicio</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

          {/* Tarjeta 3: Información de Atención Sansana */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Mesa de Ayuda Operativa</span>
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900">Horario de Operaciones USM</h3>
              <p className="mt-1 text-xs text-slate-600">
                Atención para Campus Casa Central, San Joaquín, Vitacura, Concepción y Viña del Mar.
              </p>

              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li className="flex items-center justify-between">
                  <span>Lunes a Jueves:</span>
                  <strong className="text-slate-800">08:00 – 18:00 hrs</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Viernes:</span>
                  <strong className="text-slate-800">08:00 – 17:00 hrs</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Tiempo promedio:</span>
                  <span className="font-semibold text-emerald-700">&lt; 24 hrs respuesta</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              📍 Coordinación de Infraestructura y DTI
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
