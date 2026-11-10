import { describe, expect, it } from "vitest";
import data from "./data/inventory.json";
describe("approved V2 inventory import", () => {
  it("preserves all 638 unique source records without importing the erroneous 647-row claim", () => {
    expect(data.version).toBe("11102026V2");
    expect(data.products).toHaveLength(638);
    expect(new Set(data.products.map(p => p.id)).size).toBe(638);
  });
  it("excludes all 191 incomplete/red records and exposes exactly the 447 approved records", () => {
    expect(data.products.filter(p => p.publicListing === "NO")).toHaveLength(
      191
    );
    const approved = data.products.filter(p => p.publicListing === "YES");
    expect(approved).toHaveLength(447);
    expect(approved.filter(p => p.category === "Slabs")).toHaveLength(388);
    expect(approved.filter(p => p.category === "Mantels")).toHaveLength(59);
    for (const p of approved) {
      expect(Number(p.lengthIn)).toBeGreaterThan(0);
      expect(Number(p.averageWidthIn)).toBeGreaterThan(0);
      expect(Number(p.thicknessIn)).toBeGreaterThan(0);
      expect(Number(p.sourcePrice)).toBeGreaterThan(0);
      const gallery = JSON.parse(p.galleryJson);
      expect(gallery.length).toBeGreaterThan(0);
      expect(p.primaryImage).toBe(gallery[0].detail);
      for (const image of gallery)
        for (const tier of ["thumb", "detail", "full"])
          expect(image[tier]).toMatch(
            /^\/manus-storage\/txus-inventory\/11102026v2\/.+\.webp$/
          );
    }
  });
  it("preserves all 1346 verified gallery associations rather than only the primary image", () => {
    const count = data.products.reduce(
      (sum, p) => sum + JSON.parse(p.galleryJson).length,
      0
    );
    expect(count).toBe(1346);
  });
});
