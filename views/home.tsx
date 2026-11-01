"use client";

import type { View } from "@/lib/ticket-types";

export function Home({
  onNavigate,
}: {
  onNavigate: (view: View, initialType?: "Requirement" | "Incidence") => void;
}) {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          SERVICE DESK
        </div>
        <h1>
          How can we help
          <br />
          <em>today?</em>
        </h1>
        <p>
          Raise a request, report an issue, or keep track of everything in one
          place.
        </p>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => onNavigate("create")}
          >
            Create a ticket <span>→</span>
          </button>
          <button
            className="secondary-button"
            onClick={() => onNavigate("tickets")}
          >
            View my tickets <span>↗</span>
          </button>
        </div>
      </section>
      <section className="home-lower">
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
