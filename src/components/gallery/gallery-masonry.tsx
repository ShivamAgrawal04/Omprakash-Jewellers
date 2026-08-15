"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryItem } from "@/data/types"
import { SmartImage } from "@/components/ui/smart-image"
import { cn } from "@/lib/utils"

interface GalleryLightboxProps {
  items: GalleryItem[]
  initialIndex: number
  onClose: () => void
}

export function GalleryLightbox({ items, initialIndex, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const current = items[index]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, items.length])

  if (!current) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      className="fixed inset-0 z-[90] flex flex-col bg-obsidian/95 text-white"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/60">
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex size-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          aria-label="Previous image"
          className="mr-2 flex size-11 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 sm:mr-6"
        >
          <ChevronLeft className="size-6" />
        </button>
        <figure className="relative h-full max-h-[70dvh] flex-1">
          <SmartImage
            src={current.src}
            alt={current.alt}
            fill
            objectFit="contain"
            sizes="(min-width: 768px) 80vw, 100vw"
          />
          {current.caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/80 to-transparent px-4 pb-3 pt-10 text-center text-sm text-white/90">
              {current.caption}
            </figcaption>
          ) : null}
        </figure>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          aria-label="Next image"
          className="ml-2 flex size-11 shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 sm:ml-6"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>
    </div>
  )
}

export function GalleryMasonry({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`View ${item.alt}`}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <div className={cn("relative w-full", item.featured ? "aspect-[3/4]" : "aspect-square")}>
              <SmartImage
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            {item.caption ? (
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-obsidian/80 to-transparent px-4 pb-3 pt-10 text-left text-xs text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {selected !== null ? (
        <GalleryLightbox
          items={items}
          initialIndex={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  )
}
