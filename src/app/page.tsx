import Link from "next/link"
import {
  ArrowRight,
  Clock,
  Gem,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"
import { featuredCollections } from "@/data/collections"
import { getFeaturedProducts, getNewArrivals } from "@/data/products"
import { craftSteps } from "@/data/craftsmanship"
import { photo, unsplash } from "@/data/images"
import { SmartImage } from "@/components/ui/smart-image"
import { CollectionCard } from "@/components/collections/collection-card"
import { ProductGrid } from "@/components/products/product-grid"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { jsonLd, organizationLd, websiteLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Om Prakash Jewellers — Timeless Gold & Diamond Jewellery",
  description:
    "Handcrafted gold, diamond and bridal jewellery in Jaipur. Explore rings, necklaces, earrings, bangles and custom pieces — crafted to be remembered.",
};

const trustPoints = [
  { icon: ShieldCheck, label: "Hallmarked Gold" },
  { icon: Sparkles, label: "Certified Diamonds" },
  { icon: Gem, label: "Made by Hand" },
  { icon: Clock, label: "Care for Life" },
];

export default function HomePage() {
  const collections = featuredCollections.slice(0, 5)
  const [largeCollection, ...smallCollections] = collections
  const featured = getFeaturedProducts(4)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([organizationLd(), websiteLd()]) }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[92dvh] items-end overflow-hidden bg-obsidian sm:min-h-screen">
        <div className="absolute inset-0" aria-hidden>
          <SmartImage
            src={unsplash(photo.heroRing, 1920, 2400)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-zoom-slow opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/30 to-obsidian/25" />
        </div>

        <div className="container-lux relative pb-16 pt-40 sm:pb-24 md:pb-28">
          <p className="eyebrow animate-fade-up flex items-center gap-3 text-champagne">
            <span className="h-px w-10 bg-champagne/70" aria-hidden />
            {siteConfig.tagline.toUpperCase()}
          </p>
          <h1 className="mt-6 max-w-4xl animate-fade-up font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance text-white [animation-delay:120ms] sm:text-6xl lg:text-7xl xl:text-8xl">
            Timeless jewellery, crafted for life&rsquo;s most beautiful moments.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:240ms] sm:text-lg">
            Gold, diamond and bridal jewellery made by hand in our Jaipur
            workshop — hallmarked, certified and made to be remembered.
          </p>
          <div className="mt-10 flex flex-col gap-3 animate-fade-up [animation-delay:360ms] sm:flex-row sm:items-center">
            <Link href="/jewellery">
              <Button size="lg" className="w-full bg-champagne text-obsidian hover:bg-champagne/90 sm:w-auto">
                Explore Collection
              </Button>
            </Link>
            <Link href="/visit">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-white/40 text-white hover:border-champagne hover:text-champagne sm:w-auto"
              >
                Visit Our Store
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden items-center gap-2 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 md:flex" aria-hidden>
          Est. 1978 · Jaipur
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-background" aria-label="Our assurances">
        <div className="container-lux grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-10">
          {trustPoints.map((point, index) => (
            <Reveal
              key={point.label}
              delay={index * 80}
              className="flex items-center justify-center gap-2.5 text-center"
            >
              <point.icon className="size-4 shrink-0 text-gold" aria-hidden />
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {point.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured collections */}
      <section className="container-lux py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The Collections"
            title="Curated by hand, made to be worn"
            description="From everyday gold to once-in-a-lifetime bridal sets — each collection is designed and finished in our workshop."
          />
          <Reveal delay={120}>
            <Link
              href="/collections"
              className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              View all collections
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {largeCollection ? (
            <Reveal className="lg:row-span-2 lg:h-full">
              <div className="h-full">
                <CollectionCard collection={largeCollection} large />
              </div>
            </Reveal>
          ) : null}
          {smallCollections.map((collection, index) => (
            <Reveal key={collection.slug} delay={index * 90}>
              <CollectionCard collection={collection} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured jewellery */}
      <section className="bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Featured Pieces"
              title="Signature jewellery"
              description="A selection of the pieces our clients return for — photographed exactly as they leave the bench."
            />
            <Reveal delay={120}>
              <Link
                href="/jewellery"
                className="group inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary"
              >
                Browse all jewellery
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="container-lux grid items-center gap-10 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
            <SmartImage
              src={unsplash(photo.flatlay, 1200, 1200)}
              alt="Jewellery design sketches and gold on the workbench"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Our Story"
            title="Four generations, one bench"
            description="Om Prakash Jewellers began in 1978 in a single room of Jaipur's old city. Today our workshop still shapes, sets and polishes every piece by hand — because a piece that is made slowly is a piece that lasts."
          />
          <Reveal delay={100}>
            <div className="flex flex-col gap-3 border-l-2 border-primary/40 pl-5">
              <p className="font-display text-xl italic text-foreground/90">
                &ldquo;Gold remembers the hands that shaped it. We want it to remember
                ours as kind ones.&rdquo;
              </p>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                — The Agarwal Family, Founders
              </p>
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-wrap gap-3">
              <Link href="/story">
                <Button variant="outline">Read Our Story</Button>
              </Link>
              <Link href="/craftsmanship">
                <Button variant="ghost">
                  How pieces are made
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craftsmanship teaser */}
      <section className="border-y border-border bg-background">
        <div className="container-lux py-20 md:py-28">
          <SectionHeading
            align="center"
            eyebrow="Craftsmanship"
            title="From a sketch to a finished piece"
            description="Seven deliberate steps, each done at the bench — never rushed, always inspected."
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-3">
            {craftSteps.slice(0, 3).map((step, index) => (
              <Reveal key={step.id} delay={index * 100} as="li">
                <div className="flex flex-col gap-4">
                  <span className="flex size-11 items-center justify-center rounded-full border border-primary/40 font-display text-lg text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={200} className="mt-12 text-center">
            <Link href="/craftsmanship">
              <Button variant="outline">
                See the full process
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Bridal banner */}
      <section className="relative overflow-hidden bg-obsidian">
        <div className="absolute inset-0" aria-hidden>
          <SmartImage
            src={unsplash(photo.darkSet, 1920, 1200)}
            alt=""
            fill
            sizes="100vw"
            className="opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/55 to-obsidian/30" />
        </div>
        <div className="container-lux relative py-24 md:py-36">
          <div className="max-w-xl">
            <p className="eyebrow mb-4 text-champagne">The Bridal Atelier</p>
            <h2 className="font-display text-4xl font-medium leading-tight tracking-tight text-balance text-white sm:text-5xl">
              Jewellery for the most important day of your life
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              Book a private bridal consultation. Our specialists will guide you
              through sets, stones and styling — with plenty of time to try every piece.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/bridal">
                <Button size="lg" className="w-full bg-champagne text-obsidian hover:bg-champagne/90 sm:w-auto">
                  Explore Bridal
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/40 text-white hover:border-champagne hover:text-champagne sm:w-auto"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals strip */}
      <section className="container-lux py-20 md:py-28">
        <SectionHeading
          eyebrow="Just Arrived"
          title="New pieces from the bench"
          description="The latest designs to leave our workshop, in limited numbers."
        />
        <div className="mt-12">
          <ProductGrid products={getNewArrivals(4)} />
        </div>
      </section>

      {/* Visit CTA */}
      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <SectionHeading
                eyebrow="Visit Us"
                title="Come see the pieces in person"
                description={`Our showroom is open six days a week in ${siteConfig.address.city}. Try pieces, talk stones with our specialists, and take your time.`}
              />
              <Reveal delay={120}>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                    <span>
                      {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
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
                  <Link href="/visit">
                    <Button>Get Directions</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline">Book a Visit</Button>
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <SmartImage
                  src={unsplash(photo.necklace1, 1200, 1200)}
                  alt="Inside the Om Prakash Jewellers showroom"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
