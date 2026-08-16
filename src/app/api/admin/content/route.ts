import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import {
  persistCatalogue,
  readCollections,
  readProducts,
  readSiteContent,
  type SiteContent,
} from "@/lib/admin-content"
import type { Collection, Product } from "@/data/types"

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const [site, collections, products] = await Promise.all([
    readSiteContent(),
    readCollections(),
    readProducts(),
  ])
  return NextResponse.json({ site, collections, products })
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = (await request.json()) as {
    site?: SiteContent
    collections?: Collection[]
    products?: Product[]
  }
  if (body.site && (!body.site.name || !body.site.heroTitle)) {
    return NextResponse.json({ error: "Shop name and home title are required." }, { status: 400 })
  }
  try {
    await persistCatalogue(body)
  } catch {
    return NextResponse.json(
      { error: "Could not save files. Use /admin on your computer (npm run dev), not on Vercel’s read-only disk." },
      { status: 500 },
    )
  }
  return NextResponse.json({
    ok: true,
    note: "Saved. Refresh the website to see changes.",
  })
}
