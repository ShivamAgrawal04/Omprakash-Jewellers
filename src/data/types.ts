export type CategorySlug =
  | "rings"
  | "necklaces"
  | "earrings"
  | "bangles"
  | "pendants"
  | "mens";

export type Metal =
  | "22K Yellow Gold"
  | "18K Yellow Gold"
  | "18K White Gold"
  | "18K Rose Gold"
  | "Platinum";

export type Stone =
  | "Natural Diamond"
  | "Emerald"
  | "Blue Sapphire"
  | "Ruby"
  | "South Sea Pearl"
  | "None";

export type Availability = "available" | "on-request" | "out-of-stock";

export type PriceVisibility = "public" | "on-request";

export type Gender = "women" | "men" | "unisex";

export type ImageKind =
  | "front"
  | "side"
  | "detail"
  | "close-up"
  | "model"
  | "packaging";

export interface ProductImage {
  src: string;
  alt: string;
  kind: ImageKind;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  longDescription?: string;
  category: CategorySlug;
  collectionSlug: string;
  price?: number;
  priceVisibility: PriceVisibility;
  metal: Metal;
  purity: string;
  weight: string;
  stone?: Stone;
  stoneWeight?: string;
  carat?: string;
  dimensions?: string;
  images: ProductImage[];
  tags: string[];
  featured: boolean;
  newArrival: boolean;
  active: boolean;
  gender: Gender;
  availability: Availability;
  sortOrder: number;
  createdAt: string;
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  sortOrder: number;
  category?: CategorySlug;
}

export type GallerySection =
  | "bridal"
  | "craftsmanship"
  | "store"
  | "collections"
  | "behind-the-scenes"
  | "events";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  section: GallerySection;
  caption?: string;
  featured?: boolean;
}

export interface EnquiryRecord {
  id: string;
  productSlug?: string;
  productName?: string;
  name: string;
  phone: string;
  email?: string;
  contactMethod: string;
  preferredDate?: string;
  message?: string;
  createdAt: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
}
