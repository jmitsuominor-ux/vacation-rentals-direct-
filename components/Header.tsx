import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          <Image
            src="/images/brand/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="brand-mark"
          />
          Hamasu Homes
        </Link>
        <nav className="site-nav">
          <Link href="/#oregon">Oregon</Link>
          <Link href="/#florida">Florida</Link>
        </nav>
      </div>
    </header>
  );
}
