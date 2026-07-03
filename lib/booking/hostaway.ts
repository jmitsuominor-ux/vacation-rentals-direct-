import { getProperty } from "@/lib/properties";
import type {
  AvailabilityDay,
  BookingProvider,
  Quote,
  Reservation,
  ReservationInput,
} from "./types";

const HOSTAWAY_BASE_URL = "https://api.hostaway.com/v1";

interface TokenCache {
  accessToken: string;
  expiresAt: number; // epoch ms
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.accessToken;
  }

  const accountId = process.env.HOSTAWAY_ACCOUNT_ID;
  const apiKey = process.env.HOSTAWAY_API_KEY;
  if (!accountId || !apiKey) {
    throw new Error(
      "HOSTAWAY_ACCOUNT_ID and HOSTAWAY_API_KEY must be set to talk to Hostaway."
    );
  }

  const res = await fetch(`${HOSTAWAY_BASE_URL}/accessTokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cache: "no-cache",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: accountId,
      client_secret: apiKey,
      scope: "general",
    }),
  });

  if (!res.ok) {
    throw new Error(`Hostaway token request failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return tokenCache.accessToken;
}

async function hostawayFetch(path: string, init: RequestInit = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${HOSTAWAY_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });

  if (!res.ok) {
    throw new Error(`Hostaway request ${path} failed: ${res.status} ${await res.text()}`);
  }

  const body = await res.json();
  return body.result;
}

function requireListingId(propertySlug: string): string {
  const property = getProperty(propertySlug);
  if (!property?.hostawayListingId) {
    throw new Error(
      `No Hostaway listing mapped for "${propertySlug}" yet — set it in lib/properties.ts.`
    );
  }
  return property.hostawayListingId;
}

export class HostawayProvider implements BookingProvider {
  async getAvailability(
    propertySlug: string,
    startDate: string,
    endDate: string
  ): Promise<AvailabilityDay[]> {
    const listingId = requireListingId(propertySlug);
    const calendar = await hostawayFetch(
      `/listings/${listingId}/calendar?startDate=${startDate}&endDate=${endDate}`
    );

    return (calendar as Array<Record<string, unknown>>).map((day) => ({
      date: day.date as string,
      available: day.status === "available",
      minStay: (day.minimumStay as number) ?? 1,
      price: (day.price as number) ?? null,
    }));
  }

  async getQuote(
    propertySlug: string,
    checkIn: string,
    checkOut: string,
    _guests: number
  ): Promise<Quote> {
    const listingId = requireListingId(propertySlug);
    const [calendar, listing] = await Promise.all([
      hostawayFetch(
        `/listings/${listingId}/calendar?startDate=${checkIn}&endDate=${checkOut}`
      ),
      hostawayFetch(`/listings/${listingId}`),
    ]);

    const nights = (calendar as Array<{ price?: number }>).slice(0, -1);
    const subtotal = nights.reduce((sum, night) => sum + (night.price ?? 0), 0);
    const cleaningFee = (listing.cleaningFee as number) ?? 0;
    const taxRate = (listing.taxRate as number) ?? 0;
    const taxes = Math.round((subtotal + cleaningFee) * taxRate) / 100;

    return {
      currency: (listing.currencyCode as string) ?? "USD",
      nights: nights.length,
      nightlyRate: nights.length ? subtotal / nights.length : 0,
      subtotal,
      cleaningFee,
      taxes,
      total: subtotal + cleaningFee + taxes,
    };
  }

  async createReservation(input: ReservationInput): Promise<Reservation> {
    const listingId = requireListingId(input.propertySlug);
    const directChannelId = process.env.HOSTAWAY_DIRECT_CHANNEL_ID;
    if (!directChannelId) {
      throw new Error("HOSTAWAY_DIRECT_CHANNEL_ID must be set (see README).");
    }

    const quote = await this.getQuote(
      input.propertySlug,
      input.checkIn,
      input.checkOut,
      input.guests
    );

    const result = await hostawayFetch(`/reservations`, {
      method: "POST",
      body: JSON.stringify({
        listingMapId: Number(listingId),
        channelId: Number(directChannelId),
        arrivalDate: input.checkIn,
        departureDate: input.checkOut,
        numberOfGuests: input.guests,
        guestFirstName: input.guest.firstName,
        guestLastName: input.guest.lastName,
        guestEmail: input.guest.email,
        phone: input.guest.phone,
        totalPrice: quote.total,
        currency: quote.currency,
      }),
    });

    return {
      id: String(result.id),
      status: result.status === "new" ? "confirmed" : "pending",
      propertySlug: input.propertySlug,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
      total: quote.total,
      currency: quote.currency,
    };
  }

  async cancelReservation(reservationId: string): Promise<void> {
    await hostawayFetch(`/reservations/${reservationId}`, {
      method: "PUT",
      body: JSON.stringify({ status: "cancelled" }),
    });
  }
}
