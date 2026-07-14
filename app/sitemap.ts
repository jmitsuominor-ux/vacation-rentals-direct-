import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

const SITE_URL = "https://jandfrental.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/cancellation-policy", "/house-rules", "/privacy-policy"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const propertyRoutes = properties.map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...propertyRoutes];
}
