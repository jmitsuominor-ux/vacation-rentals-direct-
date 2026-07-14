import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>&copy; {new Date().getFullYear()} J &amp; F Rental Co.</span>
        <nav className="legal-nav">
          <Link href="/cancellation-policy">Cancellation Policy</Link>
          <Link href="/house-rules">House Rules</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
