import type { Metadata } from "next"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { siteConfig } from "@/data/site-config"
import { pageMetadata } from "@/lib/seo"
import { whatsappLink, contactMessage } from "@/lib/whatsapp"
import { PageHero } from "@/components/layout/page-hero"
import { ContactForm } from "@/components/forms/contact-form"

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Om Prakash Jewellers in Jaipur — phone, WhatsApp, email or a visit. We reply the same day, 10 AM to 8:30 PM.",
  path: "/contact",
})

const channels = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phoneHref}`,
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with the store",
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
    label: "Visit",
    value: `${siteConfig.address.line1}, ${siteConfig.address.city}`,
    href: "/visit",
    external: false,
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a specialist, not a call centre"
        description="Questions about a piece, a repair, an exchange or a commission — write to us and a family member will call you back."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="container-lux py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
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

            <div className="rounded-sm border border-border bg-pearl p-5">
              <h2 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                <Clock className="size-4 text-gold" aria-hidden />
                Opening Hours
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {siteConfig.hours.map((h) => (
                  <li key={h.days}>
                    <strong className="font-semibold text-foreground">{h.days}:</strong> {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="eyebrow mb-6 text-primary">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
