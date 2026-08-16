"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Clock, Gem, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/data/site-config"
import { contactMessage, whatsappLink } from "@/lib/whatsapp"

const exploreLinks = [
  { label: "Jewellery", href: "/jewellery" },
  { label: "Collections", href: "/collections" },
  { label: "Custom work", href: "/custom-jewellery" },
  { label: "Gallery", href: "/gallery" },
]

const shopLinks = [
  { label: "About", href: "/about" },
  { label: "Visit & contact", href: "/contact" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="bg-obsidian text-white">
      <div className="container-lux py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
              <Gem className="size-5 text-gold" aria-hidden />
              <span className="font-display text-2xl font-semibold tracking-wide">
                Omprakash
                <span className="ml-2 font-sans text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-gold">
                  Jewellers
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {siteConfig.tagline}. Gold, silver, custom making, repair and polish in Porsa.
              We do not sell online — visit the shop or WhatsApp.
            </p>
            <a
              href={whatsappLink(contactMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 items-center rounded-md bg-gold px-5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-obsidian transition-colors hover:bg-champagne"
            >
              WhatsApp the shop
            </a>
          </div>

          <FooterLinks title="Explore" links={exploreLinks} />
          <FooterLinks title="Shop" links={shopLinks} />

          <div>
            <h3 className="mb-4 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">
              Visit
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <address className="not-italic leading-relaxed">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}, {siteConfig.address.city}
                </address>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {h.days}
                    <span className="block text-white/50">{h.time}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col items-start justify-between gap-2 py-4 text-[0.7rem] text-white/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Imli Chowk, Porsa · Madhya Pradesh</p>
        </div>
      </div>
    </footer>
  )
}
