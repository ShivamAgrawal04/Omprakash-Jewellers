import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config"
import { collections } from "@/data/collections"
import { activeProducts } from "@/data/products"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "")

  const staticRoutes = [
    "",
    "/jewellery",
    "/new-arrivals",
    "/bridal",
    "/collections",
    "/custom-jewellery",
    "/gallery",
    "/craftsmanship",
    "/story",
    "/about",
    "/care",
    "/offers",
    "/visit",
    "/contact",
    "/wishlist",
    "/search",
    "/privacy",
    "/terms",
  ]

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/jewellery" || route === "/new-arrivals"
      ? ("daily" as const)
      : ("weekly" as const),
    priority: route === "" ? 1 : route === "/jewellery" || route === "/bridal" ? 0.9 : 0.6,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: `${base}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const productRoutes: MetadataRoute.Sitemap = activeProducts.map((product) => ({
    url: `${base}/jewellery/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...routes, ...collectionRoutes, ...productRoutes]
}
