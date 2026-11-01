"use client";

import { useState } from "react";
import type { Ticket, View } from "@/lib/ticket-types";

// Categorías pensadas para resolver los dolores de usabilidad del informe USM
const usmCategories = [
  "Electricidad e Iluminación (Luminarias, enchufes, interruptores)",
  "Infraestructura y Mantención (Puertas, ventanas, cerraduras, pintura)",
  "Mobiliario y Salas (Sillas, mesas, pizarras, bancos)",
  "Equipamiento Audiovisual (Proyectores, telones, sistemas de audio)",
  "Redes y Conectividad (Wi-Fi USM, puntos de red)",
  "Aseo y Servicios Generales (Baños, dispensadores, limpieza)",
  "Climatización y Ventilación (Aire acondicionado, calefacción)",
];

const usmCampuses = [
  "Campus Casa Central Valparaíso",
  "Campus San Joaquín",
  "Campus Vitacura",
  "Sede Viña del Mar",
  "Sede Concepción",
];

export function CreateTicket({
  onNavigate,
  onCreated,
  initialType = "Incidence",
}: {
  onNavigate: (view: View) => void;
  onCreated: (ticket: Ticket) => void;
  initialType?: "Requirement" | "Incidence";
}) {
  // Form States (Capturan los datos reales que escribe el usuario)
  const [type, setType] = useState<"Requirement" | "Incidence">(initialType);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  
  // Ubicación jerárquica (Campus -> Edificio -> Sala) solicitada en los resultados del informe
  const [campus, setCampus] = useState(usmCampuses[1]); // Default San Joaquín
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");

  // Manejo de solicitante (Para mí vs. A nombre de otro)
  const [isForOther, setIsForOther] = useState(false);
  const [otherPersonName, setOtherPersonName] = useState("");

  // Estado de envío y modal de feedback
  const [submitted, setSubmitted] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    const generatedId = `${type === "Requirement" ? "REQ" : "INC"}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullLocation = `${campus}${building ? ` · Edificio ${building}` : ""}${room ? ` · Sala/Espacio ${room}` : ""}`;
    const requester = isForOther && otherPersonName.trim() ? otherPersonName.trim() : "Diego Pérez";

    const newTicket: Ticket = {
      id: generatedId,
      title: title.trim() || (type === "Incidence" ? "Falla de luminarias en sala" : "Solicitud de servicio"),
      description: description.trim() || "Reporte generado por el usuario.",
      created: "Hace un momento",
      status: "Open",
      type,
      category: category || "Electricidad e Iluminación (Luminarias, enchufes, interruptores)",
      location: fullLocation,
      requestedFor: requester,
      worker: "En espera de asignación",
      group: type === "Incidence" ? "Mantención e Infraestructura" : "Mesa de Servicios DTI",
      resolution: "",
      messages: [
        {
          id: `msg-${Date.now()}`,
          author: requester,
          date: "Hace un momento",
          text: `Reporte inicial: ${description.trim()}`,
        },
      ],
    };

    // Feedback visual de 800ms y luego notificación clara
    setTimeout(() => {
      setCreatedTicketId(generatedId);
      onCreated(newTicket);
    }, 700);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      {/* Modal / Toast de confirmación de registro exitoso (Ataca dolor del informe) */}
      {createdTicketId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
              ✓
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Solicitud registrada con éxito!</h3>
            <p className="mt-2 text-xs text-slate-600">
              Se ha creado el ticket <span className="font-mono font-bold text-[#002D72]">{createdTicketId}</span> correctamente.
              Podrás editarlo o agregar comentarios antes de que sea atendido.
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

      {/* Cabecera del formulario */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
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
            NUEVO REQUERIMIENTO O INCIDENCIA
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Ingresar Solicitud de Atención
          </h1>
          <p className="text-xs text-slate-500">
            Completa la información del problema para derivarlo al área técnica responsable.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#EBF2FA] px-3 py-1.5 text-xs font-semibold text-[#002D72]">
          <span>👤 Solicitante:</span>
          <strong>Diego Pérez (Tú)</strong>
        </div>
      </div>

      <form className="grid gap-8 lg:grid-cols-[1fr_340px]" onSubmit={submit}>
        {/* Columna Principal: Datos del problema */}
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          
          {/* Selector de Tipo (Incidencia vs Requerimiento) */}
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
                  {type === "Incidence" && <span className="text-xs font-bold text-[#C8102E]">● Seleccionado</span>}
                </div>
                <span className="mt-1 text-[11px] text-slate-500 leading-tight">
                  Falla, avería o desperfecto (Ej: luces apagadas, proyector malo).
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
                  {type === "Requirement" && <span className="text-xs font-bold text-[#002D72]">● Seleccionado</span>}
                </div>
                <span className="mt-1 text-[11px] text-slate-500 leading-tight">
                  Petición de nuevo servicio, préstamo o acceso programado.
                </span>
              </button>
            </div>
          </div>

          {/* Categoría clara y guiada */}
          <div>
            <label htmlFor="ticket-category" className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700">
              <span>2. Categoría del Problema <span className="text-red-500">*</span></span>
              <span className="text-[10px] font-normal text-slate-500">Selecciona la que más se aproxime</span>
            </label>
            <select
              id="ticket-category"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>-- Selecciona una categoría --</option>
              {usmCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Título de la solicitud */}
          <div>
            <label htmlFor="ticket-title" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              3. Título o Resumen Breve <span className="text-red-500">*</span>
            </label>
            <input
              id="ticket-title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Falla en luminarias de sala de clases / Sin luz sector poniente"
            />
          </div>

          {/* Descripción detallada */}
          <div>
            <label htmlFor="ticket-description" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
              4. Descripción Detallada del Problema <span className="text-red-500">*</span>
            </label>
            <textarea
              id="ticket-description"
              className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#002D72] focus:ring-3 focus:ring-[#002D72]/15"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Indica qué ocurre, desde cuándo y cualquier antecedente relevante para ayudar al técnico a solucionarlo..."
            />
          </div>
        </div>

        {/* Columna Lateral: Ubicación jerárquica y Solicitante */}
        <aside className="flex flex-col gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#002D72] text-[11px] font-bold text-white">
                📍
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Ubicación en el Campus
              </h3>
            </div>
            
            <p className="mb-4 text-[11px] text-slate-500">
              Especifica el lugar exacto para que el personal de mantención pueda llegar directamente:
            </p>

            <div className="space-y-3">
              {/* Campus */}
              <div>
                <label htmlFor="ticket-campus" className="mb-1 block text-[11px] font-semibold text-slate-600">Campus o Sede <span className="text-red-500">*</span></label>
                <select
                  id="ticket-campus"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                  value={campus}
                  onChange={(e) => setCampus(e.target.value)}
                  required
                >
                  {usmCampuses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Edificio / Sector */}
              <div>
                <label htmlFor="ticket-building" className="mb-1 block text-[11px] font-semibold text-slate-600">Edificio o Bloque <span className="text-red-500">*</span></label>
                <input
                  id="ticket-building"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                  placeholder="Ej: Edificio B / Bloque F / Patio Central"
                  required
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                />
              </div>

              {/* Sala / Espacio específico */}
              <div>
                <label htmlFor="ticket-room" className="mb-1 block text-[11px] font-semibold text-slate-600">Sala, Laboratorio o Espacio <span className="text-red-500">*</span></label>
                <input
                  id="ticket-room"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                  placeholder="Ej: Sala B-201 / Laboratorio Computación 3"
                  required
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Bloque: ¿En nombre de quién? (Aclara la confusión del test) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-800">
              ¿Para quién es la solicitud?
            </h3>
            <p className="mb-3 text-[11px] text-slate-500">
              Por defecto se registrará a tu nombre como estudiante solicitante.
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="requestedForOption"
                  checked={!isForOther}
                  onChange={() => setIsForOther(false)}
                  className="text-[#002D72] focus:ring-[#002D72]"
                />
                <span>Para mí (Diego Pérez)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="requestedForOption"
                  checked={isForOther}
                  onChange={() => setIsForOther(true)}
                  className="text-[#002D72] focus:ring-[#002D72]"
                />
                <span>Reportar en nombre de otra persona</span>
              </label>
            </div>

            {isForOther && (
              <div className="mt-3 pt-3 border-t border-slate-200 animate-fadeIn">
                <label htmlFor="ticket-other-person" className="mb-1 block text-[11px] font-semibold text-slate-600">
                  Nombre o Correo del Solicitante
                </label>
                <input
                  id="ticket-other-person"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72]"
                  placeholder="Ej: Profesor Juan Pérez / jperez@usm.cl"
                  value={otherPersonName}
                  onChange={(e) => setOtherPersonName(e.target.value)}
                  required={isForOther}
                />
              </div>
            )}
          </div>
        </aside>

        {/* Barra de Acciones / Submit */}
        <div className="col-span-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-200 pt-5">
          <span className="text-xs text-slate-500">
            <span className="font-bold text-red-500">*</span> Campos obligatorios para el seguimiento.
          </span>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              onClick={() => onNavigate("home")}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="flex items-center gap-2 rounded-lg bg-[#002D72] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#001F52] disabled:opacity-50"
            >
              {submitted ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Enviando ticket...</span>
                </>
              ) : (
                <>
                  <span>Registrar Solicitud</span>
                  <span className="text-[#D49000]">→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
