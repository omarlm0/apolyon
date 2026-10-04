"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 3. Send Receipt to Client (TEMPORARILY DISABLED)
    /* 
    await resend.emails.send({
      from: "Apolyon <onboarding@resend.dev>",
      to: data.email,
      subject: `Your Apolyon Order Confirmation (${orderRef})`,
      html: `
        <h2>Thank you for your order, ${data.fullName}!</h2>
        <p>We have successfully received your ${data.orderType} request.</p>
        <p><strong>Order Details:</strong></p>
        <ul>
          <li>Reference: ${orderRef}</li>
          <li>Product: ${data.variant.toUpperCase()}</li>
          <li>Quantity: ${data.quantity}</li>
          <li>Shipping City: ${data.city}</li>
        </ul>
        <p>Our team will contact you shortly on ${data.phone} to arrange delivery and payment.</p>
        <br/>
        <p>Best regards,<br/>The Apolyon Team</p>
      `,
    });
    */

    // 4. Send Internal Alert to Workers
    await resend.emails.send({
      from: "Apolyon System <onboarding@resend.dev>", 
      to: "omarlmden@gmail.com", // This works on free tier because it's your verified email
      subject: `New ${data.orderType.toUpperCase()} Order - ${data.variant}`,
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Variant:</strong> ${data.variant}</p>
        <p><strong>Quantity:</strong> ${data.quantity}</p>
      `,
    });

    return { success: true, orderRef };
  } catch (error) {
    console.error("Error submitting order:", error);
    return { success: false, error: "Failed to submit order. Please try again later." };
  }
}
