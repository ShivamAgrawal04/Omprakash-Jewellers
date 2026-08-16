import Link from "next/link"
import {
  ArrowRight,
  Clock,
  Gem,
  Hammer,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"
import { featuredCollections } from "@/data/collections"
import { getFeaturedProducts } from "@/data/products"
import { photo, unsplash } from "@/data/images"
import { SmartImage } from "@/components/ui/smart-image"
import { CollectionCard } from "@/components/collections/collection-card"
import { ProductGrid } from "@/components/products/product-grid"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { jsonLd, organizationLd, websiteLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Omprakash Jewellers — Gold, silver & custom work in Porsa",
  description:
    "Single jewellery shop at Imli Chowk, Porsa. Gold, silver, stones, custom making, repair and polish. Visit or WhatsApp — we do not sell online.",
};

const trustPoints = [
  { icon: ShieldCheck, label: "Hallmarked Gold" },
  { icon: Sparkles, label: "Silver & Stones" },
  { icon: Hammer, label: "Making & Repair" },
  { icon: Gem, label: "Custom Work" },
];

export default function HomePage() {
  const collections = featuredCollections.slice(0, 4)
  const featured = getFeaturedProducts(4)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([organizationLd(), websiteLd()]) }}
      />

      <section className="relative flex min-h-svh items-end overflow-hidden bg-obsidian">
        <div className="absolute inset-0" aria-hidden>
          <SmartImage
            src={siteConfig.heroImage || unsplash(photo.heroRing, 1920, 2400)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-zoom-slow opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-obsidian/25" />
        </div>

        <div className="container-lux relative pb-16 pt-36 sm:pb-24 md:pb-28">
          <p className="eyebrow animate-fade-up flex items-center gap-3 text-champagne">
            <span className="h-px w-10 bg-champagne/70" aria-hidden />
            {siteConfig.tagline.toUpperCase()}
          </p>
          <h1 className="mt-6 max-w-4xl animate-fade-up font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance text-white [animation-delay:120ms] sm:text-6xl lg:text-7xl">
            {siteConfig.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:240ms] sm:text-lg">
            {siteConfig.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 animate-fade-up [animation-delay:360ms] sm:flex-row sm:items-center">
            <Link href="/jewellery">
              <Button size="lg" className="w-full bg-champagne text-obsidian hover:bg-champagne/90 sm:w-auto">
                See the catalogue
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/40 text-white hover:border-champagne hover:text-champagne sm:w-auto"
              >
                Visit the shop
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden items-center gap-2 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 md:flex" aria-hidden>
          Imli Chowk · Porsa
        </div>
      </section>

      <section className="border-b border-border bg-background" aria-label="Our work">
        <div className="container-lux grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-10">
          {trustPoints.map((point, index) => (
            <Reveal
              key={point.label}
              delay={index * 80}
              className="flex items-center justify-center gap-2.5 px-2 text-center"
            >
              <point.icon className="size-4 shrink-0 text-gold" aria-hidden />
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {point.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-lux py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Collections"
            title="Gold, silver, wedding and more"
            description="Browse what we keep in the shop — and ask for making, sizing, polish or repair if you do not see it listed."
          />
          <Reveal delay={120}>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              All collections
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {collections.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 80}>
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="In the shop"
              title="Pieces you can enquire about"
              description="Prices shown are a guide. Final weight, making and stone rates are confirmed at the counter or on WhatsApp."
            />
            <Reveal delay={120}>
              <Link
                href="/jewellery"
                className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary"
              >
                Full catalogue
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <section className="container-lux grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted sm:aspect-square">
            <SmartImage
              src={unsplash(photo.flatlay, 1200, 1200)}
              alt="Jewellery work on the bench"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="The shop"
            title={siteConfig.aboutTitle}
            description={siteConfig.aboutBody}
          />
          <Reveal delay={100}>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>New gold and silver jewellery</li>
              <li>Custom making from a photo, sketch or old piece</li>
              <li>Repair, resize, polish and old-gold exchange</li>
              <li>Wedding sets and daily wear</li>
            </ul>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-3">
              <Link href="/about">
                <Button variant="outline">About the shop</Button>
              </Link>
              <Link href="/custom-jewellery">
                <Button variant="ghost">
                  Custom work
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Visit"
                title="Come to Imli Chowk"
                description="See the piece, check the weight, and talk making charges in person. Walk-ins are welcome."
              />
              <Reveal delay={120}>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <span>
                      {siteConfig.name}, {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                      {siteConfig.address.city}
                    </span>
                  </li>
                  {siteConfig.hours.map((h) => (
                    <li key={h.days} className="flex items-start gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                      <span>
                        <strong className="font-semibold text-foreground">{h.days}:</strong>{" "}
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3">
                  <a href={siteConfig.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Button>Get directions</Button>
                  </a>
                  <Link href="/contact">
                    <Button variant="outline">WhatsApp / call</Button>
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-sm border border-border">
                <iframe
                  src={siteConfig.mapEmbed}
                  title={`Map to ${siteConfig.name}, Porsa`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[280px] w-full border-0 sm:h-[340px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
