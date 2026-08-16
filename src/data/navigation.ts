export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export const mainNav: NavLink[] = [
  { label: "Jewellery", href: "/jewellery" },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Gold", href: "/collections/gold-jewellery" },
      { label: "Silver", href: "/collections/silver-jewellery" },
      { label: "Diamond", href: "/collections/diamond-jewellery" },
      { label: "Wedding", href: "/collections/bridal" },
      { label: "Custom work", href: "/custom-jewellery" },
    ],
  },
  { label: "Custom", href: "/custom-jewellery" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/contact" },
];
