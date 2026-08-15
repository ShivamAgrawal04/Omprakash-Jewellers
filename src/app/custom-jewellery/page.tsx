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
  title: "Custom Jewellery",
  description:
    "Commission a one-of-a-kind piece at Om Prakash Jewellers — from a sketch, a photograph or an idea, made by hand in our Jaipur workshop.",
  path: "/custom-jewellery",
})

const steps = [
  {
    title: "The consultation",
    body: "Share your idea — a sketch, a photograph, a family piece or a memory. We listen first, and advise on what will suit you and your budget.",
  },
  {
    title: "The design",
    body: "Our designers turn the idea into a working design with gold weight, stone options and a clear, agreed quote — nothing changes after that without you knowing.",
  },
  {
    title: "The making",
    body: "The bench takes over — forging, setting and finishing by hand, with updates at each step. Most pieces take three to six weeks.",
  },
  {
    title: "The handover",
    body: "You collect the finished piece with its hallmark, certification and care guidance — and a standing invitation to return for free care, forever.",
  },
]

export default function CustomJewelleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom Jewellery"
        title="Designed around you"
        description="One-of-a-kind pieces, made by hand in our own workshop — from a sketch, a photograph or an idea you have carried for years."
        image={unsplash(photo.flatlay, 1920, 1080)}
        imageAlt="Sketch, gold and tools at the custom jewellery workbench"
        crumbs={[{ label: "Home", href: "/" }, { label: "Custom Jewellery" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow mb-4 text-primary">How It Works</p>
            <ol className="space-y-6">
              {steps.map((step, index) => (
                <Reveal key={step.title}>
                  <li className="flex gap-5">
                    <span className="font-display text-3xl font-light text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-medium">{step.title}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button>Start a Commission</Button>
              </Link>
              <Link href="/craftsmanship">
                <Button variant="outline">See the Craftsmanship</Button>
              </Link>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              <SmartImage
                src={craftSteps[2].image}
                alt={craftSteps[2].imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="rounded-sm border border-border bg-pearl p-5">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em]">
                Good to know
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Old gold can be applied against your commission.</li>
                <li>Stones sourced from certified, trusted suppliers.</li>
                <li>Most pieces: 3–6 weeks at the bench.</li>
                <li>A deposit holds your slot; the balance on handover.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
