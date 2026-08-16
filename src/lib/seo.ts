import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import type { Collection, Product } from "@/data/types";

export function absolute(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  images?: string[];
  type?: "website" | "article" | "product";
}

export function pageMetadata({
  title,
  description,
  path,
  images,
  type = "website",
}: PageSeo): Metadata {
  const url = absolute(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: type === "article" ? "article" : "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: images?.length
        ? images.map((i) => ({ url: absolute(i) }))
        : undefined,
    },
    twitter: {
      card: images?.length ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export function jsonLd(graph: Record<string, unknown>[]): string {
  return JSON.stringify(graph);
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absolute("/opengraph-image"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Porsa",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "19:00",
      },
    ],
    sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function productLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.description,
    image: product.images.map((i) => i.src),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      availability:
        product.availability === "out-of-stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: absolute(`/jewellery/${product.slug}`),
      price:
        product.priceVisibility === "public" && typeof product.price === "number"
          ? String(product.price)
          : undefined,
      priceCurrency: "INR",
    },
  };
}

export function collectionLd(collection: Collection) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: absolute(`/collections/${collection.slug}`),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}
