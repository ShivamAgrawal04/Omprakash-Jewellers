"use client"

import { useMemo, useState } from "react"
import type { GalleryItem, GallerySection } from "@/data/types"
import { gallerySections } from "@/data/gallery"
import { GalleryMasonry } from "@/components/gallery/gallery-masonry"

interface GallerySectionFilterProps {
  items: GalleryItem[]
}

type SectionOption = GallerySection | "all"

const options: { slug: SectionOption; name: string }[] = [
  { slug: "all", name: "All" },
  ...gallerySections.map((s) => ({ slug: s.slug as SectionOption, name: s.name })),
]

export function GallerySectionFilter({ items }: GallerySectionFilterProps) {
  const [active, setActive] = useState<SectionOption>("all")

  const visible = useMemo(
    () => (active === "all" ? items : items.filter((item) => item.section === active)),
    [items, active],
  )

  return (
    <div>
      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Gallery sections"
      >
        {options.map((option) => {
          const isActive = option.slug === active
          return (
            <button
              key={option.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(option.slug)}
              className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                isActive
                  ? "border-primary bg-primary text-white dark:text-obsidian"
                  : "border-border bg-background text-foreground/70 hover:border-primary/60 hover:text-primary"
              }`}
            >
              {option.name}
            </button>
          )
        })}
      </div>

      <div className="mt-10">
        <GalleryMasonry items={visible} />
      </div>
    </div>
  )
}
