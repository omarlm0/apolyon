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

    return { success: true, orderRef };
  } catch (error) {
    console.error("Error submitting order:", error);
    return { success: false, error: "Failed to submit order. Please try again later." };
  }
}
