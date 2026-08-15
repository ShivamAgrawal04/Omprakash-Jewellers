import { unsplash, photo } from "./images";

const img = unsplash;

export interface StoryChapter {
  id: string;
  heading: string;
  year: string;
  body: string[];
  image: string;
  imageAlt: string;
}

export const storyChapters: StoryChapter[] = [
  {
    id: "the-beginning",
    heading: "The Beginning",
    year: "1978",
    body: [
      "Om Prakash Jewellers began in a single room in the old city of Jaipur, where our founder, Shri Om Prakash Agarwal, set up a small goldsmith's bench with a lamp, a set of hammers and a deep respect for honest work.",
      "He believed a piece of jewellery should outlive its maker — that gold, shaped by hand, carries the patience of the person who made it. That belief has never left the workshop.",
    ],
    image: img(photo.flatlay, 1200, 900),
    imageAlt: "Old workshop tools and sketches of Om Prakash Jewellers",
  },
  {
    id: "our-philosophy",
    heading: "Our Philosophy",
    year: "1995",
    body: [
      "We have never chased the largest showroom or the loudest campaign. We chase something quieter: jewellery that is right in every detail — the weight of a bangle, the seat of a stone, the way a clasp opens and closes a thousand times.",
      "Our philosophy is simple. Design with restraint. Make with patience. Price with honesty. And hand every piece over as if we were giving it to our own family.",
    ],
    image: img(photo.goldPieces, 1200, 900),
    imageAlt: "Handcrafted gold jewellery from Om Prakash Jewellers",
  },
  {
    id: "craftsmanship",
    heading: "Craftsmanship",
    year: "2004",
    body: [
      "Every piece passes through the hands of our karigars — goldsmiths trained in techniques that stretch back generations. From hand-forged kadas to pavé settings done under magnification, nothing is rushed.",
      "We still cut, chase and polish at the bench. When you hold an Om Prakash piece, you are holding the accumulated skill of forty years and forty hands.",
    ],
    image: img(photo.ringMacro, 1200, 900),
    imageAlt: "Close-up of diamond setting craftsmanship",
  },
  {
    id: "our-artisans",
    heading: "Our Artisans",
    year: "2012",
    body: [
      "Behind every piece is a named artisan — a setter, a chaser, a polisher — whose hands have shaped thousands of stones and feet of gold. Many of them have been with us for over two decades.",
      "We believe craft survives through the people who carry it. Our bench is a place of apprenticeships, where the next generation learns from the last.",
    ],
    image: img(photo.darkGlow, 1200, 900),
    imageAlt: "Artisan at work on a diamond piece in the workshop",
  },
  {
    id: "quality-and-purity",
    heading: "Quality & Purity",
    year: "Today",
    body: [
      "Every piece of gold we sell is hallmarked and independently verified. Diamonds are certified by independent laboratories and chosen for cut, clarity, colour and carat — in that order of importance.",
      "We show you exactly what you are buying: the karat, the weight, the stone. On request, our specialists will walk you through the certification of any diamond you hold.",
    ],
    image: img(photo.solitaireDark, 1200, 900),
    imageAlt: "Certified diamond ring photographed in the showroom",
  },
];

export interface Value {
  title: string;
  body: string;
}

export const values: Value[] = [
  {
    title: "Honesty in every karat",
    body: "Hallmarked gold, certified diamonds, transparent pricing — always documented and always explained.",
  },
  {
    title: "Made by hand",
    body: "Our karigars shape, set and finish every piece at the bench. No shortcuts, no compromise on the seat of a stone.",
  },
  {
    title: "Made to last",
    body: "We build heirlooms. Every piece returns to our workshop for care, cleaning and repair — for as long as you own it.",
  },
  {
    title: "A local home",
    body: "We are a Jaipur family business. When you visit, you will meet the family, not a sales floor.",
  },
];
