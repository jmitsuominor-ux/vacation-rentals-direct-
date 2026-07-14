import { PropertyCard } from "@/components/PropertyCard";
import { propertiesByRegion, regionLabels } from "@/lib/properties";

export default function HomePage() {
  const oregon = propertiesByRegion("oregon");
  const florida = propertiesByRegion("florida");

  return (
    <main>
      <div className="wrap">
        <section className="hero">
          <p className="label">J &amp; F Rental Co.</p>
          <h1>
            Five homes, <em>kept</em> well.
          </h1>
          <p>
            A small collection of character-filled stays across the Rogue Valley and
            Ocala, Florida. Book direct and deal with us, not a platform.
          </p>
          <div className="trust-bar">
            <span>No platform fees</span>
            <span>Real humans, fast replies</span>
            <span>5 homes across 2 states</span>
          </div>
        </section>

        <section className="region" id="oregon">
          <div className="region-head">
            <h2>{regionLabels.oregon}</h2>
            <span className="count">{oregon.length} properties</span>
          </div>
          <div className="property-grid">
            {oregon.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </section>

        <section className="region" id="florida">
          <div className="region-head">
            <h2>{regionLabels.florida}</h2>
            <span className="count">{florida.length} property</span>
          </div>
          <div className="property-grid">
            {florida.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
