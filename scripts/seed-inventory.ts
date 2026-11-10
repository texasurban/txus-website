import "dotenv/config";
import { readFile } from "node:fs/promises";
import { eq } from "drizzle-orm";
import { getDb } from "../server/db";
import {
  products,
  speciesPricing,
  speciesPricingHistory,
  pricingMeta,
} from "../drizzle/schema";
import { genericSpecies } from "../shared/pricing";

// Import the approved master projection only; never delete inventory, users, inquiries, or rates.
// Run: pnpm exec tsx scripts/seed-inventory.ts
const data = JSON.parse(
  await readFile(
    new URL("../server/data/inventory.json", import.meta.url),
    "utf8"
  )
);
if (
  data.version !== "11102026V2" ||
  data.products.length !== 638 ||
  data.products.filter((p: any) => p.publicListing === "YES").length !== 447
)
  throw new Error("Approved V2 inventory identity/count mismatch");
const db = await getDb();
if (!db)
  throw new Error(
    "DATABASE_URL must point to the intended managed website database"
  );
const existing = await db.select({ id: products.id }).from(products);
const known = new Set(existing.map(p => p.id));
let inserted = 0;
await db.transaction(async tx => {
  // Existing rows are preserved. Re-import/updating an active master is a separate, reviewed operation.
  for (let i = 0; i < data.products.length; i += 40) {
    const batch = data.products
      .slice(i, i + 40)
      .filter((p: any) => !known.has(p.id));
    if (batch.length) {
      await tx.insert(products).values(batch);
      inserted += batch.length;
    }
  }
  const rates = await tx.select().from(speciesPricing);
  const names = Array.from(
    new Set<string>(
      data.products.map((p: any) => genericSpecies(p.species)).filter(Boolean)
    )
  ).sort();
  for (const species of names) {
    if (rates.some(r => r.species === species)) continue;
    await tx
      .insert(speciesPricing)
      .values({
        species,
        boardFootRate: "12.00",
        pricingMethod: "board_foot",
        status: "active",
        notes: "Approved V2 master working rate",
      });
    await tx
      .insert(speciesPricingHistory)
      .values({
        species,
        newRate: "12.00",
        newMethod: "board_foot",
        changedBy: "inventory-import",
        changeReason: "Initial approved 11102026V2 working rate",
      });
  }
  const now = new Date().toISOString();
  for (const [metaKey, metaValue] of Object.entries({
    defaultBoardFootRate: "12.00",
    pricingVersion: now,
    pricingUpdated: now,
    inventoryVersion: "11102026V2",
  })) {
    const found = await tx
      .select()
      .from(pricingMeta)
      .where(eq(pricingMeta.metaKey, metaKey));
    if (!found.length)
      await tx.insert(pricingMeta).values({ metaKey, metaValue });
  }
});
console.log(
  `Approved V2 inventory import complete: ${inserted} new records; existing inventory and pricing edits preserved.`
);
process.exit(0);
