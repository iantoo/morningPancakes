import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  hostel: text("hostel").notNull(),
  room: text("room").notNull(),
  quantity: integer("quantity").notNull(),
  flavors: json("flavors").$type<{ flavor: string; quantity: number }[]>().notNull(),
  customerName: text("customer_name"),
  phoneNumber: text("phone_number"),
  total: integer("total").notNull(), // in cents
  status: text("status").notNull().default("pending"),
});

export const hostels = pgTable("hostels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull().unique(),
});

export const flavors = pgTable("flavors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  value: text("value").notNull().unique(),
  emoji: text("emoji").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  hostel: true,
  room: true,
  flavors: true,
}).extend({
  flavors: z.array(z.object({
    flavor: z.string(),
    quantity: z.number().min(1).max(10)
  })).min(1, "Please select at least one flavor"),
  room: z.string().min(1, "Room number is required"),
  hostel: z.string().min(1, "Hostel name is required"),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type Hostel = typeof hostels.$inferSelect;
export type Flavor = typeof flavors.$inferSelect;
