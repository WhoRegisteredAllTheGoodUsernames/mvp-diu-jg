"use client";

import { ClipboardList, TriangleAlert } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardTitle } from "@/components/card";
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
          <Button
            className="px-5 py-3.5 text-sm shadow-md shadow-[#002D72]/20 hover:shadow-lg"
            onClick={() => onNavigate("create")}
          >
            <span>+ Crear un ticket</span>
          </Button>

          <Button
            variant="secondary"
            className="px-5 py-3.5 text-sm"
            onClick={() => onNavigate("tickets")}
          >
            <span>Consultar mis solicitudes</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">{ticketCount} totales</span>
          </Button>
        </div>
      </section>

      {/* Sección: Selección guiada para resolver la confusión Incidencia vs Requerimiento */}
      <section className="mt-14 border-t border-slate-200 pt-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle>¿Qué necesitas?</CardTitle>
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
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-red-50 text-[#C8102E] ring-1 ring-red-200">
                  <TriangleAlert aria-hidden="true" />
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
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#EBF2FA] text-[#002D72] ring-1 ring-[#002D72]/20">
                  <ClipboardList aria-hidden="true" />
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
