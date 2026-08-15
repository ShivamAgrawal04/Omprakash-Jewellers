import type { Metadata } from "next"
import Link from "next/link"
import { getNewArrivals } from "@/data/products"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "New Arrivals",
  description:
    "The latest pieces from the Om Prakash Jewellers bench — new arrivals, freshly made and just landed in the Jaipur showroom.",
  path: "/new-arrivals",
})

export default async function NewArrivalsPage() {
  const products = getNewArrivals(24)

  return (
    <>
      <PageHero
        eyebrow="New Arrivals"
        title="Fresh from the bench"
        description="The newest pieces from the workshop — recently made, recently set and now in the showroom."
        crumbs={[{ label: "Home", href: "/" }, { label: "New Arrivals" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-primary">Latest Drops</p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              The newest {products.length} piece{products.length === 1 ? "" : "s"}
            </h2>
          </div>
          <Link href="/jewellery" className="inline-block">
            <Button variant="outline">View All Jewellery</Button>
          </Link>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  )
}
