import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation Policy — J & F Rental Co.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="legal-page">
      <p className="label">Policies</p>
      <h1>Cancellation Policy</h1>
      <p className="updated">
        Draft — review and adjust before publishing. Values shown in{" "}
        <span className="placeholder">this style</span> are placeholders.
      </p>

      <p>
        This policy applies to reservations booked directly through this website. It is
        separate from whatever cancellation policy is selected for the same property on
        Airbnb or VRBO — those platforms enforce their own policy tier independently, so
        a guest cancelling an Airbnb or VRBO reservation is governed by that platform&apos;s
        terms, not the ones below.
      </p>

      <h2>Refund schedule</h2>
      <ul>
        <li>
          <strong>Full refund</strong> if cancelled <span className="placeholder">14+ days</span>{" "}
          before check-in.
        </li>
        <li>
          <strong>50% refund</strong> if cancelled between{" "}
          <span className="placeholder">7 and 13 days</span> before check-in.
        </li>
        <li>
          <strong>No refund</strong> for cancellations within{" "}
          <span className="placeholder">7 days</span> of check-in, including no-shows and
          early departures.
        </li>
      </ul>

      <h2>Extenuating circumstances</h2>
      <p>
        <span className="placeholder">
          [Add your policy for events outside a guest&apos;s control — e.g. natural disaster,
          government travel restriction, documented medical emergency.]
        </span>
      </p>

      <h2>Changes by us</h2>
      <p>
        If we need to cancel a confirmed reservation for reasons on our end (maintenance
        emergency, property no longer available), you&apos;ll receive a full refund and we&apos;ll
        help find alternative dates or a comparable property where possible.
      </p>

      <h2>Questions</h2>
      <p>
        Contact us at <span className="placeholder">[reservations email/phone]</span>{" "}
        before booking if you have questions about this policy.
      </p>

      <nav className="legal-nav">
        <Link href="/house-rules">House Rules</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </nav>
    </main>
  );
}
