import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cart } from "./Cart";
import type { CartContextValue, CartItem } from "@/lib/cart";
const mock = vi.hoisted(() => ({ cart: {} as CartContextValue }));
vi.mock("@/lib/cart", async original => ({ ...await original<typeof import("@/lib/cart")>(), useCart: () => mock.cart }));
vi.mock("@/components/Navigation", () => ({ Navigation: () => <nav>Approved navigation</nav> }));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer>Approved footer</footer> }));
vi.mock("@/components/SEOHead", () => ({ SEOHead: () => null }));
const item: CartItem = { productId: "108-001", category: "Slabs", species: "Walnut", dimensions: "72 × 20 × 2 in", selectedPrice: 10.11, quantity: 2, maxQuantity: 2, surfacing: true,
  pricingResult: { price: 10.11, method: "fixed", rateSource: "fixed", boardFootRateUsed: null, boardFeet: 10, formula: "Fixed price", surfacingAvailable: true, surfacingFee: 2.22, pricingVersion: "v1" } };
beforeEach(() => {
  mock.cart = { items: [item], subtotal: 20.22, surfacingTotal: 4.44, total: 24.66, count: 2,
    addItem: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn(), toggleSurfacing: vi.fn(), clearCart: vi.fn(), dismissNotice: vi.fn(), revalidate: vi.fn().mockResolvedValue(null),
    getItems: () => [item], notices: [], canCheckout: true, revalidating: false, validationError: null, pricingVersion: "v1", lastRevalidated: new Date() };
});
describe("cart page", () => {
  it("renders cents and per-piece surfacing accurately with current shell imports", () => {
    render(<Cart />);
    expect(screen.getAllByText("$24.66")).toHaveLength(2);
    expect(screen.getByText("$4.44")).toBeInTheDocument();
    expect(screen.getByText("Approved navigation")).toBeInTheDocument(); expect(screen.getByText("Approved footer")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Proceed to inquiry/ })).toHaveAttribute("href", "/checkout");
  });
  it("replaces checkout link with a disabled button while invalid or checking", () => {
    mock.cart.canCheckout = false; mock.cart.revalidating = true;
    render(<Cart />);
    expect(screen.getByRole("button", { name: "Proceed to inquiry" })).toBeDisabled();
    expect(screen.queryByRole("link", { name: /Proceed to inquiry/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Checking prices/ })).toBeDisabled();
  });
  it("offers an accessible explicit removal and live notices after repricing", () => {
    mock.cart.notices = ["Walnut pricing changed"];
    render(<Cart />);
    fireEvent.click(screen.getByRole("button", { name: "Remove 108-001 from cart" }));
    expect(mock.cart.removeItem).toHaveBeenCalledWith("108-001");
    expect(screen.getByText("Walnut pricing changed").closest('[aria-live="polite"]')).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notice 1" }));
    expect(mock.cart.dismissNotice).toHaveBeenCalledWith(0);
  });
  it("shows failed validation and preserves the selections rather than permitting checkout", () => {
    mock.cart.canCheckout = false; mock.cart.validationError = "Inventory unavailable";
    render(<Cart />);
    expect(screen.getByRole("alert")).toHaveTextContent(/Inventory unavailable.*selections are preserved/);
    expect(screen.getByText("Walnut")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Proceed to inquiry" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Check current prices" }));
    expect(mock.cart.revalidate).toHaveBeenCalledTimes(1);
  });
});
