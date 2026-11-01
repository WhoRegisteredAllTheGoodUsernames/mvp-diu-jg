"use client"

import type { View, Status } from "@/lib/ticket-types"

export function Header({ view, onNavigate }: { view: View; onNavigate: (view: View) => void }) {
  return <header className="topbar"><button className="brand" onClick={() => onNavigate("home")}><span className="brand-mark">R</span><span>resolve</span></button><nav><button className={view === "home" ? "active" : ""} onClick={() => onNavigate("home")}>Home</button><button className={view === "tickets" ? "active" : ""} onClick={() => onNavigate("tickets")}>My tickets <span className="nav-count">3</span></button></nav><div className="profile"><span className="avatar">AM</span><span className="profile-name">Alex Morgan</span><span className="chevron">⌄</span></div></header>
}

export function StatusBadge({ status }: { status: Status }) { return <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}><span className="status-dot" />{status}</span> }
