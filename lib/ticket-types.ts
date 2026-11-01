export type View = "home" | "create" | "tickets"
export type Status = "Open" | "In progress" | "Resolved"
export type TicketMessage = { author: string; text: string; date: string }
export type Ticket = {
  id: string; title: string; description: string; created: string; status: Status; type: string; category: string; location: string; requestedFor: string; worker: string; group: string; resolution: string; messages: TicketMessage[]
}
