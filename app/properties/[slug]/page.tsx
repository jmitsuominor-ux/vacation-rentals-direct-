import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { getProperty, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  const title = `${property.name} — ${property.location} | J & F Rental Co.`;
  return {
    title,
    description: property.tagline,
    openGraph: {
      title,
      description: property.tagline,
      type: "website",
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const isFlorida = property.region === "florida";
  const initial = property.name.charAt(0);

  return (
    <main>
      <div className="wrap">
        <section className="property-hero">
          <p className="label">{property.location}</p>
          <h1>{property.name}</h1>
          <p className="tagline">{property.tagline}</p>
        </section>

        <div className={`property-gallery${isFlorida ? " florida" : ""}`}>
          <span className="placeholder-tag">Photo placeholder</span>
          <span className="mono">{initial}</span>
        </div>

        <div className="property-layout">
          <div>
            <h2>About this stay</h2>
            <p style={{ color: "var(--ink-dim)", lineHeight: 1.7 }}>
              Full property description, amenities, and house rules go here — carried
              over from the {property.name} Airbnb and VRBO listings.
            </p>
            <div className="external-links">
              {property.externalListings.airbnb && (
                <a href={property.externalListings.airbnb} target="_blank" rel="noopener noreferrer">
                  View on Airbnb
                </a>
              )}
              {property.externalListings.vrbo && (
                <a href={property.externalListings.vrbo} target="_blank" rel="noopener noreferrer">
                  View on VRBO
                </a>
              )}
            </div>
          </div>

          <BookingWidget propertySlug={property.slug} />
        </div>
      </div>
    </main>
  );
}
