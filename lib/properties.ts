export type Region = "oregon" | "florida";

export interface Property {
  slug: string;
  name: string;
  location: string;
  region: Region;
  tagline: string;
  /** Hostaway listing ID this property maps to. Filled in once the Hostaway account is provisioned. */
  hostawayListingId: string | null;
  externalListings: {
    airbnb?: string;
    vrbo?: string;
  };
}

export const properties: Property[] = [
  {
    slug: "warren-house",
    name: "Warren House",
    location: "Rogue River, OR",
    region: "oregon",
    tagline: "A hidden historic home in the heart of Rogue River.",
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/hiddenhistorichomeintheheartofrogueriver",
      vrbo: "https://www.vrbo.com/2905224",
    },
  },
  {
    slug: "rogue-house",
    name: "Rogue House",
    location: "Rogue Valley, OR",
    region: "oregon",
    tagline: "A Rogue Valley retreat, close to the water.",
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/roguehouse",
      vrbo: "https://www.vrbo.com/3102315",
    },
  },
  {
    slug: "the-loft",
    name: "The Loft",
    location: "Oregon City, OR",
    region: "oregon",
    tagline: "An open loft in the heart of Oregon City.",
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/oregoncityloft",
      vrbo: "https://www.vrbo.com/2623062",
    },
  },
  {
    slug: "oc-haus",
    name: "OC Haus",
    location: "Oregon City, OR",
    region: "oregon",
    tagline: "A modern stay minutes from Oregon City's falls.",
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/ochaus",
      vrbo: "https://www.vrbo.com/2607555",
    },
  },
  {
    slug: "brick-city-playhouse",
    name: "Brick City Playhouse",
    location: "Ocala, FL",
    region: "florida",
    tagline: "Ocala's oasis — a playful stay in Brick City.",
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/ocalaoasisfl",
      vrbo: "https://www.vrbo.com/5119416",
    },
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function propertiesByRegion(region: Region): Property[] {
  return properties.filter((p) => p.region === region);
}

export const regionLabels: Record<Region, string> = {
  oregon: "Rogue Valley & Oregon City, OR",
  florida: "Ocala, FL",
};
