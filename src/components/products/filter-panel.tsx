import Link from "next/link"
import { RotateCcw } from "lucide-react"
import type { ActiveFilters } from "@/lib/filter-url"
import {
  categoryOptions,
  collectionOptions,
  metalOptions,
  purityOptions,
  PRICE_RANGES,
  toggleParam,
  buildQuery,
  hasActiveFilters,
} from "@/lib/filter-url"
import { cn } from "@/lib/utils"

const shopCollections = collectionOptions.filter((c) =>
  ["gold-jewellery", "silver-jewellery", "diamond-jewellery", "bridal", "custom-jewellery"].includes(
    c.value,
  ),
)

interface FilterGroupProps {
  title: string
  options: { value: string; label: string }[]
  current: ActiveFilters
  param: keyof ActiveFilters
  pathname: string
}

function FilterGroup({ title, options, current, param, pathname }: FilterGroupProps) {
  return (
    <div className="border-b border-border py-5 first:pt-0 last:border-0">
      <h3 className="mb-3 text-sm font-medium text-foreground">{title}</h3>
      <ul className="space-y-0.5">
        {options.map((option) => {
          const active = current[param] === option.value
          return (
            <li key={option.value}>
              <Link
                href={`${pathname}${toggleParam(current, param, option.value)}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-sm py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
                  active && "font-medium text-primary",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-3.5 shrink-0 rounded-full border border-border",
                    active && "border-primary bg-primary",
                  )}
                />
                {option.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

interface FilterPanelProps {
  current: ActiveFilters
  pathname: string
  className?: string
}

export function FilterPanel({ current, pathname, className }: FilterPanelProps) {
  return (
    <aside className={cn("w-full", className)} aria-label="Filters">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-medium">Filter</h2>
        {hasActiveFilters(current) ? (
          <Link
            href={pathname}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Reset
          </Link>
        ) : null}
      </div>

      <div className="mt-4">
        <FilterGroup
          title="Category"
          options={categoryOptions}
          current={current}
          param="category"
          pathname={pathname}
        />
        <FilterGroup
          title="Collection"
          options={shopCollections}
          current={current}
          param="collection"
          pathname={pathname}
        />
        <FilterGroup
          title="Metal"
          options={metalOptions.map((m) => ({ value: m, label: m }))}
          current={current}
          param="metal"
          pathname={pathname}
        />
        <FilterGroup
          title="Purity"
          options={purityOptions.map((p) => ({ value: p, label: p }))}
          current={current}
          param="purity"
          pathname={pathname}
        />

        <div className="border-b border-border py-5 last:border-0">
          <h3 className="mb-3 text-sm font-medium text-foreground">Price</h3>
          <ul className="space-y-0.5">
            {PRICE_RANGES.map((range) => {
              const active =
                current.priceMin === range.min && current.priceMax === range.max
              return (
                <li key={range.label}>
                  <Link
                    href={`${pathname}${buildQuery({
                      ...current,
                      priceMin: range.min || undefined,
                      priceMax: range.max || undefined,
                    })}`}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-sm py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary",
                      active && "font-medium text-primary",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-3.5 shrink-0 rounded-full border border-border",
                        active && "border-primary bg-primary",
                      )}
                    />
                    {range.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}
