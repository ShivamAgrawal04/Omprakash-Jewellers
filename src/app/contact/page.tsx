import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { siteConfig } from "@/data/site-config"
import { pageMetadata } from "@/lib/seo"
import { whatsappLink, contactMessage } from "@/lib/whatsapp"
import { PageHero } from "@/components/layout/page-hero"
import { ContactForm } from "@/components/forms/contact-form"

export const metadata: Metadata = pageMetadata({
  title: "Visit & contact",
  description:
    "Visit Omprakash Jewellers at Imli Chowk, Keshav Pasari ke saamne, Porsa — or WhatsApp, call and email.",
  path: "/contact",
})

const channels = [
  {
    icon: Phone,
    label: "Call",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message the shop",
    href: whatsappLink(contactMessage()),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    external: false,
  },
  {
    icon: MapPin,
    label: "Shop",
    value: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    href: siteConfig.mapUrl,
    external: true,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit & contact"
        title="Come to the shop, or send a message"
        description="We do not sell online. Enquiries, repairs, custom work and visits are handled in Porsa or on WhatsApp."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          <div className="space-y-6">
            <div className="grid gap-4">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-sm border border-border p-4 transition-colors hover:border-primary/50"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <channel.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-foreground transition-colors group-hover:text-primary">
                      {channel.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-sm border border-border bg-pearl p-5 dark:bg-charcoal">
              <h2 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                <Clock className="size-4 text-gold" aria-hidden />
                Hours
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {siteConfig.hours.map((h) => (
                  <li key={h.days}>
                    <strong className="font-semibold text-foreground">{h.days}:</strong> {h.time}
                  </li>
                ))}
              </ul>
              <address className="mt-4 not-italic text-sm leading-relaxed text-foreground">
                {siteConfig.name}
                <br />
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}, {siteConfig.address.city}
              </address>
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-6 text-primary">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container-lux pb-14 md:pb-20">
        <div className="overflow-hidden rounded-sm border border-border">
          <iframe
            src={siteConfig.mapEmbed}
            title={`Map to ${siteConfig.name}, Porsa`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-[420px]"
          />
        </div>
      </section>
    </>
  )
}
