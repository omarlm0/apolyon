"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";

export async function submitOrder(data: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  orderType: string;
  variant: string;
  quantity: number;
}) {
  try {
    // 1. Generate a unique order reference
    const orderRef = `APOL-${Math.floor(10000 + Math.random() * 90000)}`;

    // 2. Save to Neon Database via Drizzle
    await db.insert(orders).values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      orderType: data.orderType,
      variant: data.variant,
      quantity: data.quantity,
      orderRef,
      status: "pending",
    });

    // 3. Send Order Confirmation to the Customer via Meta WhatsApp Cloud API
    const customerMessage = `✅ *Order Confirmed!*\n\nHi ${data.fullName}, thank you for your order!\n\n📦 *Order Details:*\n• Variant: ${data.variant}\n• Quantity: ${data.quantity}\n• City: ${data.city}\n• Order Ref: *${orderRef}*\n\nA member of our team will reach out to you shortly on this number to confirm the details. 🙌`;

    // Format phone number: remove spaces, dashes, and ensure no leading +
    const formattedPhone = data.phone.replace(/[\s\-\(\)]/g, '').replace(/^\+/, '');

    // Note: Using Meta's Official WhatsApp Cloud API
    const whatsappResponse = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone, // Customer's phone number from the order form
        type: "text",
        text: {
          preview_url: false,
          body: customerMessage,
        },
      }),
    });

    if (!whatsappResponse.ok) {
      console.error("Failed to send WhatsApp message via Meta Cloud API", await whatsappResponse.text());
    }

    return { success: true, orderRef };
  } catch (error) {
    console.error("Error submitting order:", error);
    return { success: false, error: "Failed to submit order. Please try again later." };
  }
}
