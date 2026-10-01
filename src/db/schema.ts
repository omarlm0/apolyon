import { pgTable, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  
  // Customer Information
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: text("city").notNull(),

  // Order Details
  orderType: varchar("order_type", { length: 20 }).notNull(), // 'personal' or 'wholesale'
  variant: varchar("variant", { length: 20 }).notNull(),       // 'oceanic' or 'lavender'
  quantity: integer("quantity").notNull(),
  
  // System Fields
  orderRef: varchar("order_ref", { length: 50 }).unique(),    
  status: varchar("status", { length: 50 }).default('pending').notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
