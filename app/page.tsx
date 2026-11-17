import Image from "next/image";
import { PropertyCard } from "@/components/PropertyCard";
import { propertiesByRegion, regionLabels } from "@/lib/properties";

export default function HomePage() {
  const oregon = propertiesByRegion("oregon");
  const florida = propertiesByRegion("florida");

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <Image
            src="/images/brand/logo-illustration.png"
            alt="Hamasu Homes"
            width={1401}
            height={626}
            className="hero-logo"
            priority
          />
          <h1>
            Curated stays. <em>Genuine</em> hospitality.
          </h1>
          <p>
            A small collection of character-filled stays across the Rogue Valley, Oregon
            and Ocala, Florida. Book direct and deal with us, not a platform.
          </p>
          <div className="trust-bar">
            <span>No platform fees</span>
            <span>Real humans, fast replies</span>
            <span>5 homes across 2 states</span>
          </div>
        </div>
      </section>

      <div className="regions-band">
        <div className="wrap">
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
      </div>
    </main>
  );
}
