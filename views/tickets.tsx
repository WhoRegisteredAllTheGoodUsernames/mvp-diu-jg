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

  const visibleTickets = useMemo(() => {
    const filtered = tickets.filter((ticket) => {
      if (statusFilter === "All") return true;
      return statusFilter === "Resolved"
        ? ticket.status === "Resolved"
        : ticket.status !== "Resolved";
    });

    return [...filtered].sort((a, b) => {
      const comparison = a.created.localeCompare(b.created);
      return sortOrder === "recent" ? -comparison : comparison;
    });
  }, [tickets, statusFilter, sortOrder]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 text-[11px] font-bold tracking-[0.14em] text-emerald-700">YOUR ACTIVITY</div>
          <h1>
            My tickets <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 align-middle text-sm text-emerald-800">{tickets.length}</span>
          </h1>
          <p>
            Track requests and incidents you've raised with the service desk.
          </p>
        </div>
        <button className="rounded-md bg-emerald-950 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-800" onClick={() => onNavigate("create")}>
          Create a ticket <span>+</span>
        </button>
      </div>
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {(["All", "Open", "Resolved"] as const).map((filter) => (
            <button
              className={`rounded-full px-3 py-2 text-xs font-semibold ${statusFilter === filter ? "bg-emerald-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              key={filter}
              onClick={() => setStatusFilter(filter)}
              type="button"
            >
              {filter === "All" ? "All tickets" : filter}{" "}
              <span>
                {filter === "All"
                  ? tickets.length
                  : tickets.filter((ticket) =>
                      filter === "Resolved"
                        ? ticket.status === "Resolved"
                        : ticket.status !== "Resolved",
                    ).length}
              </span>
            </button>
          ))}
        </div>
        <label className="text-sm text-slate-500">
          <span className="sr-only">Sort tickets</span>
          <select
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as "recent" | "oldest")
            }
          >
            <option value="recent">Most recent</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {visibleTickets.map((ticket) => (
          <button
            className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-slate-50"
            key={ticket.id}
            onClick={() => onSelect(ticket)}
          >
            <div className="ticket-id">{ticket.id}</div>
            <div className="min-w-0 flex-1">
              <strong>{ticket.title}</strong>
              <span>
                {ticket.type} <i /> {ticket.category} <i /> {ticket.created}
              </span>
            </div>
            <StatusBadge status={ticket.status} />
            <span className="text-lg text-slate-400">→</span>
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-500">
        Showing {visibleTickets.length} of {tickets.length} tickets
      </p>
    </main>
  );
}
