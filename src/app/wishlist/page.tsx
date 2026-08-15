import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { WishlistGrid } from "@/components/wishlist/wishlist-grid"

export const metadata: Metadata = pageMetadata({
  title: "Wishlist",
  description: "Your saved jewellery at Om Prakash Jewellers — kept privately on this device.",
  path: "/wishlist",
})

export default function WishlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Saved For Later"
        title="Your Wishlist"
        description="Pieces you've saved while browsing — kept privately on this device, ready when you are."
        crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />
      <section className="container-lux py-10 md:py-16">
        <WishlistGrid />
      </section>
    </>
  )
}
