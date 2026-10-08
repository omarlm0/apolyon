import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, text } = body;

    if (!to || !text) {
      return NextResponse.json(
        { error: "Missing 'to' or 'text' in request body." },
        { status: 400 }
      );
    }

    const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
    const VERSION = "v17.0"; // Meta Graph API Version

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json(
        { error: "WhatsApp credentials are not configured in environment variables." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to,
          type: "text",
          text: { body: text },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Error sending message to WhatsApp API:", data);
      return NextResponse.json(
        { error: "Failed to send message", details: data },
        { status: response.status }
      );
    }

    console.log(`Message successfully sent to ${to}`);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error processing request:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
