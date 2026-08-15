import type { Metadata } from "next"
import { Suspense } from "react"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { SearchExperience } from "@/components/search/search-experience"

export const metadata: Metadata = pageMetadata({
  title: "Search",
  description:
    "Search the Om Prakash Jewellers collection by name, category, collection, metal, stone or product code.",
  path: "/search",
})

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Find your piece"
        description="Search by name, category, collection, metal, stone or product code."
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <section className="container-lux py-10 md:py-16">
        <Suspense fallback={null}>
          <SearchExperience />
        </Suspense>
      </section>
    </>
  )
}
