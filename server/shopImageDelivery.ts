import type { Express } from "express";
import { storageGet } from "./storage";

const SHOP_IMAGE_PREFIX = "/api/shop-images/";
const SHOP_IMAGE_KEY =
  /^txus-inventory\/(?:[A-Za-z0-9][A-Za-z0-9_-]*\/)*[A-Za-z0-9][A-Za-z0-9_-]*\.webp$/;

function isDownloadUrl(value: unknown): value is string {
  if (
    typeof value !== "string" ||
    !value.startsWith("https://") ||
    /[\u0000-\u0020\u007f]/.test(value)
  ) {
    return false;
  }
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

/** Resolve inventory photos in this project's storage namespace, without changing their keys. */
export function registerShopImageDelivery(app: Express) {
  // No capture groups: Express must not decode wildcard parameters before validation.
  // Checking the raw pathname also rejects encoded and double-encoded traversal.
  app.get(/^\/api\/shop-images(?:\/.*)?$/, async (req, res) => {
    res.set("Cache-Control", "no-store");
    const path = req.path;
    const key = path.startsWith(SHOP_IMAGE_PREFIX)
      ? path.slice(SHOP_IMAGE_PREFIX.length)
      : "";
    if (key.length > 512 || !SHOP_IMAGE_KEY.test(key)) {
      res.status(400).send("Invalid shop image key");
      return;
    }

    try {
      const result = await storageGet(key);
      if (!isDownloadUrl(result?.url)) {
        res.status(502).send("Shop image storage returned no valid download URL");
        return;
      }
      // Do not cache or reserialize a signed URL, substitute another size, or fetch/re-encode bytes.
      res.status(307).set("Location", result.url).end();
    } catch {
      console.error("[ShopImageDelivery] Failed to resolve an inventory image");
      res.status(502).send("Shop image storage unavailable");
    }
  });
}
