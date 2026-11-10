import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("@/lib/cart", () => ({
  useCart: () => ({ addItem: vi.fn(), items: [] }),
}));
import { ProductCard } from "./ProductCard";
afterEach(cleanup);

describe("product card bottom alignment", () => {
  it("keeps the confirmation before the action block without inconsistent space below the CTA", () => {
    const { container } = render(
      <ProductCard
        product={
          {
            id: "101-101",
            category: "Slabs",
            species: "Texas Walnut",
            lengthIn: "51",
            averageWidthIn: "15",
            thicknessIn: "2.5",
            quantity: 1,
            primaryImage:
              "/manus-storage/txus-inventory/11102026v2/fixture.webp",
          } as any
        }
        pricing={
          {
            price: 159.36,
            method: "board_foot",
            boardFeet: 13.28,
            boardFootRateUsed: 12,
          } as any
        }
      />
    );
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    const notice = screen.getByText(
      "Added to your cart. This does not reserve inventory."
    );
    expect(notice.getAttribute("role")).toBe("status");
    expect(
      notice.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    const card = container.querySelector("article");
    expect(card?.className).toContain("h-full");
    expect(card?.className).toContain("flex-col");
    expect(card?.lastElementChild?.lastElementChild?.textContent).toContain(
      "View details"
    );
  });
});
