import type { Metadata } from "next"
import Link from "next/link"
import { careTips } from "@/data/craftsmanship"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Jewellery Care",
  description:
    "How to care for your jewellery — everyday wear, cleaning at home, storage and the complimentary care we offer on every Om Prakash Jewellers piece.",
  path: "/care",
})

export default function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Care & Repairs"
        title="Gold is made to be worn — and cared for"
        description="A few simple habits keep your pieces bright for decades, and our workshop is always here when you need it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Jewellery Care" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careTips.map((tip, index) => (
            <div key={tip.title} className="rounded-sm border border-border p-6">
              <p className="eyebrow mb-3 text-primary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-lg font-medium">{tip.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Need a repair or refresh?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Complimentary cleaning and inspection on every Om Prakash piece — and repairs, resizing
              and stone work done at the bench, priced before we begin.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-block">
                <Button>Ask About a Repair</Button>
              </Link>
              <Link href="/visit" className="inline-block">
                <Button variant="outline">Visit the Showroom</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
