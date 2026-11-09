/**
 * TXUS Shared Pricing Calculation Service
 *
 * One centralized pricing engine used everywhere: catalog cards, product pages,
 * the cart, checkout/inquiry payloads, and future Shopify/QuickBooks sync.
 *
 * Pricing hierarchy:
 *   1. Approved product-level override
 *   2. Cookies & rounds fixed-sale-price rule (precedence even over species rate)
 *   3. Current species board-foot rate
 *   4. Default pricing rule
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PricingMethod = "board_foot" | "fixed" | "inquire";
export type RateSource = "override" | "species" | "default" | "fixed" | "inquire";

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

export interface CatalogProductView {
  product: ProductPriceInput & {
    notes?: string | null;
    primaryImage?: string | null;
    imageCount?: number | null;
    location?: string | null;
    status?: string | null;
  };
  pricing: PricingResult;
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
}

export interface InquiryPricingFields {
  board_foot_rate_used: number | null;
  calculated_price: number | null;
  pricing_version: string;
  rate_source: RateSource;
  pricing_formula: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const parseNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(String(v).replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
};

const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

// ---------------------------------------------------------------------------
// Species normalisation per TXUS species policy
// ---------------------------------------------------------------------------

/**
 * Strips notes/decorations attached to species values in raw inventory
 * (e.g. "Pecan - Marvin Pecan Countertop" -> "Pecan").
 */
export function canonicalSpecies(s?: string | null): string {
  if (!s) return "";
  let v = String(s).trim();
  v = v.replace(/\s*-\s*(Marvin|Series|115 years|70 year).*$/i, "");
  v = v.replace(/\s*\(AFD Plaque\)/gi, "");
  v = v.replace(/\s+Burl\s+Cookies?/gi, "");
  v = v.replace(/\s+Cookies?/gi, "");
  v = v.replace(/CHERRY/g, "Cherry");
  return v.trim();
}

/**
 * Collapses provenance-qualified duplicates to the generic species per the
 * approved TXUS species policy ("Avoid duplicate public choices such as Pecan
 * and Texas Pecan"). Used for customer-facing species filters.
 */
export function genericSpecies(s?: string | null): string {
  const c = canonicalSpecies(s);
  return c
    .replace(/^Texas\s+/i, "")
    .replace(/\s+BURL.*$/i, "")
    .trim();
}

// ---------------------------------------------------------------------------
// Board feet & dimension calculations
// ---------------------------------------------------------------------------

export function averageWidth(
  min?: number | string | null,
  max?: number | string | null,
): number | null {
  const mi = parseNum(min);
  const ma = parseNum(max);
  if (mi === null && ma === null) return null;
  if (mi === null) return ma;
  if (ma === null) return mi;
  return round2((mi + ma) / 2);
}

export function boardFeet(
  length?: number | string | null,
  avgWidth?: number | string | null,
  thickness?: number | string | null,
): number | null {
  const l = parseNum(length);
  const w = parseNum(avgWidth);
  const t = parseNum(thickness);
  if (l === null || w === null || t === null) return null;
  return round2((l * w * t) / 144);
}

/**
 * Customer-facing length rule: floor fractional measurements to the nearest
 * whole inch (36.99" -> 36", 37.001" -> 37", 25.00" -> 25").
 */
export function floorLength(inches?: number | string | null): number | null {
  const n = parseNum(inches);
  return n === null ? null : Math.floor(n);
}

export function surfacingFee(lengthInches?: number | string | null): number | null {
  const l = parseNum(lengthInches);
  if (l === null) return null;
  if (l <= 72) return 50;
  if (l <= 120) return 75;
  return 100;
}

// ---------------------------------------------------------------------------
// Master price calculation (hierarchy: override -> species -> default)
// ---------------------------------------------------------------------------

const BF_CATEGORIES = new Set([
  "slabs",
  "mantels",
  "beams",
  "dimensional lumber",
  "lumber",
]);

export function computePrice(
  p: ProductPriceInput,
  snapshot: PricingSnapshot,
): PricingResult {
  const def = snapshot.defaultRate ?? 12.0;
  const version = snapshot.version || "unknown";

  const cat = (p.category || "").toLowerCase();
  const rawCan = canonicalSpecies(p.species);
  const gen = genericSpecies(p.species);

  // Compute product board feet: prefer explicit value, then dimensions
  let bf = parseNum(p.boardFeet);
  if (bf === null) {
    const aw = parseNum(p.averageWidthIn) ?? averageWidth(p.widthMinIn, p.widthMaxIn);
    bf = boardFeet(p.lengthIn, aw, p.thicknessIn);
  }

  const srcPrice = parseNum(p.sourcePrice);

  const canSurface = cat === "slabs" || cat === "cookies & rounds";
  const sfee = surfacingFee(p.lengthIn ?? p.thicknessIn);

  // Helper to build board-foot result
  const fromRate = (
    rate: number,
    source: RateSource,
    formulaExtra?: string,
  ): PricingResult => {
    if (bf === null) {
      return {
        method: "board_foot",
        price: null,
        boardFootRateUsed: rate,
        rateSource: source,
        boardFeet: null,
        formula: "Board feet pending (dimensions missing)",
        pricingVersion: version,
        surfacingAvailable: canSurface,
        surfacingFee: sfee,
      };
    }
    const price = round2(bf * rate);
    return {
      method: "board_foot",
      price,
      boardFootRateUsed: rate,
      rateSource: source,
      boardFeet: bf,
      formula: formulaExtra ?? `${bf.toFixed(2)} BF × $${rate.toFixed(2)}/BF = $${price.toFixed(2)}`,
      pricingVersion: version,
      surfacingAvailable: canSurface,
      surfacingFee: sfee,
    };
  };

  // 1. Product-level override (highest priority)
  const ov = snapshot.overrides[p.id];
  if (ov && ov.active) {
    if (ov.method === "board_foot" && ov.rateOverride !== null && ov.rateOverride !== undefined) {
      return fromRate(ov.rateOverride, "override", `Product override: ${ov.reason ? ov.reason + " — " : ""}$${ov.rateOverride.toFixed(2)}/BF`);
    }
    if (ov.method === "fixed" && ov.fixedPrice !== null && ov.fixedPrice !== undefined) {
      return {
        method: "fixed",
        price: ov.fixedPrice,
        boardFootRateUsed: null,
        rateSource: "fixed",
        boardFeet: bf,
        formula: `Fixed price override: $${ov.fixedPrice.toFixed(2)}`,
        pricingVersion: version,
        surfacingAvailable: canSurface,
        surfacingFee: sfee,
      };
    }
    if (ov.method === "inquire") {
      return {
        method: "inquire",
        price: null,
        boardFootRateUsed: null,
        rateSource: "inquire",
        boardFeet: bf,
        formula: "Price upon request (inquire)",
        pricingVersion: version,
        surfacingAvailable: canSurface,
        surfacingFee: sfee,
      };
    }
  }

  // 2. Cookies & rounds retain existing fixed sale price until dimensions exist —
  //    precedence even over an approved species rate (per approved pricing rules sheet)
  const isCookieCase =
    (cat === "cookies & rounds" || p.pricingMethodDefault === "EXISTING_SALE_PRICE_NO_DIMENSIONS") &&
    bf === null && srcPrice !== null;
  if (isCookieCase) {
    return {
      method: "fixed",
      price: srcPrice,
      boardFootRateUsed: null,
      rateSource: "fixed",
      boardFeet: null,
      formula: `Existing sale price $${srcPrice.toFixed(2)}`,
      pricingVersion: version,
      surfacingAvailable: canSurface,
      surfacingFee: sfee,
    };
  }

  // 3. Species rate
  const spEntry = snapshot.speciesRates[rawCan] ?? snapshot.speciesRates[gen];
  if (spEntry && spEntry.status === "active") {
    if (spEntry.method === "board_foot") {
      return fromRate(spEntry.rate, "species");
    }
    if (spEntry.method === "fixed") {
      return {
        method: "fixed",
        price: srcPrice,
        boardFootRateUsed: null,
        rateSource: "fixed",
        boardFeet: bf,
        formula: srcPrice !== null ? `Fixed sale price $${srcPrice.toFixed(2)}` : "Price pending",
        pricingVersion: version,
        surfacingAvailable: canSurface,
        surfacingFee: sfee,
      };
    }
    return {
      method: "inquire",
      price: null,
      boardFootRateUsed: null,
      rateSource: "inquire",
      boardFeet: bf,
      formula: "Price upon request (inquire)",
      pricingVersion: version,
      surfacingAvailable: canSurface,
      surfacingFee: sfee,
    };
  }

  // 4. Default rule by category
  if (BF_CATEGORIES.has(cat)) {
    return fromRate(def, "default");
  }
  if (cat === "cookies & rounds") {
    return {
      method: "fixed",
      price: srcPrice,
      boardFootRateUsed: null,
      rateSource: "fixed",
      boardFeet: bf,
      formula: srcPrice !== null ? `Existing sale price $${srcPrice.toFixed(2)}` : "Price pending",
      pricingVersion: version,
      surfacingAvailable: canSurface,
      surfacingFee: sfee,
    };
  }
  return {
    method: "inquire",
    price: null,
    boardFootRateUsed: null,
    rateSource: "inquire",
    boardFeet: bf,
    formula: "Price upon request",
    pricingVersion: version,
    surfacingAvailable: canSurface,
    surfacingFee: sfee,
  };
}

// ---------------------------------------------------------------------------
// Cart revalidation
// ---------------------------------------------------------------------------

export function revalidateCartItem(
  item: CartItemSnapshot,
  product: ProductPriceInput,
  snapshot: PricingSnapshot,
): CartItemValidation {
  const result = computePrice(product, snapshot);
  const oldPrice = item.selectedPrice !== undefined ? item.selectedPrice : null;
  const newPrice = result.price;
  const changed = oldPrice !== null && newPrice !== null && Math.abs(oldPrice - newPrice) > 0.009;

  let changeNotice: string | null = null;
  if (changed) {
    const sp = genericSpecies(product.species);
    changeNotice = `Pricing updated from $${oldPrice.toFixed(2)} to $${newPrice.toFixed(2)} based on the current ${sp} board-foot rate.`;
  }

  const sfee = item.surfacing && result.surfacingFee ? result.surfacingFee : 0;
  const itemTotal = newPrice !== null ? round2(newPrice + sfee) * (item.quantity ?? 1) : null;

  return {
    productId: item.productId,
    oldPrice,
    newPrice,
    priceChanged: changed,
    changeNotice,
    pricingResult: result,
    surfacingFee: item.surfacing ? result.surfacingFee : null,
    itemTotal,
  };
}

export function revalidateCart(
  items: CartItemSnapshot[],
  productsById: Record<string, ProductPriceInput>,
  snapshot: PricingSnapshot,
): CartValidationResult {
  const list = items
    .map((it) => {
      const p = productsById[it.productId];
      return p ? revalidateCartItem(it, p, snapshot) : null;
    })
    .filter((v): v is CartItemValidation => v !== null);

  return {
    items: list,
    changed: list.some((i) => i.priceChanged),
    pricingVersion: snapshot.version,
    pricingUpdatedAt: snapshot.updatedAt,
  };
}

// ---------------------------------------------------------------------------
// Inquiry snapshot builder
// ---------------------------------------------------------------------------

export function buildInquiryPricing(
  product: ProductPriceInput,
  snapshot: PricingSnapshot,
): InquiryPricingFields {
  const r = computePrice(product, snapshot);
  return {
    board_foot_rate_used: r.boardFootRateUsed,
    calculated_price: r.price,
    pricing_version: snapshot.version,
    rate_source: r.rateSource,
    pricing_formula: r.formula,
  };
}

export function buildInquiryPriceFields(pr: PricingResult): InquiryPricingFields {
  return {
    board_foot_rate_used: pr.boardFootRateUsed,
    calculated_price: pr.price,
    pricing_version: pr.pricingVersion,
    rate_source: pr.rateSource,
    pricing_formula: pr.formula,
  };
}
