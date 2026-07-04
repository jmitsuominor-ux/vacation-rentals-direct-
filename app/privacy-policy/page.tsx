import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — J & F Rental Co.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <p className="label">Policies</p>
      <h1>Privacy Policy</h1>
      <p className="updated">
        Draft — have this reviewed before publishing. Values shown in{" "}
        <span className="placeholder">this style</span> are placeholders.
      </p>

      <h2>What we collect</h2>
      <p>
        When you check availability or request a reservation, we collect the
        information you provide directly: name, email, phone number, requested dates,
        and guest count. Payment is processed by our booking and payments provider
        (Hostaway, via Stripe) — we do not receive or store your full card number.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To confirm and manage your reservation.</li>
        <li>To send check-in instructions and stay-related communication.</li>
        <li>To comply with local lodging tax and recordkeeping requirements.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        Reservation details are shared with our property management/booking platform
        (Hostaway) to process the booking. We don&apos;t sell guest information to third
        parties.
      </p>

      <h2>Data retention</h2>
      <p>
        <span className="placeholder">
          [Add how long reservation and guest records are retained — often driven by
          local tax recordkeeping requirements.]
        </span>
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy: <span className="placeholder">[privacy contact email]</span>
      </p>

      <nav className="legal-nav">
        <Link href="/cancellation-policy">Cancellation Policy</Link>
        <Link href="/house-rules">House Rules</Link>
      </nav>
    </main>
  );
}
