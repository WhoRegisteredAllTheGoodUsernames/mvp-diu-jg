"use client";

import type { View, Status } from "@/lib/ticket-types";

export function Header({
  view,
  onNavigate,
}: {
  view: View;
  onNavigate: (view: View) => void;
}) {
  return (
    <header className="flex h-[76px] items-center gap-8 border-b border-slate-200 bg-white px-6 sm:gap-16 sm:px-[6vw]">
      <button className="flex items-center gap-2.5 border-0 bg-transparent text-xl font-extrabold tracking-[-0.04em] text-emerald-950" onClick={() => onNavigate("home")}>
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-950 font-mono text-[17px] font-medium text-emerald-200">R</span>
        <span>resolve</span>
      </button>
      <nav className="flex h-full gap-8">
        <button
          className={`relative border-0 bg-transparent text-xs font-semibold ${view === "home" ? "text-emerald-950 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t after:bg-emerald-700" : "text-slate-500"}`}
          onClick={() => onNavigate("home")}
        >
          Home
        </button>
        <button
          className={`relative border-0 bg-transparent text-xs font-semibold ${view === "tickets" ? "text-emerald-950 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-t after:bg-emerald-700" : "text-slate-500"}`}
          onClick={() => onNavigate("tickets")}
        >
          My tickets <span className="ml-1 rounded-full bg-slate-100 px-1.5 py-0.5 font-mono text-[10px]">3</span>
        </button>
      </nav>
      <div className="ml-auto flex items-center gap-2.5 text-xs font-semibold text-slate-500">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-[10px] font-extrabold text-emerald-700">AM</span>
        <span className="text-sm font-semibold text-slate-950">Alex Morgan</span>
        <span className="ml-1 text-lg">⌄</span>
      </div>
    </header>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}>
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
      {status}
    </span>
  );
}
