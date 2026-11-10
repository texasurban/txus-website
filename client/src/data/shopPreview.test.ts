import { describe, expect, it } from "vitest";
import { slabPreviewProducts } from "./shopPreview";

describe("shop preview catalog", () => {
  it("contains the approved first-milestone slab records", () => {
    expect(slabPreviewProducts).toHaveLength(4);
    expect(slabPreviewProducts.map((product) => product.id)).toEqual(["101-101", "101-102", "102-104", "102-105"]);
    expect(slabPreviewProducts.every((product) => product.price > 0)).toBe(true);
  });

  it("uses managed storage for every preview image and descriptive alt text", () => {
    for (const product of slabPreviewProducts) {
      expect(product.image).toMatch(/^\/manus-storage\//);
      expect(product.alt).toContain(product.species);
      expect(product.alt).toContain(product.id);
    }
  });
});
