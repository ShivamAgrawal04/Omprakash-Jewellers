"use client"

import { useRouter } from "next/navigation"
import { Select } from "@/components/ui/select"
import { SORT_OPTIONS, type SortKey } from "@/lib/catalogue"

interface SortSelectProps {
  sort: SortKey
  pathname: string
  currentQuery: string
}

export function SortSelect({ sort, pathname, currentQuery }: SortSelectProps) {
  const router = useRouter()

  function onChange(value: string) {
    const params = new URLSearchParams(currentQuery)
    if (value === "featured") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    const qs = params.toString()
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false })
  }

  return (
    <Select
      value={sort}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort products"
      className="w-auto min-w-[11rem]"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}
