"use client";

import { useState } from "react";
import type { Ticket } from "@/lib/ticket-types";
import { StatusBadge } from "@/components/header";

export function TicketDetail({
  ticket,
  onBack,
  onUpdate,
}: {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (ticket: Ticket) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [surveySent, setSurveySent] = useState(false);
  const canEdit = ticket.status === "Open";
  function save(e: React.FormEvent) {
    e.preventDefault();
    onUpdate({ ...ticket, title, description });
    setEditing(false);
  }
  function addMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    onUpdate({
      ...ticket,
      messages: [
        ...ticket.messages,
        { author: "Alex Morgan", text: message.trim(), date: "Just now" },
      ],
    });
    setMessage("");
  }
  function submitSurvey(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    setSurveySent(true);
  }
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <button className="mb-8 inline-flex items-center text-sm font-semibold text-emerald-800 hover:text-emerald-950" onClick={onBack}>
        ← Back to my tickets
      </button>
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="font-mono text-xs font-bold tracking-widest text-emerald-700">{ticket.id}</div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-950">{ticket.title}</h1>
          <p className="mt-2 text-sm text-slate-500">\n            Created {ticket.created} · {ticket.type}\n          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={ticket.status} />
          {canEdit && (
            <button
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-slate-50"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit ticket"}
            </button>
          )}
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          {editing ? (
            <form className="space-y-5" onSubmit={save}>
              <div className="mb-5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">EDIT REQUEST</div>
              <label>
                Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </label>
              <button className="rounded-md bg-emerald-950 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-800" type="submit">
                Save changes <span>→</span>
              </button>
            </form>
          ) : (
            <>
              <div className="mb-5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">REQUEST DETAILS</div>
              <h3>Description</h3>
              <p className="mt-2 leading-7 text-slate-600">{ticket.description}</p>
              <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
                <div>
                  <span>Category</span>
                  <strong>{ticket.category}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{ticket.location}</strong>
                </div>
                <div>
                  <span>Requested for</span>
                  <strong>{ticket.requestedFor}</strong>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">ASSIGNMENT</div>
          <div className="mt-5 flex items-center gap-3">
            <span className="worker-avatar inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-center leading-none align-middle">
            </span>
            <div>
              <span>Assigned worker</span>
              <strong>{ticket.worker}</strong>
              <small>{ticket.group}</small>
            </div>
          </div>
          <div className="mt-7 space-y-5 border-l border-slate-200 pl-5">
            <div className="relative text-sm font-semibold text-emerald-950">
              <span />
              Ticket submitted<div>Created {ticket.created}</div>
            </div>
            <div
              className="relative text-sm font-semibold text-emerald-950"
            >
              <span />
              Being reviewed
              <div>
                {ticket.status === "Open"
                  ? "The support team will review this ticket"
                  : "Assigned to the support team"}
              </div>
            </div>
            {ticket.status === "Resolved" && (
              <div className="relative text-sm font-semibold text-emerald-950">
                <span />
                Ticket closed
                <div>
                  {ticket.resolution ||
                    "Closed by the assigned person as the resolution."}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      {ticket.status !== "Open" && (
        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">ADDITIONAL INFORMATION</div>
          <h3>Keep the conversation going</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Send a message to{" "}
            {ticket.worker === "Unassigned"
              ? "the support team"
              : ticket.worker}{" "}
            with any extra context.
          </p>
          <form className="mt-5 flex flex-col gap-3" onSubmit={addMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message about this ticket..."
              rows={3}
            />
            <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-950 hover:bg-slate-50" type="submit">
              Send message <span>→</span>
            </button>
          </form>
          {ticket.messages.length > 0 && (
            <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
              {ticket.messages.map((item, index) => (
                <div className="rounded-lg bg-slate-50 p-4" key={`${item.date}-${index}`}>
                  <div className="mb-2 flex items-center gap-3 border-b border-slate-200 pb-2">
                    <strong className="text-xs">{item.author}</strong>
                    <span className="font-mono text-[10px] text-slate-500">{item.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {ticket.status === "Resolved" && (
        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 text-[11px] font-bold tracking-[0.14em] text-emerald-700">HOW DID WE DO?</div>
          {surveySent ? (
            <div className="flex flex-col gap-1 text-sm text-slate-600">
              <strong>Thanks for your feedback.</strong>
              <span>Your evaluation has been recorded.</span>
            </div>
          ) : (
            <form onSubmit={submitSurvey}>
              <h3>How would you rate the resolution?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                The assigned person closed this ticket as resolved. Tell us if
                the solution worked for you.
              </p>
              <div
                className="my-5 flex gap-2"
                role="radiogroup"
                aria-label="Resolution rating"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition ${rating >= value ? "border-emerald-950 bg-emerald-950 text-white" : "border-slate-300 bg-white text-emerald-950 hover:bg-slate-50"}`}
                    onClick={() => setRating(value)}
                    aria-label={`${value} out of 5`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <label>
                Optional comment
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What could we improve?"
                  rows={3}
                />
              </label>
              <button
                className="rounded-md bg-emerald-950 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
                type="submit"
                disabled={!rating}
              >
                Submit evaluation <span>→</span>
              </button>
            </form>
          )}
        </section>
      )}
    </main>
  );
}
