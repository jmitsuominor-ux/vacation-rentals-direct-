import type { BookingProvider } from "./types";
import { HostawayProvider } from "./hostaway";

export * from "./types";

let provider: BookingProvider | null = null;

/**
 * Single entry point the rest of the app uses to reach the booking backend.
 * Swapping providers later means adding a new class that implements
 * BookingProvider and changing the case below — nothing else in the app
 * (routes, pages, components) needs to change.
 */
export function getBookingProvider(): BookingProvider {
  if (provider) return provider;

  const name = process.env.BOOKING_PROVIDER ?? "hostaway";
  switch (name) {
    case "hostaway":
      provider = new HostawayProvider();
      break;
    default:
      throw new Error(`Unknown BOOKING_PROVIDER "${name}"`);
  }
  return provider;
}
