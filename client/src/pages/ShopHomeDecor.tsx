import React from "react";
import { ShopListing } from "./ShopListing";

export const homeDecorCategories = [
  "Home Decor",
  "Cutting Boards",
  "Charcuterie",
  "River Rocks",
  "Planters & Vases",
  "Tea Light Holders",
  "Wall Hangings",
  "Holiday Decor",
] as const;

export function ShopHomeDecor() {
  return (
    <ShopListing
      category="Home Decor"
      categoryGroup={homeDecorCategories}
      pageTitle="Home Decor"
      pageDesc="Browse publicly listed home decor at Texas Urban Sawmill, or ask about a piece for your home and explore existing portfolio work."
      routePath="/shop/home-decor"
      portfolioOnEmpty
      emptyMessage="There is no publicly listed home decor inventory right now. Explore existing work in our portfolio or contact us about your project. Portfolio pieces are not presented as available shop inventory."
    />
  );
}
export default ShopHomeDecor;
