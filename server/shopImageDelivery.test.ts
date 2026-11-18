import express from "express";
import { createServer, request, type Server } from "node:http";
import { readFileSync } from "node:fs";
import type { AddressInfo } from "node:net";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./storage", () => ({ storageGet: vi.fn() }));
import { storageGet } from "./storage";
import { registerShopImageDelivery } from "./shopImageDelivery";

const keys = [
  "txus-inventory/11102026v2/american-elm-tae-10-1nng-9lidbwtcp49memquws9w5yaunejh-400_c16f080c.webp",
  "txus-inventory/11102026v2/american-elm-tae-10-1nng-9lidbwtcp49memquws9w5yaunejh-800_a711582b.webp",
  "txus-inventory/11102026v2/american-elm-tae-10-1nng-9lidbwtcp49memquws9w5yaunejh-1200_ceb809d7.webp",
];
const signedUrl =
  "https://storage.example.test/project-aware/photos/image.webp?X-Amz-Signature=Ab%2Bcd%2Fef&X-Amz-Expires=300&token=a%20b";
let server: Server;
let port: number;

// node:http deliberately preserves traversal and malformed escapes instead of normalizing like fetch.
function get(path: string) {
  return new Promise<{ status: number; headers: import("node:http").IncomingHttpHeaders; body: string }>(
    (resolve, reject) => {
      const req = request({ hostname: "127.0.0.1", port, path, method: "GET" }, res => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", chunk => (body += chunk));
        res.on("end", () => resolve({ status: res.statusCode!, headers: res.headers, body }));
      });
      req.on("error", reject);
      req.end();
    }
  );
}

beforeAll(async () => {
  const app = express();
  registerShopImageDelivery(app);
  // Simulates the SPA/static fallback that must not swallow requests for this route.
  app.use((_req, res) => res.status(200).send("static fallback"));
  server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  port = (server.address() as AddressInfo).port;
});
afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close(err => (err ? reject(err) : resolve())));
});
beforeEach(() => {
  vi.restoreAllMocks();
  vi.mocked(storageGet).mockReset();
  vi.mocked(storageGet).mockImplementation(async key => ({ key, url: signedUrl }));
});

describe("project-aware shop image delivery", () => {
  it.each(keys)("preserves the exact original image-size key: %s", async key => {
    const response = await get(`/api/shop-images/${key}`);
    expect(storageGet).toHaveBeenCalledOnce();
    expect(storageGet).toHaveBeenCalledWith(key);
    expect(response.status).toBe(307);
    expect(response.headers.location).toBe(signedUrl);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body).toBe("");
  });

  it("ignores query parameters rather than treating them as storage keys or download overrides", async () => {
    const response = await get(`/api/shop-images/${keys[1]}?url=https://private.test/secret&size=400`);
    expect(storageGet).toHaveBeenCalledOnce();
    expect(storageGet).toHaveBeenCalledWith(keys[1]);
    expect(response.headers.location).toBe(signedUrl);
  });

  it("resolves a fresh signed URL for each request instead of caching an expiring redirect", async () => {
    vi.mocked(storageGet)
      .mockResolvedValueOnce({ key: keys[0], url: `${signedUrl}&generation=1` })
      .mockResolvedValueOnce({ key: keys[0], url: `${signedUrl}&generation=2` });
    const first = await get(`/api/shop-images/${keys[0]}`);
    const second = await get(`/api/shop-images/${keys[0]}`);
    expect(storageGet).toHaveBeenCalledTimes(2);
    expect(first.headers.location).toBe(`${signedUrl}&generation=1`);
    expect(second.headers.location).toBe(`${signedUrl}&generation=2`);
    expect(first.headers["cache-control"]).toBe("no-store");
    expect(second.headers["cache-control"]).toBe("no-store");
  });

  const invalidKeys = [
    "",
    "private/image.webp",
    "marketing/image.webp",
    "txus-inventory-private/image.webp",
    "TXUS-inventory/image.webp",
    "txus-inventory/",
    "/txus-inventory/photo.webp",
    "txus-inventory//photo.webp",
    "txus-inventory/../private/photo.webp",
    "txus-inventory/11102026v2/../../private/photo.webp",
    "txus-inventory/./photo.webp",
    "txus-inventory/11102026v2/..\\private.webp",
    "txus-inventory/%2e%2e/private.webp",
    "txus-inventory/%2E%2E%2fprivate.webp",
    "txus-inventory/%252e%252e/private.webp",
    "txus-inventory/%255cprivate.webp",
    "txus-inventory/11102026v2%2fphoto.webp",
    "txus-inventory/%70hoto.webp",
    "txus-inventory/%/photo.webp",
    "txus-inventory/.hidden/photo.webp",
    "txus-inventory/photo..webp",
    "txus-inventory/photo.webp/extra",
    "txus-inventory/photo.webp%00",
    "txus-inventory/photo%0d%0a.webp",
    "txus-inventory/photo.jpg",
    "txus-inventory/photo.png",
    "txus-inventory/photo.svg",
    "txus-inventory/photo.json",
    "txus-inventory/photo.WEBP",
    "https://private.test/photo.webp",
    "//private.test/photo.webp",
    `txus-inventory/${"a".repeat(513)}.webp`,
  ];
  it.each(invalidKeys)("rejects invalid or out-of-namespace raw keys: %s", async key => {
    const response = await get(`/api/shop-images/${key}`);
    expect(response.status).toBe(400);
    expect(response.body).toBe("Invalid shop image key");
    expect(response.headers.location).toBeUndefined();
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(storageGet).not.toHaveBeenCalled();
  });

  it("rejects the bare route instead of sending the SPA fallback", async () => {
    const response = await get("/api/shop-images");
    expect(response.status).toBe(400);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(storageGet).not.toHaveBeenCalled();
  });

  it.each([
    undefined,
    null,
    "",
    "not a URL",
    "/manus-storage/txus-inventory/fallback.webp",
    "//storage.example.test/photo.webp",
    "javascript:alert(1)",
    "http://storage.example.test/photo.webp",
    "https://user:password@storage.example.test/photo.webp",
    "https://storage.example.test/photo.webp\r\nX-Injected: yes",
  ])("never redirects when storage returns an absent or invalid URL: %s", async url => {
    vi.mocked(storageGet).mockResolvedValue({ key: keys[1], url } as any);
    const response = await get(`/api/shop-images/${keys[1]}`);
    expect(response.status).toBe(502);
    expect(response.headers.location).toBeUndefined();
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.body).toBe("Shop image storage returned no valid download URL");
  });

  it("fails clearly when the storage dependency returns no result", async () => {
    vi.mocked(storageGet).mockResolvedValue(undefined as any);
    const response = await get(`/api/shop-images/${keys[1]}`);
    expect(response.status).toBe(502);
    expect(response.headers.location).toBeUndefined();
    expect(response.headers["cache-control"]).toBe("no-store");
  });

  it.each(["backend unavailable", "Storage proxy credentials missing"])(
    "fails clearly on storage dependency failure: %s",
    async message => {
      const log = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.mocked(storageGet).mockRejectedValue(new Error(message));
      const response = await get(`/api/shop-images/${keys[1]}`);
      expect(response.status).toBe(502);
      expect(response.body).toBe("Shop image storage unavailable");
      expect(response.headers.location).toBeUndefined();
      expect(response.headers["cache-control"]).toBe("no-store");
      expect(response.body).not.toContain(message);
      expect(log).toHaveBeenCalledOnce();
    }
  );

  it("does not register or change the original marketing storage route", async () => {
    const response = await get("/manus-storage/marketing/hero.webp");
    expect(response.body).toBe("static fallback");
    expect(storageGet).not.toHaveBeenCalled();
  });

  it("is wired into the real server entry point ahead of tRPC and static/Vite handlers", () => {
    const entry = readFileSync("server/_core/index.ts", "utf8");
    expect(entry).toContain('import { registerShopImageDelivery } from "../shopImageDelivery";');
    expect(entry).toContain("registerStorageProxy(app);");
    const registration = entry.indexOf("registerShopImageDelivery(app);");
    expect(registration).toBeGreaterThan(entry.indexOf("const app = express();"));
    expect(registration).toBeLessThan(entry.indexOf('"/api/trpc"'));
    expect(registration).toBeLessThan(entry.indexOf("await setupVite(app, server)"));
    expect(registration).toBeLessThan(entry.indexOf("serveStatic(app)"));
  });
});
