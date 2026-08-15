import Link from "next/link"
import { X } from "lucide-react"
import type { ActiveFilters } from "@/lib/filter-url"
import { buildQuery } from "@/lib/filter-url"
import { categoryMap } from "@/data/collections"

interface FilterChipsProps {
  current: ActiveFilters
  pathname: string
}

const LABELS: Record<keyof ActiveFilters, (value: string) => string> = {
  category: (v) => categoryMap[v]?.name ?? v,
  collection: (v) => v.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase()),
  metal: (v) => v,
  purity: (v) => v,
  stone: (v) => v,
  gender: (v) => v.replace(/^./, (c) => c.toUpperCase()),
  availability: (v) => v.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase()),
  priceMin: (v) => `From ${Number(v).toLocaleString("en-IN")}`,
  priceMax: (v) => `Up to ${Number(v).toLocaleString("en-IN")}`,
  sort: (v) => `Sort: ${v.replace(/-/g, " ")}`,
}

export function FilterChips({ current, pathname }: FilterChipsProps) {
  const entries = (Object.keys(current) as (keyof ActiveFilters)[])
    .filter((key) => {
      const value = current[key]
      return value !== undefined && value !== ""
    })
    .map((key) => ({ key, value: current[key] as string }))

  if (entries.length === 0) return null

  return (
    <ul className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {entries.map(({ key, value }) => {
        const next: ActiveFilters = { ...current }
        delete next[key]
        const label = LABELS[key](value)
        return (
          <li key={key}>
            <Link
              href={`${pathname}${buildQuery(next)}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:border-primary/60 hover:text-primary"
            >
              {label}
              <X className="size-3 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
              <span className="sr-only">Remove {label} filter</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
