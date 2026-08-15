import type { Metadata } from "next"
import { galleryItems } from "@/data/gallery"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { GallerySectionFilter } from "@/components/gallery/gallery-section-filter"

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Inside Om Prakash Jewellers — bridal pieces, craftsmanship at the bench and the Jaipur showroom, in our own photographs.",
  path: "/gallery",
})

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside the house"
        description="Bridal pieces, the bench and the showroom — photographed the way the work actually happens."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="container-lux py-10 md:py-16">
        <GallerySectionFilter items={galleryItems} />
      </section>
    </>
  )
}
