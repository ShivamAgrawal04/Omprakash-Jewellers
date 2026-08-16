"use client"

import { useEffect, useState } from "react"
import type { SiteContent } from "@/lib/admin-content"
import type { Collection, Product } from "@/data/types"

const emptySite: SiteContent = {
  name: "",
  shortName: "OPJ",
  tagline: "",
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  phone: "",
  whatsappNumber: "",
  email: "",
  address: { line1: "", line2: "", city: "", country: "India" },
  hours: [
    { days: "Monday – Saturday", time: "10:00 AM – 8:30 PM" },
    { days: "Sunday", time: "11:00 AM – 7:00 PM" },
  ],
  socials: { instagram: "", facebook: "" },
  aboutTitle: "",
  aboutBody: "",
}

type Tab = "shop" | "collections" | "pieces"

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

const inputClass = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm"

function Field({
  label,
  value,
  onChange,
  area,
  type = "text",
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  area?: boolean
  type?: string
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      {area ? (
        <textarea value={String(value)} onChange={(e) => onChange(e.target.value)} rows={3} className={inputClass} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      )}
    </label>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [site, setSite] = useState<SiteContent>(emptySite)
  const [collections, setCollections] = useState<Collection[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [tab, setTab] = useState<Tab>("shop")
  const [status, setStatus] = useState("")
  const [busy, setBusy] = useState(false)

  async function load() {
    const res = await fetch("/api/admin/content")
    if (res.status === 401) {
      setAuthed(false)
      return
    }
    const data = (await res.json()) as {
      site: SiteContent
      collections: Collection[]
      products: Product[]
    }
    setSite(data.site)
    setCollections(data.collections)
    setProducts(data.products)
    setAuthed(true)
  }

  useEffect(() => {
    void load()
  }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setStatus("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    setBusy(false)
    if (!res.ok) {
      const data = (await res.json()) as { error?: string }
      setStatus(data.error ?? "Login failed")
      return
    }
    setPassword("")
    await load()
  }

  async function save() {
    setBusy(true)
    setStatus("")
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site, collections, products }),
    })
    const data = (await res.json()) as { error?: string; note?: string }
    setBusy(false)
    setStatus(res.ok ? data.note ?? "Saved" : data.error ?? "Save failed")
  }

  async function uploadFile(file: File): Promise<string | null> {
    const form = new FormData()
    form.set("file", file)
    const res = await fetch("/api/admin/upload", { method: "POST", body: form })
    const data = (await res.json()) as { url?: string; error?: string }
    if (!res.ok || !data.url) {
      setStatus(data.error ?? "Upload failed")
      return null
    }
    return data.url
  }

  if (authed === null) {
    return <p className="p-10 text-sm text-muted-foreground">Loading…</p>
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-6">
        <h1 className="font-display text-3xl font-medium">Shop admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Username and password come from <code>.env.local</code> — ADMIN_USERNAME and ADMIN_PASSWORD.
        </p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className={inputClass}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className={inputClass}
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-white dark:text-obsidian"
          >
            {busy ? "…" : "Log in"}
          </button>
          {status ? <p className="text-sm text-destructive">{status}</p> : null}
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-medium">Manage showcase</h1>
        <div className="flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => void save()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white dark:text-obsidian"
          >
            {busy ? "Saving…" : "Save all"}
          </button>
          <button
            type="button"
            className="text-sm text-muted-foreground underline"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" })
              setAuthed(false)
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Edit shop details, collection covers, and jewellery titles, prices and photos. Then click Save all.
      </p>
      {status ? <p className="mt-3 text-sm text-primary">{status}</p> : null}

      <div className="mt-6 flex gap-2 border-b border-border pb-2">
        {(["shop", "collections", "pieces"] as Tab[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${tab === id ? "bg-primary text-white dark:text-obsidian" : "text-muted-foreground"}`}
          >
            {id === "pieces" ? "Jewellery" : id}
          </button>
        ))}
      </div>

      {tab === "shop" ? (
        <div className="mt-6 grid gap-4">
          <Field label="Shop name" value={site.name} onChange={(v) => setSite({ ...site, name: v })} />
          <Field label="Tagline" value={site.tagline} onChange={(v) => setSite({ ...site, tagline: v })} />
          <Field label="Home title" value={site.heroTitle} onChange={(v) => setSite({ ...site, heroTitle: v })} />
          <Field label="Home subtitle" value={site.heroSubtitle} onChange={(v) => setSite({ ...site, heroSubtitle: v })} area />
          <Field label="About title" value={site.aboutTitle} onChange={(v) => setSite({ ...site, aboutTitle: v })} />
          <Field label="About text" value={site.aboutBody} onChange={(v) => setSite({ ...site, aboutBody: v })} area />
          <Field label="Phone" value={site.phone} onChange={(v) => setSite({ ...site, phone: v })} />
          <Field label="WhatsApp (digits with country code)" value={site.whatsappNumber} onChange={(v) => setSite({ ...site, whatsappNumber: v })} />
          <Field label="Email" value={site.email} onChange={(v) => setSite({ ...site, email: v })} />
          <Field label="Address line 1" value={site.address.line1} onChange={(v) => setSite({ ...site, address: { ...site.address, line1: v } })} />
          <Field label="Address line 2" value={site.address.line2} onChange={(v) => setSite({ ...site, address: { ...site.address, line2: v } })} />
          <Field label="City" value={site.address.city} onChange={(v) => setSite({ ...site, address: { ...site.address, city: v } })} />
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Home image</span>
            <input value={site.heroImage} onChange={(e) => setSite({ ...site, heroImage: e.target.value })} className={inputClass} />
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-sm"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const url = await uploadFile(file)
                if (url) setSite((s) => ({ ...s, heroImage: url }))
              }}
            />
          </label>
        </div>
      ) : null}

      {tab === "collections" ? (
        <div className="mt-6 space-y-8">
          <button
            type="button"
            className="text-sm font-semibold text-primary"
            onClick={() =>
              setCollections((list) => [
                ...list,
                {
                  slug: `collection-${Date.now()}`,
                  name: "New collection",
                  tagline: "",
                  description: "",
                  image: "",
                  imageAlt: "",
                  featured: true,
                  sortOrder: list.length + 1,
                },
              ])
            }
          >
            + Add collection
          </button>
          {collections.map((collection, index) => (
            <div key={collection.slug} className="grid gap-3 rounded-md border border-border p-4">
              <Field
                label="Name"
                value={collection.name}
                onChange={(v) => {
                  const next = [...collections]
                  next[index] = { ...collection, name: v, slug: collection.slug.startsWith("collection-") ? slugify(v) || collection.slug : collection.slug }
                  setCollections(next)
                }}
              />
              <Field
                label="Tagline"
                value={collection.tagline}
                onChange={(v) => {
                  const next = [...collections]
                  next[index] = { ...collection, tagline: v }
                  setCollections(next)
                }}
              />
              <Field
                label="Description"
                value={collection.description}
                onChange={(v) => {
                  const next = [...collections]
                  next[index] = { ...collection, description: v }
                  setCollections(next)
                }}
                area
              />
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Cover image</span>
                <input
                  value={collection.image}
                  onChange={(e) => {
                    const next = [...collections]
                    next[index] = { ...collection, image: e.target.value }
                    setCollections(next)
                  }}
                  className={inputClass}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const url = await uploadFile(file)
                    if (!url) return
                    setCollections((list) => {
                      const next = [...list]
                      next[index] = { ...next[index], image: url, imageAlt: next[index].name }
                      return next
                    })
                  }}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={collection.featured}
                  onChange={(e) => {
                    const next = [...collections]
                    next[index] = { ...collection, featured: e.target.checked }
                    setCollections(next)
                  }}
                />
                Show on home
              </label>
              <button
                type="button"
                className="justify-self-start text-sm text-destructive"
                onClick={() => setCollections((list) => list.filter((_, i) => i !== index))}
              >
                Remove collection
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {tab === "pieces" ? (
        <div className="mt-6 space-y-8">
          <button
            type="button"
            className="text-sm font-semibold text-primary"
            onClick={() =>
              setProducts((list) => [
                {
                  id: `p-${Date.now()}`,
                  slug: `piece-${Date.now()}`,
                  name: "New piece",
                  sku: `OPJ-${list.length + 1}`,
                  description: "",
                  category: "rings",
                  collectionSlug: collections[0]?.slug ?? "gold-jewellery",
                  price: 0,
                  priceVisibility: "public",
                  metal: "22K Yellow Gold",
                  purity: "22K (916)",
                  weight: "",
                  images: [{ src: "", alt: "", kind: "front" }],
                  tags: [],
                  featured: true,
                  newArrival: true,
                  active: true,
                  gender: "unisex",
                  availability: "available",
                  sortOrder: list.length + 1,
                  createdAt: new Date().toISOString(),
                },
                ...list,
              ])
            }
          >
            + Add jewellery
          </button>
          {products.map((product, index) => (
            <div key={product.id} className="grid gap-3 rounded-md border border-border p-4">
              <Field
                label="Title"
                value={product.name}
                onChange={(v) => {
                  const next = [...products]
                  next[index] = {
                    ...product,
                    name: v,
                    slug: product.slug.startsWith("piece-") ? slugify(v) || product.slug : product.slug,
                    images: product.images.map((img, i) => (i === 0 ? { ...img, alt: v } : img)),
                  }
                  setProducts(next)
                }}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Price (INR)"
                  type="number"
                  value={product.price ?? ""}
                  onChange={(v) => {
                    const next = [...products]
                    next[index] = { ...product, price: v ? Number(v) : undefined }
                    setProducts(next)
                  }}
                />
                <label className="block text-sm">
                  <span className="mb-1 block text-muted-foreground">Price display</span>
                  <select
                    className={inputClass}
                    value={product.priceVisibility}
                    onChange={(e) => {
                      const next = [...products]
                      next[index] = { ...product, priceVisibility: e.target.value as Product["priceVisibility"] }
                      setProducts(next)
                    }}
                  >
                    <option value="public">Show price</option>
                    <option value="on-request">Price on request</option>
                  </select>
                </label>
                <Field
                  label="Metal"
                  value={product.metal}
                  onChange={(v) => {
                    const next = [...products]
                    next[index] = { ...product, metal: v as Product["metal"] }
                    setProducts(next)
                  }}
                />
                <label className="block text-sm">
                  <span className="mb-1 block text-muted-foreground">Collection</span>
                  <select
                    className={inputClass}
                    value={product.collectionSlug}
                    onChange={(e) => {
                      const next = [...products]
                      next[index] = { ...product, collectionSlug: e.target.value }
                      setProducts(next)
                    }}
                  >
                    {collections.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <Field
                label="Short description"
                value={product.description}
                onChange={(v) => {
                  const next = [...products]
                  next[index] = { ...product, description: v }
                  setProducts(next)
                }}
                area
              />
              <label className="block text-sm">
                <span className="mb-1 block text-muted-foreground">Main photo</span>
                <input
                  value={product.images[0]?.src ?? ""}
                  onChange={(e) => {
                    const next = [...products]
                    const images = [...product.images]
                    images[0] = { src: e.target.value, alt: product.name, kind: "front" }
                    next[index] = { ...product, images }
                    setProducts(next)
                  }}
                  className={inputClass}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 text-sm"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const url = await uploadFile(file)
                    if (!url) return
                    setProducts((list) => {
                      const next = [...list]
                      const current = next[index]
                      const images = [...current.images]
                      images[0] = { src: url, alt: current.name, kind: "front" }
                      next[index] = { ...current, images }
                      return next
                    })
                  }}
                />
              </label>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={product.active}
                    onChange={(e) => {
                      const next = [...products]
                      next[index] = { ...product, active: e.target.checked }
                      setProducts(next)
                    }}
                  />
                  Show on site
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={product.featured}
                    onChange={(e) => {
                      const next = [...products]
                      next[index] = { ...product, featured: e.target.checked }
                      setProducts(next)
                    }}
                  />
                  Featured
                </label>
              </div>
              <button
                type="button"
                className="justify-self-start text-sm text-destructive"
                onClick={() => setProducts((list) => list.filter((_, i) => i !== index))}
              >
                Remove piece
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  )
}
