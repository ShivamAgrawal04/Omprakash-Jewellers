import type { Metadata } from "next"
import Link from "next/link"
import { getCollectionBySlug } from "@/data/collections"
import { getProductsByCollection } from "@/data/products"
import { pageMetadata } from "@/lib/seo"
import { whatsappLink, visitMessage } from "@/lib/whatsapp"
import { PageHero } from "@/components/layout/page-hero"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Bridal Jewellery",
  description:
    "Bridal jewellery at Om Prakash Jewellers — wedding sets, polki collars, chokers and pearls, designed in consultation with our bridal specialists.",
  path: "/bridal",
})

export default async function BridalPage() {
  const collection = getCollectionBySlug("bridal")
  const products = getProductsByCollection("bridal")

  return (
    <>
      <PageHero
        eyebrow="Bridal"
        title="For the most beautiful day"
        description="Wedding sets designed in consultation with our bridal specialists — made over weeks, by hand, to be worn for a lifetime."
        image={collection?.image}
        imageAlt={collection?.imageAlt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Bridal" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-primary">The Bridal Edit</p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {products.length} piece{products.length === 1 ? "" : "s"} for the wedding
            </h2>
          </div>
          <Link href="/contact" className="inline-block">
            <Button variant="outline">Speak to a Bridal Specialist</Button>
          </Link>
        </div>

        <div className="mt-10">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-sm border border-border bg-pearl px-6 py-20 text-center">
              <p className="font-display text-2xl font-medium">The bridal suite is being prepared.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Wedding pieces are made to order. Share your date and jewellery wishes, and our
                bridal specialist will curate pieces for your ceremony.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/jewellery">
                  <Button>Browse All Jewellery</Button>
                </Link>
                <a
                  href={whatsappLink(visitMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">WhatsApp the Specialist</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-14 md:py-20">
          <h2 className="font-display text-3xl font-medium tracking-tight">Planning the set?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Start early",
                body: "Wedding sets take three to six weeks. Begin four to six months ahead for a design that is truly yours.",
              },
              {
                title: "Bring your reference",
                body: "A photograph, a sketch or a family piece — we will translate it into a design that suits your gold budget and skin tone.",
              },
              {
                title: "Old gold welcome",
                body: "Bring old gold and it is weighed at the counter, valued at live rates and adjusted against your wedding set.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border bg-background p-6">
                <h3 className="font-display text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
