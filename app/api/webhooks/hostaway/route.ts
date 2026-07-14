import { NextRequest, NextResponse } from "next/server";

// Hostaway's unified webhook authenticates via HTTP Basic Auth using the
// login/password you set when registering the webhook (dashboard or API),
// not an HMAC signature. Configure the same login/password as env vars here.
function isAuthorized(request: NextRequest): boolean {
  const expectedUser = process.env.HOSTAWAY_WEBHOOK_USER;
  const expectedPassword = process.env.HOSTAWAY_WEBHOOK_PASSWORD;
  if (!expectedUser || !expectedPassword) return false;

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  const decoded = Buffer.from(header.slice("Basic ".length), "base64").toString("utf-8");
  const [user, password] = decoded.split(":");
  return user === expectedUser && password === expectedPassword;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await request.json();

  // TODO: once Supabase is wired up, normalize `event` (object: "reservation"
  // or "message", event: "created"/"updated") and upsert it into our own
  // reservations table here. That table — not Hostaway — is what the rest of
  // the app and any future provider swap should read guest/booking history
  // from.
  console.log("Hostaway webhook received:", event.object, event.event);

  return NextResponse.json({ received: true });
}
