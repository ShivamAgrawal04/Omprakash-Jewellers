import type { Metadata } from "next"
import { collections } from "@/data/collections"
import { pageMetadata, jsonLd, collectionLd } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { CollectionCard } from "@/components/collections/collection-card"

export const metadata: Metadata = pageMetadata({
  title: "Collections",
  description:
    "Gold, silver, wedding, custom and everyday jewellery from our shop in Porsa.",
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
        description="What we keep and what we make — gold, silver, wedding sets and custom work."
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
