import { describe, it, expect } from "vitest";
import {
  canonicalSpecies,
  genericSpecies,
  averageWidth,
  boardFeet,
  floorLength,
  surfacingFee,
  computePrice,
  revalidateCartItem,
  revalidateCart,
  buildInquiryPriceFields,
  type PricingSnapshot,
} from "@shared/pricing";

const baseSnapshot: PricingSnapshot = {
  version: "v-test-1",
  updatedAt: "2026-11-09T00:00:00Z",
  defaultRate: 12.0,
  speciesRates: {
    Mesquite: { rate: 12.0, method: "board_foot", status: "active" },
    Pecan: { rate: 12.0, method: "board_foot", status: "active" },
    "English Walnut": { rate: 14.0, method: "board_foot", status: "active" },
    "Live Oak": { rate: 10.0, method: "board_foot", status: "active" },
    Sycamore: { rate: 8.0, method: "fixed", status: "active" },
  },
  overrides: {
    "108-010": { method: "board_foot", rateOverride: 10.0, fixedPrice: null, reason: "Clearance", active: true },
    "special-fix": { method: "fixed", rateOverride: null, fixedPrice: 250, reason: "Promo", active: true },
    "secret-piece": { method: "inquire", rateOverride: null, fixedPrice: null, reason: "One-off", active: true },
  },
};

describe("canonical species normalisation", () => {
  it("strips raw note decorations", () => {
    expect(canonicalSpecies("Pecan - Marvin Pecan Countertop")).toBe("Pecan");
    expect(canonicalSpecies("Texas Mesquite (AFD Plaque)")).toBe("Texas Mesquite");
    expect(canonicalSpecies("Mesquite Burl Cookies")).toBe("Mesquite");
    expect(canonicalSpecies("Texas Pecan BURL Cookie")).toBe("Texas Pecan");
    expect(canonicalSpecies("Texas CHERRY")).toBe("Texas Cherry");
    expect(canonicalSpecies("Pecan Cookies")).toBe("Pecan");
    expect(canonicalSpecies(null)).toBe("");
  });

  it("collapses duplicates for public filter per species policy", () => {
    expect(genericSpecies("Texas Pecan")).toBe("Pecan");
    expect(genericSpecies("Texas Mesquite")).toBe("Mesquite");
    expect(genericSpecies("Texas Walnut")).toBe("Walnut");
    expect(genericSpecies("Mesquite Burl Cookies")).toBe("Mesquite");
  });
});

describe("board feet and dimension calculations", () => {
  it("computes average width", () => {
    expect(averageWidth(10, 20)).toBe(15);
    expect(averageWidth(17, 22)).toBe(19.5);
    expect(averageWidth(10, null)).toBe(10);
  });

  it("computes board feet = length × avgWidth × thickness / 144", () => {
    // 51" × 15" avg × 2.5" / 144 = 13.28125 -> 13.28
    expect(boardFeet(51, 15, 2.5)).toBe(13.28);
    // 108" × 48" × 3.5" / 144 = 126
    expect(boardFeet(108, 48, 3.5)).toBe(126);
  });

  it("floors customer-facing lengths to the whole inch", () => {
    expect(floorLength(36.99)).toBe(36);
    expect(floorLength(37.001)).toBe(37);
    expect(floorLength(24.99)).toBe(24);
    expect(floorLength(25.0)).toBe(25);
  });

  it("applies surfacing fee tiers", () => {
    expect(surfacingFee(48)).toBe(50);
    expect(surfacingFee(72)).toBe(50);
    expect(surfacingFee(96)).toBe(75);
    expect(surfacingFee(120)).toBe(75);
    expect(surfacingFee(126)).toBe(100);
    expect(surfacingFee(null)).toBeNull();
  });
});

describe("pricing hierarchy (override -> species -> default)", () => {
  it("uses active product override board-foot rate", () => {
    const res = computePrice(
      { id: "108-010", category: "Slabs", species: "English Walnut", boardFeet: 10 },
      baseSnapshot,
    );
    expect(res.rateSource).toBe("override");
    expect(res.boardFootRateUsed).toBe(10.0);
    expect(res.price).toBe(100.0);
  });

  it("uses species board-foot rate when no override exists", () => {
    const res = computePrice(
      { id: "101-101", category: "Slabs", species: "Texas Walnut", boardFeet: 13.28 },
      baseSnapshot,
    );
    expect(res.rateSource).toBe("default");
    expect(res.boardFootRateUsed).toBe(12.0);
    expect(res.price).toBe(159.36);
  });

  it("falls back to default rule for BF categories missing a species row", () => {
    const res = computePrice(
      { id: "999", category: "Mantels", species: "Mystery Oak", boardFeet: 20 },
      baseSnapshot,
    );
    expect(res.rateSource).toBe("default");
    expect(res.price).toBe(240);
  });

  it("supports fixed-price override and fixed species methods", () => {
    const ov = computePrice({ id: "special-fix", category: "Slabs", species: "Mesquite" }, baseSnapshot);
    expect(ov.method).toBe("fixed");
    expect(ov.price).toBe(250);

    const sp = computePrice({ id: "sy-1", category: "Slabs", species: "Sycamore", sourcePrice: 199 }, baseSnapshot);
    expect(sp.method).toBe("fixed");
    expect(sp.price).toBe(199);
  });

  it("supports inquire override and category fallback", () => {
    const res = computePrice({ id: "secret-piece", category: "Slabs", species: "Mesquite" }, baseSnapshot);
    expect(res.method).toBe("inquire");
    expect(res.price).toBeNull();
  });

  it("cookies & rounds retain existing sale price by default", () => {
    const res = computePrice(
      { id: "ck-1", category: "Cookies & Rounds", species: "Mystery Cookie", sourcePrice: 149.04 },
      baseSnapshot,
    );
    expect(res.method).toBe("fixed");
    expect(res.price).toBe(149.04);
  });
});

describe("cart revalidation", () => {
  it("detects price changes and emits notice referencing the species", () => {
    const item = { productId: "101-101", quantity: 1, selectedPrice: 99.0 };
    const p = { id: "101-101", category: "Slabs", species: "Texas Walnut", boardFeet: 13.28 };
    const v = revalidateCartItem(item, p, baseSnapshot);
    expect(v.priceChanged).toBe(true);
    expect(v.changeNotice).toContain("Pricing updated from $99.00 to $159.36");
    expect(v.changeNotice).toContain("Walnut");
  });

  it("does not flag unchanged prices", () => {
    const item = { productId: "101-101", quantity: 1, selectedPrice: 159.36 };
    const p = { id: "101-101", category: "Slabs", species: "Texas Walnut", boardFeet: 13.28 };
    const v = revalidateCartItem(item, p, baseSnapshot);
    expect(v.priceChanged).toBe(false);
  });

  it("revalidates a full cart", () => {
    const items = [
      { productId: "101-101", selectedPrice: 99 },
      { productId: "108-010", selectedPrice: 100 },
    ];
    const products = {
      "101-101": { id: "101-101", category: "Slabs", species: "Texas Walnut", boardFeet: 13.28 },
      "108-010": { id: "108-010", category: "Slabs", species: "English Walnut", boardFeet: 10 },
    };
    const res = revalidateCart(items, products, baseSnapshot);
    expect(res.changed).toBe(true);
    expect(res.items.find((i) => i.productId === "101-101")?.priceChanged).toBe(true);
    expect(res.items.find((i) => i.productId === "108-010")?.priceChanged).toBe(false);
  });
});

describe("inquiry payload", () => {
  it("includes rate, price, version and source", () => {
    const pr = computePrice(
      { id: "101-101", category: "Slabs", species: "Texas Walnut", boardFeet: 13.28 },
      baseSnapshot,
    );
    const f = buildInquiryPriceFields(pr);
    expect(f.board_foot_rate_used).toBe(12.0);
    expect(f.calculated_price).toBe(159.36);
    expect(f.pricing_version).toBe("v-test-1");
    expect(f.rate_source).toBe("default");
    expect(f.pricing_formula).toContain("BF × $12.00/BF = $159.36");
  });
});
