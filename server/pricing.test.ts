import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  averageWidth,
  boardFeet,
  computePrice,
  effectiveWidth,
  eligibilityReasons,
  genericSpecies,
  isPublicEligible,
  linkedGalleryUrls,
  revalidateCart,
  surfacingFee,
  type PricingSnapshot,
  type ProductPriceInput,
} from "../shared/pricing";
import type { Product } from "../drizzle/schema";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({ getDb: vi.fn(), notifyOwner: vi.fn() }));
vi.mock("./db", () => ({
  getDb: mocks.getDb,
  createContactSubmission: vi.fn(),
  getPublishedArticles: vi.fn(),
  getArticleBySlug: vi.fn(),
  createArticle: vi.fn(),
  updateArticle: vi.fn(),
}));
vi.mock("./_core/notification", () => ({ notifyOwner: mocks.notifyOwner }));
import {
  authoritativeInquiryPricing,
  invalidatePricingCache,
  publicProduct,
} from "./pricing";
import { appRouter } from "./routers";
import { inquiryInputSchema } from "./pricingRouter";

const snapshot: PricingSnapshot = {
  version: "v2",
  updatedAt: "2026-11-10T00:00:00Z",
  defaultRate: 12,
  speciesRates: {},
  overrides: {},
};
const base: ProductPriceInput = {
  id: "101-101",
  category: "Slabs",
  species: "Texas Walnut",
  lengthIn: 51,
  widthMinIn: 10,
  widthMaxIn: 20,
  thicknessIn: 2.5,
  boardFeet: "13.28",
  publicListing: "YES",
  imageStatus: "IMAGE_LINKED",
  galleryJson:
    '[{"card":"https://cdn.example/a400.webp","detail":"https://cdn.example/a800.webp","lightbox":"https://cdn.example/a1200.webp"}]',
  primaryImage: "https://cdn.example/a800.webp",
  quantity: 1,
  status: "available",
  inventoryVersion: "11102026V2",
};
function product(patch: Partial<ProductPriceInput> = {}) {
  return { ...base, ...patch };
}
function asRow(patch: Partial<ProductPriceInput> = {}): Product {
  return product(patch) as Product;
}
function context(role?: "admin" | "user"): TrpcContext {
  return {
    req: { headers: {}, protocol: "https" },
    res: {},
    user: role
      ? {
          id: 1,
          openId: "oauth-admin",
          name: "Real OAuth User",
          role,
          email: "owner@example.com",
          loginMethod: "manus",
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSignedIn: new Date(),
        }
      : null,
  } as TrpcContext;
}
beforeEach(() => {
  vi.clearAllMocks();
  invalidatePricingCache();
});

describe("authoritative V2 dimensions and pricing", () => {
  it("uses two widths, a single positive min/max, then standalone average", () => {
    expect(averageWidth(10, 20)).toBe(15);
    expect(averageWidth(15, null)).toBe(15);
    expect(averageWidth(0, 15)).toBe(15);
    expect(averageWidth(-1, 15)).toBe(15);
    expect(averageWidth(null, "15")).toBe(15);
    expect(
      effectiveWidth(
        product({ widthMinIn: null, widthMaxIn: null, averageWidthIn: 15 })
      )
    ).toBe(15);
    expect(effectiveWidth(product({ averageWidthIn: 999 }))).toBe(15);
    expect(averageWidth(0, -1)).toBeNull();
    expect(boardFeet(0, 15, 2.5)).toBeNull();
    expect(boardFeet(51, 15, 2.5)).toBe(13.28);
  });
  it("multiplies stored rounded BF by rate and recalculates only when BF is unusable", () => {
    expect(computePrice(base, snapshot).price).toBe(159.36);
    expect(computePrice(product({ boardFeet: null }), snapshot).price).toBe(
      159.36
    );
    expect(computePrice(product({ boardFeet: "13.27" }), snapshot).price).toBe(
      159.24
    );
    expect(
      computePrice(
        product({ boardFeet: "13.28oops", sourcePrice: "1" }),
        snapshot
      ).price
    ).toBe(159.36);
    expect(
      computePrice(product({ boardFeet: null, lengthIn: 0 }), snapshot).price
    ).toBeNull();
  });
  it("generic species wins over regional rates and product override wins over both", () => {
    const s: PricingSnapshot = {
      ...snapshot,
      speciesRates: {
        Pecan: { rate: 20, method: "board_foot", status: "active" },
        "Texas Pecan": { rate: 99, method: "board_foot", status: "active" },
      },
    };
    expect(genericSpecies("TexasPecan")).toBe("Pecan");
    expect(computePrice(product({ species: "Texas Pecan" }), s)).toMatchObject({
      price: 265.6,
      rateSource: "species",
      boardFootRateUsed: 20,
    });
    expect(
      computePrice(base, {
        ...s,
        overrides: {
          "101-101": {
            active: true,
            method: "fixed",
            fixedPrice: 225,
            reason: "ADMIN SECRET",
          },
        },
      })
    ).toMatchObject({ price: 225, rateSource: "override" });
    expect(
      computePrice(base, {
        ...s,
        overrides: {
          "101-101": { active: true, method: "board_foot", rateOverride: 30 },
        },
      }).price
    ).toBe(398.4);
    expect(
      computePrice(base, {
        ...s,
        overrides: { "101-101": { active: true, method: "inquire" } },
      }).price
    ).toBeNull();
  });
  it("does not leak override reason into pricing formulas", () => {
    const p = computePrice(base, {
      ...snapshot,
      overrides: {
        "101-101": {
          active: true,
          method: "board_foot",
          rateOverride: 14,
          reason: "SECRET ADMIN NOTE",
        },
      },
    });
    expect(p.formula).not.toContain("SECRET");
  });
  it("has consistent surfacing bands and never invents a fee from thickness", () => {
    expect([72, 73, 120, 121].map(surfacingFee)).toEqual([50, 75, 75, 100]);
    expect(surfacingFee(0)).toBeNull();
    expect(
      computePrice(product({ category: "Mantels" }), snapshot)
    ).toMatchObject({ surfacingAvailable: false, surfacingFee: null });
    expect(
      computePrice(product({ lengthIn: null, thicknessIn: 10 }), snapshot)
    ).toMatchObject({ surfacingAvailable: false, surfacingFee: null });
  });
});

describe("strict public eligibility", () => {
  it("excludes red/NO records even with a positive price", () => {
    for (const patch of [
      { publicListing: "NO" },
      { redProductId: true },
      { exclusionReason: "Missing dimensions" },
    ]) {
      const p = product(patch);
      expect(isPublicEligible(p, computePrice(p, snapshot))).toBe(false);
    }
    expect(isPublicEligible(base, computePrice(base, snapshot))).toBe(true);
  });
  it("excludes fixed cookies missing dimensions, images, sold, unpriced and zero stock", () => {
    const cookie = product({
      category: "Cookies & Rounds",
      lengthIn: null,
      widthMinIn: null,
      widthMaxIn: null,
      thicknessIn: null,
      boardFeet: null,
      sourcePrice: 150,
    });
    expect(computePrice(cookie, snapshot).price).toBe(150);
    expect(
      eligibilityReasons(cookie, computePrice(cookie, snapshot)).join(" ")
    ).toContain("length, width and thickness");
    for (const patch of [
      { imageStatus: "IMAGE_REVIEW" },
      { galleryJson: "[]", imageCount: 10 },
      { galleryJson: '["original.jpeg"]' },
      { status: "sold" },
      { quantity: 0 },
      { lengthIn: -1 },
    ]) {
      const p = product(patch);
      expect(isPublicEligible(p, computePrice(p, snapshot))).toBe(false);
    }
    const p = product();
    expect(
      isPublicEligible(
        p,
        computePrice(p, {
          ...snapshot,
          overrides: { [p.id]: { active: true, method: "inquire" } },
        })
      )
    ).toBe(false);
  });
  it("uses galleryJSON links instead of counts or fabricated filename associations", () => {
    expect(linkedGalleryUrls(base)).toHaveLength(3);
    expect(
      linkedGalleryUrls(
        product({ galleryJson: "[]", allImages: base.galleryJson })
      )
    ).toEqual([]);
    expect(
      linkedGalleryUrls(product({ galleryJson: "not-json", imageCount: 99 }))
    ).toEqual([]);
  });
  it("does not expose internal notes/location/exclusion reasons", () => {
    const view = publicProduct({
      ...asRow(),
      notes: "INTERNAL",
      location: "YARD PRIVATE",
      exclusionReason: "audit",
    });
    expect(view).not.toHaveProperty("notes");
    expect(view).not.toHaveProperty("location");
    expect(view).not.toHaveProperty("exclusionReason");
  });
});

describe("cart removal, rate changes, quantity and cents", () => {
  it("reports missing/sold/red items rather than silently retaining or discarding them", () => {
    const out = revalidateCart(
      [
        { productId: "red", selectedPrice: 159.36 },
        { productId: "missing", selectedPrice: 1 },
        { productId: "sold", selectedPrice: 159.36 },
      ],
      {
        red: product({ id: "red", publicListing: "NO" }),
        sold: product({ id: "sold", status: "sold" }),
      },
      snapshot
    );
    expect(out.items).toEqual([]);
    expect(out.removedProductIds).toEqual(["red", "missing", "sold"]);
    expect(out.removalNotices).toHaveLength(3);
    expect(out.changed).toBe(true);
  });
  it("safely removes malicious prototype-named IDs without treating them as products", () => {
    const out = revalidateCart(
      [
        { productId: "__proto__", selectedPrice: 1 },
        { productId: "constructor", selectedPrice: 1 },
      ],
      {},
      snapshot
    );
    expect(out.removedProductIds).toEqual(["__proto__", "constructor"]);
    expect(out.items).toEqual([]);
  });
  it("detects repricing, multiplies surfacing by quantity, and computes line totals in cents", () => {
    const s = { ...snapshot, defaultRate: 13 };
    const out = revalidateCart(
      [
        {
          productId: base.id,
          selectedPrice: 159.36,
          surfacing: true,
          quantity: 3,
        },
      ],
      { [base.id]: product({ quantity: 3 }) },
      s
    );
    expect(out.items[0]).toMatchObject({
      priceChanged: true,
      newPrice: 172.64,
      surfacingFee: 50,
      itemTotal: 667.92,
    });
    expect(out.changed).toBe(true);
  });
  it("rejects spoofed quantities, duplicate lines and excessive stock quantities", () => {
    for (const quantity of [0, -1, 1.5, 101, NaN, Infinity, 2]) {
      expect(
        revalidateCart(
          [{ productId: base.id, selectedPrice: 159.36, quantity }],
          { [base.id]: base },
          snapshot
        ).removedProductIds
      ).toEqual([base.id]);
    }
    expect(
      revalidateCart(
        [
          { productId: base.id, selectedPrice: 159.36 },
          { productId: base.id, selectedPrice: 159.36 },
        ],
        { [base.id]: base },
        snapshot
      ).items
    ).toEqual([]);
  });
  it("disables unavailable surfacing and charges no fee", () => {
    const p = product({ category: "Mantels" });
    const out = revalidateCart(
      [{ productId: p.id, selectedPrice: 159.36, surfacing: true }],
      { [p.id]: p },
      snapshot
    );
    expect(out.items[0]).toMatchObject({
      surfacing: false,
      surfacingFee: null,
      itemTotal: 159.36,
    });
    expect(out.changed).toBe(true);
  });
});

describe("inquiry authoritative pricing and input security", () => {
  const inquiry = {
    customerName: "Customer",
    customerEmail: "customer@example.com",
    items: [
      {
        productId: base.id,
        quantity: 1,
        selectedPrice: 159.36,
        surfacing: true,
      },
    ],
    pricingVersion: "v2",
  };
  it("ignores client total and produces a fresh authoritative amount", () => {
    expect(
      authoritativeInquiryPricing(
        { ...inquiry, totalAmount: "0.01" },
        [asRow()],
        snapshot
      ).totalAmount
    ).toBe("209.36");
  });
  it("rejects stale versions and prices for cart review", () => {
    expect(() =>
      authoritativeInquiryPricing(
        { ...inquiry, pricingVersion: "old" },
        [asRow()],
        snapshot
      )
    ).toThrow("Refresh and review");
    expect(() =>
      authoritativeInquiryPricing(inquiry, [asRow()], {
        ...snapshot,
        defaultRate: 13,
      })
    ).toThrow("Refresh and review");
    expect(() =>
      authoritativeInquiryPricing(
        { ...inquiry, items: [{ ...inquiry.items[0], selectedPrice: null }] },
        [asRow()],
        snapshot
      )
    ).toThrow("Refresh and review");
  });
  it("rejects excluded, sold, duplicate, zero and excessive quantities", () => {
    expect(() =>
      authoritativeInquiryPricing(
        inquiry,
        [asRow({ publicListing: "NO" })],
        snapshot
      )
    ).toThrow("unavailable");
    expect(() =>
      authoritativeInquiryPricing(
        inquiry,
        [asRow({ status: "sold" })],
        snapshot
      )
    ).toThrow("unavailable");
    expect(() =>
      authoritativeInquiryPricing(
        { ...inquiry, items: [] },
        [asRow()],
        snapshot
      )
    ).toThrow("unique");
    expect(() =>
      authoritativeInquiryPricing(
        { ...inquiry, items: [inquiry.items[0], inquiry.items[0]] },
        [asRow()],
        snapshot
      )
    ).toThrow("unique");
    for (const quantity of [0, -1, 2, 1000])
      expect(() =>
        authoritativeInquiryPricing(
          { ...inquiry, items: [{ ...inquiry.items[0], quantity }] },
          [asRow()],
          snapshot
        )
      ).toThrow("unavailable");
  });
  it("validates public input as finite numeric quantities and unique items", () => {
    expect(inquiryInputSchema.safeParse(inquiry).success).toBe(true);
    for (const quantity of [0, 1.5, -1, 101, Infinity])
      expect(
        inquiryInputSchema.safeParse({
          ...inquiry,
          items: [{ ...inquiry.items[0], quantity }],
        }).success
      ).toBe(false);
    expect(
      inquiryInputSchema.safeParse({
        ...inquiry,
        items: [inquiry.items[0], inquiry.items[0]],
      }).success
    ).toBe(false);
  });
});

describe("Manus OAuth pricing authorization", () => {
  it("protects admin history, override reads and all mutations from anonymous and normal users", async () => {
    for (const role of [undefined, "user"] as const) {
      const pricing = appRouter.createCaller(context(role)).pricing;
      const calls = [
        () => pricing.speciesList(),
        () => pricing.history(),
        () => pricing.overrides(),
        () => pricing.updateSpecies({ id: 1, newRate: 12 }),
        () => pricing.addSpecies({ species: "Pecan", boardFootRate: 12 }),
        () => pricing.deleteSpecies({ id: 1 }),
        () =>
          pricing.upsertOverride({
            productId: base.id,
            pricingMethod: "fixed",
            fixedPrice: 100,
          }),
        () => pricing.deleteOverride({ productId: base.id }),
        () => pricing.setDefaultRate({ rate: 12 }),
        () => pricing.invalidateCache(),
      ];
      for (const call of calls)
        await expect(call()).rejects.toMatchObject({ code: "FORBIDDEN" });
    }
    expect(mocks.getDb).not.toHaveBeenCalled();
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
  it("rejects client changedBy, PIN and out-of-range/nonfinite prices for admins", async () => {
    const pricing = appRouter.createCaller(context("admin")).pricing;
    for (const newRate of [0, -1, 100001, Infinity, "12usd"])
      await expect(
        pricing.updateSpecies({ id: 1, newRate })
      ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(
      pricing.updateSpecies({
        id: 1,
        newRate: 12,
        changedBy: "SPOOFED",
      } as never)
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(
      pricing.setDefaultRate({ rate: 12, pin: "1234" } as never)
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });
});
