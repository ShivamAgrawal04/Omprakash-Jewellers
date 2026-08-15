import type { Collection } from "./types";
import { unsplash, photo } from "./images";

const img = unsplash;

export const collections: Collection[] = [
  {
    slug: "gold-jewellery",
    name: "Gold Jewellery",
    tagline: "Warmth in twenty-two karats",
    description:
      "Handcrafted 22K and 18K gold jewellery — from everyday bands to statement heritage pieces. Each design is made in-house and hallmarked.",
    image: img(photo.goldPieces, 1200, 1500),
    imageAlt: "Selection of handcrafted gold jewellery from Om Prakash Jewellers",
    featured: true,
    sortOrder: 1,
    category: "pendants",
  },
  {
    slug: "diamond-jewellery",
    name: "Diamond Jewellery",
    tagline: "Light, cut to shine",
    description:
      "Natural, certified diamonds set with intention — solitaires, studs, pendants and pavé. Cut for brilliance and made to be worn daily.",
    image: img(photo.solitaireDark, 1200, 1500),
    imageAlt: "Natural diamond jewellery collection in white gold",
    featured: true,
    sortOrder: 2,
    category: "rings",
  },
  {
    slug: "bridal",
    name: "Bridal",
    tagline: "For the most beautiful day",
    description:
      "Wedding sets, polki collars, chokers and pearls — designed in consultation with our bridal specialists and made over weeks by hand.",
    image: img(photo.darkSet, 1200, 1500),
    imageAlt: "Bridal jewellery set with uncut diamonds and emeralds",
    featured: true,
    sortOrder: 3,
    category: "necklaces",
  },
  {
    slug: "rings",
    name: "Rings",
    tagline: "Signatures of the hand",
    description:
      "Solitaires, stacks, signets and heirloom rings — the pieces we wear daily and the ones we never take off.",
    image: img(photo.heroRing, 1200, 1500),
    imageAlt: "Gold and diamond rings from the rings collection",
    featured: true,
    sortOrder: 4,
    category: "rings",
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    tagline: "Adorn the neckline",
    description:
      "Chains, pendants, strands and collars — from a whisper of gold to a full bridal statement.",
    image: img(photo.necklace2, 1200, 1500),
    imageAlt: "Necklaces from the necklaces collection",
    featured: true,
    sortOrder: 5,
    category: "necklaces",
  },
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Echoes of light",
    description:
      "Studs, drops, jhumkas and chandeliers — balanced by hand so they move beautifully and never pull.",
    image: img(photo.earrings, 1200, 1500),
    imageAlt: "Earrings from the earrings collection",
    featured: true,
    sortOrder: 6,
    category: "earrings",
  },
  {
    slug: "bangles",
    name: "Bangles",
    tagline: "The poetry of the wrist",
    description:
      "Hammered, carved and diamond-set bangles — made rigid or flexible to suit how you live.",
    image: img(photo.bangles, 1200, 1500),
    imageAlt: "Gold bangles from the bangles collection",
    featured: true,
    sortOrder: 7,
    category: "bangles",
  },
  {
    slug: "mens-jewellery",
    name: "Men's Jewellery",
    tagline: "Quiet confidence",
    description:
      "Kadas, signets, chains and cufflinks — substantial, honest pieces in 22K gold with a modern weight.",
    image: img(photo.goldRing2, 1200, 1500),
    imageAlt: "Men's gold jewellery — kadas, signets and chains",
    featured: true,
    sortOrder: 8,
    category: "mens",
  },
  {
    slug: "custom-jewellery",
    name: "Custom Jewellery",
    tagline: "Designed around you",
    description:
      "From a sketch to a finished piece — our design studio works with you on one-of-a-kind commissions. Book a consultation.",
    image: img(photo.flatlay, 1200, 1500),
    imageAlt: "Custom jewellery design process flat lay",
    featured: false,
    sortOrder: 9,
  },
];

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
