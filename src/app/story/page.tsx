import type { Metadata } from "next"
import Link from "next/link"
import { storyChapters } from "@/data/story"
import { pageMetadata } from "@/lib/seo"
import { unsplash, photo } from "@/data/images"
import { PageHero } from "@/components/layout/page-hero"
import { SmartImage } from "@/components/ui/smart-image"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Our Story",
  description:
    "The story of Om Prakash Jewellers — from a single workshop bench in 1978 to a family jewellery house in Jaipur, guided by one belief: gold shaped by hand carries the patience of its maker.",
  path: "/story",
})

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Since 1978, gold with a name behind it"
        description="From a single bench in the old city to the showroom on MG Road — the journey of a family that never stopped working by hand."
        image={unsplash(photo.flatlay, 1920, 1080)}
        imageAlt="The workshop bench where Om Prakash Jewellers began"
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Story" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ol className="space-y-14 md:space-y-20">
            {storyChapters.map((chapter, index) => (
              <Reveal key={chapter.id}>
                <li className="relative grid gap-6 md:grid-cols-[auto_1fr] md:gap-8">
                  <div className="flex md:flex-col md:items-end md:text-right">
                    <span className="font-display text-4xl font-light tracking-tight text-primary md:text-5xl">
                      {chapter.year}
                    </span>
                    <span className="hidden font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:block">
                      Chapter {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <article>
                    <h2 className="font-display text-2xl font-medium tracking-tight">
                      {chapter.heading}
                    </h2>
                    <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                      <SmartImage
                        src={chapter.image}
                        alt={chapter.imageAlt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 space-y-4">
                      {chapter.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className="text-sm leading-relaxed text-muted-foreground md:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              The story continues at the bench
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Visit the showroom, or have us craft something new — the next chapter can be yours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/craftsmanship">
              <Button variant="outline">How We Work</Button>
            </Link>
            <Link href="/visit">
              <Button>Visit the Showroom</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
