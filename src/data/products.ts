import type { Product } from "./types";
import data from "../../content/products.json";

export const products: Product[] = data as Product[];

export const activeProducts = products.filter((p) => p.active);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug && p.active);
}

export function getProductsByCollection(slug: string): Product[] {
  return activeProducts.filter((p) => p.collectionSlug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return activeProducts.filter((p) => p.featured).slice(0, limit);
}

export function getNewArrivals(limit?: number): Product[] {
  const sorted = activeProducts
    .filter((p) => p.newArrival)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getSimilarProducts(product: Product, limit = 3): Product[] {
  return activeProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.collectionSlug === product.collectionSlug),
    )
    .slice(0, limit);
}
