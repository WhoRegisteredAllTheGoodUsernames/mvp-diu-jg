import type { Ticket } from "./ticket-types"

export const locations = ["Madrid HQ", "Barcelona Office", "Valencia Hub", "Remote / Home"]
export const initialTickets: Ticket[] = [
  { id: "REQ-1048", title: "Access to the analytics workspace", description: "I need access to the marketing analytics workspace to prepare the Q4 performance report.", created: "Oct 24, 2024", status: "In progress", type: "Requirement", category: "Access & permissions", location: "Madrid HQ", requestedFor: "Alex Morgan", worker: "Daniel Ortiz", group: "IT Operations", resolution: "", messages: [{ author: "Daniel Ortiz", text: "I’m checking the workspace permissions with your manager.", date: "Oct 25, 2024" }] },
  { id: "INC-1042", title: "Meeting room display not working", description: "The display in meeting room Atlas does not show a signal when connecting a laptop.", created: "Oct 21, 2024", status: "Open", type: "Incidence", category: "Hardware", location: "Madrid HQ", requestedFor: "Alex Morgan", worker: "Unassigned", group: "IT Support", resolution: "", messages: [] },
  { id: "REQ-1029", title: "Install Figma desktop app", description: "Please install the latest Figma desktop client on my workstation.", created: "Oct 14, 2024", status: "Resolved", type: "Requirement", category: "Software", location: "Remote / Home", requestedFor: "Alex Morgan", worker: "Priya Shah", group: "Workplace Services", resolution: "Figma was installed and configured on your workstation.", messages: [{ author: "Alex Morgan", text: "Thanks, I can confirm it’s working now.", date: "Oct 15, 2024" }] },
]
