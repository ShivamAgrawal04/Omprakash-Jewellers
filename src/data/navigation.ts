export interface NavChild {
  label: string
  href: string
  description?: string
}

export interface NavLink {
  label: string
  href: string
  children?: NavChild[]
}

export const mainNav: NavLink[] = [
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Gold Jewellery", href: "/collections/gold-jewellery" },
      { label: "Diamond Jewellery", href: "/collections/diamond-jewellery" },
      { label: "Bridal", href: "/collections/bridal" },
      { label: "Rings", href: "/collections/rings" },
      { label: "Necklaces", href: "/collections/necklaces" },
      { label: "Earrings", href: "/collections/earrings" },
      { label: "Bangles", href: "/collections/bangles" },
      { label: "Men's Jewellery", href: "/collections/mens-jewellery" },
      { label: "Custom Jewellery", href: "/custom-jewellery" },
    ],
  },
  {
    label: "Jewellery",
    href: "/jewellery",
    children: [
      { label: "All Jewellery", href: "/jewellery" },
      { label: "Gold", href: "/jewellery?metal=22K+Yellow+Gold" },
      { label: "Diamond", href: "/jewellery?stone=Natural+Diamond" },
      { label: "Platinum", href: "/jewellery?metal=Platinum" },
      { label: "Men's", href: "/jewellery?gender=men" },
      { label: "New Arrivals", href: "/new-arrivals" },
    ],
  },
  {
    label: "Bridal",
    href: "/bridal",
    children: [
      { label: "Bridal Collection", href: "/bridal" },
      { label: "Wedding Sets", href: "/collections/bridal" },
      { label: "Custom Bridal", href: "/custom-jewellery" },
    ],
  },
  { label: "New Arrivals", href: "/new-arrivals" },
  {
    label: "Our Story",
    href: "/story",
    children: [
      { label: "Our Story", href: "/story" },
      { label: "About the House", href: "/about" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Visit Us", href: "/visit" },
]
