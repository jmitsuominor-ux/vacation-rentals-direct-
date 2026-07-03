import Link from "next/link";
import type { Property } from "@/lib/properties";

export function PropertyCard({ property }: { property: Property }) {
  const initial = property.name.charAt(0);
  const isFlorida = property.region === "florida";

  return (
    <article className="property-card">
      <div className={`property-photo${isFlorida ? " florida" : ""}`}>
        <span className="placeholder-tag">Photo placeholder</span>
        <span className="mono">{initial}</span>
      </div>
      <div className="property-body">
        <span className={`tag${isFlorida ? " florida" : ""}`}>{property.location}</span>
        <h3>{property.name}</h3>
        <p>{property.tagline}</p>
        <Link href={`/properties/${property.slug}`} className="cta">
          Check dates
        </Link>
      </div>
    </article>
  );
}
