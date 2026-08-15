import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { searchProducts } from "@/lib/catalogue"
import { collections } from "@/data/collections"
import { rateLimit, LIMITS } from "@/lib/rate-limit"

export const runtime = "nodejs"

async function clientIp(): Promise<string> {
  const header = await headers()
  const fwd = header.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return header.get("x-real-ip") ?? "unknown"
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")?.trim().slice(0, 80) ?? ""

  const ip = await clientIp()
  if (!rateLimit(`search:${ip}`, LIMITS.SEARCH)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  if (!q) {
    return NextResponse.json({ products: [], collections: [] })
  }

  const products = searchProducts(q, { limit: 8 }).map((p) => ({
    slug: p.slug,
    name: p.name,
    sku: p.sku,
    category: p.category,
    metal: p.metal,
    price: p.price ?? null,
    priceVisibility: p.priceVisibility,
    image: p.images[0]?.src ?? null,
  }))

  const qLower = q.toLowerCase()
  const collectionMatches = collections
    .filter(
      (c) =>
        c.name.toLowerCase().includes(qLower) ||
        c.tagline.toLowerCase().includes(qLower) ||
        c.slug.includes(qLower),
    )
    .slice(0, 4)
    .map((c) => ({ name: c.name, slug: c.slug, image: c.image }))

  return NextResponse.json({ products, collections: collectionMatches })
}
