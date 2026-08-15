"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  productId: string
  productName?: string
  className?: string
  iconClassName?: string
  label?: string
}

export function WishlistButton({
  productId,
  productName,
  className,
  iconClassName,
  label,
}: WishlistButtonProps) {
  const { isWishlisted, toggle } = useWishlist()
  const active = isWishlisted(productId)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        label ??
        (active
          ? `Remove ${productName ?? "this piece"} from wishlist`
          : `Add ${productName ?? "this piece"} to wishlist`)
      }
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(productId)
      }}
      className={cn(
        "group/wish flex items-center justify-center rounded-full border border-border bg-background/90 text-foreground/70 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:text-primary",
        active && "border-primary/60 text-primary",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-transform duration-300 group-active/wish:scale-75",
          active && "fill-current",
          iconClassName,
        )}
        aria-hidden
      />
    </button>
  )
}
