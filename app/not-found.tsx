import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="label">404</p>
      <h1>This page wandered off.</h1>
      <p>
        The page you&apos;re looking for doesn&apos;t exist — it may have moved, or the
        link was off. Head back home to find all 5 properties.
      </p>
      <Link href="/" className="cta">
        Back to home
      </Link>
    </main>
  );
}
