/** TXUS centralized pricing: product override → generic species → default.
 * Adapted from the approved pricing prototype. V2 rounded BF is authoritative.
 * No eligibility decision relies on a price, image count, or client state alone.
 */
export type PricingMethod = "board_foot" | "fixed" | "inquire";
export type RateSource =
  | "override"
  | "species"
  | "default"
  | "fixed"
  | "inquire";
export interface SpeciesRateEntry {
  rate: number;
  method: PricingMethod;
  status: "active" | "inactive";
  effectiveDate?: string | null;
}
export interface ProductOverrideEntry {
  method: PricingMethod;
  rateOverride?: number | null;
  fixedPrice?: number | null;
  reason?: string | null;
  active: boolean;
}
export interface PricingSnapshot {
  version: string;
  updatedAt: string;
  defaultRate: number;
  speciesRates: Record<string, SpeciesRateEntry>;
  overrides: Record<string, ProductOverrideEntry>;
}
export interface ProductPriceInput {
  id: string;
  category: string;
  species: string;
  lengthIn?: number | string | null;
  widthMinIn?: number | string | null;
  widthMaxIn?: number | string | null;
  averageWidthIn?: number | string | null;
  thicknessIn?: number | string | null;
  boardFeet?: number | string | null;
  sourcePrice?: number | string | null;
  pricingMethodDefault?: string | null;
  publicListing?: string | null;
  imageStatus?: string | null;
  galleryJson?: string | null;
  allImages?: string | null;
  primaryImage?: string | null;
  imageCount?: number | null;
  exclusionReason?: string | null;
  redProductId?: boolean;
  quantity?: number | null;
  status?: string | null;
  inventoryVersion?: string | null;
}
export interface CatalogProductView {
  product: ProductPriceInput & {
    notes?: string | null;
    location?: string | null;
  };
  pricing: PricingResult;
}
export interface PricingResult {
  method: PricingMethod;
  price: number | null;
  boardFootRateUsed: number | null;
  rateSource: RateSource;
  boardFeet: number | null;
  formula: string;
  pricingVersion: string;
  surfacingAvailable: boolean;
  surfacingFee: number | null;
}
export interface CartItemSnapshot {
  productId: string;
  quantity?: number;
  selectedPrice: number | null;
  surfacing?: boolean;
}
export interface CartItemValidation {
  productId: string;
  quantity: number;
  surfacing: boolean;
  oldPrice: number | null;
  newPrice: number | null;
  priceChanged: boolean;
  changeNotice: string | null;
  pricingResult: PricingResult;
  surfacingFee: number | null;
  itemTotal: number | null;
}
export interface CartValidationResult {
  items: CartItemValidation[];
  changed: boolean;
  pricingVersion: string;
  pricingUpdatedAt: string;
  removedProductIds: string[];
  removalNotices: string[];
}
export interface InquiryPricingFields {
  board_foot_rate_used: number | null;
  calculated_price: number | null;
  pricing_version: string;
  rate_source: RateSource;
  pricing_formula: string;
}

export function parseNumber(v: unknown): number | null {
  if (typeof v !== "number" && typeof v !== "string") return null;
  if (typeof v === "string" && !v.trim()) return null;
  const n = typeof v === "number" ? v : Number(v.replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : null;
}
export function positiveNumber(v: unknown): number | null {
  const n = parseNumber(v);
  return n !== null && n > 0 ? n : null;
}
export const round2 = (n: number): number =>
  Math.round((n + Number.EPSILON) * 100) / 100;
export const toCents = (n: number): number =>
  Math.round((n + Number.EPSILON) * 100);
export function canonicalSpecies(s?: string | null): string {
  return String(s ?? "")
    .trim()
    .replace(/\s*-\s*(Marvin|Series|115 years|70 year).*$/i, "")
    .replace(/\s*\(AFD Plaque\)/gi, "")
    .replace(/\s+Burl\s+Cookies?/gi, "")
    .replace(/\s+Cookies?/gi, "")
    .replace(/CHERRY/g, "Cherry")
    .trim();
}
export function genericSpecies(s?: string | null): string {
  return canonicalSpecies(s)
    .replace(/^Texas\s*/i, "")
    .replace(/\s+BURL.*$/i, "")
    .trim();
}
export function averageWidth(
  min?: number | string | null,
  max?: number | string | null
): number | null {
  const lo = positiveNumber(min),
    hi = positiveNumber(max);
  if (lo !== null && hi !== null) return (lo + hi) / 2;
  return lo ?? hi;
}
export function effectiveWidth(p: ProductPriceInput): number | null {
  return (
    averageWidth(p.widthMinIn, p.widthMaxIn) ?? positiveNumber(p.averageWidthIn)
  );
}
export function boardFeet(
  length?: number | string | null,
  width?: number | string | null,
  thickness?: number | string | null
): number | null {
  const l = positiveNumber(length),
    w = positiveNumber(width),
    t = positiveNumber(thickness);
  if (l === null || w === null || t === null) return null;
  const bf = round2((l * w * t) / 144);
  return Number.isFinite(bf) && bf > 0 ? bf : null;
}
export function floorLength(inches?: number | string | null): number | null {
  const n = positiveNumber(inches);
  return n === null ? null : Math.floor(n);
}
export function surfacingFee(length?: number | string | null): number | null {
  const l = positiveNumber(length);
  return l === null ? null : l <= 72 ? 50 : l <= 120 ? 75 : 100;
}

const BF_CATEGORIES = new Set([
  "slabs",
  "mantels",
  "beams",
  "dimensional lumber",
  "lumber",
]);
export function computePrice(
  p: ProductPriceInput,
  snapshot: PricingSnapshot
): PricingResult {
  const cat = p.category.trim().toLowerCase();
  const bf =
    positiveNumber(p.boardFeet) ??
    boardFeet(p.lengthIn, effectiveWidth(p), p.thicknessIn);
  const src = positiveNumber(p.sourcePrice);
  const fee = surfacingFee(p.lengthIn);
  const available =
    (cat === "slabs" || cat === "cookies & rounds") && fee !== null;
  const base = {
    boardFeet: bf,
    pricingVersion: snapshot.version,
    surfacingAvailable: available,
    surfacingFee: available ? fee : null,
  };
  const inquire = (): PricingResult => ({
    ...base,
    method: "inquire",
    price: null,
    boardFootRateUsed: null,
    rateSource: "inquire",
    formula: "Price upon request",
  });
  const fixed = (
    value: number | null,
    source: RateSource = "fixed"
  ): PricingResult => ({
    ...base,
    method: "fixed",
    price: value === null ? null : round2(value),
    boardFootRateUsed: null,
    rateSource: source,
    formula:
      value === null
        ? "Price pending"
        : `Fixed sale price $${round2(value).toFixed(2)}`,
  });
  const fromRate = (rate: number, source: RateSource): PricingResult => {
    const value =
      bf !== null && positiveNumber(rate) !== null ? round2(bf * rate) : null;
    return {
      ...base,
      method: "board_foot",
      price: value,
      boardFootRateUsed: rate,
      rateSource: source,
      formula:
        value === null
          ? "Board feet pending (dimensions missing)"
          : `${bf!.toFixed(2)} BF × $${rate.toFixed(2)}/BF = $${value.toFixed(2)}`,
    };
  };
  const ov = snapshot.overrides[p.id];
  if (ov?.active) {
    if (ov.method === "inquire") return inquire();
    if (ov.method === "fixed")
      return fixed(positiveNumber(ov.fixedPrice), "override");
    return fromRate(positiveNumber(ov.rateOverride) ?? 0, "override");
  }
  if (
    (cat === "cookies & rounds" ||
      p.pricingMethodDefault === "EXISTING_SALE_PRICE_NO_DIMENSIONS") &&
    bf === null &&
    src !== null
  )
    return fixed(src);
  // Generic first ensures a Pecan edit reprices Texas Pecan and all provenance variants.
  const gen = genericSpecies(p.species),
    raw = canonicalSpecies(p.species);
  const entries = Object.entries(snapshot.speciesRates);
  const lookup = (name: string) =>
    snapshot.speciesRates[name] ??
    entries.find(([k]) => k.toLowerCase() === name.toLowerCase())?.[1];
  const sp = lookup(gen) ?? lookup(raw);
  if (sp?.status === "active") {
    if (sp.method === "inquire") return inquire();
    if (sp.method === "fixed") return fixed(src);
    return fromRate(sp.rate, "species");
  }
  if (BF_CATEGORIES.has(cat))
    return fromRate(positiveNumber(snapshot.defaultRate) ?? 0, "default");
  if (cat === "cookies & rounds") return fixed(src);
  return inquire();
}

/** Gallery data must contain real linked URLs, not a filename or declared count.
 * galleryJson is authoritative when present; legacy allImages must also be JSON.
 */
export function linkedGalleryUrls(p: ProductPriceInput): string[] {
  const json = p.galleryJson ?? p.allImages;
  if (!json) return [];
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  const urls = new Set<string>();
  const collect = (value: unknown) => {
    if (typeof value === "string") {
      if (
        /^\/manus-storage\/txus-inventory\/[a-zA-Z0-9_./%()-]+$/.test(value) &&
        !value.includes("..")
      ) {
        urls.add(value);
        return;
      }
      try {
        const u = new URL(value);
        if (u.protocol === "https:" && u.hostname) urls.add(value);
      } catch {
        /* filename is not a verified association */
      }
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      // URL-bearing image objects may use card/detail/lightbox or rendition keys.
      Object.values(value).forEach(collect);
    }
  };
  data.forEach(collect);
  return Array.from(urls);
}
export function eligibilityReasons(
  p: ProductPriceInput,
  pricing: PricingResult
): string[] {
  const reasons: string[] = [];
  if (p.redProductId || p.publicListing?.trim().toUpperCase() !== "YES")
    reasons.push("Inventory is not approved for public listing");
  const exclusion = p.exclusionReason?.trim();
  if (exclusion && !/^(OK|NONE)$/i.test(exclusion))
    reasons.push("Inventory requires completeness review");
  if (
    p.imageStatus?.trim().toUpperCase() !== "IMAGE_LINKED" ||
    linkedGalleryUrls(p).length === 0
  )
    reasons.push("Verified product images are unavailable");
  if (
    positiveNumber(p.lengthIn) === null ||
    effectiveWidth(p) === null ||
    positiveNumber(p.thicknessIn) === null
  )
    reasons.push("Usable length, width and thickness are required");
  if (
    !["available", "in_stock", "active"].includes(
      p.status?.trim().toLowerCase() ?? ""
    )
  )
    reasons.push("Product is unavailable or sold");
  const stock = p.quantity ?? 1;
  if (!Number.isInteger(stock) || stock < 1)
    reasons.push("Product is out of stock");
  if (pricing.method === "inquire" || positiveNumber(pricing.price) === null)
    reasons.push("Current approved price is unavailable");
  return reasons;
}
export function isPublicEligible(
  p: ProductPriceInput,
  pricing: PricingResult
): boolean {
  return eligibilityReasons(p, pricing).length === 0;
}
export function validQuantity(
  quantity: number,
  product: ProductPriceInput
): boolean {
  return (
    Number.isInteger(quantity) &&
    quantity >= 1 &&
    quantity <= 100 &&
    quantity <= (product.quantity ?? 1)
  );
}
export function revalidateCartItem(
  item: CartItemSnapshot,
  product: ProductPriceInput,
  snapshot: PricingSnapshot
): CartItemValidation {
  const quantity = item.quantity ?? 1;
  if (!validQuantity(quantity, product))
    throw new Error("Quantity exceeds available stock or is invalid");
  const pricingResult = computePrice(product, snapshot);
  const oldPrice = parseNumber(item.selectedPrice),
    newPrice = pricingResult.price;
  const priceChanged =
    oldPrice === null || newPrice === null
      ? oldPrice !== newPrice
      : toCents(oldPrice) !== toCents(newPrice);
  const surfaced = Boolean(
    item.surfacing &&
      pricingResult.surfacingAvailable &&
      pricingResult.surfacingFee !== null
  );
  const fee = surfaced ? pricingResult.surfacingFee! : 0;
  const itemTotal =
    newPrice === null
      ? null
      : ((toCents(newPrice) + toCents(fee)) * quantity) / 100;
  const disabledSurfacing = Boolean(item.surfacing && !surfaced);
  const notice = priceChanged
    ? `Pricing updated from ${oldPrice === null ? "unpriced" : `$${oldPrice.toFixed(2)}`} to ${newPrice === null ? "unpriced" : `$${newPrice.toFixed(2)}`} using current approved pricing.`
    : disabledSurfacing
      ? "Surfacing is unavailable and has been removed from this item."
      : null;
  return {
    productId: item.productId,
    quantity,
    surfacing: surfaced,
    oldPrice,
    newPrice,
    priceChanged,
    changeNotice: notice,
    pricingResult,
    surfacingFee: surfaced ? fee : null,
    itemTotal,
  };
}
export function revalidateCart(
  items: CartItemSnapshot[],
  productsById: Record<string, ProductPriceInput>,
  snapshot: PricingSnapshot
): CartValidationResult {
  const result: CartValidationResult = {
    items: [],
    changed: false,
    pricingVersion: snapshot.version,
    pricingUpdatedAt: snapshot.updatedAt,
    removedProductIds: [],
    removalNotices: [],
  };
  const counts = new Map<string, number>();
  items.forEach(i =>
    counts.set(i.productId, (counts.get(i.productId) ?? 0) + 1)
  );
  for (const item of items) {
    const p = Object.prototype.hasOwnProperty.call(productsById, item.productId)
      ? productsById[item.productId]
      : undefined;
    const reasons = !p
      ? ["Product is no longer available"]
      : eligibilityReasons(p, computePrice(p, snapshot));
    if (p && !validQuantity(item.quantity ?? 1, p))
      reasons.push("Requested quantity is invalid or exceeds available stock");
    if ((counts.get(item.productId) ?? 0) > 1)
      reasons.push("Duplicate product lines are not allowed");
    if (reasons.length) {
      if (!result.removedProductIds.includes(item.productId)) {
        result.removedProductIds.push(item.productId);
        result.removalNotices.push(`${item.productId}: ${reasons.join("; ")}.`);
      }
      continue;
    }
    result.items.push(revalidateCartItem(item, p!, snapshot));
  }
  result.changed =
    result.removedProductIds.length > 0 ||
    result.items.some(i => i.priceChanged || i.changeNotice !== null);
  return result;
}
export function buildInquiryPriceFields(
  pr: PricingResult
): InquiryPricingFields {
  return {
    board_foot_rate_used: pr.boardFootRateUsed,
    calculated_price: pr.price,
    pricing_version: pr.pricingVersion,
    rate_source: pr.rateSource,
    pricing_formula: pr.formula,
  };
}
export function buildInquiryPricing(
  product: ProductPriceInput,
  snapshot: PricingSnapshot
): InquiryPricingFields {
  return buildInquiryPriceFields(computePrice(product, snapshot));
}
