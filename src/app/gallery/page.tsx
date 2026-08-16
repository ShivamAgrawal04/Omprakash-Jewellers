import type { Metadata } from "next"
import { galleryItems } from "@/data/gallery"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { GallerySectionFilter } from "@/components/gallery/gallery-section-filter"

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photos from Omprakash Jewellers in Porsa — jewellery, making and the shop.",
  path: "/gallery",
})

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="From the shop"
        description="Jewellery, making and the counter in Porsa."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="container-lux py-10 md:py-16">
        <GallerySectionFilter items={galleryItems} />
      </section>
    </>
  )
}
