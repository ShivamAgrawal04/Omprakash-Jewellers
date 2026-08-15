import type { Metadata } from "next"
import Link from "next/link"
import { craftSteps } from "@/data/craftsmanship"
import { pageMetadata } from "@/lib/seo"
import { unsplash, photo } from "@/data/images"
import { PageHero } from "@/components/layout/page-hero"
import { SmartImage } from "@/components/ui/smart-image"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Craftsmanship",
  description:
    "How jewellery is made at Om Prakash Jewellers — seven steps from sketch to finished piece, all under one roof with hands that have shaped gold for generations.",
  path: "/craftsmanship",
})

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Craftsmanship"
        title="Seven steps from sketch to heirloom"
        description="Design, material, craft, setting, polish, inspection, finish — each step done in the same building, by hands trained across generations."
        image={unsplash(photo.ringMacro, 1920, 1080)}
        imageAlt="Close-up of a diamond being set under magnification"
        crumbs={[{ label: "Home", href: "/" }, { label: "Craftsmanship" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <ol className="space-y-8">
          {craftSteps.map((step, index) => {
            const flipped = index % 2 === 1
            return (
              <Reveal key={step.id}>
                <li
                  className={`grid items-center gap-6 lg:grid-cols-2 lg:gap-12 ${
                    flipped ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted lg:[direction:ltr]">
                    <SmartImage
                      src={step.image}
                      alt={step.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="transition-transform duration-700 ease-out hover:scale-[1.03]"
                    />
                  </div>
                  <div className="lg:[direction:ltr]">
                    <p className="eyebrow mb-3 text-primary">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            )
          })}
        </ol>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Have something in mind?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              The same bench can make something entirely yours. Bring an idea, a sketch or an old
              design — we will shape it with you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/custom-jewellery">
              <Button>Commission a Piece</Button>
            </Link>
            <Link href="/jewellery">
              <Button variant="outline">Browse the Collection</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
