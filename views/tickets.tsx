"use client";

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
  return (
    <main className="content-page tickets-page">
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
        <button className="primary-button" onClick={() => onNavigate("create")}>
          Create a ticket <span>+</span>
        </button>
      </div>
      <div className="ticket-toolbar">
        <div className="tabs">
          <button className="tab-active">
            All tickets <span>{tickets.length}</span>
          </button>
          <button>
            Open{" "}
            <span>{tickets.filter((t) => t.status !== "Resolved").length}</span>
          </button>
          <button>
            Resolved{" "}
            <span>{tickets.filter((t) => t.status === "Resolved").length}</span>
          </button>
        </div>
        <div className="sort-select">
          Most recent <span>⌄</span>
        </div>
      </div>
      <div className="ticket-list">
        {tickets.map((ticket) => (
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
      <p className="list-footer">Showing all {tickets.length} tickets</p>
    </main>
  );
}
