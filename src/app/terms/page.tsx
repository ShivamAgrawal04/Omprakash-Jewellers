import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"

export const metadata: Metadata = pageMetadata({
  title: "Terms & Conditions",
  description: `The terms that apply to purchases, commissions and enquiries with ${siteConfig.name}.`,
  path: "/terms",
})

const sections = [
  {
    title: "Product information",
    body: "Every piece is described with its karat, weight and stones. Gold is hallmarked and diamonds are certified; weights and rates shown are at the time of listing and may change with the market.",
  },
  {
    title: "Pricing & payment",
    body: "Prices are in Indian Rupees and reflect the day's gold and diamond rates. Gold price is calculated on live rates at the time of purchase; making charges are quoted and agreed before any work begins.",
  },
  {
    title: "Old gold exchange",
    body: "Old gold is weighed at the counter in your presence, valued at the day's live rate and adjusted against a new piece. Terms of the exchange are stated on your invoice before completion.",
  },
  {
    title: "Custom commissions",
    body: "Commissions begin with an agreed design and quote. A deposit reserves your slot; the balance is payable at handover. Any change to the agreed design is confirmed with you before the work is done.",
  },
  {
    title: "Repairs & care",
    body: "Repairs are quoted before work begins. Complimentary cleaning and inspection are offered on all Om Prakash pieces; clasp and prong repairs are free within the first year from purchase.",
  },
  {
    title: "Returns & exchanges",
    body: "Unworn, unchanged pieces may be exchanged in line with our store policy. Certified diamonds are subject to certification terms. Please discuss specifics with our team before purchase.",
  },
  {
    title: "Limitation of liability",
    body: "Our liability is limited to the value of the product or service concerned. We are not liable for loss caused by misuse, improper care or damage that occurs after purchase.",
  },
  {
    title: "Governing law",
    body: `These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts of ${siteConfig.address.city}.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms & Conditions"
        description="The plain-language terms behind purchases, commissions and care at the house."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          {sections.map((section, index) => (
            <div key={section.title}>
              <h2 className="flex items-baseline gap-3 font-display text-xl font-medium">
                <span className="font-light text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
