import type { Metadata } from "next"
import { applyFilters, sortProducts, activeProducts } from "@/lib/catalogue"
import {
  parseSearchParams,
  normalizeSort,
  hasActiveFilters,
} from "@/lib/filter-url"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { FilterPanel } from "@/components/products/filter-panel"
import { MobileFilterSheet } from "@/components/products/mobile-filter-sheet"
import { SortSelect } from "@/components/products/sort-select"
import { FilterChips } from "@/components/products/filter-chips"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = pageMetadata({
  title: "All Jewellery",
  description:
    "Browse the full Om Prakash Jewellers collection — gold, diamond, bridal and men's jewellery, handcrafted and hallmarked in Jaipur.",
  path: "/jewellery",
})

export default async function JewelleryPage({
  searchParams,
}: PageProps<"/jewellery">) {
  const params = await searchParams
  const urlParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string") urlParams.set(key, value)
  }

  const filters = parseSearchParams(urlParams)
  const sort = normalizeSort(filters.sort)
  const filtered = applyFilters(activeProducts, filters)
  const results = sortProducts(filtered, sort)

  return (
    <>
      <PageHero
        eyebrow="The Catalogue"
        title="All Jewellery"
        description="Every piece currently at the bench and in the showroom — hallmarked, certified and made by hand."
        crumbs={[{ label: "Home", href: "/" }, { label: "Jewellery" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <FilterPanel current={filters} pathname="/jewellery" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <MobileFilterSheet current={filters} resultCount={results.length} />
                </div>
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground" role="status">
                  {results.length} piece{results.length === 1 ? "" : "s"}
                </p>
              </div>
              <SortSelect
                sort={sort}
                pathname="/jewellery"
                currentQuery={urlParams.toString()}
              />
            </div>

            {hasActiveFilters(filters) ? (
              <div className="mt-5">
                <FilterChips current={filters} pathname="/jewellery" />
              </div>
            ) : null}

            <div className="mt-8">
              {results.length > 0 ? (
                <ProductGrid products={results} />
              ) : (
                <div className="rounded-sm border border-border bg-pearl px-6 py-20 text-center">
                  <p className="font-display text-2xl font-medium">No pieces match those filters.</p>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Try removing a filter, or visit the showroom — some pieces
                    never make it to the website.
                  </p>
                  <Link href="/jewellery" className="mt-6 inline-block">
                    <Button variant="outline">Clear Filters</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
