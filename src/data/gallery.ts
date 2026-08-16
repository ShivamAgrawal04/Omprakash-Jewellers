import type { GalleryItem, GallerySection } from "./types";
import { unsplash, photo } from "./images";

const img = unsplash;

export const gallerySections: { slug: GallerySection; name: string; blurb: string }[] = [
  { slug: "bridal", name: "Bridal", blurb: "The wedding-day pieces, photographed in the workshop" },
  { slug: "craftsmanship", name: "Craftsmanship", blurb: "Inside the hands that shape the metal" },
  { slug: "store", name: "Store", blurb: "A look around our shop in Porsa" },
  { slug: "collections", name: "Collections", blurb: "Recent arrivals and signature lines" },
  { slug: "behind-the-scenes", name: "Behind the Scenes", blurb: "From sketch to finished piece" },
  { slug: "events", name: "Events", blurb: "Festival previews and private viewings" },
];

export const galleryItems: GalleryItem[] = [
  { id: "g1", src: img(photo.duoRings, 1200, 1500), alt: "Pair of diamond rings photographed together", section: "bridal", caption: "The bride's and groom's rings", featured: true },
  { id: "g2", src: img(photo.ringBox, 1200, 1500), alt: "Solitaire ring presented in a leather box", section: "collections", caption: "Signature presentation" },
  { id: "g3", src: img(photo.darkSet, 1200, 1500), alt: "Bridal set styled on dark velvet", section: "bridal", caption: "Aditi bridal set" },
  { id: "g4", src: img(photo.darkGlow, 1200, 1500), alt: "Diamond jewellery glowing under workshop light", section: "behind-the-scenes", caption: "At the bench" },
  { id: "g5", src: img(photo.bangles, 1200, 1500), alt: "Gold bangles stacked on the bench", section: "collections", caption: "Hammered bangles" },
  { id: "g6", src: img(photo.flatlay, 1200, 1500), alt: "Design flat lay of sketches, gold and tools", section: "behind-the-scenes", caption: "Sketch to piece" },
  { id: "g7", src: img(photo.goldPieces, 1200, 1500), alt: "Assorted gold jewellery pieces", section: "collections", caption: "Gold room" },
  { id: "g8", src: img(photo.solitaireDark, 1200, 1500), alt: "Solitaire ring on dark stone surface", section: "collections", caption: "Celeste — detail" },
  { id: "g9", src: img(photo.ringMacro, 1200, 1500), alt: "Macro shot of a diamond ring setting", section: "craftsmanship", caption: "Stone setting up close" },
  { id: "g10", src: img(photo.necklace1, 1200, 1500), alt: "Gold necklace displayed on a bust", section: "store", caption: "In the display cases" },
  { id: "g11", src: img(photo.earrings, 1200, 1500), alt: "Diamond studs in a display tray", section: "store", caption: "The stud collection" },
  { id: "g12", src: img(photo.softRing, 1200, 1500), alt: "Ring worn on the hand", section: "behind-the-scenes", caption: "Fitting session" },
  { id: "g13", src: img(photo.bracelet, 1200, 1500), alt: "Gold bracelet detail", section: "craftsmanship", caption: "Chasing detail" },
  { id: "g14", src: img(photo.pieces3, 1200, 1500), alt: "Selection of gold and gemstone jewellery", section: "events", caption: "Festival preview 2025" },
  { id: "g15", src: img(photo.pieces2, 1200, 1500), alt: "Bridal jewellery styled for a viewing", section: "events", caption: "Private bridal viewing" },
  { id: "g16", src: img(photo.diamondMacro, 1200, 1500), alt: "Diamond close-up under magnification", section: "craftsmanship", caption: "Quality inspection" },
  { id: "g17", src: img(photo.necklace2, 1200, 1500), alt: "Pendant necklace on a display bust", section: "store", caption: "Pendant wall" },
  { id: "g18", src: img(photo.goldBand, 1200, 1500), alt: "Simple gold band ring", section: "collections", caption: "The everyday band" },
  { id: "g19", src: img(photo.heroRing, 1200, 1500), alt: "Hero diamond ring on a soft surface", section: "collections", caption: "Campaign still" },
  { id: "g20", src: img(photo.ringStone, 1200, 1500), alt: "Coloured stone ring photographed on stone", section: "craftsmanship", caption: "Stone selection" },
];

export function getGalleryBySection(
  section: GallerySection,
): GalleryItem[] {
  return galleryItems.filter((g) => g.section === section);
}
