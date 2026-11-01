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
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-6 py-4 backdrop-blur md:px-10">
      <button className="flex items-center gap-3 font-mono text-sm font-medium tracking-[0.18em] text-deep" onClick={() => onNavigate("home")}>
        <span className="grid size-8 place-items-center rounded-full bg-green text-sm font-bold text-white">R</span>
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
      <div className="hidden items-center gap-3 text-sm text-muted sm:flex">
        <span className="grid size-8 place-items-center rounded-full bg-mint font-mono text-xs text-deep">AM</span>
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
      <span className="size-2 rounded-full bg-green" />
      {status}
    </span>
  );
}
