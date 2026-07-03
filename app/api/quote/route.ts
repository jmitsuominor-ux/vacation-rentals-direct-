import { NextRequest, NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";
import { getProperty } from "@/lib/properties";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const property = searchParams.get("property");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = Number(searchParams.get("guests") ?? "1");

  if (!property || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: "property, checkIn, and checkOut are required" },
      { status: 400 }
    );
  }

  if (!getProperty(property)) {
    return NextResponse.json({ error: `Unknown property "${property}"` }, { status: 404 });
  }

  try {
    const quote = await getBookingProvider().getQuote(property, checkIn, checkOut, guests);
    return NextResponse.json({ quote });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to build quote" },
      { status: 502 }
    );
  }
}
