import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          J <em>&amp;</em> F Rental Co.
        </Link>
        <nav className="site-nav">
          <Link href="/#oregon">Oregon</Link>
          <Link href="/#florida">Florida</Link>
        </nav>
      </div>
    </header>
  );
}
