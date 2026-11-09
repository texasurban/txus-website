/**
 * TXUS Backend Pricing Service
 *
 * Centralized, cached pricing snapshot backed by MariaDB/MySQL.
 * Short TTL (15s) for performance, bumped version on every edit for
 * instant invalidation across all clients.
 */

import { eq, desc, and } from "drizzle-orm";
import {
  speciesPricing,
  speciesPricingHistory,
  productPricingOverrides,
  pricingMeta,
  products,
  cartInquiries,
  type SpeciesPricing,
  type ProductPricingOverride,
  type Product,
} from "../drizzle/schema";
import { getDb } from "./db";
import {
  computePrice,
  revalidateCart as sharedRevalidateCart,
  type PricingSnapshot,
  type PricingMethod,
  type ProductPriceInput,
  type CartItemSnapshot,
  type CartValidationResult,
  type PricingResult,
} from "@shared/pricing";

// ---------------------------------------------------------------------------
// In-memory cache (15s TTL)
// ---------------------------------------------------------------------------

const TTL_MS = 15_000;
let cachedSnapshot: { snapshot: PricingSnapshot; expiresAt: number } | null = null;

// ---------------------------------------------------------------------------
// Versioning & snapshot loading
// ---------------------------------------------------------------------------

async function getMeta(key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(pricingMeta).where(eq(pricingMeta.metaKey, key)).limit(1);
  return rows[0]?.metaValue ?? null;
}

async function setMeta(key: string, value: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const rows = await db.select().from(pricingMeta).where(eq(pricingMeta.metaKey, key)).limit(1);
  if (rows.length > 0) {
    await db.update(pricingMeta).set({ metaValue: value }).where(eq(pricingMeta.metaKey, key));
  } else {
    await db.insert(pricingMeta).values({ metaKey: key, metaValue: value });
  }
}

export async function bumpPricingVersion(): Promise<string> {
  const now = new Date().toISOString();
  await setMeta("pricingVersion", now);
  await setMeta("pricingUpdated", now);
  cachedSnapshot = null;
  return now;
}

export async function getPricingSnapshot(): Promise<PricingSnapshot> {
  const now = Date.now();
  if (cachedSnapshot && cachedSnapshot.expiresAt > now) {
    return cachedSnapshot.snapshot;
  }

  const db = await getDb();
  const defStr = (await getMeta("defaultBoardFootRate")) ?? "12.00";
  const version = (await getMeta("pricingVersion")) ?? new Date().toISOString();
  const updatedAt = (await getMeta("pricingUpdated")) ?? version;

  const spRows: SpeciesPricing[] = db ? await db.select().from(speciesPricing) : [];
  const ovRows: ProductPricingOverride[] = db ? await db.select().from(productPricingOverrides) : [];

  const speciesRates: PricingSnapshot["speciesRates"] = {};
  for (const r of spRows) {
    const rate = parseFloat(r.boardFootRate);
    speciesRates[r.species] = {
      rate: Number.isFinite(rate) ? rate : 12.0,
      method: r.pricingMethod as PricingMethod,
      status: r.status as "active" | "inactive",
      effectiveDate: r.effectiveDate,
    };
  }

  const overrides: PricingSnapshot["overrides"] = {};
  for (const r of ovRows) {
    const rateOv = r.boardFootRateOverride ? parseFloat(r.boardFootRateOverride) : null;
    const fixed = r.fixedPrice ? parseFloat(r.fixedPrice) : null;
    overrides[r.productId] = {
      method: r.pricingMethod as PricingMethod,
      rateOverride: Number.isFinite(rateOv as number) ? rateOv : null,
      fixedPrice: Number.isFinite(fixed as number) ? fixed : null,
      reason: r.overrideReason,
      active: r.active === 1,
    };
  }

  const defaultRate = parseFloat(defStr);
  const snapshot: PricingSnapshot = {
    version,
    updatedAt,
    defaultRate: Number.isFinite(defaultRate) ? defaultRate : 12.0,
    speciesRates,
    overrides,
  };

  cachedSnapshot = { snapshot, expiresAt: now + TTL_MS };
  return snapshot;
}

// ---------------------------------------------------------------------------
// Species rates CRUD
// ---------------------------------------------------------------------------

export async function listSpeciesRates(): Promise<SpeciesPricing[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(speciesPricing).orderBy(speciesPricing.species);
}

export async function updateSpeciesRate(input: {
  id: number;
  newRate: string;
  pricingMethod?: PricingMethod;
  status?: "active" | "inactive";
  effectiveDate?: string;
  notes?: string;
  changeReason?: string;
  changedBy?: string;
}): Promise<SpeciesPricing> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(speciesPricing)
    .where(eq(speciesPricing.id, input.id))
    .limit(1);
  if (!existing[0]) throw new Error("Species pricing row not found");
  const current = existing[0];

  const patch: Partial<SpeciesPricing> = { boardFootRate: input.newRate };
  if (input.pricingMethod) patch.pricingMethod = input.pricingMethod;
  if (input.status) patch.status = input.status;
  if (input.effectiveDate !== undefined) patch.effectiveDate = input.effectiveDate;
  if (input.notes !== undefined) patch.notes = input.notes;

  await db.update(speciesPricing).set(patch).where(eq(speciesPricing.id, input.id));

  await db.insert(speciesPricingHistory).values({
    speciesPricingId: input.id,
    species: current.species,
    oldRate: current.boardFootRate,
    newRate: input.newRate,
    oldMethod: current.pricingMethod,
    newMethod: input.pricingMethod ?? current.pricingMethod,
    changedBy: input.changedBy ?? "admin",
    changeReason: input.changeReason ?? "Rate updated via Pricing Manager",
  });

  await bumpPricingVersion();
  const updated = await db.select().from(speciesPricing).where(eq(speciesPricing.id, input.id)).limit(1);
  return updated[0];
}

export async function addSpeciesRate(input: {
  species: string;
  boardFootRate: string;
  pricingMethod?: PricingMethod;
  status?: "active" | "inactive";
  effectiveDate?: string;
  notes?: string;
  createdReason?: string;
  changedBy?: string;
}): Promise<SpeciesPricing> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(speciesPricing).values({
    species: input.species.trim(),
    boardFootRate: input.boardFootRate,
    pricingMethod: input.pricingMethod ?? "board_foot",
    status: input.status ?? "active",
    effectiveDate: input.effectiveDate,
    notes: input.notes,
  });

  const row = (
    await db.select().from(speciesPricing).where(eq(speciesPricing.species, input.species.trim())).limit(1)
  )[0];

  await db.insert(speciesPricingHistory).values({
    speciesPricingId: row?.id,
    species: input.species.trim(),
    oldRate: null,
    newRate: input.boardFootRate,
    oldMethod: null,
    newMethod: input.pricingMethod ?? "board_foot",
    changedBy: input.changedBy ?? "admin",
    changeReason: input.createdReason ?? "Species rate created",
  });

  await bumpPricingVersion();
  return row;
}

export async function deleteSpeciesRate(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(speciesPricing).where(eq(speciesPricing.id, id));
  await bumpPricingVersion();
}

export async function getSpeciesHistory(species?: string) {
  const db = await getDb();
  if (!db) return [];
  if (species) {
    return db
      .select()
      .from(speciesPricingHistory)
      .where(eq(speciesPricingHistory.species, species))
      .orderBy(desc(speciesPricingHistory.changedAt))
      .limit(200);
  }
  return db.select().from(speciesPricingHistory).orderBy(desc(speciesPricingHistory.changedAt)).limit(200);
}

// ---------------------------------------------------------------------------
// Product overrides
// ---------------------------------------------------------------------------

export async function listOverrides(): Promise<ProductPricingOverride[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productPricingOverrides).orderBy(productPricingOverrides.productId);
}

export async function upsertOverride(input: {
  productId: string;
  pricingMethod: PricingMethod;
  boardFootRateOverride?: string | null;
  fixedPrice?: string | null;
  overrideReason?: string | null;
  active?: number;
}): Promise<ProductPricingOverride> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(productPricingOverrides)
    .where(eq(productPricingOverrides.productId, input.productId))
    .limit(1);

  const values: Partial<ProductPricingOverride> = {
    pricingMethod: input.pricingMethod,
    boardFootRateOverride: input.boardFootRateOverride ?? null,
    fixedPrice: input.fixedPrice ?? null,
    overrideReason: input.overrideReason ?? null,
    active: input.active ?? 1,
  };

  if (existing.length > 0) {
    await db.update(productPricingOverrides).set(values).where(eq(productPricingOverrides.productId, input.productId));
  } else {
    await db.insert(productPricingOverrides).values({ productId: input.productId, ...values } as any);
  }

  await bumpPricingVersion();
  const row = (await db.select().from(productPricingOverrides).where(eq(productPricingOverrides.productId, input.productId)).limit(1))[0];
  return row;
}

export async function deleteOverride(productId: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productPricingOverrides).where(eq(productPricingOverrides.productId, productId));
  await bumpPricingVersion();
}

// ---------------------------------------------------------------------------
// Default rate
// ---------------------------------------------------------------------------

export async function getDefaultRate(): Promise<number> {
  const s = await getMeta("defaultBoardFootRate");
  const n = s ? parseFloat(s) : 12.0;
  return Number.isFinite(n) ? n : 12.0;
}

export async function setDefaultRate(rate: string): Promise<void> {
  await setMeta("defaultBoardFootRate", rate);
  await bumpPricingVersion();
}

// ---------------------------------------------------------------------------
// Catalog with live pricing
// ---------------------------------------------------------------------------

export interface CatalogProductView {
  product: Product;
  pricing: PricingResult;
}

export async function getCatalog(filter?: {
  category?: string;
  species?: string;
  search?: string;
}): Promise<{ products: CatalogProductView[]; version: string; updatedAt: string }> {
  const db = await getDb();
  if (!db) return { products: [], version: "offline", updatedAt: "" };

  const rows: Product[] = await db.select().from(products);
  const snapshot = await getPricingSnapshot();

  const views: CatalogProductView[] = [];
  for (const p of rows) {
    if (filter?.category && p.category.toLowerCase() !== filter.category.toLowerCase()) continue;
    if (filter?.species && p.species.toLowerCase() !== filter.species.toLowerCase()) continue;
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      const hit =
        p.id.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.notes || "").toLowerCase().includes(q);
      if (!hit) continue;
    }
    const pricing = computePrice(productToPriceInput(p), snapshot);
    views.push({ product: p, pricing });
  }

  return { products: views, version: snapshot.version, updatedAt: snapshot.updatedAt };
}

export async function getProduct(id: string): Promise<CatalogProductView | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  if (!rows[0]) return null;
  const snapshot = await getPricingSnapshot();
  return { product: rows[0], pricing: computePrice(productToPriceInput(rows[0]), snapshot) };
}

function productToPriceInput(p: Product): ProductPriceInput {
  return {
    id: p.id,
    category: p.category,
    species: p.species,
    lengthIn: p.lengthIn,
    widthMinIn: p.widthMinIn,
    widthMaxIn: p.widthMaxIn,
    averageWidthIn: p.averageWidthIn,
    thicknessIn: p.thicknessIn,
    boardFeet: p.boardFeet,
    sourcePrice: p.sourcePrice,
    pricingMethodDefault: p.pricingMethodDefault,
  };
}

// ---------------------------------------------------------------------------
// Cart revalidation
// ---------------------------------------------------------------------------

export async function revalidateCart(items: CartItemSnapshot[]): Promise<CartValidationResult> {
  const db = await getDb();
  const snapshot = await getPricingSnapshot();
  if (!db || items.length === 0) {
    return { items: [], changed: false, pricingVersion: snapshot.version, pricingUpdatedAt: snapshot.updatedAt };
  }

  const ids = Array.from(new Set(items.map((i) => i.productId)));
  const rows: Product[] = await db.select().from(products);
  const byId: Record<string, ProductPriceInput> = {};
  for (const r of rows) {
    if (ids.includes(r.id)) byId[r.id] = productToPriceInput(r);
  }

  return sharedRevalidateCart(items, byId, snapshot);
}

// ---------------------------------------------------------------------------
// Inquiry record with pricing version snapshot
// ---------------------------------------------------------------------------

export async function recordInquiry(input: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  items: Array<{ productId: string; quantity: number; selectedPrice: number | null; surfacing?: boolean }>;
  totalAmount?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const snapshot = await getPricingSnapshot();
  const reval = await revalidateCart(
    input.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      selectedPrice: i.selectedPrice,
      surfacing: i.surfacing,
    })),
  );
  const code = "TX-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  await db.insert(cartInquiries).values({
    inquiryCode: code,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone ?? null,
    notes: input.notes ?? null,
    itemsJson: JSON.stringify(reval.items),
    pricingVersion: snapshot.version,
    pricingSnapshotJson: JSON.stringify(snapshot),
    totalAmount: input.totalAmount ?? null,
    fulfillment: "local_pickup",
  });
  return { inquiryCode: code, pricingVersion: snapshot.version, priceChangesOccurred: reval.changed };
}
