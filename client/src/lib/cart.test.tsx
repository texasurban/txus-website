import React from "react";
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import type { PricingResult } from "@shared/pricing";
import { CART_STORAGE_KEY, CartProvider, applyCartValidation, cartReducer, cartTotals, clampQuantity, loadCart, sanitizeCart, saveCart, useCart, type CartItem, type ValidatedCart } from "./cart";

const mocks = vi.hoisted(() => ({ mutate: vi.fn(), snapshot: vi.fn() }));
vi.mock("./trpc", () => ({ trpc: { pricing: {
  revalidateCart: { useMutation: () => ({ mutateAsync: mocks.mutate }) },
  snapshot: { useQuery: () => mocks.snapshot() },
} } }));
const price: PricingResult = { method: "board_foot", price: 100, boardFootRateUsed: 10, rateSource: "species", boardFeet: 10, formula: "10 BF × $10/BF", pricingVersion: "v1", surfacingAvailable: true, surfacingFee: 50 };
const item = (overrides: Partial<CartItem> = {}): CartItem => ({ productId: "108-001", category: "Slabs", species: "Texas Walnut", dimensions: '72 × 20 × 2 in', selectedPrice: 100, pricingResult: price, quantity: 1, surfacing: false, ...overrides });
const validation = (overrides: Partial<ValidatedCart> = {}): ValidatedCart => ({
  items: [{ productId: "108-001", quantity: 1, surfacing: false, oldPrice: 100, newPrice: 100, priceChanged: false, changeNotice: null, pricingResult: price, surfacingFee: null, itemTotal: 100 }],
  pricingVersion: "v1", pricingUpdatedAt: "2026-11-10T00:00:00Z", changed: false, removedProductIds: [], removalNotices: [], ...overrides,
});

function Probe() {
  const cart = useCart();
  return <div>
    <output data-testid="items">{JSON.stringify(cart.items)}</output>
    <output data-testid="state">{cart.revalidating ? "checking" : cart.canCheckout ? "ready" : "blocked"}</output>
    <output data-testid="total">{cart.total}</output>
    {cart.validationError && <p role="alert">{cart.validationError}</p>}
    <div aria-live="polite">{cart.notices.join(" | ")}</div>
    <button onClick={() => void cart.revalidate()}>Validate</button>
    <button onClick={() => cart.toggleSurfacing("108-001")}>Surface</button>
    <button onClick={() => cart.removeItem("108-001")}>Remove</button>
    <button onClick={cart.clearCart}>Clear</button>
  </div>;
}

beforeEach(() => { localStorage.clear(); vi.clearAllMocks(); mocks.snapshot.mockReturnValue({ data: { version: "v1" } }); mocks.mutate.mockResolvedValue(validation()); });
afterEach(() => { vi.useRealTimers(); });

describe("untrusted cart persistence", () => {
  it("rejects non-arrays, malformed JSON and inaccessible storage", () => {
    expect(sanitizeCart({ quantity: 2 })).toEqual([]);
    localStorage.setItem(CART_STORAGE_KEY, "{bad");
    expect(loadCart()).toEqual([]);
    expect(loadCart({ getItem: () => { throw new Error("blocked"); } })).toEqual([]);
    expect(() => saveCart([item()], { setItem: () => { throw new Error("full"); } })).not.toThrow();
  });
  it("drops malformed schema, negative/nonfinite quantities, invalid prices and unsafe images", () => {
    const unsafe = item({ image: "javascript:alert(1)" });
    const result = sanitizeCart([null, {}, item({ quantity: NaN }), item({ quantity: Infinity }), item({ quantity: -1 }), item({ selectedPrice: Infinity }), { ...item(), species: 45 }, { ...unsafe, unexpectedSecret: "not persisted" }]);
    expect(result).toHaveLength(1);
    expect(result[0].image).toBeNull();
    expect(result[0]).not.toHaveProperty("unexpectedSecret");
  });
  it("deduplicates inventory and clamps legacy quantities to one by default", () => {
    expect(sanitizeCart([item({ quantity: 4 }), item({ quantity: 3 })])).toEqual([expect.objectContaining({ quantity: 1, maxQuantity: 1 })]);
    expect(sanitizeCart([item({ quantity: 4.9, maxQuantity: 3 })])[0].quantity).toBe(3);
    expect(clampQuantity(NaN, 10)).toBe(1);
    expect(clampQuantity(0, 10)).toBe(1);
  });
  it("migrates a valid old cart but never resurrects it when v2 is cleared or broken", () => {
    localStorage.setItem("txus_cart_v1", JSON.stringify([item()]));
    expect(loadCart()).toHaveLength(1);
    saveCart([]);
    expect(loadCart()).toEqual([]);
    localStorage.setItem(CART_STORAGE_KEY, "bad");
    expect(loadCart()).toEqual([]);
  });
  it("clears invalid surfacing and malformed pricing snapshots", () => {
    expect(sanitizeCart([item({ surfacing: true, pricingResult: { ...price, surfacingAvailable: false } })])[0].surfacing).toBe(false);
    expect(sanitizeCart([{ ...item({ surfacing: true }), pricingResult: { ...price, surfacingFee: Infinity } }])[0]).toEqual(expect.objectContaining({ pricingResult: undefined, surfacing: false }));
  });
});

describe("cart reducer and cents", () => {
  it("never increments a unique piece above stock and requires explicit removal", () => {
    const { quantity: _, ...newItem } = item();
    const first = cartReducer([], { type: "add", item: newItem, qty: 3 });
    expect(cartReducer(first, { type: "add", item: newItem, qty: 5 })[0].quantity).toBe(1);
    expect(cartReducer(first, { type: "quantity", productId: "108-001", qty: 0 })[0].quantity).toBe(1);
    expect(cartReducer(first, { type: "remove", productId: "108-001" })).toEqual([]);
    expect(cartReducer(first, { type: "clear" })).toEqual([]);
  });
  it("counts surfacing per piece and rounds subtotal and total to cents", () => {
    expect(cartTotals([item({ quantity: 3, maxQuantity: 3, surfacing: true, selectedPrice: 10.11, pricingResult: { ...price, surfacingFee: 2.22 } })])).toEqual({ subtotal: 30.33, surfacingTotal: 6.66, total: 36.99, count: 3 });
    expect(cartTotals([item({ selectedPrice: 0.1 }), item({ productId: "108-002", selectedPrice: 0.2 })]).total).toBe(0.3);
  });
});

describe("server cart application", () => {
  it("removes newly excluded V2 IDs, including ones from a previous cart", () => {
    const response = validation({ items: [], removedProductIds: ["108-001"], removalNotices: ["108-001 excluded from public V2 inventory"] });
    const applied = applyCartValidation([item()], response);
    expect(applied.items).toEqual([]);
    expect(applied.changed).toBe(true);
    expect(applied.notices).toContain("108-001 excluded from public V2 inventory");
  });
  it("does not keep an item absent from the validation response", () => {
    expect(applyCartValidation([item()], validation({ items: [] })).items).toEqual([]);
  });
  it("applies quantity, price, live fee, and pricing snapshot together", () => {
    const response = validation();
    response.items[0] = { ...response.items[0], newPrice: 120, quantity: 2, surfacing: true, pricingResult: { ...price, price: 120, surfacingFee: 75 }, surfacingFee: 75, itemTotal: 390 };
    const applied = applyCartValidation([item({ quantity: 3, maxQuantity: 3, surfacing: true })], response);
    expect(applied.items[0]).toEqual(expect.objectContaining({ selectedPrice: 120, quantity: 2, surfacing: true, pricingResult: expect.objectContaining({ surfacingFee: 75 }) }));
    expect(cartTotals(applied.items)).toEqual({ subtotal: 240, surfacingTotal: 150, total: 390, count: 2 });
    expect(applied.changed).toBe(true);
  });
  it("clears surfacing when the server no longer allows it", () => {
    const response = validation();
    response.items[0].pricingResult = { ...price, surfacingAvailable: false, surfacingFee: null };
    const applied = applyCartValidation([item({ surfacing: true })], response);
    expect(applied.items[0].surfacing).toBe(false);
    expect(applied.notices.join(" ")).toMatch(/Surfacing is no longer available/);
  });
  it("rejects an incomplete price response rather than treating it as fresh", () => {
    const response = validation();
    response.items[0].newPrice = Infinity;
    expect(() => applyCartValidation([item()], response)).toThrow(/incomplete/);
  });
});

describe("stable provider revalidation", () => {
  it("starts blocked, becomes fresh, and does not revalidate in a render-effect loop", async () => {
    saveCart([item()]);
    let resolve!: (value: ValidatedCart) => void;
    mocks.mutate.mockImplementationOnce(() => new Promise<ValidatedCart>(r => { resolve = r; }));
    const view = render(<CartProvider><Probe /></CartProvider>);
    expect(screen.getByTestId("state")).toHaveTextContent("checking");
    await act(async () => resolve(validation()));
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("ready"));
    view.rerender(<CartProvider><Probe /></CartProvider>);
    await act(async () => { await Promise.resolve(); });
    expect(mocks.mutate).toHaveBeenCalledTimes(1);
  });
  it("retains cart on failure and blocks inquiry until retry succeeds", async () => {
    saveCart([item()]);
    mocks.mutate.mockRejectedValueOnce(new Error("Inventory temporarily unavailable"));
    render(<CartProvider><Probe /></CartProvider>);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Inventory temporarily unavailable"));
    expect(screen.getByTestId("state")).toHaveTextContent("blocked");
    expect(loadCart()).toHaveLength(1);
    fireEvent.click(screen.getByText("Validate"));
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("ready"));
  });
  it("discards obsolete responses when an item is removed during a check", async () => {
    saveCart([item()]);
    let resolve!: (value: ValidatedCart) => void;
    mocks.mutate.mockImplementationOnce(() => new Promise<ValidatedCart>(r => { resolve = r; }));
    render(<CartProvider><Probe /></CartProvider>);
    fireEvent.click(screen.getByText("Remove"));
    await act(async () => resolve(validation()));
    expect(loadCart()).toEqual([]);
    expect(screen.getByTestId("items")).toHaveTextContent("[]");
    expect(screen.getByTestId("state")).toHaveTextContent("blocked");
  });
  it("applies server removals and shows an aria-live removal notice", async () => {
    saveCart([item()]);
    mocks.mutate.mockResolvedValue(validation({ items: [], removedProductIds: ["108-001"], removalNotices: ["108-001 is no longer public"] }));
    render(<CartProvider><Probe /></CartProvider>);
    await waitFor(() => expect(screen.getByTestId("items")).toHaveTextContent("[]"));
    expect(screen.getByText(/108-001 is no longer public/)).toHaveAttribute("aria-live", "polite");
    expect(screen.getByTestId("state")).toHaveTextContent("blocked");
  });
  it("rechecks on tab return and a new pricing snapshot version", async () => {
    saveCart([item()]);
    const view = render(<CartProvider><Probe /></CartProvider>);
    await waitFor(() => expect(screen.getByTestId("state")).toHaveTextContent("ready"));
    fireEvent(document, new Event("visibilitychange"));
    await waitFor(() => expect(mocks.mutate).toHaveBeenCalledTimes(2));
    mocks.snapshot.mockReturnValue({ data: { version: "v2" } });
    mocks.mutate.mockResolvedValue(validation({ pricingVersion: "v2" }));
    view.rerender(<CartProvider><Probe /></CartProvider>);
    await waitFor(() => expect(mocks.mutate).toHaveBeenCalledTimes(3));
  });
  it("polls at 25 seconds and stops polling on unmount", async () => {
    vi.useFakeTimers(); saveCart([item()]);
    const view = render(<CartProvider><Probe /></CartProvider>);
    await act(async () => { await Promise.resolve(); });
    expect(mocks.mutate).toHaveBeenCalledTimes(1);
    await act(async () => { await vi.advanceTimersByTimeAsync(25_000); });
    expect(mocks.mutate).toHaveBeenCalledTimes(2);
    view.unmount();
    await act(async () => { await vi.advanceTimersByTimeAsync(25_000); });
    expect(mocks.mutate).toHaveBeenCalledTimes(2);
  });
});
