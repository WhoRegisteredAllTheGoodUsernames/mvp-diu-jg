export type View = "home" | "create" | "tickets"
export type Status = "Open" | "In progress" | "Resolved"
export type TicketMessage = { id?: string; author: string; text: string; date: string }
export type TicketEvaluation = { rating: number; comment: string }
export type Ticket = {
  id: string; title: string; description: string; created: string; status: Status; type: string; category: string; location: string; requestedFor: string; worker: string; group: string; resolution: string; messages: TicketMessage[]; evaluation?: TicketEvaluation
}
