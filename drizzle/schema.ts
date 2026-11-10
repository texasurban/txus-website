import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions table.
 * Stores all inquiries from the contact page.
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Articles table for blog content.
 * Stores published articles with rich text content (HTML with images, bold, links).
 */
export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(), // HTML content with rich formatting
  featuredImageUrl: varchar("featuredImageUrl", { length: 500 }),
  authorId: int("authorId").references(() => users.id),
  published: int("published").default(0).notNull(), // 0 = draft, 1 = published
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  publishedAt: timestamp("publishedAt"),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

// =========================================================================
// TXUS commerce projection — Master Inventory 11102026V2 (additive only).
// Existing users/contactSubmissions/articles are deliberately unchanged.
// =========================================================================
export const speciesPricing = mysqlTable("speciesPricing", {
  id: int("id").autoincrement().primaryKey(),
  species: varchar("species", { length: 128 }).notNull().unique(),
  boardFootRate: varchar("boardFootRate", { length: 16 }).default("12.00").notNull(),
  pricingMethod: mysqlEnum("pricingMethod", ["board_foot", "fixed", "inquire"]).default("board_foot").notNull(),
  status: mysqlEnum("status", ["active", "inactive"]).default("active").notNull(),
  effectiveDate: varchar("effectiveDate", { length: 32 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SpeciesPricing = typeof speciesPricing.$inferSelect;
export type InsertSpeciesPricing = typeof speciesPricing.$inferInsert;

export const speciesPricingHistory = mysqlTable("speciesPricingHistory", {
  id: int("id").autoincrement().primaryKey(),
  // No FK: audit records survive deletion of a species or override.
  speciesPricingId: int("speciesPricingId"),
  species: varchar("species", { length: 128 }).notNull(),
  oldRate: varchar("oldRate", { length: 16 }),
  newRate: varchar("newRate", { length: 16 }),
  oldMethod: varchar("oldMethod", { length: 16 }),
  newMethod: varchar("newMethod", { length: 16 }),
  changedBy: varchar("changedBy", { length: 128 }).notNull(),
  changeReason: text("changeReason"),
  // Includes status/reason changes even when the numeric rate is unchanged.
  oldValueJson: text("oldValueJson"),
  newValueJson: text("newValueJson"),
  changedAt: timestamp("changedAt").defaultNow().notNull(),
});
export type SpeciesPricingHistory = typeof speciesPricingHistory.$inferSelect;
export type InsertSpeciesPricingHistory = typeof speciesPricingHistory.$inferInsert;

export const productPricingOverrides = mysqlTable("productPricingOverrides", {
  id: int("id").autoincrement().primaryKey(),
  productId: varchar("productId", { length: 64 }).notNull().unique(),
  pricingMethod: mysqlEnum("pricingMethod", ["board_foot", "fixed", "inquire"]).default("board_foot").notNull(),
  boardFootRateOverride: varchar("boardFootRateOverride", { length: 16 }),
  fixedPrice: varchar("fixedPrice", { length: 16 }),
  overrideReason: text("overrideReason"),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ProductPricingOverride = typeof productPricingOverrides.$inferSelect;
export type InsertProductPricingOverride = typeof productPricingOverrides.$inferInsert;

export const pricingMeta = mysqlTable("pricingMeta", {
  id: int("id").autoincrement().primaryKey(),
  metaKey: varchar("metaKey", { length: 64 }).notNull().unique(),
  metaValue: varchar("metaValue", { length: 255 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PricingMeta = typeof pricingMeta.$inferSelect;

export const products = mysqlTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  category: varchar("category", { length: 64 }).notNull(),
  species: varchar("species", { length: 128 }).notNull(),
  lengthIn: varchar("lengthIn", { length: 32 }),
  widthMinIn: varchar("widthMinIn", { length: 32 }),
  widthMaxIn: varchar("widthMaxIn", { length: 32 }),
  averageWidthIn: varchar("averageWidthIn", { length: 32 }),
  thicknessIn: varchar("thicknessIn", { length: 32 }),
  // Approved V2 two-decimal BF is authoritative; never replace by raw precision.
  boardFeet: varchar("boardFeet", { length: 32 }),
  pricingMethodDefault: varchar("pricingMethodDefault", { length: 64 }),
  sourcePrice: varchar("sourcePrice", { length: 32 }),
  location: varchar("location", { length: 128 }),
  notes: text("notes"),
  primaryImage: varchar("primaryImage", { length: 2048 }),
  allImages: text("allImages"),
  galleryJson: text("galleryJson"),
  imageCount: int("imageCount").default(0),
  imageStatus: varchar("imageStatus", { length: 32 }).default("IMAGE_REVIEW"),
  publicListing: varchar("publicListing", { length: 8 }).default("NO"),
  exclusionReason: text("exclusionReason"),
  quantity: int("quantity").default(1).notNull(),
  inventoryVersion: varchar("inventoryVersion", { length: 64 }).notNull(),
  status: varchar("status", { length: 64 }).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const cartInquiries = mysqlTable("cartInquiries", {
  id: int("id").autoincrement().primaryKey(),
  inquiryCode: varchar("inquiryCode", { length: 32 }).notNull().unique(),
  idempotencyKey: varchar("idempotencyKey", { length: 128 }).unique(),
  requestHash: varchar("requestHash", { length: 64 }),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 32 }),
  notes: text("notes"),
  itemsJson: text("itemsJson").notNull(),
  pricingVersion: varchar("pricingVersion", { length: 64 }).notNull(),
  pricingSnapshotJson: text("pricingSnapshotJson"),
  totalAmount: varchar("totalAmount", { length: 24 }).notNull(),
  fulfillment: varchar("fulfillment", { length: 32 }).default("local_pickup").notNull(),
  pickupAmount: varchar("pickupAmount", { length: 16 }).default("0.00").notNull(),
  notificationSent: int("notificationSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CartInquiry = typeof cartInquiries.$inferSelect;
export type InsertCartInquiry = typeof cartInquiries.$inferInsert;

export const cartInquiryItems = mysqlTable("cartInquiryItems", {
  id: int("id").autoincrement().primaryKey(),
  inquiryId: int("inquiryId").notNull().references(() => cartInquiries.id),
  productId: varchar("productId", { length: 64 }).notNull(),
  quantity: int("quantity").notNull(),
  surfacing: int("surfacing").default(0).notNull(),
  unitPrice: varchar("unitPrice", { length: 24 }).notNull(),
  surfacingFee: varchar("surfacingFee", { length: 16 }).notNull(),
  lineTotal: varchar("lineTotal", { length: 24 }).notNull(),
  boardFeet: varchar("boardFeet", { length: 32 }),
  boardFootRateUsed: varchar("boardFootRateUsed", { length: 16 }),
  pricingMethod: mysqlEnum("pricingMethod", ["board_foot", "fixed", "inquire"]).notNull(),
  rateSource: varchar("rateSource", { length: 16 }).notNull(),
  pricingFormula: text("pricingFormula").notNull(),
  pricingVersion: varchar("pricingVersion", { length: 64 }).notNull(),
  inventoryVersion: varchar("inventoryVersion", { length: 64 }).notNull(),
  productSnapshotJson: text("productSnapshotJson").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CartInquiryItem = typeof cartInquiryItems.$inferSelect;
export type InsertCartInquiryItem = typeof cartInquiryItems.$inferInsert;
