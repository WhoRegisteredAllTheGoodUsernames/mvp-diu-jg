"use client";

import { useState } from "react";
import type { Ticket, View } from "@/lib/ticket-types";
import {
  categories,
  locations,
  requestedForOptions,
} from "@/lib/ticket-data";

export function CreateTicket({
  onNavigate,
  onCreated,
  initialType = "Incidence",
}: {
  onNavigate: (view: View) => void;
  onCreated: (ticket: Ticket) => void;
  initialType?: "Requirement" | "Incidence";
}) {
  const [type, setType] = useState<"Requirement" | "Incidence">(initialType);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState(locations[0] || "");
  const [roomDetail, setRoomDetail] = useState("");
  const [requestedFor, setRequestedFor] = useState(requestedForOptions[0] || "Para mí (Diego Pérez)");
  const [otherPersonName, setOtherPersonName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  const isForOther = requestedFor.includes("nombre de");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const generatedId = `${type === "Requirement" ? "REQ" : "INC"}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullLocation = roomDetail.trim() ? `${location} · Sala/Espacio: ${roomDetail.trim()}` : location;
    const finalRequester = isForOther && otherPersonName.trim() ? otherPersonName.trim() : "Diego Pérez";

    const newTicket: Ticket = {
      id: generatedId,
      title: title.trim(),
      description: description.trim(),
      created: "Hace un momento",
      status: "Open",
      type,
      category: category || categories[0],
      location: fullLocation,
      requestedFor: finalRequester,
      worker: "En espera de asignación",
      group: type === "Incidence" ? "Mantención e Infraestructura" : "Mesa de Servicios DTI",
      resolution: "",
      messages: [
        {
          author: finalRequester,
          text: `Reporte inicial: ${description.trim()}`,
          date: "Hace un momento",
        },
      ],
    };

    setTimeout(() => {
      setCreatedTicketId(generatedId);
      onCreated(newTicket);
    }, 700);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      {/* Modal de confirmación exitosa */}
      {createdTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Solicitud registrada con éxito!</h3>
            <p className="mt-2 text-xs text-slate-600">
              Se ha creado el ticket <span className="font-mono font-bold text-[#002D72]">{createdTicketId}</span> correctamente.
              Podrás consultarlo o editarlo desde tu lista de solicitudes.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onNavigate("tickets")}
                className="w-full rounded-lg bg-[#002D72] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#001F52]"
              >
                Ir a Mis Solicitudes →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cabecera */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#002D72]"
            onClick={() => onNavigate("home")}
          >
            ← Volver al inicio
          </button>
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.15em] text-[#002D72]">
            <span className="h-0.5 w-5 bg-[#D49000]" />
            NUEVA SOLICITUD DE ATENCIÓN
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Ingresar Solicitud al Campus
          </h1>
          <p className="text-xs text-slate-500">
            Completa los antecedentes para derivar el requerimiento al equipo técnico correspondiente.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#EBF2FA] px-3 py-1.5 text-xs font-semibold text-[#002D72]">
          <span>👤 Solicitante activo:</span>
          <strong>Diego Pérez</strong>
        </div>
      </div>

      <form className="grid gap-8 lg:grid-cols-[1fr_340px]" onSubmit={submit}>
        {/* Columna Principal */}
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Selector de Tipo */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              1. Tipo de Solicitud <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                  type === "Incidence"
                    ? "border-[#C8102E] bg-red-50/40 text-slate-900 ring-2 ring-[#C8102E]/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
                onClick={() => setType("Incidence")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#C8102E]">⚠️ Incidencia</span>
                  {type === "Incidence" && <span className="text-xs font-bold text-[#C8102E]">● Activo</span>}
                </div>
                <span className="mt-1 text-[11px] text-slate-500">
                  Falla o desperfecto físico (luces apagadas, goteras, proyector malo).
                </span>
              </button>

              <button
                type="button"
                className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                  type === "Requirement"
                    ? "border-[#002D72] bg-[#EBF2FA]/60 text-slate-900 ring-2 ring-[#002D72]/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
                onClick={() => setType("Requirement")}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#002D72]">📋 Requerimiento</span>
                  {type === "Requirement" && <span className="text-xs font-bold text-[#002D72]">● Activo</span>}
                </div>
                <span className="mt-1 text-[11px] text-slate-500">
                  Petición de nuevo servicio, préstamo de llaves o accesos.
                </span>
              </button>
            </div>
          </div>

          {/* Categoría (Desde ticket-data.ts) */}
          <div>
            <label htmlFor="create-category" className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>2. Categoría del Problema <span className="text-red-500">*</span></span>
              <span className="text-[10px] font-normal text-slate-500">Centralizada en el sistema</span>
            </label>
            <select
              id="create-category"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>-- Selecciona una categoría --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Título */}
          <div>
            <label htmlFor="create-title" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Título o Resumen Breve <span className="text-red-500">*</span>
            </label>
            <input
              id="create-title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Falla en luminarias de sala de clases / Sin luz sector poniente"
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="create-description" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              4. Descripción Detallada <span className="text-red-500">*</span>
            </label>
            <textarea
              id="create-description"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe con precisión qué ocurre para ayudar al resolutor..."
            />
          </div>
        </div>

        {/* Columna Lateral (Ubicación y Solicitante desde ticket-data.ts) */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#002D72] text-[11px] font-bold text-white">
                📍
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Ubicación del Requerimiento
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="create-location" className="mb-1 block text-[11px] font-semibold text-slate-600">
                  Campus / Sector <span className="text-red-500">*</span>
                </label>
                <select
                  id="create-location"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="create-room-detail" className="mb-1 block text-[11px] font-semibold text-slate-600">
                  Sala, Taller o Espacio Específico
                </label>
                <input
                  id="create-room-detail"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72]"
                  placeholder="Ej: Sala B-201 / Lab 3 / Pasillo 2do piso"
                  value={roomDetail}
                  onChange={(e) => setRoomDetail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Solicitante */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              ¿A nombre de quién se reporta?
            </h3>
            <div className="space-y-2">
              {requestedForOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="requestedForOption"
                    value={opt}
                    checked={requestedFor === opt}
                    onChange={(e) => setRequestedFor(e.target.value)}
                    className="text-[#002D72] focus:ring-[#002D72]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {isForOther && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <label htmlFor="create-other-person" className="mb-1 block text-[11px] font-semibold text-slate-600">
                  Nombre o Correo del Solicitante
                </label>
                <input
                  id="create-other-person"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72]"
                  placeholder="Ej: Profe Juan Pérez / jperez@usm.cl"
                  value={otherPersonName}
                  onChange={(e) => setOtherPersonName(e.target.value)}
                  required={isForOther}
                />
              </div>
            )}
          </div>
        </aside>

        {/* Acciones */}
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-200 pt-5">
          <span className="text-xs text-slate-500">
            <span className="font-bold text-red-500">*</span> Campos obligatorios.
          </span>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              onClick={() => onNavigate("home")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex items-center gap-2 rounded-lg bg-[#002D72] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#001F52] disabled:opacity-50"
            >
              {submitted ? "Enviando..." : "Registrar Solicitud →"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
