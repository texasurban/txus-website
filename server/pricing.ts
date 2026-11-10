/** TXUS managed-TiDB pricing service. Uses the existing getDb; no core changes.
 * Every pricing mutation and inquiry serializes on pricingVersion, so a saved
 * inquiry and its lines always use one fresh authoritative pricing snapshot.
 */
import { randomUUID, randomBytes, createHash } from "node:crypto";
import { eq, desc, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  speciesPricing,
  speciesPricingHistory,
  productPricingOverrides,
  pricingMeta,
  products,
  cartInquiries,
  cartInquiryItems,
  type Product,
  type SpeciesPricing,
  type ProductPricingOverride,
  type CartInquiry,
} from "../drizzle/schema";
import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import {
  computePrice,
  genericSpecies,
  isPublicEligible,
  parseNumber,
  positiveNumber,
  revalidateCart as validateShared,
  toCents,
  type PricingSnapshot,
  type PricingMethod,
  type CartItemSnapshot,
  type PricingResult,
} from "@shared/pricing";

type Database = NonNullable<Awaited<ReturnType<typeof getDb>>>;
type Executor = Pick<Database, "select" | "insert" | "update" | "delete">;
const INITIAL_VERSION = "11102026V2-initial";
const TTL_MS = 15_000;
let cache: { snapshot: PricingSnapshot; expiresAt: number } | null = null;
let cacheGeneration = 0;
export function invalidatePricingCache(): void {
  cache = null;
  cacheGeneration += 1;
}
async function requireDb(): Promise<Database> {
  const db = await getDb();
  if (!db)
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message: "Inventory service is unavailable. Please try again later.",
    });
  return db;
}
async function setMeta(tx: Executor, key: string, value: string) {
  await tx
    .insert(pricingMeta)
    .values({ metaKey: key, metaValue: value })
    .onDuplicateKeyUpdate({ set: { metaValue: value } });
}
async function lockPricing(tx: Executor) {
  // First legitimate write initializes only metadata, never demo prices/history.
  await tx
    .insert(pricingMeta)
    .values({ metaKey: "pricingVersion", metaValue: INITIAL_VERSION })
    .onDuplicateKeyUpdate({ set: { metaKey: "pricingVersion" } });
  await tx
    .select()
    .from(pricingMeta)
    .where(eq(pricingMeta.metaKey, "pricingVersion"))
    .for("update");
}
async function bumpVersion(tx: Executor) {
  const version = randomUUID();
  await setMeta(tx, "pricingVersion", version);
  await setMeta(tx, "pricingUpdated", new Date().toISOString());
  return version;
}
async function loadSnapshot(tx: Executor): Promise<PricingSnapshot> {
  const meta = await tx.select().from(pricingMeta);
  const spRows = await tx.select().from(speciesPricing);
  const ovRows = await tx.select().from(productPricingOverrides);
  const values = Object.fromEntries(meta.map(r => [r.metaKey, r.metaValue]));
  const speciesRates: PricingSnapshot["speciesRates"] = Object.create(null);
  spRows.forEach(r => {
    speciesRates[r.species] = {
      rate: positiveNumber(r.boardFootRate) ?? 0,
      method: r.pricingMethod,
      status: r.status,
      effectiveDate: r.effectiveDate,
    };
  });
  const overrides: PricingSnapshot["overrides"] = Object.create(null);
  ovRows.forEach(r => {
    overrides[r.productId] = {
      method: r.pricingMethod,
      rateOverride: parseNumber(r.boardFootRateOverride),
      fixedPrice: parseNumber(r.fixedPrice),
      active: r.active === 1,
      // overrideReason is admin-only and intentionally absent from public snapshots.
    };
  });
  return {
    version: values.pricingVersion ?? INITIAL_VERSION,
    updatedAt: values.pricingUpdated ?? "2026-11-10T00:00:00.000Z",
    defaultRate: positiveNumber(values.defaultBoardFootRate) ?? 12,
    speciesRates,
    overrides,
  };
}
export async function getPricingSnapshot(): Promise<PricingSnapshot> {
  if (cache && cache.expiresAt > Date.now()) return cache.snapshot;
  const db = await requireDb();
  const generation = cacheGeneration;
  const snapshot = await db.transaction(tx => loadSnapshot(tx));
  if (generation === cacheGeneration)
    cache = { snapshot, expiresAt: Date.now() + TTL_MS };
  return snapshot;
}
async function editPricing<T>(work: (tx: Executor) => Promise<T>): Promise<T> {
  const db = await requireDb();
  const result = await db.transaction(async tx => {
    await lockPricing(tx);
    const result = await work(tx);
    await bumpVersion(tx);
    return result;
  });
  invalidatePricingCache();
  return result;
}
function boundedRate(value: number | string, allowZero = false): string {
  const n = parseNumber(value);
  if (n === null || n > 100000 || (allowZero ? n < 0 : n <= 0))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Rate must be a finite positive number no greater than 100000.",
    });
  const result = n.toFixed(2);
  if (!allowZero && Number(result) <= 0)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Rate must be at least 0.01.",
    });
  return result;
}
const missing = (message: string): never => {
  throw new TRPCError({ code: "NOT_FOUND", message });
};
async function audit(
  tx: Executor,
  label: string,
  actor: string,
  reason: string,
  old: unknown,
  value: unknown,
  oldRate: string | null,
  newRate: string | null,
  oldMethod: string | null,
  newMethod: string | null,
  id?: number
) {
  await tx
    .insert(speciesPricingHistory)
    .values({
      speciesPricingId: id ?? null,
      species: label,
      changedBy: actor.slice(0, 128),
      changeReason: reason,
      oldValueJson: old === null ? null : JSON.stringify(old),
      newValueJson: value === null ? null : JSON.stringify(value),
      oldRate,
      newRate,
      oldMethod,
      newMethod,
    });
}
export async function listSpeciesRates(): Promise<SpeciesPricing[]> {
  const db = await requireDb();
  return db.select().from(speciesPricing).orderBy(speciesPricing.species);
}
export interface UpdateSpeciesInput {
  id: number;
  newRate: number | string;
  pricingMethod?: PricingMethod;
  status?: "active" | "inactive";
  effectiveDate?: string | null;
  notes?: string | null;
  changeReason?: string;
}
export async function updateSpeciesRate(
  input: UpdateSpeciesInput,
  actor: string
): Promise<SpeciesPricing> {
  const rate = boundedRate(input.newRate);
  return editPricing(async tx => {
    const current =
      (
        await tx
          .select()
          .from(speciesPricing)
          .where(eq(speciesPricing.id, input.id))
          .limit(1)
      )[0] ?? missing("Species pricing row not found");
    const patch = {
      boardFootRate: rate,
      pricingMethod: input.pricingMethod ?? current.pricingMethod,
      status: input.status ?? current.status,
      effectiveDate:
        input.effectiveDate === undefined
          ? current.effectiveDate
          : input.effectiveDate,
      notes: input.notes === undefined ? current.notes : input.notes,
    };
    await tx
      .update(speciesPricing)
      .set(patch)
      .where(eq(speciesPricing.id, input.id));
    await audit(
      tx,
      current.species,
      actor,
      input.changeReason ?? "Species pricing updated",
      current,
      patch,
      current.boardFootRate,
      rate,
      current.pricingMethod,
      patch.pricingMethod,
      current.id
    );
    return (
      await tx
        .select()
        .from(speciesPricing)
        .where(eq(speciesPricing.id, input.id))
        .limit(1)
    )[0];
  });
}
export interface AddSpeciesInput {
  species: string;
  boardFootRate: number | string;
  pricingMethod?: PricingMethod;
  status?: "active" | "inactive";
  effectiveDate?: string | null;
  notes?: string | null;
  createdReason?: string;
  changeReason?: string;
}
export async function addSpeciesRate(
  input: AddSpeciesInput,
  actor: string
): Promise<SpeciesPricing> {
  const rate = boundedRate(input.boardFootRate),
    name = genericSpecies(input.species);
  if (!name)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "A valid species name is required.",
    });
  return editPricing(async tx => {
    if (
      (
        await tx
          .select()
          .from(speciesPricing)
          .where(eq(speciesPricing.species, name))
          .limit(1)
      )[0]
    )
      throw new TRPCError({
        code: "CONFLICT",
        message: "This generic species already has a pricing row.",
      });
    const values = {
      species: name,
      boardFootRate: rate,
      pricingMethod: input.pricingMethod ?? ("board_foot" as PricingMethod),
      status: input.status ?? ("active" as const),
      effectiveDate: input.effectiveDate,
      notes: input.notes,
    };
    await tx.insert(speciesPricing).values(values);
    const row = (
      await tx
        .select()
        .from(speciesPricing)
        .where(eq(speciesPricing.species, name))
        .limit(1)
    )[0];
    await audit(
      tx,
      name,
      actor,
      input.changeReason ?? input.createdReason ?? "Species pricing created",
      null,
      row,
      null,
      rate,
      null,
      row.pricingMethod,
      row.id
    );
    return row;
  });
}
export async function deleteSpeciesRate(
  id: number,
  actor: string,
  reason?: string
): Promise<void> {
  await editPricing(async tx => {
    const row =
      (
        await tx
          .select()
          .from(speciesPricing)
          .where(eq(speciesPricing.id, id))
          .limit(1)
      )[0] ?? missing("Species pricing row not found");
    await audit(
      tx,
      row.species,
      actor,
      reason ?? "Species pricing deleted",
      row,
      null,
      row.boardFootRate,
      null,
      row.pricingMethod,
      null,
      row.id
    );
    await tx.delete(speciesPricing).where(eq(speciesPricing.id, id));
  });
}
export async function getSpeciesHistory(species?: string) {
  const db = await requireDb();
  return species
    ? db
        .select()
        .from(speciesPricingHistory)
        .where(eq(speciesPricingHistory.species, species))
        .orderBy(
          desc(speciesPricingHistory.changedAt),
          desc(speciesPricingHistory.id)
        )
        .limit(200)
    : db
        .select()
        .from(speciesPricingHistory)
        .orderBy(
          desc(speciesPricingHistory.changedAt),
          desc(speciesPricingHistory.id)
        )
        .limit(200);
}
export async function listOverrides(): Promise<ProductPricingOverride[]> {
  const db = await requireDb();
  return db
    .select()
    .from(productPricingOverrides)
    .orderBy(productPricingOverrides.productId);
}
export interface OverrideInput {
  productId: string;
  pricingMethod: PricingMethod;
  boardFootRateOverride?: number | string | null;
  fixedPrice?: number | string | null;
  overrideReason?: string | null;
  active?: number;
}
export async function upsertOverride(
  input: OverrideInput,
  actor: string
): Promise<ProductPricingOverride> {
  const rate =
    input.boardFootRateOverride == null
      ? null
      : boundedRate(input.boardFootRateOverride);
  const fixed =
    input.fixedPrice == null ? null : boundedRate(input.fixedPrice, true);
  if (
    (input.pricingMethod === "board_foot" && rate === null) ||
    (input.pricingMethod === "fixed" && fixed === null)
  )
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Supply the rate or fixed price required by the selected pricing method.",
    });
  return editPricing(async tx => {
    if (
      !(
        await tx
          .select()
          .from(products)
          .where(eq(products.id, input.productId))
          .limit(1)
      )[0]
    )
      missing("Product not found");
    const old =
      (
        await tx
          .select()
          .from(productPricingOverrides)
          .where(eq(productPricingOverrides.productId, input.productId))
          .limit(1)
      )[0] ?? null;
    const values = {
      productId: input.productId,
      pricingMethod: input.pricingMethod,
      boardFootRateOverride: rate,
      fixedPrice: fixed,
      overrideReason: input.overrideReason ?? null,
      active: input.active ?? 1,
    };
    await tx
      .insert(productPricingOverrides)
      .values(values)
      .onDuplicateKeyUpdate({ set: values });
    await audit(
      tx,
      `PRODUCT:${input.productId}`,
      actor,
      input.overrideReason ?? "Product pricing override updated",
      old,
      values,
      old?.pricingMethod === "fixed"
        ? old.fixedPrice
        : (old?.boardFootRateOverride ?? null),
      input.pricingMethod === "fixed" ? fixed : rate,
      old?.pricingMethod ?? null,
      input.pricingMethod
    );
    return (
      await tx
        .select()
        .from(productPricingOverrides)
        .where(eq(productPricingOverrides.productId, input.productId))
        .limit(1)
    )[0];
  });
}
export async function deleteOverride(
  productId: string,
  actor: string,
  reason?: string
): Promise<void> {
  await editPricing(async tx => {
    const old =
      (
        await tx
          .select()
          .from(productPricingOverrides)
          .where(eq(productPricingOverrides.productId, productId))
          .limit(1)
      )[0] ?? missing("Override not found");
    await audit(
      tx,
      `PRODUCT:${productId}`,
      actor,
      reason ?? "Product pricing override deleted",
      old,
      null,
      old.pricingMethod === "fixed"
        ? old.fixedPrice
        : old.boardFootRateOverride,
      null,
      old.pricingMethod,
      null
    );
    await tx
      .delete(productPricingOverrides)
      .where(eq(productPricingOverrides.productId, productId));
  });
}
export async function getDefaultRate(): Promise<number> {
  return (await getPricingSnapshot()).defaultRate;
}
export async function setDefaultRate(
  rate: number | string,
  actor: string,
  reason?: string
): Promise<void> {
  const value = boundedRate(rate);
  await editPricing(async tx => {
    const old = (await loadSnapshot(tx)).defaultRate.toFixed(2);
    await setMeta(tx, "defaultBoardFootRate", value);
    await audit(
      tx,
      "DEFAULT",
      actor,
      reason ?? "Default board-foot rate updated",
      { rate: old },
      { rate: value },
      old,
      value,
      "board_foot",
      "board_foot"
    );
  });
}
export async function invalidateCacheWithVersion(actor: string) {
  await editPricing(async tx => {
    await audit(
      tx,
      "DEFAULT",
      actor,
      "Pricing cache invalidated",
      null,
      { action: "invalidateCache" },
      null,
      null,
      null,
      null
    );
  });
  return { success: true, version: (await getPricingSnapshot()).version };
}

// Public projection excludes internal notes/location/completeness reasons/audit data.
export function publicProduct(p: Product) {
  const {
    notes: _notes,
    location: _location,
    exclusionReason: _reason,
    ...view
  } = p;
  return view;
}
export interface CatalogProductView {
  product: ReturnType<typeof publicProduct>;
  pricing: PricingResult;
}
export async function getCatalog(filter?: {
  category?: string;
  species?: string;
  search?: string;
}): Promise<{
  products: CatalogProductView[];
  version: string;
  updatedAt: string;
}> {
  const db = await requireDb(),
    snapshot = await getPricingSnapshot();
  const rows = await db.select().from(products);
  const views: CatalogProductView[] = [];
  for (const p of rows) {
    const pricing = computePrice(p, snapshot);
    if (!isPublicEligible(p, pricing)) continue;
    if (
      filter?.category &&
      p.category.toLowerCase() !== filter.category.trim().toLowerCase()
    )
      continue;
    if (
      filter?.species &&
      genericSpecies(p.species).toLowerCase() !==
        genericSpecies(filter.species).toLowerCase()
    )
      continue;
    if (
      filter?.search &&
      !`${p.id} ${p.species} ${p.category}`
        .toLowerCase()
        .includes(filter.search.trim().toLowerCase())
    )
      continue;
    views.push({ product: publicProduct(p), pricing });
  }
  return {
    products: views,
    version: snapshot.version,
    updatedAt: snapshot.updatedAt,
  };
}
export async function getProduct(
  id: string
): Promise<CatalogProductView | null> {
  const db = await requireDb();
  const p = (
    await db.select().from(products).where(eq(products.id, id)).limit(1)
  )[0];
  if (!p) return null;
  const pricing = computePrice(p, await getPricingSnapshot());
  return isPublicEligible(p, pricing)
    ? { product: publicProduct(p), pricing }
    : null;
}
export async function revalidateCart(items: CartItemSnapshot[]) {
  const db = await requireDb();
  // Cart validation bypasses the cache as stock and pricing may have changed.
  return db.transaction(async tx => {
    const snapshot = await loadSnapshot(tx);
    const ids = Array.from(new Set(items.map(i => i.productId)));
    const rows = ids.length
      ? await tx.select().from(products).where(inArray(products.id, ids))
      : [];
    return validateShared(
      items,
      Object.fromEntries(rows.map(p => [p.id, p])),
      snapshot
    );
  });
}
export interface InquiryInput {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  notes?: string;
  items: CartItemSnapshot[];
  totalAmount?: number | string;
  pricingVersion?: string;
  idempotencyKey?: string;
}
export function authoritativeInquiryPricing(
  input: InquiryInput,
  rows: Product[],
  snapshot: PricingSnapshot
) {
  if (
    input.items.length < 1 ||
    input.items.length > 100 ||
    new Set(input.items.map(i => i.productId)).size !== input.items.length
  )
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Include 1 to 100 unique product lines.",
    });
  const result = validateShared(
    input.items,
    Object.fromEntries(rows.map(p => [p.id, p])),
    snapshot
  );
  if (result.removedProductIds.length)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Please review unavailable items: ${result.removalNotices.join(" ")}`,
    });
  if (
    (input.pricingVersion !== undefined &&
      input.pricingVersion !== snapshot.version) ||
    result.changed
  )
    throw new TRPCError({
      code: "CONFLICT",
      message:
        "Pricing or selected options changed. Refresh and review your cart before sending the inquiry.",
    });
  const totalCents = result.items.reduce(
    (sum, line) => sum + toCents(line.itemTotal!),
    0
  );
  if (!Number.isSafeInteger(totalCents))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Inquiry amount is too large.",
    });
  return { validation: result, totalAmount: (totalCents / 100).toFixed(2) };
}
function inquiryHash(input: InquiryInput): string {
  const { totalAmount: _untrusted, idempotencyKey: _key, ...safe } = input;
  return createHash("sha256").update(JSON.stringify(safe)).digest("hex");
}
function inquiryResponse(row: CartInquiry) {
  return {
    inquiryCode: row.inquiryCode,
    pricingVersion: row.pricingVersion,
    priceChangesOccurred: false,
    totalAmount: row.totalAmount,
    notificationSent: row.notificationSent === 1,
  };
}
function checkReplay(row: CartInquiry, hash: string) {
  if (row.requestHash !== hash)
    throw new TRPCError({
      code: "CONFLICT",
      message: "This inquiry key was already used for a different request.",
    });
  return inquiryResponse(row);
}
export async function recordInquiry(input: InquiryInput) {
  const db = await requireDb(),
    hash = inquiryHash(input);
  const persisted = await db.transaction(async tx => {
    await lockPricing(tx);
    if (input.idempotencyKey) {
      const old = (
        await tx
          .select()
          .from(cartInquiries)
          .where(eq(cartInquiries.idempotencyKey, input.idempotencyKey))
          .limit(1)
      )[0];
      if (old)
        return { row: old, replay: true, response: checkReplay(old, hash) };
    }
    const snapshot = await loadSnapshot(tx);
    const ids = input.items.map(i => i.productId);
    const rows = ids.length
      ? await tx
          .select()
          .from(products)
          .where(inArray(products.id, ids))
          .for("update")
      : [];
    const priced = authoritativeInquiryPricing(input, rows, snapshot);
    const inquiryCode = `TX-${randomBytes(10).toString("hex").toUpperCase()}`;
    await tx
      .insert(cartInquiries)
      .values({
        inquiryCode,
        idempotencyKey: input.idempotencyKey ?? null,
        requestHash: hash,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone ?? null,
        notes: input.notes ?? null,
        itemsJson: JSON.stringify(priced.validation.items),
        pricingVersion: snapshot.version,
        pricingSnapshotJson: JSON.stringify(snapshot),
        totalAmount: priced.totalAmount,
        fulfillment: "local_pickup",
        pickupAmount: "0.00",
      });
    const row = (
      await tx
        .select()
        .from(cartInquiries)
        .where(eq(cartInquiries.inquiryCode, inquiryCode))
        .limit(1)
    )[0];
    const byId = Object.fromEntries(rows.map(p => [p.id, p]));
    await tx.insert(cartInquiryItems).values(
      priced.validation.items.map(line => ({
        inquiryId: row.id,
        productId: line.productId,
        quantity: line.quantity,
        surfacing: line.surfacing ? 1 : 0,
        unitPrice: line.newPrice!.toFixed(2),
        surfacingFee: (line.surfacingFee ?? 0).toFixed(2),
        lineTotal: line.itemTotal!.toFixed(2),
        boardFeet: line.pricingResult.boardFeet?.toFixed(2) ?? null,
        boardFootRateUsed:
          line.pricingResult.boardFootRateUsed?.toFixed(2) ?? null,
        pricingMethod: line.pricingResult.method,
        rateSource: line.pricingResult.rateSource,
        pricingFormula: line.pricingResult.formula,
        pricingVersion: snapshot.version,
        inventoryVersion: byId[line.productId].inventoryVersion,
        productSnapshotJson: JSON.stringify(
          publicProduct(byId[line.productId])
        ),
      }))
    );
    return { row, replay: false, response: inquiryResponse(row) };
  });
  if (persisted.replay) return persisted.response;
  // Best effort only AFTER COMMIT; no payment, reservation, or customer-email claim.
  let notificationSent = false;
  try {
    const lines = JSON.parse(persisted.row.itemsJson) as Array<{
      productId: string;
      quantity: number;
      surfacing: boolean;
      itemTotal: number;
    }>;
    notificationSent = await notifyOwner({
      title: `TXUS Shop Inquiry ${persisted.row.inquiryCode}`,
      content: `Customer: ${input.customerName}\nEmail: ${input.customerEmail}\nPhone: ${input.customerPhone ?? "Not provided"}\nInquiry estimate: $${persisted.row.totalAmount}\nPricing version: ${persisted.row.pricingVersion}\nLocal pickup: $0.00. Inquiry only; no payment, automatic reservation or freight commitment.\n\n${lines.map(l => `${l.productId} × ${l.quantity}${l.surfacing ? " + surfacing" : ""}: $${l.itemTotal.toFixed(2)}`).join("\n")}\n\nNotes: ${input.notes ?? "None"}`,
    });
  } catch {
    console.warn(
      "[ShopInquiry] Inquiry saved; owner notification unavailable."
    );
  }
  if (notificationSent) {
    try {
      await db
        .update(cartInquiries)
        .set({ notificationSent: 1 })
        .where(eq(cartInquiries.id, persisted.row.id));
    } catch {
      console.warn(
        "[ShopInquiry] Owner notified; delivery flag could not be recorded."
      );
    }
  }
  return { ...persisted.response, notificationSent };
}
