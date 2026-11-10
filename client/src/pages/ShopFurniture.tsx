import React from "react";
import { ShopListing } from "./ShopListing";

export const furnitureCategories = [
  "Furniture",
  "Dining Tables",
  "Conference Tables",
  "Benches",
  "Desks",
  "Shelving",
] as const;

export function ShopFurniture() {
  return (
    <ShopListing
      category="Furniture"
      categoryGroup={furnitureCategories}
      pageTitle="Furniture"
      pageDesc="Browse publicly listed finished furniture at Texas Urban Sawmill, or explore existing portfolio work and ask about a custom project."
      routePath="/shop/furniture"
      portfolioOnEmpty
      emptyMessage="There is no publicly listed furniture inventory right now. Our portfolio shows existing work, not products available for purchase. Browse those projects or contact us about your furniture needs."
    />
  );
}
export default ShopFurniture;
