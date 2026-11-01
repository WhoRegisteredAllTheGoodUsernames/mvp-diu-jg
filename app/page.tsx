"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CreateTicket, Home, TicketDetail, Tickets } from "@/components/views"
import { initialTickets } from "@/lib/ticket-data"
import type { Ticket, View } from "@/lib/ticket-types"

export default function App() {
  const [view, setView] = useState<View>("home")
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [selected, setSelected] = useState<Ticket | null>(null)
  function navigate(next: View) { setSelected(null); setView(next) }
  function updateTicket(updated: Ticket) { setTickets(current => current.map(ticket => ticket.id === updated.id ? updated : ticket)); setSelected(updated) }
  return <><Header view={view} onNavigate={navigate} />{selected ? <TicketDetail ticket={selected} onBack={() => setSelected(null)} onUpdate={updateTicket} /> : view === "home" ? <Home onNavigate={navigate} /> : view === "create" ? <CreateTicket onNavigate={navigate} onCreated={(ticket) => setTickets((current) => [ticket, ...current])} /> : <Tickets tickets={tickets} onNavigate={navigate} onSelect={setSelected} />}</>
}
