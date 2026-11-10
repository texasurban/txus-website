import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import {
  ShopListing,
  filterCatalog,
  inventoryExtent,
  type CatalogFilters,
} from "./ShopListing";
import { ShopFurniture } from "./ShopFurniture";
import { ShopHomeDecor } from "./ShopHomeDecor";
import Shop from "./Shop";
import { ShopLumberSlabs } from "./ShopLumberSlabs";
import { ProductDetail, productSchema } from "./ProductDetail";
import {
  ProductCard,
  type ShopProductView,
} from "@/components/shop/ProductCard";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductImage, parseGallery } from "@/components/shop/ProductImage";

const mocks = vi.hoisted(() => ({
  catalogQuery: vi.fn(),
  productQuery: vi.fn(),
  addItem: vi.fn(),
  refetch: vi.fn(),
  cart: {
    items: [] as Array<{ productId: string; quantity: number }>,
    count: 0,
  },
  routeId: "A1",
}));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    pricing: {
      catalog: { useQuery: mocks.catalogQuery },
      product: { useQuery: mocks.productQuery },
    },
  },
}));
vi.mock("@/lib/cart", () => ({
  useCart: () => ({ ...mocks.cart, addItem: mocks.addItem }),
}));
vi.mock("@/components/Navigation", () => ({
  Navigation: () => <header data-testid="marketing-navigation" />,
}));
vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="marketing-footer" />,
}));
vi.mock("@/components/SEOHead", () => ({
  SEOHead: (props: unknown) => (
    <div data-testid="seo" data-props={JSON.stringify(props)} />
  ),
}));
vi.mock("wouter", async importOriginal => {
  const original = await importOriginal<typeof import("wouter")>();
  return { ...original, useRoute: () => [true, { id: mocks.routeId }] };
});

const gallery = [1, 2, 3].map(index => ({
  thumb: `https://images.example.com/${index}-400.webp`,
  detail: `https://images.example.com/${index}-800.webp`,
  full: `https://images.example.com/${index}-1200.webp`,
  width: 800,
  height: 600,
}));
const galleryJson = JSON.stringify(gallery);
function view(
  id = "A1",
  overrides: Partial<ShopProductView["product"]> = {},
  price = 500
): ShopProductView {
  return {
    product: {
      id,
      category: "Slabs",
      species: "Texas Pecan",
      lengthIn: "36.99",
      averageWidthIn: "20",
      thicknessIn: "1.5",
      quantity: 1,
      primaryImage: gallery[0].thumb,
      galleryJson,
      publicListing: "YES",
      status: "available",
      ...overrides,
    },
    pricing: {
      method: "board_foot",
      price,
      boardFootRateUsed: 12,
      rateSource: "species",
      boardFeet: 41.67,
      formula: "41.67 BF × $12.00/BF = $500.00",
      pricingVersion: "V2",
      surfacingAvailable: true,
      surfacingFee: 50,
    },
  };
}
function query(products: ShopProductView[], extra = {}) {
  return {
    data: { products, version: "V2", updatedAt: "2026-11-10T14:00:00Z" },
    isLoading: false,
    isError: false,
    isFetching: false,
    refetch: mocks.refetch,
    ...extra,
  };
}
function listing() {
  return (
    <ShopListing
      category="Slabs"
      pageTitle="Slabs"
      pageDesc="Available slabs and measurements."
      slug="slabs"
    />
  );
}
function filters(): CatalogFilters {
  return {
    species: "",
    search: "",
    ranges: {
      length: { min: "", max: "" },
      width: { min: "", max: "" },
      thickness: { min: "", max: "" },
      price: { min: "", max: "" },
    },
  };
}
function seoProps() {
  return JSON.parse(screen.getByTestId("seo").getAttribute("data-props")!);
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
  mocks.cart = { items: [], count: 0 };
  mocks.routeId = "A1";
  mocks.catalogQuery.mockReturnValue(query([view()]));
  mocks.productQuery.mockReturnValue({
    data: view(),
    isLoading: false,
    isFetching: false,
    isError: false,
    refetch: mocks.refetch,
  });
});

afterEach(() => vi.unstubAllGlobals());

describe("Catalog filters and pagination", () => {
  it("does not impose narrow defaults and derives all four numeric extents from inventory", () => {
    mocks.catalogQuery.mockReturnValue(
      query([
        view(),
        view(
          "B2",
          {
            species: "Texas Walnut",
            lengthIn: "250.9",
            averageWidthIn: "80",
            thicknessIn: "8",
          },
          9900
        ),
      ])
    );
    render(listing());
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByLabelText("Minimum", { selector: "#length-min" })
    ).toHaveValue(null);
    expect(
      screen.getByLabelText("Maximum", { selector: "#length-max" })
    ).toHaveAttribute("placeholder", "250");
    expect(
      screen.getByLabelText("Maximum", { selector: "#width-max" })
    ).toHaveAttribute("placeholder", "80");
    expect(
      screen.getByLabelText("Maximum", { selector: "#thickness-max" })
    ).toHaveAttribute("placeholder", "8");
    expect(
      screen.getByLabelText("Maximum", { selector: "#price-max" })
    ).toHaveAttribute("placeholder", "9900");
    expect(screen.getAllByRole("slider")).toHaveLength(8);
  });

  it("collapses Texas species options but retains the source species title", () => {
    mocks.catalogQuery.mockReturnValue(
      query([
        view(),
        view("B2", { species: "Pecan" }),
        view("C3", { species: "Texas Walnut" }),
      ])
    );
    render(listing());
    const species = screen.getByLabelText("Species");
    expect(
      within(species)
        .getAllByRole("option")
        .map(option => option.textContent)
    ).toEqual(["All species", "Pecan", "Walnut"]);
    fireEvent.change(species, { target: { value: "Pecan" } });
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { name: "Texas Pecan" })
    ).toBeInTheDocument();
  });

  it("floors customer-facing length for direct numeric filtering", () => {
    mocks.catalogQuery.mockReturnValue(
      query([view(), view("B2", { lengthIn: "37.001" })])
    );
    render(listing());
    fireEvent.change(document.getElementById("length-max")!, {
      target: { value: "36" },
    });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("ID: A1")).toBeInTheDocument();
  });

  it("filters width and decimal thickness numerically and resets to the entire inventory", () => {
    mocks.catalogQuery.mockReturnValue(
      query([view(), view("B2", { averageWidthIn: "40", thicknessIn: "2.5" })])
    );
    render(listing());
    fireEvent.change(document.getElementById("width-min")!, {
      target: { value: "30" },
    });
    fireEvent.change(document.getElementById("thickness-max")!, {
      target: { value: "2.5" },
    });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("ID: B2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(document.getElementById("width-min")).toHaveValue(null);
  });

  it("filters price ranges, searches IDs and notes, and sorts displayed products", () => {
    mocks.catalogQuery.mockReturnValue(
      query([
        view(),
        view("B2", { notes: "bookmatched reference", species: "Walnut" }, 700),
        view("C3", { species: "Elm" }, 900),
      ])
    );
    render(listing());
    fireEvent.change(document.getElementById("price-min")!, {
      target: { value: "600" },
    });
    fireEvent.change(document.getElementById("price-max")!, {
      target: { value: "800" },
    });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    fireEvent.change(screen.getByLabelText("Search inventory"), {
      target: { value: "bookmatched" },
    });
    expect(screen.getByText("ID: B2")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    fireEvent.change(screen.getByLabelText("Sort by"), {
      target: { value: "price-desc" },
    });
    expect(
      within(screen.getAllByRole("article")[0]).getByText("ID: C3")
    ).toBeInTheDocument();
  });

  it("lets the dual-handle slider update numeric entries with keyboard input", () => {
    mocks.catalogQuery.mockReturnValue(
      query([view(), view("B2", { lengthIn: "100" })])
    );
    render(listing());
    const maximum = screen.getByRole("slider", { name: "Maximum length" });
    fireEvent.focus(maximum);
    fireEvent.keyDown(maximum, { key: "ArrowLeft" });
    expect(document.getElementById("length-max")).toHaveValue(99);
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });

  it("reports reversed ranges and returns a clear no-match state", () => {
    render(listing());
    fireEvent.change(document.getElementById("price-min")!, {
      target: { value: "900" },
    });
    fireEvent.change(document.getElementById("price-max")!, {
      target: { value: "100" },
    });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Minimum must not exceed maximum"
    );
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(
      screen.getByRole("heading", { name: "No products match these filters" })
    ).toBeInTheDocument();
  });

  it("renders at most 24 initial products and loads the remainder on request", () => {
    mocks.catalogQuery.mockReturnValue(
      query(Array.from({ length: 30 }, (_, index) => view(`P${index + 1}`)))
    );
    render(listing());
    expect(screen.getAllByRole("article")).toHaveLength(24);
    fireEvent.click(
      screen.getByRole("button", { name: "Load 6 more products" })
    );
    expect(screen.getAllByRole("article")).toHaveLength(30);
    expect(
      screen.queryByRole("button", { name: /Load .* more products/ })
    ).not.toBeInTheDocument();
  });

  it("uses shared effective-width precedence instead of stale average-width data", () => {
    const products = [
      view("A1", { widthMinIn: "10", widthMaxIn: "30", averageWidthIn: "99" }),
    ];
    expect(inventoryExtent(products, "width")).toEqual([20, 20]);
    const options = filters();
    options.ranges.width.max = "25";
    expect(filterCatalog(products, options)).toHaveLength(1);
  });

  it("polls every 25 seconds and updates unconstrained ranges to include new stock", () => {
    const { rerender } = render(listing());
    expect(mocks.catalogQuery).toHaveBeenCalledWith(
      { category: "Slabs" },
      expect.objectContaining({ refetchInterval: 25000 })
    );
    mocks.catalogQuery.mockReturnValue(
      query([
        view(),
        view("B2", { lengthIn: "300", averageWidthIn: "90" }, 12000),
      ])
    );
    rerender(listing());
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(document.getElementById("price-max")).toHaveAttribute(
      "placeholder",
      "12000"
    );
  });

  it("has separate loading, initial error, and stale-refresh error states", () => {
    mocks.catalogQuery.mockReturnValue(
      query([], { data: undefined, isLoading: true })
    );
    const { rerender } = render(listing());
    expect(screen.getByRole("status")).toHaveTextContent(
      "Loading available inventory"
    );
    mocks.catalogQuery.mockReturnValue(
      query([], { data: undefined, isError: true })
    );
    rerender(listing());
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Inventory could not load"
    );
    fireEvent.click(screen.getByRole("button", { name: "Refresh inventory" }));
    expect(mocks.refetch).toHaveBeenCalled();
    mocks.catalogQuery.mockReturnValue(query([view()], { isError: true }));
    rerender(listing());
    expect(screen.getByRole("alert")).toHaveTextContent("last loaded catalog");
    expect(screen.getAllByRole("article")).toHaveLength(1);
  });
});

describe("Category pages and unchanged marketing shell", () => {
  it.each([ShopFurniture, ShopHomeDecor])(
    "shows truthful empty categories and portfolio/contact links without products",
    Page => {
      render(<Page />);
      expect(screen.queryAllByRole("article")).toHaveLength(0);
      expect(
        screen.getByRole("link", { name: "View existing portfolio" })
      ).toHaveAttribute("href", "/portfolio");
      expect(
        screen.getByRole("link", { name: "Ask a question" })
      ).toHaveAttribute("href", "/contact?subject=Private%20%2F%20Residential");
      expect(screen.getByTestId("marketing-navigation")).toBeInTheDocument();
      expect(screen.getByTestId("marketing-footer")).toBeInTheDocument();
    }
  );

  it("groups existing furniture inventory without showing lumber as furniture", () => {
    mocks.catalogQuery.mockReturnValue(
      query([view(), view("F1", { category: "Dining Tables" })])
    );
    render(<ShopFurniture />);
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByText("ID: F1")).toBeInTheDocument();
    expect(screen.queryByText("ID: A1")).not.toBeInTheDocument();
  });

  it("landing links all three categories with no placeholder products or coming-soon assertions", () => {
    render(<Shop />);
    expect(
      screen.getByRole("heading", { name: "Lumber & Slabs" })
    ).toBeInTheDocument();
    const links = screen
      .getAllByRole("link", { name: "Explore collection" })
      .map(link => link.getAttribute("href"));
    expect(links).toEqual([
      "/shop/lumber-slabs",
      "/shop/furniture",
      "/shop/home-decor",
    ]);
    expect(screen.queryByText(/Coming soon/i)).not.toBeInTheDocument();
    expect(
      screen.getAllByText("No publicly listed inventory currently")
    ).toHaveLength(2);
  });

  it("links all five lumber collection routes and distinguishes unstocked collections", () => {
    render(<ShopLumberSlabs />);
    expect(screen.getAllByRole("article")).toHaveLength(5);
    [
      "slabs",
      "mantels",
      "cookies-rounds",
      "beams",
      "dimensional-lumber",
    ].forEach(slug => {
      expect(
        document.querySelector(`a[href='/shop/lumber-slabs/${slug}']`)
      ).toBeInTheDocument();
    });
    expect(screen.getAllByText("0 available products")).toHaveLength(4);
  });
});

describe("Verified gallery and image rendering", () => {
  it("loads only 800px detail and 400px thumbnails before explicit enlargement", () => {
    const { container } = render(
      <ProductGallery title="Texas Pecan A1" galleryJson={galleryJson} />
    );
    const sources = Array.from(container.querySelectorAll("img")).map(
      image => image.src
    );
    expect(sources).toContain(gallery[0].detail);
    expect(sources).toContain(gallery[1].thumb);
    expect(sources.some(source => source.includes("1200"))).toBe(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      container.querySelector(`img[src='${gallery[0].detail}']`)
    ).toHaveAttribute("loading", "eager");
    expect(
      container.querySelector(`img[src='${gallery[1].thumb}']`)
    ).toHaveAttribute("loading", "lazy");
    container
      .querySelectorAll("img")
      .forEach(image => expect(image).toHaveClass("object-contain"));
  });

  it("selects each verified thumbnail and opens that exact image in a larger view", async () => {
    render(<ProductGallery title="Texas Pecan A1" galleryJson={galleryJson} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Select photo 2 of Texas Pecan A1" })
    );
    expect(
      screen.getByRole("img", { name: "Texas Pecan A1, photo 2" })
    ).toHaveAttribute("src", gallery[1].detail);
    const opener = screen.getByRole("button", {
      name: "Enlarge Texas Pecan A1, photo 2",
    });
    fireEvent.click(opener);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      gallery[1].full
    );
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      gallery[2].full
    );
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      gallery[1].full
    );
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it("lets a secondary thumbnail explicitly enlarge itself and wraps photo navigation", async () => {
    render(<ProductGallery title="Texas Pecan A1" galleryJson={galleryJson} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Enlarge photo 3 of Texas Pecan A1" })
    );
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      gallery[2].full
    );
    fireEvent.click(within(dialog).getByRole("button", { name: "Next photo" }));
    expect(within(dialog).getByRole("img")).toHaveAttribute(
      "src",
      gallery[0].full
    );
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("keeps keyboard focus inside the modal dialog", async () => {
    render(<ProductGallery title="Texas Pecan A1" galleryJson={galleryJson} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Enlarge Texas Pecan A1, photo 1" })
    );
    const dialog = await screen.findByRole("dialog");
    const last = within(dialog).getByRole("button", { name: "Close" });
    const first = within(dialog).getByRole("button", {
      name: "Previous photo",
    });
    last.focus();
    fireEvent.keyDown(last, { key: "Tab" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    expect(last).toHaveFocus();
  });

  it("rejects malformed, unsafe, incomplete and duplicate associations", () => {
    expect(parseGallery("not JSON")).toEqual([]);
    expect(
      parseGallery(
        JSON.stringify([
          { ...gallery[0], thumb: "javascript:alert(1)" },
          { detail: gallery[1].detail },
          gallery[2],
          gallery[2],
        ])
      )
    ).toEqual([gallery[2]]);
    render(
      <ProductGallery
        title="A1"
        galleryJson="not JSON"
        primaryImage="https://images.example.com/actual.webp"
      />
    );
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://images.example.com/actual.webp"
    );
  });

  it("shows a factual unavailable message on load failure and recovers for a new source", () => {
    const { rerender } = render(
      <ProductImage src={gallery[0].thumb} alt="A1" />
    );
    fireEvent.error(screen.getByRole("img"));
    expect(screen.getByRole("status")).toHaveTextContent("Photo unavailable");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    rerender(<ProductImage src={gallery[1].thumb} alt="A1" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", gallery[1].thumb);
    expect(
      screen.queryByText(/Verified inventory record/)
    ).not.toBeInTheDocument();
  });
});

describe("Product card and detail cart boundaries and SEO", () => {
  it("uses exact 400px URLs, equal-height flex cards and anchored CTA structure", () => {
    render(<ProductCard product={view().product} pricing={view().pricing} />);
    const card = screen.getByRole("article");
    expect(card).toHaveClass("flex", "h-full", "flex-col");
    expect(screen.getByRole("img")).toHaveAttribute("src", gallery[0].thumb);
    expect(screen.getByRole("img")).toHaveClass("object-contain");
    expect(screen.getByText(/View the product photos/)).toHaveClass("flex-1");
    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));
    expect(mocks.addItem).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: "A1",
        image: gallery[0].thumb,
        maxQuantity: 1,
        surfacing: false,
      }),
      1
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "does not reserve inventory"
    );
  });

  it("prevents duplicate unique pieces already present in the cart", () => {
    mocks.cart = { items: [{ productId: "A1", quantity: 1 }], count: 1 };
    render(<ProductCard product={view().product} pricing={view().pricing} />);
    expect(screen.getByRole("button", { name: "In your cart" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "In your cart" }));
    expect(mocks.addItem).not.toHaveBeenCalled();
  });

  it("clamps detail quantity to remaining stock and includes selected per-item surfacing", () => {
    mocks.productQuery.mockReturnValue({
      data: view("A1", { quantity: 5 }),
      isLoading: false,
      isError: false,
      refetch: mocks.refetch,
    });
    mocks.cart = { items: [{ productId: "A1", quantity: 3 }], count: 3 };
    render(<ProductDetail />);
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "99" },
    });
    expect(screen.getByLabelText("Quantity")).toHaveValue(2);
    fireEvent.click(screen.getByLabelText(/Add surfacing/));
    expect(
      screen.getByRole("button", { name: "Add to cart — $1,100.00" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Add to cart — $1,100.00" })
    );
    expect(mocks.addItem).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: "A1",
        maxQuantity: 5,
        surfacing: true,
        selectedPrice: 500,
      }),
      2
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      "Inventory is not reserved"
    );
  });

  it("uses generic ask-question contact handoff and the integrated cart route", () => {
    render(<ProductDetail />);
    screen
      .getAllByRole("link", { name: "Ask a question" })
      .forEach(link =>
        expect(link).toHaveAttribute(
          "href",
          "/contact?subject=Private%20%2F%20Residential"
        )
      );
    expect(screen.getByRole("link", { name: "View cart" })).toHaveAttribute(
      "href",
      "/shop/cart"
    );
    expect(mocks.productQuery).toHaveBeenCalledWith(
      { id: "A1" },
      expect.objectContaining({ refetchInterval: 25000 })
    );
  });

  it("emits unique canonical metadata, absolute images, and only a true USD offer", () => {
    render(<ProductDetail />);
    const seo = seoProps();
    expect(seo.title).toContain("Texas Pecan Slabs — A1");
    expect(seo.description).toContain("inventory ID A1");
    expect(seo.canonical).toBe("https://txurbansawmill.com/shop/product/A1");
    expect(seo.image).toBe(gallery[0].detail);
    expect(seo.schema.offers).toEqual({
      "@type": "Offer",
      price: "500.00",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: seo.canonical,
    });
    expect(JSON.stringify(seo.schema)).not.toMatch(
      /review|rating|shipping|returnPolicy/
    );
    expect(seo.noindex).toBe(false);
    const relative = view("A2", {
      galleryJson: JSON.stringify([
        {
          thumb: "/manus-storage/t.webp",
          detail: "/manus-storage/d.webp",
          full: "/manus-storage/f.webp",
        },
      ]),
    });
    expect(
      productSchema(
        relative,
        "https://txurbansawmill.com/shop/product/A2",
        "Description"
      ).image
    ).toEqual(["https://txurbansawmill.com/manus-storage/d.webp"]);
  });

  it("does not invent offers for missing prices and noindexes missing/loading products", () => {
    const pending = view();
    pending.pricing.price = null;
    expect(
      productSchema(
        pending,
        "https://txurbansawmill.com/shop/product/A1",
        "Description"
      )
    ).not.toHaveProperty("offers");
    mocks.productQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      refetch: mocks.refetch,
    });
    const { rerender } = render(<ProductDetail />);
    expect(seoProps().noindex).toBe(true);
    expect(seoProps().schema).toBeUndefined();
    expect(
      screen.getByRole("heading", { name: "Loading product…" })
    ).toBeInTheDocument();
    mocks.productQuery.mockReturnValue({
      data: null,
      isLoading: false,
      refetch: mocks.refetch,
    });
    rerender(<ProductDetail />);
    expect(
      screen.getByRole("heading", { name: "Product unavailable" })
    ).toBeInTheDocument();
    expect(seoProps().noindex).toBe(true);
    expect(
      screen.queryByRole("button", { name: /Add to cart/ })
    ).not.toBeInTheDocument();
  });

  it("disables adding stale product pricing after a refresh error", () => {
    mocks.productQuery.mockReturnValue({
      data: view(),
      isLoading: false,
      isError: true,
      refetch: mocks.refetch,
    });
    render(<ProductDetail />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please refresh before adding"
    );
    expect(screen.getByRole("button", { name: /Add to cart/ })).toBeDisabled();
  });
});
