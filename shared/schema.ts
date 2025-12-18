import { pgTable, text, varchar, decimal, boolean, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  original_price: decimal("original_price", { precision: 10, scale: 2 }),
  hero_image: text("hero_image"),
  images: text("images").array().default([]),
  image_order: text("image_order").array().default([]),
  story: text("story"),
  sizes: text("sizes").array().default(["S", "M", "L", "XL"]),
  fabric: varchar("fabric", { length: 255 }),
  care_instructions: text("care_instructions"),
  in_stock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  value: text("value").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
