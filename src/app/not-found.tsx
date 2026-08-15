import Link from "next/link"
import { siteConfig } from "@/data/site-config"
import { PageHero } from "@/components/layout/page-hero"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="This page has left the showroom"
        description="The piece you are looking for has been moved, renamed or never existed. Let us take you back to what is in the case."
        crumbs={[{ label: "Home", href: "/" }, { label: "404" }]}
      />
      <section className="container-lux py-10 md:py-16">
        <div className="rounded-sm border border-border bg-pearl px-6 py-16 text-center">
          <p className="font-display text-6xl font-light text-primary">404</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Popular places to start — the full collection, this season&apos;s bridal edit, or call
            the showroom directly at {siteConfig.phone}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/jewellery" className="inline-block">
              <Button>Browse All Jewellery</Button>
            </Link>
            <Link href="/" className="inline-block">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
