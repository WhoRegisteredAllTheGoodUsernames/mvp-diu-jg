"use client";

import type { View } from "@/lib/ticket-types";

export function Home({
  onNavigate,
}: {
  onNavigate: (view: View, initialType?: "Requirement" | "Incidence") => void;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-24">
      <section className="max-w-3xl">
        <div className="flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.15em] text-emerald-700">
          <span className="h-px w-7 bg-emerald-700" />
          SERVICE DESK
        </div>
        <h1 className="mt-5 mb-5 text-5xl font-extrabold leading-tight tracking-[-0.065em] text-emerald-950 sm:text-6xl">
          How can we help
          <br />
          <em>today?</em>
        </h1>
        <p>
          Raise a request, report an issue, or keep track of everything in one
          place.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            className="rounded-md bg-emerald-950 px-4 py-3 text-xs font-bold text-white transition hover:bg-emerald-800"
            onClick={() => onNavigate("create")}
          >
            Create a ticket <span>→</span>
          </button>
          <button
            className="rounded-md border border-slate-300 bg-transparent px-4 py-3 text-xs font-bold text-emerald-950 transition hover:bg-white"
            onClick={() => onNavigate("tickets")}
          >
            View my tickets <span>↗</span>
          </button>
        </div>
      </section>
      <section className="mt-20 grid gap-4 border-t border-slate-200 pt-7 md:grid-cols-3">
<div className="quick-card">
          <div className="quick-icon request-icon">+</div>
          <div>
            <h3>Make a request</h3>
            <p>Need access, equipment, or a service?</p>
          </div>
          <button onClick={() => onNavigate("create", "Requirement")}>→</button>
        </div>
        <div className="quick-card">
          <div className="quick-icon issue-icon">!</div>
          <div>
            <h3>Report an incident</h3>
            <p>Something isn&apos;t working as it should?</p>
          </div>
          <button onClick={() => onNavigate("create", "Incidence")}>→</button>
        </div>
        <div className="quick-card">
          <div className="quick-icon issue-icon">!</div>
          <div>
            <h3>Report an incident</h3>
            <p>Something isn't working as it should?</p>
          </div>
          <button onClick={() => onNavigate("create")}>→</button>
        </div>
        <div className="home-note">
          <span className="note-pulse" />
          <div>
            <strong>Support hours</strong>
            <p>Mon–Fri, 8:00–18:00 CET</p>
          </div>
        </div>
      </section>
    </main>
  );
}
