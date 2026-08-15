"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Expand, ZoomIn, ZoomOut } from "lucide-react"
import type { ProductImage } from "@/data/types"
import { SmartImage } from "@/components/ui/smart-image"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: ProductImage[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const railRef = useRef<HTMLDivElement | null>(null)

  const [prevLightbox, setPrevLightbox] = useState(lightboxOpen)
  if (lightboxOpen !== prevLightbox) {
    setPrevLightbox(lightboxOpen)
    if (!lightboxOpen) setZoomed(false)
  }

  const count = images.length

  const goTo = useCallback(
    (next: number) => {
      setSelected(((next % count) + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (!lightboxOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(selected + 1)
      if (e.key === "ArrowLeft") goTo(selected - 1)
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen, selected, goTo])

  const current = images[selected] ?? images[0]

  return (
    <div className="grid gap-4 md:grid-cols-[84px_1fr] md:gap-5">
      <div
        ref={railRef}
        className="no-scrollbar flex gap-3 overflow-x-auto md:order-2 md:flex-col md:overflow-visible"
        role="tablist"
        aria-label="Product images"
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            role="tab"
            aria-selected={index === selected}
            aria-label={`View ${image.alt}`}
            onClick={() => goTo(index)}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-sm border transition-colors md:w-full",
              index === selected
                ? "border-primary"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <SmartImage src={image.src} alt="" fill sizes="100px" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted md:order-1">
        <SmartImage
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="transition-transform duration-500"
        />
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={`Open ${current.alt} in fullscreen`}
          className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full border border-border bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:text-primary"
        >
          <Expand className="size-4" aria-hidden />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 md:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to image ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === selected ? "w-5 bg-primary" : "w-1.5 bg-foreground/30",
              )}
            />
          ))}
        </div>
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton
          className="max-w-4xl overflow-hidden bg-obsidian/95 p-0 text-white sm:p-0"
        >
          <div className="relative flex aspect-[4/5] max-h-[80dvh] w-full items-center justify-center overflow-hidden sm:aspect-square">
            <SmartImage
              src={current.src}
              alt={current.alt}
              fill
              objectFit="contain"
              className={cn(
                "transition-transform duration-300",
                zoomed ? "scale-[1.75] cursor-zoom-out" : "cursor-zoom-in",
              )}
            />
            <div
              className="absolute inset-0"
              role="button"
              tabIndex={0}
              aria-label="Toggle zoom"
              onClick={() => setZoomed((z) => !z)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setZoomed((z) => !z)
                }
              }}
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3 text-white">
            <p className="truncate text-sm text-white/80">{current.alt}</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
              >
                {zoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
              </button>
              <button
                onClick={() => goTo(selected - 1)}
                aria-label="Previous image"
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="px-2 font-sans text-xs text-white/60">
                {selected + 1} / {count}
              </span>
              <button
                onClick={() => goTo(selected + 1)}
                aria-label="Next image"
                className="flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
