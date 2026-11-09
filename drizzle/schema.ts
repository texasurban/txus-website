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
// Centralized Board-Foot Species-Rate Pricing System
// =========================================================================

/**
 * Master species pricing table. One editable row per species.
 * Current working default rate for new species is $12.00/BF (Dev's rule).
 */
export const speciesPricing = mysqlTable("speciesPricing", {
  id: int("id").autoincrement().primaryKey(),
  species: varchar("species", { length: 128 }).notNull().unique(),
  boardFootRate: varchar("boardFootRate", { length: 10 }).default("12.00").notNull(),
  pricingMethod: mysqlEnum("pricingMethod", ["board_foot", "fixed", "inquire"]).default("board_foot").notNull(),
  status: mysqlEnum("status", ["active", "inactive"]).default("active").notNull(),
  effectiveDate: varchar("effectiveDate", { length: 32 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SpeciesPricing = typeof speciesPricing.$inferSelect;
export type InsertSpeciesPricing = typeof speciesPricing.$inferInsert;

/**
 * Audit log for every species-rate change: old/new rate, changedBy, reason.
 */
export const speciesPricingHistory = mysqlTable("speciesPricingHistory", {
  id: int("id").autoincrement().primaryKey(),
  speciesPricingId: int("speciesPricingId"),
  species: varchar("species", { length: 128 }).notNull(),
  oldRate: varchar("oldRate", { length: 10 }),
  newRate: varchar("newRate", { length: 10 }),
  oldMethod: varchar("oldMethod", { length: 16 }),
  newMethod: varchar("newMethod", { length: 16 }),
  changedBy: varchar("changedBy", { length: 128 }),
  changeReason: text("changeReason"),
  changedAt: timestamp("changedAt").defaultNow().notNull(),
});
export type SpeciesPricingHistory = typeof speciesPricingHistory.$inferSelect;
export type InsertSpeciesPricingHistory = typeof speciesPricingHistory.$inferInsert;

/**
 * Optional product-level overrides that outrank species-level rates.
 * Hierarchy: product override -> current species rate -> default rule.
 */
export const productPricingOverrides = mysqlTable("productPricingOverrides", {
  id: int("id").autoincrement().primaryKey(),
  productId: varchar("productId", { length: 64 }).notNull().unique(),
  pricingMethod: mysqlEnum("pricingMethod", ["board_foot", "fixed", "inquire"]).default("board_foot").notNull(),
  boardFootRateOverride: varchar("boardFootRateOverride", { length: 10 }),
  fixedPrice: varchar("fixedPrice", { length: 10 }),
  overrideReason: text("overrideReason"),
  active: int("active").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ProductPricingOverride = typeof productPricingOverrides.$inferSelect;
export type InsertProductPricingOverride = typeof productPricingOverrides.$inferInsert;

/**
 * Key-value metadata for the pricing system (defaultBoardFootRate, pricingVersion, etc.)
 */
export const pricingMeta = mysqlTable("pricingMeta", {
  id: int("id").autoincrement().primaryKey(),
  metaKey: varchar("metaKey", { length: 64 }).notNull().unique(),
  metaValue: varchar("metaValue", { length: 255 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PricingMeta = typeof pricingMeta.$inferSelect;

/**
 * Master products projection synchronized from TXUS Master Inventory.
 */
export const products = mysqlTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  category: varchar("category", { length: 64 }).notNull(),
  species: varchar("species", { length: 128 }).notNull(),
  lengthIn: varchar("lengthIn", { length: 16 }),
  widthMinIn: varchar("widthMinIn", { length: 16 }),
  widthMaxIn: varchar("widthMaxIn", { length: 16 }),
  averageWidthIn: varchar("averageWidthIn", { length: 16 }),
  thicknessIn: varchar("thicknessIn", { length: 16 }),
  boardFeet: varchar("boardFeet", { length: 16 }),
  pricingMethodDefault: varchar("pricingMethodDefault", { length: 64 }),
  sourcePrice: varchar("sourcePrice", { length: 16 }),
  location: varchar("location", { length: 128 }),
  notes: text("notes"),
  primaryImage: varchar("primaryImage", { length: 255 }),
  allImages: text("allImages"),
  imageCount: int("imageCount").default(0),
  imageStatus: varchar("imageStatus", { length: 32 }).default("IMAGE_LINKED"),
  publicListing: varchar("publicListing", { length: 8 }).default("YES"),
  status: varchar("status", { length: 64 }).default("available"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Checkout/inquiry records with pricing-version snapshot.
 */
export const cartInquiries = mysqlTable("cartInquiries", {
  id: int("id").autoincrement().primaryKey(),
  inquiryCode: varchar("inquiryCode", { length: 32 }).notNull().unique(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 32 }),
  notes: text("notes"),
  itemsJson: text("itemsJson").notNull(),
  pricingVersion: varchar("pricingVersion", { length: 64 }),
  pricingSnapshotJson: text("pricingSnapshotJson"),
  totalAmount: varchar("totalAmount", { length: 16 }),
  fulfillment: varchar("fulfillment", { length: 32 }).default("local_pickup"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CartInquiry = typeof cartInquiries.$inferSelect;
export type InsertCartInquiry = typeof cartInquiries.$inferInsert;
