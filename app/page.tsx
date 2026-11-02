"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { CreateTicket, Home, TicketDetail, Tickets } from "@/views";
import { initialTickets } from "@/lib/ticket-data";
import type { Ticket, View } from "@/lib/ticket-types";
import { defaultUser } from "@/lib/user-data";
import type { User } from "@/lib/user-types";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [user, setUser] = useState<User>(defaultUser);
  const [createType, setCreateType] = useState<"Requirement" | "Incidence">("Requirement");
  function navigate(next: View, initialType?: "Requirement" | "Incidence") {
    setSelected(null);
    if (next === "create" && initialType) setCreateType(initialType);
    setView(next);
  }
  function updateTicket(updated: Ticket) {
    setTickets((current) =>
      current.map((ticket) => (ticket.id === updated.id ? updated : ticket)),
    );
    setSelected(updated);
  }
  return (
    <>
      <Header view={view} onNavigate={navigate} ticketCount={tickets.length} user={user} />
      {selected ? (
        <TicketDetail
          key={selected.id}
          ticket={selected}
          onBack={() => setSelected(null)}
          onUpdate={updateTicket}
		  user={user}
        />
      ) : view === "home" ? (
        <Home onNavigate={navigate} ticketCount={tickets.length} />
      ) : view === "create" ? (
        <CreateTicket
          onNavigate={navigate}
          initialType={createType}
          onCreated={(ticket) => setTickets((current) => [ticket, ...current])}
		  user={user}
        />
      ) : (
        <Tickets
          tickets={tickets}
          onNavigate={navigate}
          onSelect={setSelected}
        />
      )}
    </>
  );
}
