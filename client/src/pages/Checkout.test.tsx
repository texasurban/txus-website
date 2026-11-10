import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Checkout, newInquiryKey, submitValidatedInquiry, type InquiryPayload, type InquiryReceipt } from "./Checkout";
import type { CartContextValue, CartItem, ValidatedCart } from "@/lib/cart";

const mocks = vi.hoisted(() => ({ cart: {} as CartContextValue, mutate: vi.fn(), clear: vi.fn() }));
vi.mock("@/lib/cart", async importOriginal => {
  const original = await importOriginal<typeof import("@/lib/cart")>();
  return { ...original, useCart: () => mocks.cart };
});
vi.mock("@/lib/trpc", () => ({ trpc: { pricing: { inquiry: { useMutation: () => ({ mutateAsync: mocks.mutate, isPending: false }) } } } }));
vi.mock("@/components/Navigation", () => ({ Navigation: () => <nav>Approved navigation</nav> }));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer>Approved footer</footer> }));
vi.mock("@/components/SEOHead", () => ({ SEOHead: () => null }));
const item: CartItem = { productId: "108-001", category: "Slabs", species: "Walnut", dimensions: "72 × 20 × 2 in", selectedPrice: 100, quantity: 1, surfacing: false };
const receipt: InquiryReceipt = { inquiryCode: "TXUS-REAL-001", pricingVersion: "v1", totalAmount: "100.00", notificationSent: false };
const validated = (patch: Partial<ValidatedCart> = {}): ValidatedCart => ({ items: [], changed: false, pricingVersion: "v1", pricingUpdatedAt: "2026-11-10T00:00:00Z", removedProductIds: [], removalNotices: [], validatedItems: [item], ...patch });
const customer = { customerName: "Jane Builder", customerEmail: "jane@example.com" };
function options() { return { customer, getItems: () => [item], revalidate: vi.fn().mockResolvedValue(validated()), keyFor: vi.fn().mockReturnValue("00000000-0000-4000-8000-000000000000"), mutate: vi.fn().mockResolvedValue(receipt) }; }
function fillForm() { fireEvent.change(screen.getByLabelText("Name *"), { target: { value: customer.customerName } }); fireEvent.change(screen.getByLabelText("Email *"), { target: { value: customer.customerEmail } }); }

beforeEach(() => {
  vi.clearAllMocks();
  mocks.mutate.mockResolvedValue(receipt);
  mocks.cart = {
    items: [item], subtotal: 100, surfacingTotal: 0, total: 100, count: 1,
    revalidate: vi.fn().mockResolvedValue(validated()), getItems: () => [item], clearCart: mocks.clear,
    pricingVersion: "v1", canCheckout: true, revalidating: false, validationError: null, notices: [],
    addItem: vi.fn(), removeItem: vi.fn(), updateQuantity: vi.fn(), toggleSurfacing: vi.fn(), dismissNotice: vi.fn(), lastRevalidated: new Date(),
  };
});

describe("final inquiry gate", () => {
  it("requires successful server validation and never submits on failure", async () => {
    const input = options(); input.revalidate.mockResolvedValue(null);
    await expect(submitValidatedInquiry(input)).rejects.toThrow(/could not be verified/);
    expect(input.mutate).not.toHaveBeenCalled();
  });
  it("requires a second explicit submission after repricing or an add-on change", async () => {
    const input = options(); input.revalidate.mockResolvedValueOnce(validated({ changed: true })).mockResolvedValueOnce(validated());
    expect(await submitValidatedInquiry(input)).toEqual({ kind: "review" });
    expect(input.mutate).not.toHaveBeenCalled();
    expect((await submitValidatedInquiry(input)).kind).toBe("success");
    expect(input.mutate).toHaveBeenCalledTimes(1);
  });
  it("requires explicit review of removed IDs and refuses an empty accepted cart", async () => {
    const input = options(); input.revalidate.mockResolvedValue(validated({ removedProductIds: ["old-red-id"] }));
    expect(await submitValidatedInquiry(input)).toEqual({ kind: "review" });
    expect(input.mutate).not.toHaveBeenCalled();
    input.revalidate.mockResolvedValue(validated({ validatedItems: [] }));
    await expect(submitValidatedInquiry(input)).rejects.toThrow(/No available items/);
  });
  it("uses the accepted server snapshot and omits all client total fields", async () => {
    const freshItem = { ...item, selectedPrice: 120 };
    const input = { ...options(), getItems: () => [freshItem], revalidate: vi.fn().mockResolvedValue(validated({ validatedItems: [freshItem], pricingVersion: "v2" })) };
    const result = await submitValidatedInquiry(input);
    expect(result).toEqual({ kind: "success", receipt, items: [freshItem] });
    expect(input.mutate).toHaveBeenCalledWith(expect.objectContaining({ pricingVersion: "v2", items: [{ productId: item.productId, quantity: 1, selectedPrice: 120, surfacing: false }], idempotencyKey: expect.any(String) }));
    expect(input.mutate.mock.calls[0][0]).not.toHaveProperty("totalAmount");
    expect(input.mutate.mock.calls[0][0]).not.toHaveProperty("total");
  });
  it("rejects cart edits during validation rather than submitting a stale selection", async () => {
    const input = { ...options(), getItems: () => [{ ...item, surfacing: true }] };
    await expect(submitValidatedInquiry(input)).rejects.toThrow(/cart changed/);
    expect(input.mutate).not.toHaveBeenCalled();
  });
  it("accepts only real server inquiry references and propagates write failures", async () => {
    const input = options(); input.mutate.mockResolvedValue({ ...receipt, inquiryCode: "" });
    await expect(submitValidatedInquiry(input)).rejects.toThrow(/reference was not returned/);
    input.mutate.mockRejectedValue(new Error("Database unavailable"));
    await expect(submitValidatedInquiry(input)).rejects.toThrow("Database unavailable");
  });
  it("generates UUID idempotency keys", () => {
    expect(newInquiryKey()).toMatch(/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/);
    expect(newInquiryKey()).not.toBe(newInquiryKey());
  });
});

describe("checkout UI", () => {
  it("blocks submission before mount validation or after a validation failure", () => {
    mocks.cart.canCheckout = false; mocks.cart.validationError = "Pricing check failed";
    render(<Checkout />);
    expect(screen.getByRole("button", { name: /Submit inquiry/ })).toBeDisabled();
    expect(screen.getByRole("alert")).toHaveTextContent("Pricing check failed");
    expect(mocks.mutate).not.toHaveBeenCalled();
  });
  it("shows review changes without auto-submitting, then sends on a second click", async () => {
    const revalidate = vi.fn().mockResolvedValueOnce(validated({ changed: true })).mockResolvedValueOnce(validated());
    mocks.cart.revalidate = revalidate;
    render(<Checkout />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Submit inquiry/ }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Review the updated summary/));
    expect(mocks.mutate).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: /Submit reviewed inquiry/ }));
    await waitFor(() => expect(screen.getByText("TXUS-REAL-001")).toBeInTheDocument());
    expect(mocks.mutate).toHaveBeenCalledTimes(1);
    expect(mocks.clear).toHaveBeenCalledTimes(1);
  });
  it("preserves submitted summary, uses real reference and makes no payment, reservation or email-copy claim", async () => {
    render(<Checkout />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Submit inquiry/ }));
    await waitFor(() => expect(screen.getByText("TXUS-REAL-001")).toBeInTheDocument());
    expect(screen.getByText("We will review availability and contact you. No payment or reservation has been made.")).toBeInTheDocument();
    expect(screen.getByText("Walnut · 108-001 × 1")).toBeInTheDocument();
    expect(screen.queryByText(/email.*copy|copy.*email|email.*sent|reserved|reservation confirmed/i)).not.toBeInTheDocument();
    expect(mocks.clear).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Approved navigation")).toBeInTheDocument();
    expect(screen.getByText("Approved footer")).toBeInTheDocument();
  });
  it("preserves cart on server error, disables submit, and retries with the same idempotency key", async () => {
    mocks.mutate.mockRejectedValueOnce(new Error("Could not save inquiry"));
    render(<Checkout />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Submit inquiry/ }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Could not save inquiry"));
    expect(mocks.clear).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /Submit inquiry/ })).toBeDisabled();
    const first = mocks.mutate.mock.calls[0][0] as InquiryPayload;
    fireEvent.click(screen.getByRole("button", { name: /Check prices \/ retry/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /Submit inquiry/ })).not.toBeDisabled());
    fireEvent.click(screen.getByRole("button", { name: /Submit inquiry/ }));
    await waitFor(() => expect(mocks.clear).toHaveBeenCalledTimes(1));
    expect((mocks.mutate.mock.calls[1][0] as InquiryPayload).idempotencyKey).toBe(first.idempotencyKey);
  });
  it("handles server conflicts by revalidating and requiring explicit reviewed submission", async () => {
    mocks.mutate.mockRejectedValueOnce(Object.assign(new Error("Repriced"), { data: { code: "CONFLICT" } }));
    render(<Checkout />); fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Submit inquiry/ }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Pricing or availability changed/));
    expect(mocks.cart.revalidate).toHaveBeenCalledTimes(2);
    expect(mocks.clear).not.toHaveBeenCalled();
    expect(mocks.mutate).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: /Submit reviewed inquiry/ }));
    await waitFor(() => expect(mocks.clear).toHaveBeenCalledTimes(1));
    expect(mocks.mutate).toHaveBeenCalledTimes(2);
  });
  it("prevents double-click submissions and disables the button for the full revalidation phase", async () => {
    let resolve!: (result: ValidatedCart) => void;
    mocks.cart.revalidate = vi.fn().mockReturnValue(new Promise<ValidatedCart>(r => { resolve = r; }));
    render(<Checkout />); fillForm();
    const submit = screen.getByRole("button", { name: /Submit inquiry/ });
    fireEvent.click(submit); fireEvent.click(submit);
    expect(screen.getByRole("button", { name: /Recording inquiry/ })).toBeDisabled();
    expect(mocks.cart.revalidate).toHaveBeenCalledTimes(1);
    expect(mocks.mutate).not.toHaveBeenCalled();
    resolve(validated());
    await waitFor(() => expect(mocks.mutate).toHaveBeenCalledTimes(1));
  });
});
