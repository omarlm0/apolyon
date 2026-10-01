"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getOrders() {
  try {
    const allOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
    return { success: true, orders: allOrders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, orders: [] };
  }
}

export async function updateOrderStatus(
  orderId: number,
  newStatus: string
) {
  try {
    await db
      .update(orders)
      .set({ status: newStatus, updatedAt: new Date() })
      .where(eq(orders.id, orderId));
    return { success: true };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false };
  }
}

export async function deleteOrder(orderId: number) {
  try {
    await db.delete(orders).where(eq(orders.id, orderId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false };
  }
}
