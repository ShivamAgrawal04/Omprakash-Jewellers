import { unsplash, photo } from "./images";

const img = unsplash;

export interface CraftStep {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const craftSteps: CraftStep[] = [
  {
    id: "design",
    title: "Design",
    description:
      "Every piece begins as a drawing. Our designers sketch by hand and refine in detail — considering not just how a piece looks, but how it will sit, swing and wear for years.",
    image: img(photo.flatlay, 1200, 900),
    imageAlt: "Hand-drawn jewellery sketches and gold",
  },
  {
    id: "material-selection",
    title: "Material Selection",
    description:
      "Gold is sourced in hallmarked bars and weighed in front of you. Diamonds are selected stone by stone for cut, colour and clarity; coloured gems for colour, life and clarity.",
    image: img(photo.goldPieces, 1200, 900),
    imageAlt: "Selection of gold bars and gemstones",
  },
  {
    id: "crafting",
    title: "Crafting",
    description:
      "The metal is forged, sawn, shaped and chased at the bench. Kadas are hammered around a steel mandrel; chains are built link by link. Nothing is cast where hand work is better.",
    image: img(photo.bangles, 1200, 900),
    imageAlt: "Goldsmith forging a bangle at the bench",
  },
  {
    id: "stone-setting",
    title: "Stone Setting",
    description:
      "Stones are set under magnification — pavé work, claw settings and channel work done with hands that have set thousands of diamonds. Each stone is checked for a firm, level seat.",
    image: img(photo.ringMacro, 1200, 900),
    imageAlt: "Diamond set into a ring under magnification",
  },
  {
    id: "polishing",
    title: "Polishing",
    description:
      "A final polish reveals the metal's true colour. Brushed and satin finishes are applied by hand, and each piece is cleaned and brightened before it moves to inspection.",
    image: img(photo.heroRing, 1200, 900),
    imageAlt: "Polished gold ring with a soft finish",
  },
  {
    id: "quality-inspection",
    title: "Quality Inspection",
    description:
      "Every piece is checked by a senior craftsman — stone tension, clasp action, weight, hallmarks and finish. Diamonds are verified against their certificates before leaving the workshop.",
    image: img(photo.diamondMacro, 1200, 900),
    imageAlt: "Diamond being inspected under a loupe",
  },
  {
    id: "final-piece",
    title: "Final Piece",
    description:
      "The finished piece is cleaned one last time, gift-boxed and handed over with its certificate, hallmark card and care guidance — a piece to be worn, treasured and returned to us for care whenever needed.",
    image: img(photo.ringBox, 1200, 900),
    imageAlt: "Finished diamond ring in its presentation box",
  },
];

export interface CareTip {
  title: string;
  body: string;
}

export const careTips: CareTip[] = [
  {
    title: "Everyday wear",
    body: "Put jewellery on last and take it off first. Avoid contact with perfume, lotion, hairspray and chlorine — they dull gold and cloud stones over time.",
  },
  {
    title: "Cleaning at home",
    body: "Soak in lukewarm water with a drop of mild soap for a few minutes, brush gently with a soft baby toothbrush, rinse and pat dry with a lint-free cloth.",
  },
  {
    title: "Storage",
    body: "Keep pieces separate in soft pouches or a lined box to avoid scratching. Pearls and uncut stones prefer a breathable cloth wrap over an airtight box.",
  },
  {
    title: "Diamonds & hard stones",
    body: "Diamonds scratch other jewellery — store them apart. Check prongs and settings once a year, especially on rings worn daily.",
  },
  {
    title: "Our care promise",
    body: "Bring any Om Prakash piece to our showroom for complimentary cleaning, inspection and tightening. Clasp and prong repairs are free for the first year.",
  },
  {
    title: "Insurance valuation",
    body: "Ask our team for a written valuation certificate with current gold and stone prices — useful for insurance and updated with every market change.",
  },
];
