import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "House Rules — J & F Rental Co.",
};

export default function HouseRulesPage() {
  return (
    <main className="legal-page">
      <p className="label">Policies</p>
      <h1>House Rules</h1>
      <p className="updated">
        Draft — review and adjust before publishing. Values shown in{" "}
        <span className="placeholder">this style</span> are placeholders. Occupancy
        limits and pet policy vary per property — confirm the numbers below match each
        listing.
      </p>

      <h2>Check-in &amp; check-out</h2>
      <ul>
        <li>Check-in after <span className="placeholder">4:00 PM</span></li>
        <li>Check-out by <span className="placeholder">11:00 AM</span></li>
        <li>Self check-in with a door code sent before arrival.</li>
      </ul>

      <h2>Occupancy</h2>
      <p>
        Maximum guest count is set per property — see the individual property page. The
        reserved guest count may not be exceeded without prior approval; unregistered
        guests may result in cancellation without refund.
      </p>

      <h2>General rules</h2>
      <ul>
        <li>No smoking or vaping indoors at any property.</li>
        <li>No parties, events, or gatherings beyond the reserved guest count.</li>
        <li>
          Quiet hours from <span className="placeholder">10:00 PM to 8:00 AM</span> —
          please be respectful of neighbors.
        </li>
        <li>
          Pets: <span className="placeholder">[per-property — confirm which properties allow pets, and any fee]</span>
        </li>
        <li>Minimum age to book: <span className="placeholder">25</span></li>
      </ul>

      <h2>Damage &amp; security deposit</h2>
      <p>
        <span className="placeholder">
          [Add your deposit / damage protection policy — amount, whether it&apos;s a hold or
          a separate damage protection fee, and how it&apos;s handled.]
        </span>
      </p>

      <nav className="legal-nav">
        <Link href="/cancellation-policy">Cancellation Policy</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </nav>
    </main>
  );
}
