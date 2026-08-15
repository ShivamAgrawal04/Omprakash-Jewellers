import Link from "next/link"
import { RotateCcw } from "lucide-react"
import type { ActiveFilters } from "@/lib/filter-url"
import {
  categoryOptions,
  collectionOptions,
  metalOptions,
  purityOptions,
  stoneOptions,
  genderOptions,
  availabilityOptions,
  PRICE_RANGES,
  toggleParam,
  buildQuery,
  hasActiveFilters,
} from "@/lib/filter-url"
import { cn } from "@/lib/utils"

interface FilterGroupProps {
  title: string
  options: { value: string; label: string }[]
  current: ActiveFilters
  param: keyof ActiveFilters
  pathname: string
}

function FilterGroup({ title, options, current, param, pathname }: FilterGroupProps) {
  return (
    <fieldset className="border-b border-border py-5 first:pt-0 last:border-0">
      <legend className="eyebrow mb-3 text-muted-foreground">{title}</legend>
      <ul className="space-y-1">
        {options.map((option) => {
          const active = current[param] === option.value
          return (
            <li key={option.value}>
              <Link
                href={`${pathname}${toggleParam(current, param, option.value)}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-sm px-2 py-1.5 font-sans text-[0.8rem] text-foreground/75 transition-colors hover:text-primary",
                  active && "font-semibold text-primary",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "size-3.5 rounded-full border border-border transition-colors",
                    active && "border-primary bg-primary",
                  )}
                />
                {option.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </fieldset>
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
            className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Reset
          </Link>
        ) : null}
      </div>

      <div className="mt-5">
        <FilterGroup
          title="Category"
          options={categoryOptions}
          current={current}
          param="category"
          pathname={pathname}
        />
        <FilterGroup
          title="Collection"
          options={collectionOptions}
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
        <FilterGroup
          title="Stone"
          options={stoneOptions.map((s) => ({ value: s, label: s }))}
          current={current}
          param="stone"
          pathname={pathname}
        />
        <FilterGroup
          title="Gender"
          options={genderOptions}
          current={current}
          param="gender"
          pathname={pathname}
        />
        <FilterGroup
          title="Availability"
          options={availabilityOptions}
          current={current}
          param="availability"
          pathname={pathname}
        />

        <fieldset className="border-b border-border py-5">
          <legend className="eyebrow mb-3 text-muted-foreground">Price Range</legend>
          <ul className="space-y-1">
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
                      "flex items-center gap-2.5 rounded-sm px-2 py-1.5 font-sans text-[0.8rem] text-foreground/75 transition-colors hover:text-primary",
                      active && "font-semibold text-primary",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-3.5 rounded-full border border-border transition-colors",
                        active && "border-primary bg-primary",
                      )}
                    />
                    {range.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </fieldset>
      </div>
    </aside>
  )
}
