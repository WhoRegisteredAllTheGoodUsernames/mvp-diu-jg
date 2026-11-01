"use client";

import { useState } from "react";
import type { Ticket } from "@/lib/ticket-types";
import { StatusBadge } from "@/components/header";

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
        <section className="detail-card">
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
              <button className="primary-button" type="submit">
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
        <section className="detail-card">
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
          <form className="message-form" onSubmit={addMessage}>
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
                <div className="message-item" key={`${item.date}-${index}`}>
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
