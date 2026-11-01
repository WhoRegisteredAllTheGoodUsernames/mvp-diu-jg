"use client";

import { useState } from "react";
import type { Ticket, View } from "@/lib/ticket-types";
import {
  categories,
  locations,
  requestedForOptions,
} from "@/lib/ticket-data";

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
    <main className="content-page">
      <div className="page-heading">
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
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
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
              {requestedForOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
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
            <button className="primary-button" disabled={submitted}>
              {submitted ? "Sending..." : "Submit ticket"} <span>→</span>
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
