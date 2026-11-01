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
      <div className="page-heading tickets-heading">
        <div>
          <div className="eyebrow">YOUR ACTIVITY</div>
          <h1>
            My tickets <span className="heading-count">{tickets.length}</span>
          </h1>
          <p>
            Track requests and incidents you've raised with the service desk.
          </p>
        </div>
        <button className="rounded-md bg-emerald-950 px-4 py-3 text-xs font-bold text-white hover:bg-emerald-800" onClick={() => onNavigate("create")}>
          Create a ticket <span>+</span>
        </button>
      </div>
      <div className="ticket-toolbar">
        <div className="tabs">
          {(["All", "Open", "Resolved"] as const).map((filter) => (
            <button
              className={statusFilter === filter ? "tab-active" : ""}
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
        <label className="sort-select">
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
      <div className="ticket-list">
        {visibleTickets.map((ticket) => (
          <button
            className="ticket-row"
            key={ticket.id}
            onClick={() => onSelect(ticket)}
          >
            <div className="ticket-id">{ticket.id}</div>
            <div className="ticket-info">
              <strong>{ticket.title}</strong>
              <span>
                {ticket.type} <i /> {ticket.category} <i /> {ticket.created}
              </span>
            </div>
            <StatusBadge status={ticket.status} />
            <span className="row-arrow">→</span>
          </button>
        ))}
      </div>
      <p className="list-footer">
        Showing {visibleTickets.length} of {tickets.length} tickets
      </p>
    </main>
  );
}
