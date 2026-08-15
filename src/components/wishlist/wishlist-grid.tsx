"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { products } from "@/data/products"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function WishlistGrid() {
  const { ids, clear } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-12" aria-hidden>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  const wishlistProducts = products.filter((p) => p.active && ids.includes(p.id))

  if (wishlistProducts.length === 0) {
    return (
      <div className="rounded-sm border border-border bg-pearl px-6 py-20 text-center">
        <Heart className="mx-auto size-8 text-muted-foreground" aria-hidden />
        <p className="mt-4 font-display text-2xl font-medium">Your wishlist is empty.</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Save pieces you love while browsing, and they&apos;ll appear here — kept
          privately on this device.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/jewellery">
            <Button>Explore Jewellery</Button>
          </Link>
          <Link href="/collections">
            <Button variant="outline">Browse Collections</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground" role="status">
          {wishlistProducts.length} saved piece{wishlistProducts.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={clear}
          className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-destructive"
        >
          Clear wishlist
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-12">
        {wishlistProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  )
}
