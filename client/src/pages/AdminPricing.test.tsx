import React from "react";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AdminPricing, validRate } from "./AdminPricing";

const mocks = vi.hoisted(() => ({
  auth: {} as { data: { role: string } | null; isLoading: boolean; error: Error | null; refetch: ReturnType<typeof vi.fn> },
  speciesQuery: vi.fn(), overridesQuery: vi.fn(), historyQuery: vi.fn(), snapshotQuery: vi.fn(),
  update: vi.fn(), add: vi.fn(), override: vi.fn(), deleteOverride: vi.fn(), setDefault: vi.fn(), bump: vi.fn(), invalidate: vi.fn(), seo: vi.fn(), loginUrl: vi.fn(),
}));
vi.mock("@/components/Navigation", () => ({ Navigation: () => <nav>Approved navigation</nav> }));
vi.mock("@/components/Footer", () => ({ Footer: () => <footer>Approved footer</footer> }));
vi.mock("@/components/SEOHead", () => ({ SEOHead: (props: unknown) => { mocks.seo(props); return null; } }));
vi.mock("@/const", () => ({ getLoginUrl: () => mocks.loginUrl() }));
vi.mock("@/lib/trpc", () => ({ trpc: {
  auth: { me: { useQuery: () => mocks.auth } },
  useUtils: () => ({ auth: { me: { invalidate: mocks.invalidate } }, pricing: Object.fromEntries(["snapshot", "speciesList", "overrides", "history", "catalog", "product"].map(key => [key, { invalidate: mocks.invalidate }])) }),
  pricing: {
    snapshot: { useQuery: (...args: unknown[]) => mocks.snapshotQuery(...args) },
    speciesList: { useQuery: (...args: unknown[]) => mocks.speciesQuery(...args) },
    overrides: { useQuery: (...args: unknown[]) => mocks.overridesQuery(...args) },
    history: { useQuery: (...args: unknown[]) => mocks.historyQuery(...args) },
    updateSpecies: { useMutation: () => ({ mutateAsync: mocks.update }) }, addSpecies: { useMutation: () => ({ mutateAsync: mocks.add }) },
    upsertOverride: { useMutation: () => ({ mutateAsync: mocks.override }) }, deleteOverride: { useMutation: () => ({ mutateAsync: mocks.deleteOverride }) },
    setDefaultRate: { useMutation: () => ({ mutateAsync: mocks.setDefault }) }, invalidateCache: { useMutation: () => ({ mutateAsync: mocks.bump }) },
  },
} }));
const speciesRow = { id: 1, species: "Walnut", boardFootRate: "12.00", pricingMethod: "board_foot", status: "active", effectiveDate: null, notes: null };
beforeEach(() => {
  vi.clearAllMocks();
  mocks.auth = { data: { role: "admin" }, isLoading: false, error: null, refetch: vi.fn() };
  mocks.speciesQuery.mockReturnValue({ data: [speciesRow], error: null, isLoading: false });
  mocks.overridesQuery.mockReturnValue({ data: [], error: null, isLoading: false });
  mocks.historyQuery.mockReturnValue({ data: [], error: null, isLoading: false });
  mocks.snapshotQuery.mockReturnValue({ data: { version: "v1", defaultRate: 12 }, error: null, isLoading: false });
  for (const mutation of [mocks.update, mocks.add, mocks.override, mocks.deleteOverride, mocks.setDefault, mocks.bump, mocks.invalidate]) mutation.mockResolvedValue({ success: true });
  mocks.loginUrl.mockImplementation(() => { throw new Error("Unconfigured"); });
});

describe("pricing admin authorization", () => {
  it("does not issue any pricing admin query while authentication is loading", () => {
    mocks.auth.data = null; mocks.auth.isLoading = true;
    render(<AdminPricing />);
    expect(screen.getByRole("status")).toHaveTextContent(/Checking administrator access/);
    expect(mocks.speciesQuery).not.toHaveBeenCalled(); expect(mocks.historyQuery).not.toHaveBeenCalled(); expect(mocks.overridesQuery).not.toHaveBeenCalled();
    expect(mocks.seo).toHaveBeenCalledWith(expect.objectContaining({ noindex: true }));
  });
  it("shows sign-in for an anonymous user without issuing protected queries or showing a PIN", () => {
    mocks.auth.data = null;
    render(<AdminPricing />);
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(mocks.speciesQuery).not.toHaveBeenCalled(); expect(mocks.historyQuery).not.toHaveBeenCalled(); expect(mocks.overridesQuery).not.toHaveBeenCalled();
    expect(screen.queryByText(/PIN|txus2026/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(mocks.loginUrl).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("alert")).toHaveTextContent(/Sign-in is not configured/);
  });
  it("blocks signed-in non-admin users without querying rates, overrides or history", () => {
    mocks.auth.data = { role: "user" };
    render(<AdminPricing />);
    expect(screen.getByText(/does not have the administrator role/)).toBeInTheDocument();
    expect(mocks.speciesQuery).not.toHaveBeenCalled(); expect(mocks.overridesQuery).not.toHaveBeenCalled(); expect(mocks.historyQuery).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: /Bump pricing version/ })).not.toBeInTheDocument();
  });
  it("uses enabled role checks for all pricing queries and exposes only read-only history", () => {
    render(<AdminPricing />);
    expect(mocks.speciesQuery).toHaveBeenCalledWith(undefined, { enabled: true, retry: false });
    expect(mocks.historyQuery).toHaveBeenCalledWith(undefined, { enabled: true, retry: false });
    expect(mocks.overridesQuery).toHaveBeenCalledWith(undefined, { enabled: true, retry: false });
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Change history" }));
    expect(screen.queryByRole("button", { name: /Delete history|Edit history/ })).not.toBeInTheDocument();
  });
  it("handles forbidden query responses without leaving an editable workspace", () => {
    mocks.speciesQuery.mockReturnValue({ data: [], error: { message: "Admin role required", data: { code: "FORBIDDEN" } }, isLoading: false });
    render(<AdminPricing />);
    expect(screen.getByRole("alert")).toHaveTextContent("Admin role required");
    expect(screen.getByRole("button", { name: /Bump pricing version/ })).toBeDisabled();
    expect(screen.queryByRole("tab", { name: "Species rates" })).not.toBeInTheDocument();
  });
});

describe("pricing administration edits", () => {
  it("requires finite positive two-decimal rates", () => {
    for (const bad of ["", "Infinity", "NaN", "-5", "0", "12.123", "12abc"]) expect(validRate(bad)).toBe(false);
    for (const good of ["12", "12.00", "0.01"]) expect(validRate(good)).toBe(true);
  });
  it("edits a species rate with a required audit reason and lets the server assign the author", async () => {
    render(<AdminPricing />);
    fireEvent.click(screen.getByRole("button", { name: "Edit Walnut pricing" }));
    fireEvent.change(screen.getByLabelText("Rate ($/BF)"), { target: { value: "14.25" } });
    expect(screen.getByRole("button", { name: "Save species pricing" })).toBeDisabled();
    fireEvent.change(screen.getByLabelText("Change reason (required for audit)"), { target: { value: "Approved market update" } });
    fireEvent.click(screen.getByRole("button", { name: "Save species pricing" }));
    await waitFor(() => expect(mocks.update).toHaveBeenCalledTimes(1));
    expect(mocks.update).toHaveBeenCalledWith(expect.objectContaining({ id: 1, newRate: "14.25", pricingMethod: "board_foot", status: "active", changeReason: "Approved market update" }));
    expect(mocks.update.mock.calls[0][0]).not.toHaveProperty("changedBy");
    await waitFor(() => expect(mocks.invalidate).toHaveBeenCalledTimes(6));
    expect(screen.getByRole("status")).toHaveTextContent(/Species pricing saved/);
  });
  it("shows failed writes and keeps the editable form rather than claiming success", async () => {
    mocks.update.mockRejectedValueOnce(new Error("Database unavailable"));
    render(<AdminPricing />);
    fireEvent.click(screen.getByRole("button", { name: "Edit Walnut pricing" }));
    fireEvent.change(screen.getByLabelText("Change reason (required for audit)"), { target: { value: "Approved update" } });
    fireEvent.click(screen.getByRole("button", { name: "Save species pricing" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Database unavailable"));
    expect(screen.getByLabelText("Rate ($/BF)")).toHaveValue(12);
    expect(mocks.invalidate).not.toHaveBeenCalled();
  });
  it("refreshes auth after a forbidden write and never silently saves it", async () => {
    mocks.bump.mockRejectedValueOnce(Object.assign(new Error("Forbidden"), { data: { code: "FORBIDDEN" } }));
    render(<AdminPricing />);
    fireEvent.click(screen.getByRole("button", { name: "Bump pricing version" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent(/Your change was not saved/));
    expect(mocks.invalidate).toHaveBeenCalledTimes(1);
  });
});
