import { activeProducts } from "@/data/products";
import type { Product } from "@/data/types";

export interface SearchFilters {
  category?: string;
  collection?: string;
  metal?: string;
  purity?: string;
  stone?: string;
  gender?: string;
  availability?: string;
  priceMin?: number | string;
  priceMax?: number | string;
}

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A–Z" },
];

const METALS = [
  "22K Yellow Gold",
  "18K Yellow Gold",
  "18K White Gold",
  "18K Rose Gold",
  "Platinum",
  "Silver",
  "Sterling Silver (925)",
] as const;

const STONES = [
  "Natural Diamond",
  "Emerald",
  "Blue Sapphire",
  "Ruby",
  "South Sea Pearl",
  "None",
] as const;

export const FILTER_OPTIONS = {
  metals: METALS as readonly string[],
  stones: STONES as readonly string[],
  purity: ["22K (916)", "18K (750)", "Pt 950", "925"] as const,
};

export function norm(value: string): string {
  return value.trim().toLowerCase();
}

export function applyFilters(
  products: Product[],
  filters: SearchFilters,
): Product[] {
  const pMin =
    typeof filters.priceMin === "string"
      ? parseFloat(filters.priceMin)
      : filters.priceMin;
  const pMax =
    typeof filters.priceMax === "string"
      ? parseFloat(filters.priceMax)
      : filters.priceMax;
  const hasPriceRange =
    (typeof pMin === "number" && !isNaN(pMin)) ||
    (typeof pMax === "number" && !isNaN(pMax));

  return products.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.collection && p.collectionSlug !== filters.collection)
      return false;
    if (filters.metal && norm(p.metal) !== norm(filters.metal)) return false;
    if (filters.purity && norm(p.purity) !== norm(filters.purity)) return false;
    if (filters.stone && norm(p.stone ?? "None") !== norm(filters.stone))
      return false;
    if (filters.gender && p.gender !== filters.gender) return false;
    if (filters.availability && p.availability !== filters.availability)
      return false;
    if (hasPriceRange) {
      if (typeof p.price !== "number") return false;
      if (typeof pMin === "number" && !isNaN(pMin) && p.price < pMin)
        return false;
      if (typeof pMax === "number" && !isNaN(pMax) && p.price > pMax)
        return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return list.sort((a, b) => priceOf(b) - priceOf(a));
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "newest":
      return list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "featured":
    default:
      return list.sort((a, b) => {
        const fa = Number(a.featured);
        const fb = Number(b.featured);
        if (fa !== fb) return fb - fa;
        return a.sortOrder - b.sortOrder;
      });
  }
}

function priceOf(p: Product): number {
  return typeof p.price === "number" ? p.price : Number.MAX_SAFE_INTEGER;
}

export function searchProducts(
  query: string,
  { limit }: { limit?: number } = {},
): Product[] {
  const q = norm(query);
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = activeProducts.map((p) => {
    let score = 0;
    const haystack = [
      p.name,
      p.sku,
      p.category,
      p.collectionSlug,
      p.metal,
      p.purity,
      p.stone ?? "",
      p.description,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();

    if (norm(p.name).includes(q)) score += 100;
    if (norm(p.sku) === q) score += 120;
    if (norm(p.sku).includes(q)) score += 80;
    for (const token of tokens) {
      if (haystack.includes(token)) score += 10;
    }
    for (const tag of p.tags) {
      if (norm(tag).includes(q)) score += 20;
    }
    return { p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.p.sortOrder - b.p.sortOrder)
    .slice(0, limit ?? 24)
    .map((s) => s.p);
}

export interface SearchSuggestion {
  type: "product" | "collection" | "category";
  label: string;
  href: string;
  image?: string;
}

export { activeProducts };
