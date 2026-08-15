import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin } from "lucide-react"
import { getProductBySlug, getSimilarProducts, products } from "@/data/products"
import { getCollectionBySlug, categoryMap } from "@/data/collections"
import { pageMetadata, productLd, breadcrumbLd, jsonLd } from "@/lib/seo"
import { formatINR } from "@/lib/format"
import { siteConfig } from "@/data/site-config"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "@/components/products/product-gallery"
import { WishlistButton } from "@/components/products/wishlist-button"
import { ShareButton } from "@/components/products/share-button"
import { EnquiryLauncher } from "@/components/products/enquiry-launcher"
import { ProductGrid } from "@/components/products/product-grid"
import { Separator } from "@/components/ui/separator"

export async function generateStaticParams() {
  return products
    .filter((p) => p.active)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/jewellery/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return pageMetadata({
    title: product.name,
    description: product.description,
    path: `/jewellery/${product.slug}`,
    images: product.images.map((i) => i.src),
    type: "product",
  })
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/jewellery/[slug]">) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const collection = getCollectionBySlug(product.collectionSlug)
  const category = categoryMap[product.category]
  const similar = getSimilarProducts(product, 4)

  const specs: { label: string; value: string }[] = [
    { label: "Metal", value: product.metal },
    { label: "Purity", value: product.purity },
    { label: "Weight", value: product.weight },
  ]
  if (product.stone && product.stone !== "None") {
    specs.push({ label: "Stone", value: product.stone })
  }
  if (product.stoneWeight) specs.push({ label: "Stone Weight", value: product.stoneWeight })
  if (product.dimensions) specs.push({ label: "Dimensions", value: product.dimensions })
  specs.push({ label: "Product Code", value: product.sku })

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Jewellery", href: "/jewellery" },
    ...(category ? [{ label: category.name, href: `/jewellery?category=${category.slug}` }] : []),
    { label: product.name },
  ]

  const ld = jsonLd([
    productLd(product),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Jewellery", path: "/jewellery" },
      { name: product.name, path: `/jewellery/${product.slug}` },
    ]),
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <section className="container-lux pb-10 pt-28 md:pb-16 md:pt-36">
        <Breadcrumb items={crumbs} className="mb-8" />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              {collection ? (
                <Link href={`/collections/${collection.slug}`}>
                  <Badge>{collection.name}</Badge>
                </Link>
              ) : null}
              {category ? (
                <Link href={`/jewellery?category=${category.slug}`}>
                  <Badge variant="outline">{category.name}</Badge>
                </Link>
              ) : null}
              {product.newArrival ? <Badge variant="solid">New Arrival</Badge> : null}
              {product.availability === "out-of-stock" ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : null}
            </div>

            <div>
              <h1 className="font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {product.metal} · {product.purity}
              </p>
            </div>

            {product.priceVisibility === "public" && typeof product.price === "number" ? (
              <p className="font-display text-3xl font-medium">{formatINR(product.price)}</p>
            ) : (
              <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Price on Request
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <EnquiryLauncher
                productName={product.name}
                productSlug={product.slug}
                sku={product.sku}
              />
              <WishlistButton
                productId={product.id}
                productName={product.name}
                className="size-12 rounded-md border-border"
                iconClassName="size-5"
              />
              <ShareButton productName={product.name} />
            </div>

            <p className="text-base leading-relaxed text-pretty text-muted-foreground">
              {product.longDescription ?? product.description}
            </p>

            <div>
              <h2 className="eyebrow mb-4 text-muted-foreground">Details</h2>
              <dl className="divide-y divide-border rounded-sm border border-border">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between gap-6 px-5 py-3.5">
                    <dt className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="text-right text-sm text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Separator />

            <div className="rounded-sm border border-border bg-pearl p-5">
              <p className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  Visit the showroom to see this piece in person.{" "}
                  <span className="font-semibold text-foreground">
                    {siteConfig.address.line1}, {siteConfig.address.city}.
                  </span>{" "}
                  <Link href="/visit" className="text-primary underline underline-offset-4 hover:text-primary/80">
                    Get directions
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 ? (
        <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
          <div className="container-lux py-14 md:py-20">
            <h2 className="font-display text-3xl font-medium tracking-tight">You may also like</h2>
            <div className="mt-10">
              <ProductGrid products={similar} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
