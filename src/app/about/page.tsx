import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/data/site-config"
import { values } from "@/data/story"
import { pageMetadata } from "@/lib/seo"
import { unsplash, photo } from "@/data/images"
import { PageHero } from "@/components/layout/page-hero"
import { SmartImage } from "@/components/ui/smart-image"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "About the House",
  description:
    "About Om Prakash Jewellers — a family jewellery house in Jaipur, making handcrafted gold and diamond jewellery since 1978.",
  path: "/about",
})

const pillars = [
  {
    title: "The Workshop",
    body: "Behind the showroom sits the bench — where gold is forged, stones are set and every piece is finished by hand, under one roof.",
    image: unsplash(photo.flatlay, 1200, 900),
    alt: "Jewellery design sketches, gold and tools at the workbench",
  },
  {
    title: "The Showroom",
    body: "A calm, well-lit space on MG Road where pieces are shown openly — weighed, explained and tried on without hurry.",
    image: unsplash(photo.necklace1, 1200, 900),
    alt: "Gold necklaces displayed in the Om Prakash Jewellers showroom",
  },
  {
    title: "The Family",
    body: "Two generations of the Agarwal family run the house. When you visit, you are served by the people whose name is above the door.",
    image: unsplash(photo.goldPieces, 1200, 900),
    alt: "Handcrafted gold jewellery at Om Prakash Jewellers",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the House"
        title="A family workshop with a showroom"
        description={`${siteConfig.name} has been where Jaipur comes for gold it can trust since 1978. This is what sits behind the counter.`}
        image={unsplash(photo.heroRing, 1920, 1080)}
        imageAlt="Diamond ring crafted at Om Prakash Jewellers"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-sm border border-border">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <SmartImage
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-medium">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-14 md:py-20">
          <Reveal>
            <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              The values that hold the shine
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <div className="h-full rounded-sm border border-border bg-background p-6">
                  <span className="font-display text-3xl font-light text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-medium">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150} className="mt-12 flex flex-wrap gap-3">
            <Link href="/story">
              <Button variant="outline">Read Our Story</Button>
            </Link>
            <Link href="/visit">
              <Button>Visit the Showroom</Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
