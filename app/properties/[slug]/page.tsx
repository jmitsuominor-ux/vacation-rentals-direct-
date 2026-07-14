import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingWidget } from "@/components/BookingWidget";
import { PhotoGallery } from "@/components/PhotoGallery";
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

        {property.photos && property.photos.length > 0 ? (
          <PhotoGallery photos={property.photos} alt={property.name} />
        ) : (
          <div className={`property-gallery${isFlorida ? " florida" : ""}`}>
            <span className="placeholder-tag">Photo placeholder</span>
            <span className="mono">{initial}</span>
          </div>
        )}

        <div className="property-layout">
          <div>
            <h2>About this stay</h2>
            {property.description ? (
              property.description.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            ) : (
              <p>
                Full property description and amenities go here — carried over from the{" "}
                {property.name} Airbnb and VRBO listings.
              </p>
            )}

            {property.details && (
              <>
                <h2>House details</h2>
                <ul className="detail-list">
                  <li>
                    {property.details.maxGuests} guests · {property.details.bedrooms}{" "}
                    bedroom{property.details.bedrooms === 1 ? "" : "s"}
                    {property.details.bathrooms != null &&
                      ` · ${property.details.bathrooms} bath${
                        property.details.bathrooms === 1 ? "" : "s"
                      }`}
                  </li>
                  {(property.details.checkIn || property.details.checkOut) && (
                    <li>
                      {property.details.checkIn && `Check-in ${property.details.checkIn}`}
                      {property.details.checkIn && property.details.checkOut && " · "}
                      {property.details.checkOut && `Check-out ${property.details.checkOut}`}
                    </li>
                  )}
                  {property.details.minStay && <li>Minimum stay: {property.details.minStay}</li>}
                  {property.details.amenityHighlights.map((amenity) => (
                    <li key={amenity}>{amenity}</li>
                  ))}
                </ul>
              </>
            )}

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
