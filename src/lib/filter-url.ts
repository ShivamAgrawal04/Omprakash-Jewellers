import { collections } from "@/data/collections"
import { FILTER_OPTIONS, SORT_OPTIONS, type SortKey } from "@/lib/catalogue"

export interface ActiveFilters {
  category?: string
  collection?: string
  metal?: string
  purity?: string
  stone?: string
  gender?: string
  availability?: string
  priceMin?: string
  priceMax?: string
  sort?: string
}

export function parseSearchParams(
  params: URLSearchParams,
): ActiveFilters {
  const one = (key: string): string | undefined => {
    const value = params.get(key)
    return value && value.length > 0 ? value : undefined
  }
  return {
    category: one("category"),
    collection: one("collection"),
    metal: one("metal"),
    purity: one("purity"),
    stone: one("stone"),
    gender: one("gender"),
    availability: one("availability"),
    priceMin: one("priceMin"),
    priceMax: one("priceMax"),
    sort: one("sort"),
  }
}

export function normalizeSort(sort?: string): SortKey {
  const valid = SORT_OPTIONS.map((o) => o.value)
  return valid.includes(sort as SortKey) ? (sort as SortKey) : "featured"
}

export function buildQuery(params: ActiveFilters): string {
  const search = new URLSearchParams()
  const entries: [keyof ActiveFilters, string | undefined][] = [
    ["category", params.category],
    ["collection", params.collection],
    ["metal", params.metal],
    ["purity", params.purity],
    ["stone", params.stone],
    ["gender", params.gender],
    ["availability", params.availability],
    ["priceMin", params.priceMin],
    ["priceMax", params.priceMax],
    ["sort", params.sort],
  ]
  for (const [key, value] of entries) {
    if (value && value.length > 0) search.set(key, value)
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ""
}

export function toggleParam(
  current: ActiveFilters,
  key: keyof ActiveFilters,
  value: string,
): string {
  const next: ActiveFilters = { ...current }
  if (next[key] === value) {
    delete next[key]
  } else {
    next[key] = value
  }
  return buildQuery(next)
}

export function hasActiveFilters(filters: ActiveFilters): boolean {
  return Object.values(filters).some((v) => v !== undefined)
}

export const categoryOptions = [
  { value: "rings", label: "Rings" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earrings" },
  { value: "bangles", label: "Bangles" },
  { value: "pendants", label: "Pendants" },
  { value: "mens", label: "Men's Jewellery" },
]

export const collectionOptions = collections.map((c) => ({
  value: c.slug,
  label: c.name,
}))

export const metalOptions = FILTER_OPTIONS.metals
export const purityOptions = FILTER_OPTIONS.purity
export const stoneOptions = FILTER_OPTIONS.stones

export const genderOptions = [
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "unisex", label: "Unisex" },
]

export const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "on-request", label: "On Request" },
]

export const PRICE_RANGES = [
  { label: "Under ₹50,000", min: "", max: "50000" },
  { label: "₹50,000 – ₹1,00,000", min: "50000", max: "100000" },
  { label: "₹1,00,000 – ₹2,50,000", min: "100000", max: "250000" },
  { label: "Above ₹2,50,000", min: "250000", max: "" },
]
