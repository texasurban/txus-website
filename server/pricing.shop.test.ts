import { readFileSync } from "node:fs";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { getTableName } from "drizzle-orm";
import type { Product } from "../drizzle/schema";
import {
  computePrice,
  isPublicEligible,
  type PricingSnapshot,
} from "../shared/pricing";
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
  getPricingSnapshot,
  invalidatePricingCache,
  recordInquiry,
} from "./pricing";
import { appRouter } from "./routers";

type Row = Record<string, unknown>;
/** Small transactional double for the specific Drizzle operations under test.
 * Tests call the real pricing service; no live DB or notification transport.
 */
function database(initial: Record<string, Row[]>) {
  let data = structuredClone(initial);
  let failLineInsert = false;
  let failAuditInsert = false;
  let inTransaction = false;
  let commits = 0;
  const writes: string[] = [];
  const tableName = (table: Parameters<typeof getTableName>[0]) =>
    getTableName(table);
  const ensure = (name: string) => data[name] ?? (data[name] = []);
  function matches(expression: unknown, row: Row) {
    if (!expression) return true;
    const chunks: unknown[] = [];
    const walk = (value: unknown) => {
      if (!value || typeof value !== "object") return;
      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }
      const v = value as {
        queryChunks?: unknown[];
        value?: unknown;
        name?: string;
        table?: unknown;
      };
      if (v.queryChunks) v.queryChunks.forEach(walk);
      else if ("value" in v || (v.name && v.table)) chunks.push(v);
    };
    walk(expression);
    const column = chunks.find(
      c => typeof (c as Row).name === "string" && (c as Row).table
    ) as { name: string } | undefined;
    const params = chunks
      .filter(c => "value" in (c as object))
      .map(c => (c as { value: unknown }).value);
    return !column || params.includes(row[column.name]);
  }
  const executor = {
    select: () => ({
      from(table: Parameters<typeof getTableName>[0]) {
        const name = tableName(table);
        let expression: unknown, limit: number | undefined;
        const builder = {
          where(value: unknown) {
            expression = value;
            return builder;
          },
          limit(value: number) {
            limit = value;
            return builder;
          },
          orderBy(..._args: unknown[]) {
            return builder;
          },
          for(_mode: string) {
            return builder;
          },
          then(
            resolve: (rows: Row[]) => unknown,
            reject: (error: unknown) => unknown
          ) {
            try {
              return Promise.resolve(
                resolve(
                  ensure(name)
                    .filter(row => matches(expression, row))
                    .slice(0, limit)
                    .map(row => ({ ...row }))
                )
              );
            } catch (error) {
              return Promise.resolve(reject(error));
            }
          },
        };
        return builder;
      },
    }),
    insert: (table: Parameters<typeof getTableName>[0]) => ({
      values(values: Row | Row[]) {
        const name = tableName(table);
        const execute = (duplicate?: Row) => {
          writes.push(`insert:${name}`);
          if (
            (name === "cartInquiryItems" && failLineInsert) ||
            (name === "speciesPricingHistory" && failAuditInsert)
          )
            throw new Error("Injected atomic-write failure");
          for (const value of Array.isArray(values) ? values : [values]) {
            const key =
              name === "pricingMeta"
                ? "metaKey"
                : name === "productPricingOverrides"
                  ? "productId"
                  : name === "speciesPricing"
                    ? "species"
                    : null;
            const old = key
              ? ensure(name).find(row => row[key] === value[key])
              : undefined;
            if (old && duplicate) Object.assign(old, duplicate);
            else {
              const nextId =
                Math.max(
                  0,
                  ...ensure(name).map(r =>
                    typeof r.id === "number" ? r.id : 0
                  )
                ) + 1;
              const defaults =
                name === "cartInquiries" ? { notificationSent: 0 } : {};
              ensure(name).push({ ...defaults, id: nextId, ...value });
            }
          }
          return { affectedRows: 1 };
        };
        return {
          then(
            resolve: (value: unknown) => unknown,
            reject: (error: unknown) => unknown
          ) {
            try {
              return Promise.resolve(resolve(execute()));
            } catch (error) {
              return Promise.resolve(reject(error));
            }
          },
          onDuplicateKeyUpdate({ set }: { set: Row }) {
            return Promise.resolve(execute(set));
          },
        };
      },
    }),
    update: (table: Parameters<typeof getTableName>[0]) => ({
      set(value: Row) {
        return {
          where(expression: unknown) {
            writes.push(`update:${tableName(table)}`);
            ensure(tableName(table))
              .filter(row => matches(expression, row))
              .forEach(row => Object.assign(row, value));
            return Promise.resolve({ affectedRows: 1 });
          },
        };
      },
    }),
    delete: (table: Parameters<typeof getTableName>[0]) => ({
      where(expression: unknown) {
        const name = tableName(table);
        data[name] = ensure(name).filter(row => !matches(expression, row));
        return Promise.resolve({ affectedRows: 1 });
      },
    }),
  };
  const db = {
    ...executor,
    async transaction<T>(fn: (tx: typeof executor) => Promise<T>) {
      const before = structuredClone(data);
      inTransaction = true;
      try {
        const result = await fn(executor);
        commits += 1;
        return result;
      } catch (error) {
        data = before;
        throw error;
      } finally {
        inTransaction = false;
      }
    },
  };
  return {
    db,
    rows: (name: string) => ensure(name),
    writes,
    isInTransaction: () => inTransaction,
    commits: () => commits,
    failLines: () => {
      failLineInsert = true;
    },
    failAudit: () => {
      failAuditInsert = true;
    },
  };
}
const p: Row = {
  id: "101-101",
  category: "Slabs",
  species: "Texas Walnut",
  lengthIn: "51",
  widthMinIn: "10",
  widthMaxIn: "20",
  thicknessIn: "2.5",
  boardFeet: "13.28",
  publicListing: "YES",
  imageStatus: "IMAGE_LINKED",
  galleryJson:
    '[{"detail":"/manus-storage/txus-inventory/11102026v2/a-800.webp"}]',
  status: "available",
  quantity: 1,
  inventoryVersion: "11102026V2",
};
const input = {
  customerName: "Customer",
  customerEmail: "customer@example.com",
  pricingVersion: "v2",
  idempotencyKey: "inquiry-key-123456789",
  totalAmount: "0.01",
  items: [
    {
      productId: "101-101",
      quantity: 1,
      selectedPrice: 159.36,
      surfacing: true,
    },
  ],
};
function setup() {
  const fake = database({
    products: [p],
    pricingMeta: [
      { id: 1, metaKey: "pricingVersion", metaValue: "v2" },
      { id: 2, metaKey: "pricingUpdated", metaValue: "2026-11-10T00:00:00Z" },
    ],
    speciesPricing: [],
    productPricingOverrides: [],
  });
  mocks.getDb.mockResolvedValue(fake.db);
  mocks.notifyOwner.mockResolvedValue(true);
  return fake;
}
function adminContext(): TrpcContext {
  return {
    req: { headers: {} },
    res: {},
    user: {
      id: 1,
      openId: "oauth-owner",
      name: "OAuth Owner",
      role: "admin",
      email: "owner@example.com",
      loginMethod: "manus",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
  } as TrpcContext;
}
beforeEach(() => {
  vi.clearAllMocks();
  invalidatePricingCache();
});

describe("real service inquiry persistence", () => {
  it("commits header and authoritative lines before notifying; does not trust total or reserve stock", async () => {
    const fake = setup();
    mocks.notifyOwner.mockImplementation(async () => {
      expect(fake.isInTransaction()).toBe(false);
      expect(fake.rows("cartInquiries")).toHaveLength(1);
      expect(fake.rows("cartInquiryItems")).toHaveLength(1);
      return true;
    });
    const result = await recordInquiry(input);
    expect(result).toMatchObject({
      totalAmount: "209.36",
      pricingVersion: "v2",
      priceChangesOccurred: false,
      notificationSent: true,
    });
    expect(result.inquiryCode).toMatch(/^TX-[A-F0-9]{20}$/);
    expect(fake.rows("cartInquiryItems")[0]).toMatchObject({
      quantity: 1,
      unitPrice: "159.36",
      surfacingFee: "50.00",
      lineTotal: "209.36",
      boardFootRateUsed: "12.00",
      boardFeet: "13.28",
      rateSource: "default",
      pricingVersion: "v2",
      inventoryVersion: "11102026V2",
    });
    expect(fake.rows("cartInquiries")[0]).toMatchObject({
      fulfillment: "local_pickup",
      pickupAmount: "0.00",
      totalAmount: "209.36",
    });
    expect(fake.rows("products")[0].quantity).toBe(1);
    expect(mocks.notifyOwner).toHaveBeenCalledOnce();
  });
  it("rolls back both header and lines if atomic line insertion fails; sends nothing", async () => {
    const fake = setup();
    fake.failLines();
    await expect(recordInquiry(input)).rejects.toThrow("atomic-write failure");
    expect(fake.rows("cartInquiries")).toHaveLength(0);
    expect(fake.rows("cartInquiryItems")).toHaveLength(0);
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
  it("replays one idempotency key without duplicate records or duplicate sends", async () => {
    const fake = setup();
    const first = await recordInquiry(input),
      second = await recordInquiry({ ...input, totalAmount: "99999" });
    expect(second).toEqual(first);
    expect(fake.rows("cartInquiries")).toHaveLength(1);
    expect(fake.rows("cartInquiryItems")).toHaveLength(1);
    expect(mocks.notifyOwner).toHaveBeenCalledOnce();
    await expect(
      recordInquiry({ ...input, customerName: "Different request" })
    ).rejects.toMatchObject({ code: "CONFLICT" });
  });
  it("retains a real persisted inquiry if best-effort notification fails", async () => {
    const fake = setup();
    mocks.notifyOwner.mockRejectedValue(new Error("transport unavailable"));
    expect(await recordInquiry(input)).toMatchObject({
      totalAmount: "209.36",
      notificationSent: false,
    });
    expect(fake.rows("cartInquiries")).toHaveLength(1);
    expect(fake.rows("cartInquiryItems")).toHaveLength(1);
  });
  it("freshly reprices inside the transaction and rejects stale price/version with no writes", async () => {
    const fake = setup();
    fake
      .rows("pricingMeta")
      .push({ id: 3, metaKey: "defaultBoardFootRate", metaValue: "13.00" });
    await expect(recordInquiry(input)).rejects.toMatchObject({
      code: "CONFLICT",
    });
    expect(fake.rows("cartInquiries")).toHaveLength(0);
    expect(mocks.notifyOwner).not.toHaveBeenCalled();
  });
});

describe("real admin mutation audit and cache behavior", () => {
  it("uses the OAuth actor, audits defaults, bumps version and invalidates cached prices", async () => {
    const fake = setup();
    const pricing = appRouter.createCaller(adminContext()).pricing;
    expect((await getPricingSnapshot()).defaultRate).toBe(12);
    await pricing.setDefaultRate({
      rate: 14,
      changeReason: "Approved new rate",
    });
    expect((await getPricingSnapshot()).defaultRate).toBe(14);
    expect((await getPricingSnapshot()).version).not.toBe("v2");
    expect(fake.rows("speciesPricingHistory")[0]).toMatchObject({
      species: "DEFAULT",
      changedBy: "OAuth Owner",
      oldRate: "12.00",
      newRate: "14.00",
      changeReason: "Approved new rate",
    });
  });
  it("rolls back rates and version if the audit cannot be saved", async () => {
    const fake = setup();
    fake.failAudit();
    await expect(
      appRouter
        .createCaller(adminContext())
        .pricing.setDefaultRate({ rate: 14 })
    ).rejects.toThrow();
    expect(
      fake.rows("pricingMeta").find(r => r.metaKey === "defaultBoardFootRate")
    ).toBeUndefined();
    expect(
      fake.rows("pricingMeta").find(r => r.metaKey === "pricingVersion")
        ?.metaValue
    ).toBe("v2");
  });
  it("audits override creation/deletion and public snapshot omits admin reasons", async () => {
    const fake = setup();
    const pricing = appRouter.createCaller(adminContext()).pricing;
    await pricing.upsertOverride({
      productId: "101-101",
      pricingMethod: "fixed",
      fixedPrice: 200,
      overrideReason: "PRIVATE ADMIN REASON",
    });
    expect((await getPricingSnapshot()).overrides["101-101"]).toEqual({
      method: "fixed",
      rateOverride: null,
      fixedPrice: 200,
      active: true,
    });
    expect(fake.rows("speciesPricingHistory")[0]).toMatchObject({
      species: "PRODUCT:101-101",
      changedBy: "OAuth Owner",
      newRate: "200.00",
    });
    await pricing.deleteOverride({
      productId: "101-101",
      changeReason: "Revert exception",
    });
    expect(fake.rows("productPricingOverrides")).toHaveLength(0);
    expect(fake.rows("speciesPricingHistory")).toHaveLength(2);
  });
  it("canonicalizes a new regional species and audits creation, updates and deletion", async () => {
    const fake = setup();
    const pricing = appRouter.createCaller(adminContext()).pricing;
    const row = await pricing.addSpecies({
      species: "Texas Pecan",
      boardFootRate: 20,
    });
    expect(row.species).toBe("Pecan");
    await pricing.updateSpecies({
      id: row.id,
      newRate: 25,
      status: "inactive",
      changeReason: "Disable for review",
    });
    await pricing.deleteSpecies({ id: row.id });
    expect(fake.rows("speciesPricing")).toHaveLength(0);
    expect(fake.rows("speciesPricingHistory")).toHaveLength(3);
  });
});

describe("approved V2 projection parity", () => {
  it("retains 638 internally, exposes exactly 447, excludes all 191 NO rows", () => {
    const source = JSON.parse(
      readFileSync("server/data/inventory.json", "utf8")
    ) as { products: Product[] };
    const snapshot: PricingSnapshot = {
      version: "11102026V2",
      updatedAt: "2026-11-10",
      defaultRate: 12,
      speciesRates: {},
      overrides: {},
    };
    expect(source.products).toHaveLength(638);
    const publicRows = source.products.filter(p =>
      isPublicEligible(p, computePrice(p, snapshot))
    );
    expect(publicRows).toHaveLength(447);
    expect(source.products.filter(p => p.publicListing === "NO")).toHaveLength(
      191
    );
    expect(publicRows.every(p => p.publicListing === "YES")).toBe(true);
    for (const p of publicRows)
      expect(computePrice(p, snapshot).price, p.id).toBe(Number(p.sourcePrice));
  });
});
