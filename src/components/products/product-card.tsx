import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/data/types"
import { formatINR } from "@/lib/format"
import { SmartImage } from "@/components/ui/smart-image"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/products/wishlist-button"

interface ProductCardProps {
  product: Product
  index?: number
  priority?: boolean
}

export function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const image = product.images[0]

  return (
    <article className="group relative flex flex-col" data-slot="product-card">
      <Link
        href={`/jewellery/${product.slug}`}
        className="relative block overflow-hidden rounded-sm bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        aria-label={`${product.name} — view details`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          {image ? (
            <SmartImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              priority={priority || index < 2}
              className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
        </div>

        {product.newArrival ? (
          <Badge variant="solid" className="absolute left-3 top-3">
            New
          </Badge>
        ) : null}
        {product.availability === "out-of-stock" ? (
          <Badge variant="destructive" className="absolute left-3 top-3">
            Out of Stock
          </Badge>
        ) : null}
        {product.priceVisibility === "on-request" && !product.newArrival ? (
          <Badge variant="outline" className="absolute left-3 top-3 bg-background/70 backdrop-blur-sm">
            On Request
          </Badge>
        ) : null}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3 size-9"
        />

        <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 bg-gradient-to-t from-obsidian/70 to-transparent p-3 pt-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
            View Details
          </span>
          <ArrowRight className="size-3.5 text-gold transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {product.metal}
        </p>
        <h3 className="font-display text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
          <Link href={`/jewellery/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-sm text-foreground/80">
          {product.priceVisibility === "public" && typeof product.price === "number" ? (
            formatINR(product.price)
          ) : (
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Price on Request
            </span>
          )}
        </p>
      </div>
    </article>
  )
}
