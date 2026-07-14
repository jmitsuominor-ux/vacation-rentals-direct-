"use client";

import { useState } from "react";
import type { Quote } from "@/lib/booking";

export function BookingWidget({ propertySlug }: { propertySlug: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "quoted" | "booked" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleGetQuote() {
    setStatus("loading");
    setMessage(null);
    setQuote(null);
    try {
      const params = new URLSearchParams({
        property: propertySlug,
        checkIn,
        checkOut,
        guests: String(guests),
      });
      const res = await fetch(`/api/quote?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not get a price");
      setQuote(data.quote);
      setStatus("quoted");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not get a price");
    }
  }

  async function handleReserve() {
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertySlug,
          checkIn,
          checkOut,
          guests,
          guest: { firstName, lastName, email },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not complete the reservation");
      setStatus("booked");
      setMessage(`Reservation ${data.reservation.id} confirmed.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not complete the reservation");
    }
  }

  const hasGuestDetails = Boolean(firstName && lastName && email);

  return (
    <div className="booking-widget">
      <h2>Check dates &amp; price</h2>
      <div className="field-row">
        <div className="field">
          <label htmlFor="checkIn">Check in</label>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="checkOut">Check out</label>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>
      <div className="field" style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="guests">Guests</label>
        <input
          id="guests"
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />
      </div>

      <button
        type="button"
        className="cta"
        disabled={!checkIn || !checkOut || status === "loading"}
        onClick={handleGetQuote}
      >
        {status === "loading" ? "Checking…" : "Get price"}
      </button>

      {quote && (
        <div className="quote-result">
          <div className="quote-line">
            <span>
              {quote.nights} night{quote.nights === 1 ? "" : "s"}
            </span>
            <span>${quote.subtotal.toFixed(2)}</span>
          </div>
          <div className="quote-line">
            <span>Cleaning fee</span>
            <span>${quote.cleaningFee.toFixed(2)}</span>
          </div>
          <div className="quote-line">
            <span>Taxes</span>
            <span>${quote.taxes.toFixed(2)}</span>
          </div>
          <div className="quote-line total">
            <span>Total</span>
            <span>${quote.total.toFixed(2)}</span>
          </div>

          <div className="field-row" style={{ marginTop: "1.1rem" }}>
            <div className="field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="field" style={{ marginBottom: "0.75rem" }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="cta"
            disabled={!hasGuestDetails || status === "loading" || status === "booked"}
            onClick={handleReserve}
          >
            Request to book
          </button>
        </div>
      )}

      {message && (
        <p className={`widget-message${status === "error" ? " error" : ""}`}>{message}</p>
      )}
    </div>
  );
}
