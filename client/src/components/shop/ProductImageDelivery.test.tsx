import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  ProductImage,
  imageDeliveryUrl,
  parseGallery,
  absoluteImageUrl,
} from "./ProductImage";
import { ProductGallery } from "./ProductGallery";

const key = (tier: number) =>
  `txus-inventory/11102026v2/pecan-slab-photo-1-${tier}_1234abcd.webp`;
const original = (tier: number) => `/manus-storage/${key(tier)}`;
const delivered = (tier: number) => `/api/shop-images/${key(tier)}`;

describe("Production-safe exact inventory-photo delivery", () => {
  it.each([400, 800, 1200])(
    "changes only the delivery prefix for the %i tier",
    tier => {
      expect(imageDeliveryUrl(original(tier))).toBe(delivered(tier));
      render(
        <ProductImage
          src={original(tier)}
          alt="Pecan slab"
          width={800}
          height={600}
        />
      );
      expect(screen.getByRole("img")).toHaveAttribute("src", delivered(tier));
      expect(screen.getByRole("img")).toHaveAttribute("width", "800");
      expect(screen.getByRole("img")).toHaveAttribute("height", "600");
      expect(screen.getByRole("img")).toHaveClass("object-contain");
    }
  );

  it.each([
    "/manus-storage/approved-marketing-photo.webp",
    "https://approved.example/texas-pecan.webp",
    "/api/shop-images/txus-inventory/existing.webp",
  ])("never changes other approved media paths: %s", src => {
    expect(imageDeliveryUrl(src)).toBe(src);
  });

  it("retains raw verified gallery associations and uses the same photo at each tier", async () => {
    const images = [
      {
        thumb: original(400),
        detail: original(800),
        full: original(1200),
        width: 800,
        height: 600,
      },
    ];
    const json = JSON.stringify(images);
    expect(parseGallery(json)).toEqual(images);
    render(<ProductGallery title="Pecan slab" galleryJson={json} />);
    expect(
      screen.getByRole("img", { name: "Pecan slab, photo 1" })
    ).toHaveAttribute("src", delivered(800));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Enlarge Pecan slab, photo 1" })
    );
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      delivered(1200)
    );
    expect(parseGallery(json)).toEqual(images);
  });

  it("uses a permanent repaired path in metadata, never an expiring signed URL", () => {
    expect(absoluteImageUrl(original(800))).toBe(
      `https://txurbansawmill.com${delivered(800)}`
    );
    expect(
      absoluteImageUrl("/manus-storage/approved-marketing-photo.webp")
    ).toBe(
      "https://txurbansawmill.com/manus-storage/approved-marketing-photo.webp"
    );
    expect(absoluteImageUrl("javascript:alert(1)")).toBeUndefined();
  });
});
