"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Search, SearchX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SmartImage } from "@/components/ui/smart-image"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatINR } from "@/lib/format"
import { categoryMap } from "@/data/collections"

interface SearchProduct {
  slug: string
  name: string
  sku: string
  category: string
  metal: string
  price?: number | null
  priceVisibility: string
  image: string | null
}

interface SearchCollection {
  name: string
  slug: string
  image: string
}

interface SearchResponse {
  products: SearchProduct[]
  collections: SearchCollection[]
}

const QUERY_KEY = "q"

export function SearchExperience() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get(QUERY_KEY) ?? ""
  const [query, setQuery] = useState(initialQuery)
  const [response, setResponse] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResponse(null)
      setLoading(false)
      setError(false)
      return
    }

    setLoading(true)
    setError(false)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        if (requestId !== requestIdRef.current) return
        if (!res.ok) throw new Error("search failed")
        const data = (await res.json()) as SearchResponse
        setResponse(data)
      } catch {
        if (requestId === requestIdRef.current) setError(true)
      } finally {
        if (requestId === requestIdRef.current) setLoading(false)
      }
    }, 300)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query])

  const q = query.trim()
  const resultsCount = response
    ? response.products.length + response.collections.length
    : 0
  const isEmpty = !loading && !error && response !== null && resultsCount === 0

  return (
    <div>
      <div className="relative mx-auto max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search rings, necklaces, diamond, 22K gold…"
          aria-label="Search jewellery"
          className="h-14 pl-12 pr-4 text-base"
          autoFocus
        />
      </div>

      <div className="mt-10" aria-live="polite">
        {q === "" ? (
          <div className="rounded-sm border border-border bg-pearl px-6 py-16 text-center">
            <Search className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <p className="mt-4 max-w-md font-display text-xl font-medium text-balance">
              Search by name, category, collection, metal, stone or product code.
            </p>
          </div>
        ) : null}

        {q !== "" && loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        ) : null}

        {q !== "" && !loading && error ? (
          <div className="rounded-sm border border-border bg-pearl px-6 py-16 text-center">
            <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <p className="mt-4 font-display text-xl font-medium">Search unavailable right now.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
          </div>
        ) : null}

        {q !== "" && !loading && !error && response ? (
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground" role="status">
              {resultsCount} result{resultsCount === 1 ? "" : "s"}
            </p>

            {response.products.length > 0 ? (
              <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {response.products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/jewellery/${product.slug}`}
                      className="group flex items-center gap-4 rounded-sm border border-border bg-background p-3 transition-colors hover:border-primary/50"
                    >
                      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-sm bg-muted">
                        {product.image ? (
                          <SmartImage src={product.image} alt="" fill sizes="80px" />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg font-medium text-foreground group-hover:text-primary">
                          {product.name}
                        </p>
                        <p className="mt-0.5 truncate font-sans text-xs uppercase tracking-[0.12em] text-muted-foreground">
                          {categoryMap[product.category]?.name ?? product.category} · {product.metal}
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                          {product.priceVisibility === "public" && typeof product.price === "number" ? (
                            formatINR(product.price)
                          ) : (
                            <span className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              Price on Request
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {response.collections.length > 0 ? (
              <div className="mt-10">
                <p className="eyebrow mb-4 text-muted-foreground">Collections</p>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {response.collections.map((collection) => (
                    <li key={collection.slug}>
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="group flex items-center gap-4 rounded-sm border border-border bg-background p-3 transition-colors hover:border-primary/50"
                      >
                        <div className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm bg-muted">
                          <SmartImage src={collection.image} alt="" fill sizes="64px" />
                        </div>
                        <span className="flex flex-1 items-center justify-between font-display text-lg font-medium text-foreground group-hover:text-primary">
                          {collection.name}
                          <ArrowRight className="size-4 text-primary" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {isEmpty ? (
              <div className="mt-6 rounded-sm border border-border bg-pearl px-6 py-16 text-center">
                <SearchX className="mx-auto size-8 text-muted-foreground" aria-hidden />
                <p className="mt-4 font-display text-xl font-medium">No jewellery found.</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Try a different search, or explore our collections and the full catalogue.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link href="/collections">
                    <Button variant="outline">Browse Collections</Button>
                  </Link>
                  <Link href="/jewellery">
                    <Button>View All Jewellery</Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
