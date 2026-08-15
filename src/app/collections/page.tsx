import type { Metadata } from "next"
import { collections } from "@/data/collections"
import { pageMetadata, jsonLd, collectionLd } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { CollectionCard } from "@/components/collections/collection-card"

export const metadata: Metadata = pageMetadata({
  title: "Collections",
  description:
    "Explore our gold, diamond, bridal, rings, necklaces, earrings, bangles and men's jewellery collections — handcrafted in Jaipur.",
  path: "/collections",
})

export default function CollectionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(collections.map(collectionLd)) }}
      />
      <PageHero
        eyebrow="The Collections"
        title="Collections"
        description="Eight signatures, one standard — jewellery designed, sampled and finished in our Jaipur workshop."
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </section>
    </>
  )
}
