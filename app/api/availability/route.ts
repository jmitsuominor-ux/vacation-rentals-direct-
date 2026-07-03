import { NextRequest, NextResponse } from "next/server";
import { getBookingProvider } from "@/lib/booking";
import { getProperty } from "@/lib/properties";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const property = searchParams.get("property");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!property || !startDate || !endDate) {
    return NextResponse.json(
      { error: "property, startDate, and endDate are required" },
      { status: 400 }
    );
  }

  if (!getProperty(property)) {
    return NextResponse.json({ error: `Unknown property "${property}"` }, { status: 404 });
  }

  try {
    const availability = await getBookingProvider().getAvailability(
      property,
      startDate,
      endDate
    );
    return NextResponse.json({ availability });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load availability" },
      { status: 502 }
    );
  }
}
