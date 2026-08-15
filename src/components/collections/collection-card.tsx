import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Collection } from "@/data/types"
import { SmartImage } from "@/components/ui/smart-image"
import { Skeleton } from "@/components/ui/skeleton"

interface CollectionCardProps {
  collection: Collection
  large?: boolean
}

export function CollectionCard({ collection, large }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group block focus-visible:outline-2 focus-visible:outline-ring"
      aria-label={`Explore ${collection.name}`}
    >
      <div className="relative overflow-hidden rounded-sm bg-muted">
        <div
          className={large ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/5]"}
        >
          <SmartImage
            src={collection.image}
            alt={collection.imageAlt}
            fill
            sizes={large ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-obsidian/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="eyebrow mb-2 text-champagne">{collection.tagline}</p>
          <h3 className="font-display text-2xl font-medium text-white sm:text-3xl">
            {collection.name}
          </h3>
          <span className="mt-3 inline-flex items-center gap-2 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90">
            Explore
            <ArrowRight className="size-3.5 text-champagne transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function CollectionCardSkeleton({ large }: { large?: boolean }) {
  return (
    <div className="block">
      <div className={large ? "aspect-[16/10] rounded-sm" : "aspect-[4/5] rounded-sm"}>
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
