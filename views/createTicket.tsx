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
  initialType = "Requirement",
}: {
  onNavigate: (view: View) => void;
  onCreated: (ticket: Ticket) => void;
  initialType?: "Requirement" | "Incidence";
}) {
  const [type, setType] = useState<"Requirement" | "Incidence">(initialType);
  const [requestedFor, setRequestedFor] = useState("Myself");
  const [submitted, setSubmitted] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onCreated({
        id: type === "Requirement" ? "REQ-1052" : "INC-1052",
        title: "New service ticket",
        description: "Your ticket has been submitted to the service desk.",
        created: "Just now",
        status: "Open",
        type,
        category: "General support",
        location: "Madrid HQ",
        requestedFor: requestedFor === "Myself" ? "Alex Morgan" : requestedFor,
        worker: "Unassigned",
        group: "IT Support",
        resolution: "",
        messages: [],
      });
      onNavigate("tickets");
    }, 900);
  }
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <button className="mb-4 border-0 bg-transparent p-0 text-xs font-semibold text-slate-500 hover:text-emerald-700" onClick={() => onNavigate("home")}>
            ← Back to home
          </button>
          <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.15em] text-emerald-700">NEW TICKET</div>
          <h1>Tell us what you need</h1>
          <p>Give us a few details and the right team will pick it up.</p>
        </div>
        <div className="relative flex items-center gap-3 pb-1 font-mono text-[11px] text-slate-400">
          <span className="text-emerald-700">01</span>
          <span className="h-px w-11 bg-slate-200" />
          <span>02</span>
          <small>Details</small>
        </div>
      </div>
      <form className="grid gap-8 lg:grid-cols-[1fr_320px]" onSubmit={submit}>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
            Title <span>*</span>
            <input className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" required placeholder="e.g. Access to the design library" />
          </label>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
            Description <span>*</span>
            <textarea
              className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              required
              placeholder="Describe your request or issue in as much detail as possible..."
              rows={5}
            />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
              Ticket type <span>*</span>
              <div className="flex gap-1 rounded-md bg-slate-100 p-1">
                <button
                  type="button"
                  className={`flex-1 rounded px-2 py-2 text-xs font-semibold ${type === "Requirement" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
                  onClick={() => setType("Requirement")}
                >
                  Requirement
                </button>
                <button
                  type="button"
                  className={`flex-1 rounded px-2 py-2 text-xs font-semibold ${type === "Incidence" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
                  onClick={() => setType("Incidence")}
                >
                  Incidence
                </button>
              </div>
            </label>
            <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
              Category <span>*</span>
              <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" required defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <aside className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-950 font-mono text-[10px] text-emerald-100">02</span>
            <div>
              <h3>Ticket context</h3>
              <p>Help us route this correctly.</p>
            </div>
          </div>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
            Location <span>*</span>
            <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" required defaultValue="">
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-xs font-bold text-slate-800">
            Creating this for <span>*</span>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              value={requestedFor}
              onChange={(e) => setRequestedFor(e.target.value)}
            >
              {requestedForOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <div className="flex gap-2.5 border-t border-slate-200 pt-4 text-[10px] leading-relaxed text-slate-500">
            <span>i</span>
            <p>
              Submitting on behalf of someone else? Their name will be shown as
              the requester.
            </p>
          </div>
        </aside>
        <div className="col-span-full flex items-center justify-between border-t border-slate-200 pt-5 text-xs text-slate-500">
          <span>
            <span className="text-red-600">*</span> Required fields
          </span>
          <div>
            <button
              type="button"
              className="mr-4 bg-transparent px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              onClick={() => onNavigate("home")}
            >
              Cancel
            </button>
            <button className="rounded-md bg-emerald-950 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-800" disabled={submitted}>
              {submitted ? "Sending..." : "Submit ticket"} <span>→</span>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
