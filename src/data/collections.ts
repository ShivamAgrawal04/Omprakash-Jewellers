import type { Collection } from "./types";
import data from "../../content/collections.json";

export const collections: Collection[] = data as Collection[];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export const featuredCollections = collections
  .filter((c) => c.featured)
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const categoryMap: Record<string, { name: string; slug: string }> = {
  rings: { name: "Rings", slug: "rings" },
  necklaces: { name: "Necklaces", slug: "necklaces" },
  earrings: { name: "Earrings", slug: "earrings" },
  bangles: { name: "Bangles", slug: "bangles" },
  pendants: { name: "Pendants", slug: "pendants" },
  mens: { name: "Men's", slug: "mens" },
};
