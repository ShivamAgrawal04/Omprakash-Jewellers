import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { collections, getCollectionBySlug } from "@/data/collections"
import { getProductsByCollection } from "@/data/products"
import { pageMetadata, collectionLd, jsonLd } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { CollectionCard } from "@/components/collections/collection-card"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) return {}
  return pageMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    images: [collection.image],
  })
}

export default async function CollectionDetailPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params
  const collection = getCollectionBySlug(slug)
  if (!collection) notFound()

  const products = getProductsByCollection(collection.slug)
  const related = collections
    .filter((c) => c.slug !== collection.slug && c.featured)
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([collectionLd(collection)]) }}
      />

      <PageHero
        eyebrow={collection.tagline}
        title={collection.name}
        description={collection.description}
        image={collection.image}
        imageAlt={collection.imageAlt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: collection.name },
        ]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-primary">The Pieces</p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              {products.length > 0
                ? `${products.length} piece${products.length === 1 ? "" : "s"} in this collection`
                : "Currently at the bench"}
            </h2>
          </div>
          <Link href="/jewellery" className="inline-block">
            <Button variant="outline">Browse All Jewellery</Button>
          </Link>
        </div>

        <div className="mt-10">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-sm border border-border bg-pearl px-6 py-20 text-center">
              <p className="font-display text-2xl font-medium">
                This collection is being refreshed.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                New pieces are being finished at the bench. Visit the showroom to
                see the latest, or explore our other collections.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/jewellery">
                  <Button>View All Jewellery</Button>
                </Link>
                <Link href="/custom-jewellery">
                  <Button variant="outline">Commission a Piece</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
          <div className="container-lux py-14 md:py-20">
            <h2 className="font-display text-3xl font-medium tracking-tight">Other collections</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CollectionCard key={c.slug} collection={c} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
