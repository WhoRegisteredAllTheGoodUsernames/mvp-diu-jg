"use client";

import { useState } from "react";
import type { Ticket, View } from "@/lib/ticket-types";
import { locations } from "@/lib/ticket-data";
import { StatusBadge } from "@/components/header";

export function Home({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col justify-center px-6 py-16 md:px-10">
      <section className="max-w-3xl">
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
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onNavigate("create")}
          >
            Create a ticket <span>→</span>
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-green hover:text-green"
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
          <button onClick={() => onNavigate("create")}>→</button>
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

export function CreateTicket({
  onNavigate,
  onCreated,
}: {
  onNavigate: (view: View) => void;
  onCreated: (ticket: Ticket) => void;
}) {
  const [type, setType] = useState("Requirement");
  const [requestedFor, setRequestedFor] = useState("Myself");
  const [submitted, setSubmitted] = useState(false);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onCreated({
        id: type === "Requirement" ? "REQ-1052" : "INC-1052",
        title: "New service ticket",
        description: "Your ticket has been submitted to the service desk.",
        created: "Just now",
        status: "Open",
        type,
        category: "General support",
        location: "Madrid HQ",
        requestedFor: requestedFor === "Myself" ? "Alex Morgan" : requestedFor,
        worker: "Unassigned",
        group: "IT Support",
        resolution: "",
        messages: [],
      });
      onNavigate("tickets");
    }, 900);
  }
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10">
      <div className="mb-8 flex flex-col gap-5 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <button className="back-link" onClick={() => onNavigate("home")}>
            ← Back to home
          </button>
          <div className="eyebrow">NEW TICKET</div>
          <h1>Tell us what you need</h1>
          <p>Give us a few details and the right team will pick it up.</p>
        </div>
        <div className="step-indicator">
          <span className="step-active">01</span>
          <span className="step-line" />
          <span>02</span>
          <small>Details</small>
        </div>
      </div>
      <form className="ticket-form" onSubmit={submit}>
        <div className="form-main">
          <label>
            Title <span>*</span>
            <input required placeholder="e.g. Access to the design library" />
          </label>
          <label>
            Description <span>*</span>
            <textarea
              required
              placeholder="Describe your request or issue in as much detail as possible..."
              rows={5}
            />
          </label>
          <div className="form-row">
            <label>
              Ticket type <span>*</span>
              <div className="segmented">
                <button
                  type="button"
                  className={type === "Requirement" ? "selected" : ""}
                  onClick={() => setType("Requirement")}
                >
                  Requirement
                </button>
                <button
                  type="button"
                  className={type === "Incidence" ? "selected" : ""}
                  onClick={() => setType("Incidence")}
                >
                  Incidence
                </button>
              </div>
            </label>
            <label>
              Category <span>*</span>
              <select required defaultValue="">
                <option value="" disabled>
                  Select a category
                </option>
                <option>Access & permissions</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>General support</option>
              </select>
            </label>
          </div>
        </div>
        <aside className="form-side">
          <div className="side-heading">
            <span className="side-number">02</span>
            <div>
              <h3>Ticket context</h3>
              <p>Help us route this correctly.</p>
            </div>
          </div>
          <label>
            Location <span>*</span>
            <select required defaultValue="">
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </label>
          <label>
            Creating this for <span>*</span>
            <select
              value={requestedFor}
              onChange={(e) => setRequestedFor(e.target.value)}
            >
              <option>Myself</option>
              <option>Jordan Lee</option>
              <option>Sam Taylor</option>
              <option>Priya Shah</option>
            </select>
          </label>
          <div className="form-hint">
            <span>i</span>
            <p>
              Submitting on behalf of someone else? Their name will be shown as
              the requester.
            </p>
          </div>
        </aside>
        <div className="form-footer">
          <span>
            <span className="required-star">*</span> Required fields
          </span>
          <div>
            <button
              type="button"
              className="ghost-button"
              onClick={() => onNavigate("home")}
            >
              Cancel
            </button>
            <button className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50" disabled={submitted}>
              {submitted ? "Sending..." : "Submit ticket"} <span>→</span>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export function Tickets({
  tickets,
  onNavigate,
  onSelect,
}: {
  tickets: Ticket[];
  onNavigate: (view: View) => void;
  onSelect: (ticket: Ticket) => void;
}) {
  return (
    <main className="content-page tickets-page">
      <div className="page-heading tickets-heading">
        <div>
          <div className="eyebrow">YOUR ACTIVITY</div>
          <h1>
            My tickets <span className="heading-count">{tickets.length}</span>
          </h1>
          <p>
            Track requests and incidents you've raised with the service desk.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50" onClick={() => onNavigate("create")}>
          Create a ticket <span>+</span>
        </button>
      </div>
      <div className="ticket-toolbar">
        <div className="tabs">
          <button className="tab-active">
            All tickets <span>{tickets.length}</span>
          </button>
          <button>
            Open{" "}
            <span>{tickets.filter((t) => t.status !== "Resolved").length}</span>
          </button>
          <button>
            Resolved{" "}
            <span>{tickets.filter((t) => t.status === "Resolved").length}</span>
          </button>
        </div>
        <div className="sort-select">
          Most recent <span>⌄</span>
        </div>
      </div>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <button
            className="ticket-row"
            key={ticket.id}
            onClick={() => onSelect(ticket)}
          >
            <div className="ticket-id">{ticket.id}</div>
            <div className="ticket-info">
              <strong>{ticket.title}</strong>
              <span>
                {ticket.type} <i /> {ticket.category} <i /> {ticket.created}
              </span>
            </div>
            <StatusBadge status={ticket.status} />
            <span className="row-arrow">→</span>
          </button>
        ))}
      </div>
      <p className="list-footer">Showing all {tickets.length} tickets</p>
    </main>
  );
}

export function TicketDetail({
  ticket,
  onBack,
  onUpdate,
}: {
  ticket: Ticket;
  onBack: () => void;
  onUpdate: (ticket: Ticket) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [surveySent, setSurveySent] = useState(false);
  const canEdit = ticket.status === "Open";
  function save(e: React.FormEvent) {
    e.preventDefault();
    onUpdate({ ...ticket, title, description });
    setEditing(false);
  }
  function addMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    onUpdate({
      ...ticket,
      messages: [
        ...ticket.messages,
        { author: "Alex Morgan", text: message.trim(), date: "Just now" },
      ],
    });
    setMessage("");
  }
  function submitSurvey(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return;
    setSurveySent(true);
  }
  return (
    <main className="content-page detail-page">
      <button className="back-link" onClick={onBack}>
        ← Back to my tickets
      </button>
      <div className="detail-heading">
        <div>
          <div className="ticket-id large-id">{ticket.id}</div>
          <h1>{ticket.title}</h1>
          <p>
            Created {ticket.created} · {ticket.type}
          </p>
        </div>
        <div className="detail-actions">
          <StatusBadge status={ticket.status} />
          {canEdit && (
            <button
              className="secondary-button compact"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit ticket"}
            </button>
          )}
        </div>
      </div>
      <div className="detail-grid">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          {editing ? (
            <form className="edit-form" onSubmit={save}>
              <div className="card-label">EDIT REQUEST</div>
              <label>
                Title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </label>
              <button className="inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition hover:bg-deep disabled:cursor-not-allowed disabled:opacity-50" type="submit">
                Save changes <span>→</span>
              </button>
            </form>
          ) : (
            <>
              <div className="card-label">REQUEST DETAILS</div>
              <h3>Description</h3>
              <p className="description">{ticket.description}</p>
              <div className="detail-fields">
                <div>
                  <span>Category</span>
                  <strong>{ticket.category}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{ticket.location}</strong>
                </div>
                <div>
                  <span>Requested for</span>
                  <strong>{ticket.requestedFor}</strong>
                </div>
              </div>
            </>
          )}
        </section>
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <div className="card-label">ASSIGNMENT</div>
          <div className="assignment">
            <span className="worker-avatar">
              {ticket.worker === "Unassigned"
                ? "—"
                : ticket.worker
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </span>
            <div>
              <span>Assigned worker</span>
              <strong>{ticket.worker}</strong>
              <small>{ticket.group}</small>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item done">
              <span />
              Ticket submitted<div>Created {ticket.created}</div>
            </div>
            <div
              className={`timeline-item ${ticket.status !== "Open" ? "done" : "current"}`}
            >
              <span />
              Being reviewed
              <div>
                {ticket.status === "Open"
                  ? "The support team will review this ticket"
                  : "Assigned to the support team"}
              </div>
            </div>
            {ticket.status === "Resolved" && (
              <div className="timeline-item done">
                <span />
                Ticket closed
                <div>
                  {ticket.resolution ||
                    "Closed by the assigned person as the resolution."}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      {ticket.status !== "Open" && (
        <section className="detail-card conversation-card">
          <div className="card-label">ADDITIONAL INFORMATION</div>
          <h3>Keep the conversation going</h3>
          <p className="muted-copy">
            Send a message to{" "}
            {ticket.worker === "Unassigned"
              ? "the support team"
              : ticket.worker}{" "}
            with any extra context.
          </p>
          <form className="mt-6 flex flex-col gap-3 border-t border-line pt-6" onSubmit={addMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a message about this ticket..."
              rows={3}
            />
            <button className="secondary-button compact" type="submit">
              Send message <span>→</span>
            </button>
          </form>
          {ticket.messages.length > 0 && (
            <div className="message-list">
              {ticket.messages.map((item, index) => (
                <div className="border-b border-line py-5 last:border-b-0" key={`${item.date}-${index}`}>
                  <div>
                    <strong>{item.author}</strong>
                    <span>{item.date}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {ticket.status === "Resolved" && (
        <section className="detail-card survey-card">
          <div className="card-label">HOW DID WE DO?</div>
          {surveySent ? (
            <div className="survey-thanks">
              <strong>Thanks for your feedback.</strong>
              <span>Your evaluation has been recorded.</span>
            </div>
          ) : (
            <form onSubmit={submitSurvey}>
              <h3>How would you rate the resolution?</h3>
              <p className="muted-copy">
                The assigned person closed this ticket as resolved. Tell us if
                the solution worked for you.
              </p>
              <div
                className="rating-row"
                role="radiogroup"
                aria-label="Resolution rating"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={
                      rating >= value
                        ? "rating-button selected"
                        : "rating-button"
                    }
                    onClick={() => setRating(value)}
                    aria-label={`${value} out of 5`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <label>
                Optional comment
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What could we improve?"
                  rows={3}
                />
              </label>
              <button
                className="primary-button compact"
                type="submit"
                disabled={!rating}
              >
                Submit evaluation <span>→</span>
              </button>
            </form>
          )}
        </section>
      )}
    </main>
  );
}
