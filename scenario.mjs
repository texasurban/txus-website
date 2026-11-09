import assert from "node:assert";
const BASE = "http://localhost:3000";

async function trpc(proc, input, cookie) {
  const isPost = ["pricing.updateSpecies","pricing.invalidateCache","pricing.setDefaultRate","pricing.upsertOverride","pricing.deleteOverride","pricing.inquiry","pricing.revalidateCart","auth.adminLogin"].includes(proc);
  const url = `${BASE}/api/trpc/${proc}?batch=1${isPost ? "" : "&input=" + encodeURIComponent(JSON.stringify(input ? { "0": { json: input } } : {}))}`;
  const r = await fetch(url, {
    method: isPost ? "POST" : "GET",
    headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) },
    body: isPost ? JSON.stringify({ "0": { json: input ?? {} } }) : undefined,
  });
  const data = await r.json();
  const first = data[0];
  if (first.error) throw new Error(first.error.json?.message || JSON.stringify(first.error));
  return first.result?.data?.json;
}

// 1. snapshot returns version and defaultRate
const snap = await trpc("pricing.snapshot");
assert(snap.version, "snapshot has version");
assert(snap.defaultRate === 12, "default rate 12");
console.log("TEST 1 passed: snapshot version =", snap.version);

// 2. slabs catalog products have live prices computed from species rate
const cat = await trpc("pricing.catalog", { category: "slabs" });
assert(cat.products.length >= 400, "catalog has 400+ slabs");
const p = cat.products[0];
assert(p.pricing.price !== null, "product has computed price");
assert(p.pricing.boardFootRateUsed === 12, "used $12/BF rate");
assert(p.pricing.rateSource === "species", "source species");
assert(p.pricing.formula.includes("× $12.00/BF"), "formula text present");
console.log("TEST 2 passed: product", p.product.id, "computed price $", p.pricing.price);

// 3. cookies retain existing fixed price
const cook = await trpc("pricing.catalog", { category: "cookies & rounds" });
assert(cook.products.length >= 50, "50+ cookies");
const c0 = cook.products.find(p => p.product.sourcePrice != null && p.product.sourcePrice !== '');
assert(c0.pricing.rateSource === "fixed" || c0.pricing.method === "fixed", "cookie priced by fixed method");
console.log("TEST 3 passed: cookie", c0.product.id, "price $", c0.pricing.price, "formula:", c0.pricing.formula);

// 4. mantels use same board-foot rule
const man = await trpc("pricing.catalog", { category: "mantels" });
const m0 = man.products[0];
assert(m0.pricing.method === "board_foot", "mantel board_foot method");
console.log("TEST 4 passed: mantel", m0.product.id, "$", m0.pricing.price);

// 5. cart revalidation detects stale prices and explains them
const reval = await trpc("pricing.revalidateCart", {
  items: [
    { productId: "101-101", quantity: 1, selectedPrice: 99.00 },
    { productId: "108-010", quantity: 1, selectedPrice: 777.80 }
  ]
});
assert(reval.changed === true, "change detected");
const notices = reval.items.map(i => i.changeNotice).filter(Boolean);
assert(notices.length >= 1, "notice generated");
assert(notices[0].includes("Pricing updated from $99.00"), "notice explains price change");
console.log("TEST 5 passed: revalidation notices:", notices);

// 6. inquiry records version snapshot
const inq = await trpc("pricing.inquiry", {
  customerName: "E2E Test", customerEmail: "test@example.com",
  items: [{ productId: "101-101", quantity: 1, selectedPrice: 159.36, surfacing: false }],
  totalAmount: "159.36"
});
assert(inq.inquiryCode.startsWith("TX-"), "inquiry code format");
assert(inq.pricingVersion, "pricing version stamped");
console.log("TEST 6 passed: inquiry code", inq.inquiryCode, "version", inq.pricingVersion);

console.log("\nALL 6 E2E TESTS PASSED");
