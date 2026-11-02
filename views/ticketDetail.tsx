"use client";

import { useState } from "react";
import type { Ticket } from "@/lib/ticket-types";
import type { User } from "@/lib/user-types";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { PageTitle, Description, SectionTitle } from "@/components/typography";
import { Pencil, UserRound } from "lucide-react";
import { StatusBadge } from "@/components/header";

export function TicketDetail({
  ticket,
  onBack,
  onUpdate,
  user,
}: {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (ticket: Ticket) => void;
  user: User;
}) {
  // Estados para Edición Directa (Tarea 2)
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [location, setLocation] = useState(ticket.location);

  // Estados para Mensajes / Comentarios adicionales
  const [message, setMessage] = useState("");

  // Estados para Encuesta de Calidad (Hipótesis 5) y Reapertura (Hipótesis 6)
  const [rating, setRating] = useState(ticket.evaluation?.rating ?? 0);
  const [feedback, setFeedback] = useState(ticket.evaluation?.comment ?? "");
  const [ticketReopened, setTicketReopened] = useState(false);

  function resetDraft() {
    setTitle(ticket.title);
    setDescription(ticket.description);
    setLocation(ticket.location);
  }

  function cancelEditing() {
    resetDraft();
    setEditing(false);
  }

  function toggleEditing() {
    resetDraft();
    setEditing(!editing);
  }

  // Guardar edición directa
  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onUpdate({
      ...ticket,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      messages: [
        ...ticket.messages,
        {
          id: `msg-${Date.now()}`,
          author: user.full_name,
          text: `[Información actualizada por el solicitante]: Título o descripción corregida.`,
          date: "Hace un momento",
        },
      ],
    });
    setEditing(false);
  }

  // Agregar comentario / nota complementaria
  function handleAddMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    onUpdate({
      ...ticket,
      messages: [
        ...ticket.messages,
        {
          id: `msg-${Date.now()}`,
          author: user.full_name,
          text: message.trim(),
          date: "Hace un momento",
        },
      ],
    });
    setMessage("");
  }

  // Enviar evaluación
  function handleSubmitSurvey(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    onUpdate({
      ...ticket,
      evaluation: { rating, comment: feedback.trim() },
    });
  }

  // Reabrir Ticket si el problema continúa (Hipótesis 6)
  function handleReopenTicket() {
    onUpdate({
      ...ticket,
      status: "In progress",
      messages: [
        ...ticket.messages,
        {
          id: `msg-${Date.now()}`,
          author: user.full_name,
          text: "Ticket reabierto por el solicitante. El problema persiste o el requerimiento no ha sido solucionado.",
          date: "Hace un momento",
        },
      ],
    });
    setTicketReopened(true);
  }

  const isResolved = ticket.status === "Resolved";

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      {/* Botón de retroceso */}
      <button
        type="button"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition hover:text-[#002D72]"
        onClick={onBack}
      >
        ← Volver a Mis Solicitudes
      </button>

      {/* Encabezado del Ticket con Acciones */}
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-wider text-[#002D72]">
              {ticket.id}
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {ticket.type === "Incidence" ? "Incidencia" : "Requerimiento"}
            </span>
          </div>

          <PageTitle className="text-2xl sm:text-3xl">
            {ticket.title}
          </PageTitle>

            <Description>
            {ticket.created} · {ticket.requestedFor || user.full_name}
            </Description>
        </div>

        {/* Controles de Estado y Botón de Edición (Tarea 2) */}
        <div className="flex flex-wrap items-center gap-3 sm:self-center">
          <StatusBadge status={ticket.status} />

          {!isResolved && (
            <button
              type="button"
              className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold shadow-xs transition ${
                editing
                  ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "border-[#002D72] bg-white text-[#002D72] hover:bg-[#EBF2FA]"
              }`}
              onClick={toggleEditing}
            >
                  {editing ? null : <Pencil aria-hidden="true" />}
                  <span>{editing ? "Cancelar edición" : "Editar"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Notificación de ticket reabierto */}
      {ticketReopened && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
                  <p><strong>Ticket reabierto.</strong> El equipo revisará el caso nuevamente.</p>
        </div>
      )}

      {/* Cuadrícula de Información Principal */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Columna Izquierda: Detalle o Formulario de Edición */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {editing ? (
              /* Modo Edición Activo (Resuelve Tarea 2 de manera directa) */
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#002D72]">
                    <span className="h-0.5 w-4 bg-[#D49000]" />
                    EDITAR INFORMACIÓN DE LA SOLICITUD
                  </div>
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Modo corrección activo
                  </span>
                </div>

                <div>
                  <label htmlFor="edit-title" className="mb-1 block text-xs font-bold text-slate-700">
                    Título del ticket
                  </label>
                  <input
                    id="edit-title"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-location" className="mb-1 block text-xs font-bold text-slate-700">
                    Ubicación / Sala
                  </label>
                  <input
                    id="edit-location"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-description" className="mb-1 block text-xs font-bold text-slate-700">
                    Descripción / Antecedentes adicionales
                  </label>
                  <textarea
                    id="edit-description"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    onClick={cancelEditing}
                  >
                    Descartar cambios
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#002D72] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#001F52]"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            ) : (
              /* Modo Visualización Normal */
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#002D72]">
                  <span className="h-0.5 w-4 bg-[#D49000]" />
                  DETALLE DEL CASO
                </div>

                <div className="mt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Descripción del ticket
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Categoría
                    </span>
                    <strong className="mt-1 block text-xs font-semibold text-slate-800">
                      {ticket.category}
                    </strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Ubicación exacta
                    </span>
                    <strong className="mt-1 block text-xs font-semibold text-slate-800">
                      {ticket.location}
                    </strong>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Solicitante
                    </span>
                    <strong className="mt-1 block text-xs font-semibold text-slate-800">
                      {ticket.requestedFor || user.full_name}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Sección: Bitácora de Comunicación y Agregar Antecedentes (SIEMPRE DISPONIBLE) */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#002D72]">
                  <span className="h-0.5 w-4 bg-[#D49000]" />
                  Historial
                </div>

              </div>
            </div>

            {/* Formulario de Comentario Rápido */}
            <form className="mt-4 flex flex-col gap-3" onSubmit={handleAddMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí antecedentes complementarios (ej: 'El proyector tampoco enciende', 'La sala estará ocupada después de las 14:00 hrs')..."
                rows={3}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-none transition focus:border-[#002D72] focus:ring-2 focus:ring-[#002D72]/15"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="rounded-lg bg-[#002D72] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#001F52] disabled:opacity-40"
                >
                  Agregar nota al ticket →
                </button>
              </div>
            </form>

            {/* Listado de mensajes en la bitácora */}
            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
              {ticket.messages && ticket.messages.length > 0 ? (
                ticket.messages.map((item, index) => (
                  <div
                    key={item.id || index}
                    className={`rounded-xl p-4 border text-xs leading-relaxed ${
                      item.author === user.full_name
                        ? "border-blue-100 bg-[#EBF2FA]/40"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <strong className={`font-bold ${item.author === user.full_name ? "text-[#002D72]" : "text-slate-800"}`}>
                        {item.author} {item.author === user.full_name && "(Tú)"}
                      </strong>
                      <span className="font-mono text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-slate-700">{item.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-3">
                  No hay notas complementarias registradas en este caso aún.
                </p>
              )}
            </div>
          </section>

          {/* Sección: Evaluación y Reabrir Ticket (Hipótesis 5 y 6) */}
          {isResolved && (
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#002D72]">
                <span className="h-0.5 w-4 bg-[#D49000]" />
                Evaluación
              </div>

              {ticket.evaluation ? (
                <div className="mt-4 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-900">
                  <p className="font-bold">¡Gracias por evaluar la atención!</p>
                  <p className="mt-0.5">Tus comentarios nos ayudan a mejorar los servicios del campus.</p>
                  <p className="mt-2 font-semibold">
                    Tu evaluación: {ticket.evaluation.rating} de 5 estrellas.
                  </p>
                  {ticket.evaluation.comment && (
                    <p className="mt-1 whitespace-pre-wrap">{ticket.evaluation.comment}</p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmitSurvey} className="mt-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    ¿Se solucionó satisfactoriamente el ticket?
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Califica la rapidez y efectividad del equipo de mantención.
                  </p>

                  <div className="my-4 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setRating(val)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-bold transition ${
                          rating >= val
                            ? "border-[#D49000] bg-[#D49000] text-white shadow-sm"
                            : "border-slate-300 bg-white text-slate-700 hover:border-[#D49000]"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-xs font-semibold text-slate-700">
                        {rating} de 5 estrellas
                      </span>
                    )}
                  </div>

                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Comentarios sobre la resolución (opcional)..."
                    rows={2}
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-800 outline-none focus:border-[#002D72]"
                  />

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={!rating}
                      className="rounded-lg bg-[#002D72] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#001F52] disabled:opacity-40"
                    >
                      Enviar evaluación
                    </button>
                  </div>
                </form>
              )}

              {/* La reapertura sigue disponible después de evaluar la atención. */}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleReopenTicket}
                  className="rounded-lg border border-red-300 bg-red-50/50 px-3 py-2 text-xs font-bold text-[#C8102E] hover:bg-red-50"
                >
                  Reabrir caso
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Columna Derecha: Asignación y Línea de Tiempo (Timeline de Estado) */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#002D72]">
              <span className="h-0.5 w-4 bg-[#D49000]" />
              EQUIPO ASIGNADO
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#EBF2FA] text-[#002D72]">
                <UserRound aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase font-bold text-slate-400">Técnico resolutor</span>
                <strong className="block text-xs font-bold text-slate-900 truncate">
                  {ticket.worker && ticket.worker !== "Unassigned" ? ticket.worker : "Personal de Turno"}
                </strong>
                <span className="block text-[11px] text-slate-500 truncate">
                  {ticket.group || "Mantención e Infraestructura"}
                </span>
              </div>
            </div>

            {/* Línea de tiempo (Timeline) para que la Tarea 3 sea transparente */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Progreso del requerimiento
              </h4>

              <div className="relative space-y-5 border-l-2 border-slate-200 pl-4 text-xs">
                {/* Paso 1: Ingreso */}
                <div className="relative">
                  <span className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <strong className="block text-slate-900">Solicitud Ingresada</strong>
                  <span className="text-[10px] text-slate-400">Registrada el {ticket.created}</span>
                </div>

                {/* Paso 2: Revisión y Asignación */}
                <div className="relative">
                  <span
                    className={`absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full ${
                      ticket.status !== "Open"
                        ? "bg-emerald-500 ring-4 ring-emerald-100"
                        : "bg-amber-400 ring-4 ring-amber-100 animate-pulse"
                    }`}
                  />
                  <strong className="block text-slate-900">En Atención Técnica</strong>
                  <span className="text-[10px] text-slate-500">
                    {ticket.status === "Open"
                      ? "En cola de revisión por el supervisor"
                      : "Derivado a técnicos en terreno"}
                  </span>
                </div>

                {/* Paso 3: Cierre */}
                <div className="relative">
                  <span
                    className={`absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full ${
                      isResolved
                        ? "bg-emerald-500 ring-4 ring-emerald-100"
                        : "bg-slate-300"
                    }`}
                  />
                  <strong className={`block ${isResolved ? "text-slate-900" : "text-slate-400"}`}>
                    Resolución y Cierre
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {isResolved
                      ? ticket.resolution || "Trabajo finalizado e inspeccionado."
                      : "Pendiente de resolución en campus"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Ayuda y Contacto Rápido */}
          <section className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900">¿Dudas con esta solicitud?</h4>
            <p className="mt-1 leading-relaxed text-slate-500 text-[11px]">
              Puedes comunicarte directamente con la Mesa de Ayuda indicando el código{" "}
              <strong className="font-mono text-[#002D72]">{ticket.id}</strong>.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
              📞 Anexo USM: 2000 · dti@usm.cl
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
