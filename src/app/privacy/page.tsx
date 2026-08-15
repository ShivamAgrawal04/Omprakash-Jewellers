import type { Metadata } from "next"
import { siteConfig } from "@/data/site-config"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/layout/page-hero"

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data — what we collect, why we collect it, and how it is kept.`,
  path: "/privacy",
})

const sections = [
  {
    title: "What we collect",
    body: "When you contact us through the website, we collect only what you choose to share: your name, phone number, email address and message. We never ask for payment details or sensitive information through the site.",
  },
  {
    title: "Why we collect it",
    body: "We use the details you share to respond to your enquiry, arrange visits or commissions, and — only with your consent — to send offers and festival updates.",
  },
  {
    title: "How it is kept",
    body: "Enquiries are stored securely and used only by our own team. We do not sell, rent or share your information with third parties for their marketing.",
  },
  {
    title: "Cookies & analytics",
    body: "The site uses minimal cookies for essential functions. We do not run invasive tracking, and wishlist items are saved only on your own device.",
  },
  {
    title: "Your choices",
    body: "You may ask us at any time to correct or delete the details you have shared, or to stop sending you updates. Write to us and we will act on it.",
  },
  {
    title: "Contact",
    body: `Questions about this policy? Reach us at ${siteConfig.email} or visit the showroom at ${siteConfig.address.line1}, ${siteConfig.address.city}.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="How the website and the showroom handle the details you share with us."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-medium">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
