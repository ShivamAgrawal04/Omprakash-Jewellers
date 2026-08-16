import type { Metadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/data/site-config"
import { values } from "@/data/story"
import { craftSteps } from "@/data/craftsmanship"
import { pageMetadata } from "@/lib/seo"
import { unsplash, photo } from "@/data/images"
import { PageHero } from "@/components/layout/page-hero"
import { SmartImage } from "@/components/ui/smart-image"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "About the shop",
  description:
    "Omprakash Jewellers is a single jewellery shop at Imli Chowk, Porsa — gold, silver, custom making, repair and polish.",
  path: "/about",
})

const pillars = [
  {
    title: "The counter",
    body: "A neighbourhood shop. You can try pieces, check weight, and hear making charges without rush.",
    image: unsplash(photo.necklace1, 1200, 900),
    alt: "Jewellery at the Omprakash Jewellers counter",
  },
  {
    title: "The bench",
    body: "We make, resize, repair and polish. Bring a photo, an old piece, or an idea — gold, silver and more.",
    image: unsplash(photo.flatlay, 1200, 900),
    alt: "Jewellery work on the bench",
  },
  {
    title: "Porsa",
    body: "Find us at Imli Chowk, Keshav Pasari ke saamne. Walk in, or WhatsApp before you visit.",
    image: unsplash(photo.goldPieces, 1200, 900),
    alt: "Gold jewellery from the shop",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={siteConfig.aboutTitle}
        description={siteConfig.aboutBody}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90}>
              <article className="overflow-hidden rounded-sm border border-border">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <SmartImage
                    src={pillar.image}
                    alt={pillar.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
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

      <section className="border-y border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-14 md:py-20">
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
            How work is done
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {craftSteps.slice(0, 6).map((step, index) => (
              <Reveal key={step.id} delay={index * 60} as="li">
                <span className="font-display text-2xl font-light text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-lux py-14 md:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
          How we work with you
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 80}>
              <div className="h-full rounded-sm border border-border p-6">
                <h3 className="font-display text-lg font-medium">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/contact">
            <Button>Visit or WhatsApp</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
