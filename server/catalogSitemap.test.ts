import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("./pricing", () => ({ getCatalog: vi.fn() }));
import { getCatalog } from "./pricing";
import { productSitemap, registerCatalogSitemap } from "./catalogSitemap";
afterEach(() => vi.clearAllMocks());
function setup() {
  let handler: any;
  registerCatalogSitemap({
    get: vi.fn((_path, fn) => {
      handler = fn;
    }),
  } as any);
  const res = {
    type: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  };
  return { handler, res };
}
describe("public catalog sitemap", () => {
  it("uses production canonicals, encoded product IDs, and unique records", () => {
    const result = productSitemap(["101-101", "TPE 38", "101-101"]);
    expect(result).toContain(
      "https://txurbansawmill.com/shop/product/TPE%2038"
    );
    expect(result.match(/<url>/g)).toHaveLength(2);
    expect(result).not.toContain("manus.space");
    expect(result).not.toContain("/cart");
  });
  it("only includes products returned by the strict public eligibility service", async () => {
    vi.mocked(getCatalog).mockResolvedValue({
      products: [{ product: { id: "101-101" } }],
      version: "test",
      updatedAt: "test",
    } as any);
    const { handler, res } = setup();
    await handler({}, res);
    expect(res.send).toHaveBeenCalledWith(
      expect.stringContaining("/shop/product/101-101")
    );
    expect(res.set).toHaveBeenCalledWith("Cache-Control", "public, max-age=60");
  });
  it("returns a retryable error rather than a misleading empty successful sitemap when the database fails", async () => {
    vi.mocked(getCatalog).mockRejectedValue(new Error("database unavailable"));
    const { handler, res } = setup();
    await handler({}, res);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.send).toHaveBeenCalledWith("Catalog temporarily unavailable");
  });
});
