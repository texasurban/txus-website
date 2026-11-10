export type ShopPreviewProduct = {
  id: string;
  species: string;
  length: number;
  widthMin: number;
  widthMax: number;
  thickness: number;
  price: number;
  boardFeet: number;
  image: string;
  alt: string;
};

export const slabPreviewProducts: ShopPreviewProduct[] = [
  {
    id: "101-101",
    species: "Texas Walnut",
    length: 51,
    widthMin: 10,
    widthMax: 20,
    thickness: 2.5,
    price: 159.36,
    boardFeet: 13.28,
    image: "/manus-storage/1c5B3pTVJOvngaTjLis-OShozM93808MZ-400_41a7c67d.webp",
    alt: "Texas Walnut live edge slab, product 101-101, at Texas Urban Sawmill",
  },
  {
    id: "101-102",
    species: "Texas Walnut",
    length: 51,
    widthMin: 17,
    widthMax: 22,
    thickness: 2.5,
    price: 207.24,
    boardFeet: 17.27,
    image: "/manus-storage/1uIVyKdukV9zQQ0OksBHH-SOFEXThaGKA-400_d95c0147.webp",
    alt: "Texas Walnut live edge slab, product 101-102, at Texas Urban Sawmill",
  },
  {
    id: "102-104",
    species: "Texas Walnut",
    length: 57,
    widthMin: 16,
    widthMax: 23,
    thickness: 2.5,
    price: 231.6,
    boardFeet: 19.3,
    image: "/manus-storage/1G8ce66cSgb7Tv1jNbowIBDZmGw7Nj_Qm-400_4369c3f3.webp",
    alt: "Texas Walnut live edge slab, product 102-104, at Texas Urban Sawmill",
  },
  {
    id: "102-105",
    species: "Texas Walnut",
    length: 57,
    widthMin: 18,
    widthMax: 29,
    thickness: 2.5,
    price: 279.12,
    boardFeet: 23.26,
    image: "/manus-storage/11-OQfl0Aog8y0mPu1Gzr2RD3SR90CiGV-400_823abe0c.webp",
    alt: "Texas Walnut live edge slab, product 102-105, at Texas Urban Sawmill",
  },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
