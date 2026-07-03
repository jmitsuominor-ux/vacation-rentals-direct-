# Wanderkeep — direct booking site

Direct booking site for 5 short-term rentals, currently listed on Airbnb and VRBO:

| Property | Location |
|---|---|
| Warren House | Rogue River, OR |
| Rogue House | Rogue Valley, OR |
| The Loft | Oregon City, OR |
| OC Haus | Oregon City, OR |
| Brick City Playhouse | Ocala, FL |

Built with Next.js (App Router, TypeScript). Booking is handled by Hostaway, but
routed through a provider interface so the backend can switch to a different
PMS/booking engine without touching the frontend.

## Architecture

```
app/                       marketing site + API routes
  page.tsx                 homepage, properties grouped by region
  properties/[slug]/       one page per property + booking widget
  api/availability/        GET  -> BookingProvider.getAvailability
  api/quote/                GET  -> BookingProvider.getQuote
  api/reservations/          POST -> BookingProvider.createReservation
  api/webhooks/hostaway/     Hostaway unified webhook receiver

lib/properties.ts          the 5 properties: name, region, tagline, and the
                            mapping to a Hostaway listing ID
lib/booking/
  types.ts                 BookingProvider interface — the only contract the
                            rest of the app depends on
  hostaway.ts               HostawayProvider — implements BookingProvider
                            against the Hostaway Public API
  index.ts                  getBookingProvider() — picks the active provider
                            from BOOKING_PROVIDER
```

**To swap providers later:** write a new class implementing `BookingProvider`
in `lib/booking/`, add a case for it in `lib/booking/index.ts`, done. No
changes needed in `app/api/*` or any page/component — they only ever call
`getBookingProvider()`.

**Guest data belongs to us, not the vendor.** The Hostaway webhook handler in
`app/api/webhooks/hostaway/route.ts` is where reservation events land; once
Supabase is wired in, that's where they get normalized and stored in our own
database. That's what actually protects guest history and the ability to
migrate later — the provider interface protects the code, this protects the
data.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in Hostaway credentials
   (Settings > Public API in the Hostaway dashboard).
3. Fill in `hostawayListingId` for each property in `lib/properties.ts` once
   the Hostaway account has the 5 listings created/synced.
4. `npm run dev` — [http://localhost:3000](http://localhost:3000)

### Before taking real payments

The Hostaway integration in `lib/booking/hostaway.ts` is scaffolded from
Hostaway's publicly documented API shape (`/v1/accessTokens`, `/v1/listings`,
`/v1/reservations`, unified webhooks), but wasn't verified against a live
account. Before going live, confirm against the current Hostaway API
reference (in the dashboard once you have an account):

- Exact field names on `POST /v1/reservations`
- The correct `HOSTAWAY_DIRECT_CHANNEL_ID` for this account
- Whether `taxRate`/`cleaningFee` come back on the listing object as assumed
  in `getQuote()`, or need a different endpoint
- Lodging tax handling — Oregon and Florida have different local tax rules
  and this needs real configuration per property, not the flat placeholder
  currently in `getQuote()`

## Deploy

Deploys like any Next.js app (Vercel is the path of least resistance). Needs
the env vars from `.env.example` set in the hosting environment, plus a
domain once one's picked.
