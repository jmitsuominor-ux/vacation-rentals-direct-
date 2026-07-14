import { NextRequest, NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";
import { getProperty } from "@/lib/properties";
import type { ReservationInput } from "@/lib/booking";

function isValidReservationInput(body: unknown): body is ReservationInput {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  const guest = b.guest as Record<string, unknown> | undefined;
  return (
    typeof b.propertySlug === "string" &&
    typeof b.checkIn === "string" &&
    typeof b.checkOut === "string" &&
    typeof b.guests === "number" &&
    typeof guest?.firstName === "string" &&
    typeof guest?.lastName === "string" &&
    typeof guest?.email === "string"
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!isValidReservationInput(body)) {
    return NextResponse.json({ error: "Invalid reservation payload" }, { status: 400 });
  }

  if (!getProperty(body.propertySlug)) {
    return NextResponse.json(
      { error: `Unknown property "${body.propertySlug}"` },
      { status: 404 }
    );
  }

  try {
    const reservation = await getBookingProvider().createReservation(body);
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create reservation" },
      { status: 502 }
    );
  }
}
