import type { Express } from "express";
import { getCatalog } from "./pricing";
const DOMAIN = "https://txurbansawmill.com";
function xml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
export function productSitemap(ids: string[]): string {
  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    Array.from(new Set(ids))
      .map(
        id =>
          "  <url><loc>" +
          xml(DOMAIN + "/shop/product/" + encodeURIComponent(id)) +
          "</loc></url>"
      )
      .join("\n") +
    "\n</urlset>\n"
  );
}
export function registerCatalogSitemap(app: Express) {
  app.get("/api/shop/sitemap.xml", async (_req, res) => {
    try {
      const catalog = await getCatalog();
      res
        .type("application/xml")
        .set("Cache-Control", "public, max-age=60")
        .send(productSitemap(catalog.products.map(p => p.product.id)));
    } catch (error) {
      console.error("[CatalogSitemap] Unable to read eligible inventory");
      res
        .status(503)
        .type("text/plain")
        .send("Catalog temporarily unavailable");
    }
  });
}
