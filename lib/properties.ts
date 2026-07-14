export type Region = "oregon" | "florida";

export interface PropertyDetails {
  maxGuests: number;
  bedrooms: number;
  bathrooms?: number;
  amenityHighlights: string[];
  checkIn?: string;
  checkOut?: string;
  minStay?: string;
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  region: Region;
  tagline: string;
  /** Longer-form description paragraphs for the property page. Falls back to a placeholder when absent. */
  description?: string[];
  details?: PropertyDetails;
  /** Paths under /public. Falls back to a tinted placeholder panel when absent. */
  photos?: string[];
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
    photos: Array.from(
      { length: 33 },
      (_, i) => `/images/warren-house/warren-house-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    description: [
      "Warren House is a restored 1800s cottage in the heart of downtown Rogue River — one of the town's original buildings, updated to blend period character with modern comfort. Wide-plank floors and original architectural details run throughout three queen bedrooms spread across the main floor and a loft.",
      "Out back, a private four-person hot tub and fire pit make for quiet evenings after a day on the river — the Rogue itself is a five-minute walk away, with fishing, rafting, and hiking access. The loft doubles as a game room with air hockey, pool, and an arcade cabinet, and a 70\" smart TV rounds out the living space downstairs.",
      "You're an easy walk to downtown Rogue River's shops and restaurants, two minutes from I-5, and about 1.5 hours from Crater Lake — an easy base for a river weekend or a longer stay in the valley.",
    ],
    details: {
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 1,
      amenityHighlights: [
        "Private 4-person hot tub",
        "Loft game room (air hockey, pool, arcade)",
        "Fire pit",
        "Fully equipped kitchen",
        "Pet friendly",
      ],
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      minStay: "3 nights on weekends",
    },
    hostawayListingId: null,
    externalListings: {
      airbnb: "https://airbnb.com/h/hiddenhistorichomeintheheartofrogueriver",
      vrbo: "https://www.vrbo.com/2905224",
    },
  },
  {
    slug: "rogue-house",
    name: "Rogue House",
    location: "Rogue River, OR",
    region: "oregon",
    tagline: "A restored 1800s storefront in the heart of Rogue River.",
    photos: Array.from(
      { length: 51 },
      (_, i) => `/images/rogue-house/rogue-house-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    description: [
      "Rogue House occupies a beautifully restored 1800s storefront — one of the only vacation rentals of its kind in the Rogue Valley — right in the heart of downtown Rogue River. Inside are three bedrooms and a fully equipped kitchen.",
      "Step outside to the private hot tub and fire pit, or walk eight minutes to the river for fishing, swimming, and the kind of afternoon that's hard to leave.",
      "Downtown Rogue River is at your doorstep — restaurants, shops, and small-town Oregon charm all within walking distance. Crater Lake National Park is 1.5 hours away, and I-5 is two minutes out, putting the whole Rogue Valley within easy reach.",
    ],
    details: {
      maxGuests: 6,
      bedrooms: 3,
      amenityHighlights: [
        "Private hot tub",
        "Fire pit",
        "Master bedroom with king bed",
        "Two additional bedrooms with queen beds",
        "Fully equipped kitchen",
      ],
    },
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
    tagline: "A private 2-bedroom ADU retreat, steps from OC Haus.",
    photos: Array.from(
      { length: 17 },
      (_, i) => `/images/the-loft/the-loft-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    description: [
      "A private retreat tucked into the trees on the same 3/4-acre lot as OC Haus, nestled under cedar trees — a beautifully finished 2-bedroom ADU built by the owner. Two bedrooms sleep four, with a fully equipped kitchen, a shower with dual shower heads, and a private deck that makes the space feel entirely its own.",
      "Oregon City is 25 minutes from Portland — close enough for day trips into the city, far enough to actually unwind. The Oregon Trail Museum, Willamette Falls, and historic downtown are all nearby, with Mount Hood and the Columbia River Gorge an easy drive.",
    ],
    details: {
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      amenityHighlights: [
        "Private deck",
        "Dual shower heads",
        "Fully equipped kitchen",
        "Pet friendly",
      ],
    },
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
    tagline: "A spacious ranch home on 3/4 acre, minutes from Portland.",
    photos: Array.from(
      { length: 38 },
      (_, i) => `/images/oc-haus/oc-haus-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    description: [
      "OC Haus is a spacious 4-bedroom, 2-bathroom ranch home on 3/4 of an acre in historic Oregon City, just 25 minutes from Portland. The single-level layout sleeps 8 comfortably, with a king bed master suite, a fireplace in the living room, and a fully equipped kitchen ready for family meals.",
      "Outside, a large fire pit anchors the backyard — one of the biggest you'll find in any rental in the area — with plenty of room to spread out and actually feel like you've left the city.",
      "Oregon City is the end of the Oregon Trail and one of the Pacific Northwest's most underrated towns. Downtown shops, restaurants, and the Willamette Falls overlook are minutes away, with Portland, Mount Hood, and the Columbia River Gorge all within easy reach.",
    ],
    details: {
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 2,
      amenityHighlights: [
        "3/4-acre yard with large fire pit",
        "King bed master suite",
        "Fireplace",
        "Fully equipped kitchen",
        "Pet friendly",
      ],
    },
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
    tagline: "Ocala's ultimate entertainment home.",
    photos: Array.from(
      { length: 45 },
      (_, i) => `/images/brick-city-playhouse/brick-city-playhouse-${String(i + 1).padStart(2, "0")}.jpg`
    ),
    description: [
      "This fully renovated 4-bedroom, 2-bathroom home sleeps up to 8 and was designed around one idea: every corner should have something worth talking about. The garage was converted into the best game room in Ocala — a 4-player arcade with reclining theater chairs, full-size air hockey, skee-ball, pool table, ping pong, an 80\" TV, and a custom hexagon LED neon ceiling. Sign the Playing Card Wall on your way out — every group that's ever stayed here is on it.",
      "Outside, a private pool and hot tub stay open year-round in Florida's climate, and the fully screened lanai has an 8-person dining table and a fire pit lounge — ideal after a day at the World Equestrian Center or the springs. The yard is fully fenced and private.",
      "Each of the four bedrooms has its own accent wall and personality — two king rooms, two queen rooms. You're 5 minutes from downtown Ocala, 20 minutes from the World Equestrian Center, and 10 minutes from Silver Springs State Park.",
    ],
    details: {
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 2,
      amenityHighlights: [
        "Private pool & hot tub (open year-round)",
        "Elite game room (arcade, air hockey, skee-ball, pool table, ping pong)",
        "Screened lanai with fire pit",
        "Pet friendly ($100/pet, max 2 pets)",
      ],
      checkIn: "4:00 PM",
      checkOut: "11:00 AM",
      minStay: "3 nights",
    },
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
