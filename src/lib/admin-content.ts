import { readFile, writeFile, mkdir } from "node:fs/promises"
import path from "node:path"
import type { Collection, Product } from "@/data/types"

export type SiteContent = {
  name: string
  shortName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  phone: string
  whatsappNumber: string
  email: string
  address: {
    line1: string
    line2: string
    city: string
    country: string
  }
  hours: { days: string; time: string }[]
  socials: { instagram: string; facebook: string }
  aboutTitle: string
  aboutBody: string
}

function repoRoot() {
  return process.cwd()
}

async function readJson<T>(relativePath: string): Promise<T> {
  const raw = await readFile(path.join(repoRoot(), relativePath), "utf8")
  return JSON.parse(raw) as T
}

async function writeJson(relativePath: string, value: unknown) {
  const file = path.join(repoRoot(), relativePath)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`, "utf8")
}

export async function readSiteContent(): Promise<SiteContent> {
  return readJson<SiteContent>("content/site.json")
}

export async function readCollections(): Promise<Collection[]> {
  return readJson<Collection[]>("content/collections.json")
}

export async function readProducts(): Promise<Product[]> {
  return readJson<Product[]>("content/products.json")
}

export async function persistCatalogue(data: {
  site?: SiteContent
  collections?: Collection[]
  products?: Product[]
}) {
  if (data.site) await writeJson("content/site.json", data.site)
  if (data.collections) await writeJson("content/collections.json", data.collections)
  if (data.products) await writeJson("content/products.json", data.products)
}

export async function persistUpload(filename: string, bytes: Buffer) {
  const relativePath = `public/uploads/${filename}`
  const abs = path.join(repoRoot(), relativePath)
  await mkdir(path.dirname(abs), { recursive: true })
  await writeFile(abs, bytes)
  return `/uploads/${filename}`
}
