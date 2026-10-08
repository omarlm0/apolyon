import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// ------------------------------------------------------------------
// Utility: Verify the request truly came from Meta
// Meta signs every webhook POST with HMAC-SHA256 using your App Secret.
// If the signature doesn't match, we reject the request immediately.
// ------------------------------------------------------------------
function verifyMetaSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;

  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.error("WHATSAPP_APP_SECRET is not set in environment variables.");
    return false;
  }

  // Meta sends: "sha256=<hash>"
  const [algorithm, receivedHash] = signature.split("=");
  if (algorithm !== "sha256" || !receivedHash) return false;

  const expectedHash = crypto
    .createHmac("sha256", appSecret)
    .update(rawBody, "utf8")
    .digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(receivedHash, "hex"),
      Buffer.from(expectedHash, "hex")
    );
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------
// GET /api/webhook — Meta Webhook Verification (one-time setup)
// ------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Meta webhook verified successfully.");
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// ------------------------------------------------------------------
// POST /api/webhook — Handle Incoming Webhook Events from Meta
// ------------------------------------------------------------------
export async function POST(req: NextRequest) {
  // 1. Read the raw body as text for signature verification
  const rawBody = await req.text();

  // 2. Verify the request is genuinely from Meta
  const signature = req.headers.get("x-hub-signature-256");
  if (!verifyMetaSignature(rawBody, signature)) {
    console.warn("Invalid Meta webhook signature — request rejected.");
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 3. Parse the body now that we know it's safe
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new NextResponse("Bad Request", { status: 400 });
  }

  // 4. Only handle WhatsApp events
  if (body.object !== "whatsapp_business_account") {
    return new NextResponse("Not Found", { status: 404 });
  }

  // 5. Process each entry and change
  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;

      // --- Incoming Message ---
      if (value.messages?.[0]) {
        const message = value.messages[0];
        const from = message.from; // Customer's phone number
        const text = message.text?.body ?? "(non-text message)";
        console.log(`Incoming message from ${from}: ${text}`);
        // TODO: forward to your order system or trigger a Botpress flow
      }

      // --- Delivery Status Update ---
      if (value.statuses?.[0]) {
        const status = value.statuses[0];
        console.log(`Message to ${status.recipient_id} — status: ${status.status}`);

        // TODO: Update order status in DB (e.g., "delivered", "read", "failed")
        // Example:
        // if (status.status === "delivered") {
        //   await db.update(orders).set({ status: "delivered" }).where(...);
        // }
      }
    }
  }

  // Always return 200 quickly so Meta doesn't retry
  return new NextResponse("OK", { status: 200 });
}
