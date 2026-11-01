"use client";

import type { View, Status } from "@/lib/ticket-types";
import { navItem, status as statusStyles } from "@/lib/styles";

export function Header({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate("home")}>
        <span className="brand-mark">R</span>
        <span>resolve</span>
      </button>
      <nav>
        <button
          className={navItem({ active: view === "home" })}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={navItem({ active: view === "tickets" })}
          onClick={() => onNavigate("tickets")}
        >
          My tickets <span className="nav-count">3</span>
        </button>
      </nav>
      <div className="profile">
        <span className="avatar">AM</span>
        <span className="profile-name">Alex Morgan</span>
        <span className="chevron">⌄</span>
      </div>
    </header>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={statusStyles({
      state: status === "In progress" ? "In Progress" : status,
    })}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
