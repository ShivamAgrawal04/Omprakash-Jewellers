import type { Metadata } from "next"
import Link from "next/link"
import { Clock, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/data/site-config"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"

export const metadata: Metadata = pageMetadata({
  title: "Visit Us",
  description:
    "Visit Om Prakash Jewellers in Jaipur — address, opening hours, directions and private viewings. Walk-ins welcome, appointments recommended.",
  path: "/visit",
})

const highlights = [
  {
    title: "Private viewings",
    body: "Bridal and high-value pieces are shown by appointment in our private suite — unhurried, with a specialist beside you.",
  },
  {
    title: "Old gold valuation",
    body: "Bring old gold and have it weighed and valued at live rates at the counter, and applied against a new piece.",
  },
  {
    title: "Complimentary care",
    body: "Any Om Prakash piece is cleaned and inspected for free — clasps tightened, prongs checked — while you wait.",
  },
]

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit Us"
        title="Come see the pieces in person"
        description="Gold is best understood in the hand. Walk-ins are always welcome — and private viewings are even better."
        crumbs={[{ label: "Home", href: "/" }, { label: "Visit Us" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="grid gap-4">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="rounded-sm border border-border p-6">
                  <h2 className="font-display text-xl font-medium">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-6 rounded-sm border border-border bg-pearl p-6 md:p-8">
            <div>
              <h2 className="eyebrow mb-4 text-primary">The Showroom</h2>
              <address className="flex items-start gap-3 not-italic text-sm leading-relaxed text-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}
                </span>
              </address>
            </div>

            <div>
              <h2 className="eyebrow mb-4 text-primary">Hours</h2>
              <ul className="space-y-2 text-sm text-foreground">
                {siteConfig.hours.map((h) => (
                  <li key={h.days} className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-gold" aria-hidden />
                    <span>
                      <strong className="font-semibold">{h.days}:</strong> {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
            >
              <Phone className="size-4 shrink-0 text-gold" aria-hidden />
              {siteConfig.phone}
            </a>

            <div className="mt-auto flex flex-col gap-3">
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90 dark:text-obsidian"
              >
                <MapPin className="size-4" aria-hidden />
                Get Directions
              </a>
              <Link href="/contact" className="inline-block">
                <Button variant="outline" className="w-full">
                  Book a Visit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-lux pb-14 md:pb-20">
        <div className="overflow-hidden rounded-sm border border-border">
          <iframe
            src={siteConfig.mapEmbed}
            title={`Map to ${siteConfig.name}, ${siteConfig.address.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full border-0"
          />
        </div>
      </section>
    </>
  )
}
