import Link from "next/link"
import { Clock, Gem, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/data/site-config"

const exploreLinks = [
  { label: "Collections", href: "/collections" },
  { label: "All Jewellery", href: "/jewellery" },
  { label: "Bridal", href: "/bridal" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Custom Jewellery", href: "/custom-jewellery" },
]

const aboutLinks = [
  { label: "Our Story", href: "/story" },
  { label: "About the House", href: "/about" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Gallery", href: "/gallery" },
  { label: "Jewellery Care", href: "/care" },
]

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "Visit Us", href: "/visit" },
]

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow mb-5 text-muted-foreground">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-primary"
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
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-lux py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-8">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
              <Gem className="size-5 text-gold" aria-hidden />
              <span className="font-display text-xl font-semibold tracking-wide">
                Om Prakash
                <span className="ml-2 text-[0.55rem] font-sans font-semibold uppercase tracking-[0.28em] text-gold">
                  Jewellers
                </span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}. Handcrafted gold, diamond and bridal jewellery —
              made in our Jaipur workshop and sold with honest purity and lasting care.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="About" links={aboutLinks} />
          <FooterColumn title="Policies" links={policyLinks} />

          <div className="lg:col-start-4 lg:row-start-1">
            <h3 className="eyebrow mb-5 text-muted-foreground">Visit</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <address className="not-italic">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}
                </address>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-3 transition-colors hover:text-primary">
                  <Phone className="size-4 shrink-0 text-gold" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 transition-colors hover:text-primary">
                  <Mail className="size-4 shrink-0 text-gold" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              {siteConfig.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                  <span>
                    {h.days}: {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline mt-14" />
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <Gem className="size-3 text-gold" aria-hidden />
            Crafted in Jaipur, India
          </p>
        </div>
      </div>
    </footer>
  )
}
