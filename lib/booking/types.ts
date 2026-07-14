export interface AvailabilityDay {
  date: string; // YYYY-MM-DD
  available: boolean;
  minStay: number;
  price: number | null;
}

export interface Quote {
  currency: string;
  nights: number;
  nightlyRate: number;
  subtotal: number;
  cleaningFee: number;
  taxes: number;
  total: number;
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface ReservationInput {
  propertySlug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guest: GuestDetails;
}

export type ReservationStatus = "confirmed" | "pending" | "cancelled";

export interface Reservation {
  id: string;
  status: ReservationStatus;
  propertySlug: string;
  checkIn: string;
  checkOut: string;
  total: number;
  currency: string;
}

/**
 * Every booking backend (Hostaway today, something else tomorrow) implements
 * this interface. Nothing outside lib/booking/ should import a provider
 * directly — always go through getBookingProvider().
 */
export interface BookingProvider {
  getAvailability(
    propertySlug: string,
    startDate: string,
    endDate: string
  ): Promise<AvailabilityDay[]>;

  getQuote(
    propertySlug: string,
    checkIn: string,
    checkOut: string,
    guests: number
  ): Promise<Quote>;

  createReservation(input: ReservationInput): Promise<Reservation>;

  cancelReservation(reservationId: string): Promise<void>;
}
