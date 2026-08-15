import type { Metadata } from "next"
import Link from "next/link"
import { Gem, Scale, ShieldCheck, Sparkles } from "lucide-react"
import { pageMetadata } from "@/lib/seo"
import { whatsappLink, visitMessage } from "@/lib/whatsapp"
import { PageHero } from "@/components/layout/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = pageMetadata({
  title: "Offers & Old Gold Exchange",
  description:
    "Current offers at Om Prakash Jewellers — old gold exchange at live rates, making charges, and special offers on festival and bridal purchases.",
  path: "/offers",
})

const offers = [
  {
    icon: Scale,
    title: "Old Gold Exchange",
    body: "Bring old gold to the counter — it is weighed in front of you, valued at the day's live rate and adjusted directly against a new piece. No melt charges hidden in the fine print.",
  },
  {
    icon: ShieldCheck,
    title: "Making Charges",
    body: "Transparent making charges, quoted before work begins and shown on your invoice. Wedding sets and custom commissions carry agreed rates, never surprises.",
  },
  {
    icon: Sparkles,
    title: "Festival Offers",
    body: "During Akshaya Tritiya and Dhanteras we run hallmarking and making-charge offers. Offers are published here and at the showroom — always before the festival.",
  },
  {
    icon: Gem,
    title: "Bridal Packages",
    body: "Booking a complete bridal set? Our specialists bundle the set, repair vouchers and a year of complimentary care into a single, agreed quote.",
  },
]

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title="Honest deals, no fine print"
        description="Our offers are simple and stated plainly — old gold exchange at live rates, transparent making charges and festival programmes."
        crumbs={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <div key={offer.title} className="rounded-sm border border-border p-6">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
                <offer.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-lg font-medium">{offer.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{offer.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-pearl/60 dark:bg-charcoal/40">
        <div className="container-lux py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              Ask us about today&apos;s rate
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Gold and diamond rates change daily. Message us and a family member will reply with
              today&apos;s numbers — and whether a current offer applies to the piece you have in mind.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(visitMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button>Ask on WhatsApp</Button>
              </a>
              <Link href="/visit" className="inline-block">
                <Button variant="outline">Visit the Showroom</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
