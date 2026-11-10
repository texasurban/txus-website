import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("./_core/env", () => ({
  ENV: { forgeApiUrl: "https://forge.example/", forgeApiKey: "test-only-key" },
}));
import { registerStorageProxy } from "./_core/storageProxy";
afterEach(() => vi.unstubAllGlobals());
function setup() {
  let handler: any;
  registerStorageProxy({
    get: vi.fn((_route, fn) => {
      handler = fn;
    }),
  } as any);
  const res = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
    set: vi.fn(),
    redirect: vi.fn(),
  };
  return { handler, res };
}
describe("TXUS storage namespace compatibility", () => {
  it("keeps the original marketing image presign API and no-store behavior", async () => {
    const mock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          url: "https://images.example/approved-hero.webp",
        }),
      });
    vi.stubGlobal("fetch", mock);
    const { handler, res } = setup();
    await handler({ params: { 0: "approved-hero.webp" } }, res);
    expect(new URL(mock.mock.calls[0][0]).pathname).toBe(
      "/v1/storage/presign/get"
    );
    expect(new URL(mock.mock.calls[0][0]).searchParams.get("path")).toBe(
      "approved-hero.webp"
    );
    expect(res.set).toHaveBeenCalledWith("Cache-Control", "no-store");
    expect(res.redirect).toHaveBeenCalledWith(
      307,
      "https://images.example/approved-hero.webp"
    );
  });
  it("resolves new namespaced inventory objects through the project-aware download API", async () => {
    const mock = vi
      .fn()
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          url: "https://images.example/project/inventory.webp",
        }),
      });
    vi.stubGlobal("fetch", mock);
    const { handler, res } = setup();
    await handler(
      { params: { 0: "txus-inventory/11102026v2/pecan-slab-800.webp" } },
      res
    );
    expect(new URL(mock.mock.calls[0][0]).pathname).toBe(
      "/v1/storage/downloadUrl"
    );
    expect(res.set).toHaveBeenCalledWith(
      "Cache-Control",
      "public, max-age=300"
    );
    expect(res.redirect).toHaveBeenCalledWith(
      307,
      "https://images.example/project/inventory.webp"
    );
  });
  it("does not redirect when the storage backend omits a URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) })
    );
    const { handler, res } = setup();
    await handler({ params: { 0: "txus-inventory/broken.webp" } }, res);
    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
