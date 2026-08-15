"use client"

import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { FilterPanel } from "@/components/products/filter-panel"
import type { ActiveFilters } from "@/lib/filter-url"

interface MobileFilterSheetProps {
  current: ActiveFilters
  resultCount: number
}

export function MobileFilterSheet({ current, resultCount }: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentParams = `${pathname}${searchParams.toString()}`
  const [prevParams, setPrevParams] = useState(currentParams)

  if (currentParams !== prevParams) {
    setPrevParams(currentParams)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <SlidersHorizontal className="size-4" aria-hidden />
        Filter
      </Button>
      <SheetContent>
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>{resultCount} pieces match your selection.</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto pb-8 pt-2">
          <FilterPanel current={current} pathname={pathname} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
